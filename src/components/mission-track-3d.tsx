"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./mission-track-3d.css";

export type MissionTrackItem = {
  id: number;
  spawn: number;
  lane: number;
  kind: string;
};
export type MissionTrack3DProps = {
  /** Driving seconds, 0–30. Simulation and collisions belong to the parent. */
  elapsed: number;
  lane: number;
  /** Pass the same visible items used by the simulation; collision is spawn + 2.4. */
  items: MissionTrackItem[];
  paused?: boolean;
  onUnavailable?: () => void;
};

const SPEED = 24;
const PLAYER_Z = 4;
const laneX = (lane: number) => (Math.max(0, Math.min(2, lane)) - 1) * 3;

/** Pure presentation: no score, collision, time, or persistence mutations. */
export function MissionTrack3D(props: MissionTrack3DProps) {
  const host = useRef<HTMLDivElement>(null);
  const latest = useRef(props);
  const [unavailable, setUnavailable] = useState(false);
  latest.current = props;

  useEffect(() => {
    const mount = host.current;
    if (!mount) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "low-power",
      });
    } catch {
      setUnavailable(true);
      latest.current.onUnavailable?.();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor("#bce9fa");
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#bce9fa");
    scene.fog = new THREE.Fog("#bce9fa", 55, 120);
    const camera = new THREE.PerspectiveCamera(56, 1, 0.1, 180);
    camera.position.set(0, 6.3, 13);
    camera.lookAt(0, 0.6, -18);
    scene.add(new THREE.HemisphereLight("#ffffff", "#567965", 2.6));
    const sun = new THREE.DirectionalLight("#fff5d7", 2.2);
    sun.position.set(-18, 32, 14);
    scene.add(sun);

    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const material = (color: string, metalness = 0) => {
      const result = new THREE.MeshStandardMaterial({
        color,
        roughness: metalness ? 0.35 : 0.82,
        metalness,
      });
      materials.add(result);
      return result;
    };
    const palette = {
      road: material("#406398"),
      stripe: material("#dcecff"),
      verge: material("#93cea0"),
      rail: material("#f8eece"),
      blue: material("#3265de"),
      red: material("#ee7759"),
      gold: material("#ffca45", 0.55),
      paleGold: material("#fff0a0", 0.35),
      dark: material("#233656"),
      glass: material("#b3e8f3"),
      white: material("#fff9e4"),
      green: material("#4e9f80"),
      mint: material("#70b890"),
      trunk: material("#9f7758"),
      lilac: material("#b4b3dd"),
      mountain: material("#9bc8c3"),
      pink: material("#ffb6b2"),
    };
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const sphereGeo = new THREE.IcosahedronGeometry(1, 0);
    const cylinderGeo = new THREE.CylinderGeometry(1, 1, 1, 12);
    const coneGeo = new THREE.ConeGeometry(1, 1, 5);
    [boxGeo, sphereGeo, cylinderGeo, coneGeo].forEach((g) => geometries.add(g));
    const mesh = (
      parent: THREE.Object3D,
      geometry: THREE.BufferGeometry,
      mat: THREE.Material,
      x: number,
      y: number,
      z: number,
      sx: number,
      sy: number,
      sz: number,
    ) => {
      const object = new THREE.Mesh(geometry, mat);
      object.position.set(x, y, z);
      object.scale.set(sx, sy, sz);
      parent.add(object);
      return object;
    };
    const box = (
      parent: THREE.Object3D,
      mat: THREE.Material,
      x: number,
      y: number,
      z: number,
      sx: number,
      sy: number,
      sz: number,
    ) => mesh(parent, boxGeo, mat, x, y, z, sx, sy, sz);

    box(scene, palette.verge, 0, -0.4, -50, 180, 0.7, 160);
    box(scene, palette.road, 0, -0.02, -50, 10, 0.2, 150);
    for (const side of [-1, 1]) {
      box(scene, palette.white, side * 4.8, 0.095, -50, 0.14, 0.03, 150);
      box(scene, palette.rail, side * 5.5, 0.55, -50, 0.22, 0.26, 150);
    }
    const moving = new THREE.Group();
    scene.add(moving);
    const stripes: THREE.Object3D[] = [];
    for (let i = 0; i < 24; i++) {
      for (const x of [-1.5, 1.5])
        stripes.push(
          box(moving, palette.stripe, x, 0.1, -i * 6, 0.12, 0.02, 2.5),
        );
    }
    const scenery: Array<{ group: THREE.Group; z: number }> = [];
    for (let i = 0; i < 22; i++) {
      const group = new THREE.Group();
      const side = i % 2 ? 1 : -1;
      group.position.set(side * (8.5 + (i % 3) * 2.5), 0, -i * 6);
      box(group, palette.trunk, 0, 0.9, 0, 0.35, 1.8, 0.35);
      mesh(
        group,
        sphereGeo,
        i % 3 ? palette.green : palette.mint,
        0,
        2.65,
        0,
        1.2,
        1.75,
        1.2,
      );
      // Little verge flowers give depth without textures or downloaded assets.
      mesh(
        group,
        sphereGeo,
        i % 2 ? palette.pink : palette.gold,
        side * 1.5,
        0.25,
        0.8,
        0.25,
        0.25,
        0.25,
      );
      scene.add(group);
      scenery.push({ group, z: -i * 6 });
    }
    for (let i = 0; i < 9; i++) {
      mesh(
        scene,
        coneGeo,
        i % 2 ? palette.lilac : palette.mountain,
        (i - 4) * 15,
        6 + (i % 3),
        -78 - (i % 3) * 8,
        14,
        21 + (i % 3) * 6,
        13,
      );
    }
    for (let i = 0; i < 4; i++) {
      const cloud = new THREE.Group();
      for (let j = 0; j < 3; j++)
        mesh(
          cloud,
          sphereGeo,
          palette.white,
          j * 2.4,
          j % 2 ? 0.5 : 0,
          0,
          2.5,
          1.2,
          1.1,
        );
      cloud.position.set(-30 + i * 18, 17 + (i % 2) * 4, -55 - i * 10);
      scene.add(cloud);
    }

    const car = new THREE.Group();
    car.position.set(laneX(latest.current.lane), 0, PLAYER_Z);
    box(car, palette.blue, 0, 0.64, 0, 1.55, 0.55, 2.45);
    box(car, palette.blue, 0, 0.88, -0.7, 1.4, 0.18, 1);
    box(car, palette.glass, 0, 1.15, 0.12, 1.15, 0.65, 1.04);
    box(car, palette.blue, 0, 1.52, 0.12, 1.28, 0.13, 1.18);
    box(car, palette.white, 0, 0.93, -0.82, 0.25, 0.035, 0.78);
    box(car, palette.dark, 0, 0.52, 1.26, 1.35, 0.2, 0.14);
    box(car, palette.gold, 0, 0.64, 1.345, 0.36, 0.17, 0.02);
    for (const x of [-0.82, 0.82]) {
      for (const z of [-0.8, 0.8]) {
        const wheel = mesh(
          car,
          cylinderGeo,
          palette.dark,
          x,
          0.4,
          z,
          0.35,
          0.22,
          0.35,
        );
        wheel.rotation.z = Math.PI / 2;
        const hub = mesh(
          car,
          cylinderGeo,
          palette.white,
          x * 1.12,
          0.4,
          z,
          0.15,
          0.025,
          0.15,
        );
        hub.rotation.z = Math.PI / 2;
      }
      box(car, palette.red, x * 0.67, 0.73, 1.24, 0.26, 0.14, 0.035);
    }
    const shadowMat = new THREE.MeshBasicMaterial({
      color: "#17345b",
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
    });
    materials.add(shadowMat);
    box(car, shadowMat, 0, 0.12, 0.1, 1.95, 0.01, 2.7);
    scene.add(car);

    const finish = new THREE.Group();
    for (const x of [-5.2, 5.2])
      box(finish, palette.blue, x, 2.7, 0, 0.45, 5.4, 0.45);
    for (let x = 0; x < 14; x++)
      for (let y = 0; y < 2; y++) {
        box(
          finish,
          (x + y) % 2 ? palette.dark : palette.white,
          -4.875 + x * 0.75,
          5.05 + y * 0.65,
          0,
          0.75,
          0.65,
          0.25,
        );
      }
    scene.add(finish);
    const itemObjects = new Map<number, THREE.Group>();
    const makeItem = (kind: string) => {
      const group = new THREE.Group();
      if (kind === "gold") {
        const token = mesh(
          group,
          cylinderGeo,
          palette.gold,
          0,
          1.05,
          0,
          0.55,
          0.18,
          0.55,
        );
        token.rotation.x = Math.PI / 2;
        const stamp = mesh(
          group,
          cylinderGeo,
          palette.paleGold,
          0,
          1.05,
          0.11,
          0.32,
          0.018,
          0.32,
        );
        stamp.rotation.x = Math.PI / 2;
        box(group, palette.gold, 0, 1.05, 0.13, 0.08, 0.37, 0.02);
      } else {
        box(group, palette.red, 0, 0.85, 0, 2.05, 0.6, 0.4);
        for (const x of [-0.6, 0, 0.6]) {
          const stripe = box(
            group,
            palette.white,
            x,
            0.85,
            0.215,
            0.2,
            0.65,
            0.018,
          );
          stripe.rotation.z = -0.45;
        }
        for (const x of [-0.72, 0.72])
          box(group, palette.dark, x, 0.36, 0, 0.18, 0.7, 0.65);
      }
      scene.add(group);
      return group;
    };

    let frame = 0;
    let stopped = false;
    let lastTime = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.fov = width < 600 ? 68 : 56;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();
    const unavailableNow = () => {
      if (stopped) return;
      stopped = true;
      cancelAnimationFrame(frame);
      setUnavailable(true);
      latest.current.onUnavailable?.();
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      unavailableNow();
    };
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    const draw = (now: number) => {
      if (stopped) return;
      frame = requestAnimationFrame(draw);
      if (document.hidden || now - lastTime < 1000 / 45) return;
      const dt = Math.min((now - lastTime) / 1000 || 0.016, 0.1);
      lastTime = now;
      const current = latest.current;
      const travel = current.elapsed * SPEED;
      // Same simulation clock drives scenery and object positions, including pauses.
      stripes.forEach((stripe, i) => {
        stripe.position.z =
          14 - ((Math.floor(i / 2) * 6 - (travel % 6) + 144) % 144);
      });
      scenery.forEach(({ group, z }) => {
        group.position.z = 18 - ((-z - travel + 5000) % 132);
      });
      finish.position.z = PLAYER_Z - (30 - current.elapsed) * SPEED;
      finish.visible = finish.position.z > -115;
      const target = laneX(current.lane);
      const delta = target - car.position.x;
      car.position.x += delta * Math.min(1, dt * 22);
      car.rotation.z = reducedMotion.matches ? 0 : -delta * 0.04;
      car.rotation.y = reducedMotion.matches ? 0 : delta * 0.045;
      const visibleIds = new Set(current.items.map((item) => item.id));
      for (const [id, object] of itemObjects) {
        if (!visibleIds.has(id)) {
          scene.remove(object);
          itemObjects.delete(id);
        }
      }
      for (const item of current.items) {
        let object = itemObjects.get(item.id);
        if (!object) {
          object = makeItem(item.kind);
          itemObjects.set(item.id, object);
        }
        object.position.set(
          laneX(item.lane),
          0,
          PLAYER_Z - (item.spawn + 2.4 - current.elapsed) * SPEED,
        );
        if (item.kind === "gold" && !reducedMotion.matches) {
          object.rotation.y = current.elapsed * 3 + item.id;
          object.position.y = Math.sin(current.elapsed * 4 + item.id) * 0.12;
        }
      }
      try {
        renderer.render(scene, camera);
      } catch {
        unavailableNow();
      }
    };
    frame = requestAnimationFrame(draw);
    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((mat) => mat.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="mission-track-3d" ref={host}>
      {unavailable && (
        <div className="mission-track-unavailable" role="status">
          <span aria-hidden="true">🏁</span>
          <strong>The track couldn’t load.</strong>
          <p>Try a browser with 3D graphics enabled. Your progress is safe.</p>
        </div>
      )}
    </div>
  );
}
