"use client";

import { useState } from "react";

export type RealPhotoItem = {
  src: string;
  alt: string;
  caption: string;
  specBadge: string;
  detail: string;
};

export const REAL_WORLD_GALLERIES: Record<string, RealPhotoItem[]> = {
  "leather-tanning-lab": [
    {
      src: "/prizes/sports/product-sports-134386765.avif",
      alt: "Wilson The Duke Official NFL Horween Leather Football",
      caption: "Real Vegetable/Chrome-Tanned Cowhide (Wilson 'The Duke' Leather)",
      specBadge: "Pebbled Tanned Steerhide · Cross-Linked Collagen",
      detail:
        "Look at the deep reddish-brown grain: tanning locks the collagen fibers so the hide can be pebbled, stitched, and inflated to 13 PSI without rotting or cracking.",
    },
    {
      src: "/prizes/sports/product-sports-837853339.avif",
      alt: "Rawlings Camel and Navy Leather Baseball Glove",
      caption: "Supple Tanned Glove Shell vs. Stiff Lacing",
      specBadge: "Camel Tanned Shell · Rawhide Laces",
      detail:
        "Notice how the camel-colored palm shell bends smoothly around a ball, while the dark laces running through the fingers stay taut like cables.",
    },
  ],
  "hide-layers-explorer": [
    {
      src: "/prizes/sports/product-sports-76dxh7cir1hf.avif",
      alt: "Rawlings 11.5-inch Select Pro Lite H-Web Leather Infield Glove",
      caption: "Real Full-Grain Leather Shell (Rawlings 11.5\" H-Web Infield Pattern)",
      specBadge: "3.2 mm Full-Grain Steerhide · Uncut Top Grain",
      detail:
        "The smooth, glossy outer shell comes from the top full-grain layer above the splitting knife, where interlocking fibers resist tearing and abrasion on infield dirt.",
    },
    {
      src: "/prizes/sports/product-sports-5vrvpexc8joj.avif",
      alt: "Youth Batting Gloves with flexible grip palm",
      caption: "Thin Split & Cabretta Leather in Batting Gloves",
      specBadge: "0.8 mm Split/Cabretta Cut · High Flex",
      detail:
        "When leather is split thin, it wraps effortlessly around your knuckles for bat grip—showing how engineers match hide thickness to the job.",
    },
  ],
  "glove-anatomy-lab": [
    {
      src: "/prizes/sports/product-sports-76dxh7cir1hf.avif",
      alt: "Rawlings 11.5-inch H-Web Infield Baseball Glove",
      caption: "Real H-Web Infield Glove (Open Web + Deep Pocket + Rawhide Laces)",
      specBadge: "11.5\" Infield Spec · H-Web Shock Net · 32 Die-Cut Panels",
      detail:
        "Spot the four zones in real life: the open H-Web between thumb and index finger lets infield dirt fall out, the deep pocket below traps the ball, and rawhide laces tie every finger together.",
    },
    {
      src: "/prizes/sports/product-sports-837853339.avif",
      alt: "Rawlings Camel/Navy 11.5-inch Baseball Glove",
      caption: "Heel Hinge Pad & Spiral Top Lacing",
      specBadge: "Reinforced Heel Pad · 3/16\" Rawhide Lace Channels",
      detail:
        "Follow the spiral rawhide lace across the top of the fingers and web: when an 85-mph line drive hits one finger, that lace shares the pulling tension with its neighbors.",
    },
  ],
  "glove-breakin-simulator": [
    {
      src: "/prizes/sports/product-sports-837853339.avif",
      alt: "Formed pocket and dual heel hinge on a Rawlings baseball glove",
      caption: "Formed Pocket & Dual Heel Hinges",
      specBadge: "Target Break-In Zones: Heel Crease + Web Cradle",
      detail:
        "See how the thumb and pinky curve inward while the fingers stay tall and supportive? Pounding only the pocket and heel hinges builds 'fiber memory' without turning the fingers floppy.",
    },
    {
      src: "/prizes/sports/product-sports-5zso21uc0pd6.avif",
      alt: "Wilson Youth Catcher's Gear Kit",
      caption: "High-Impact Catcher's Protection",
      specBadge: "Heavy-Duty Padding + Shock Dispersion",
      detail:
        "Catchers absorb the hardest pitches every inning—requiring intact, un-baked collagen fibers and dense padding that never bottoms out.",
    },
  ],
  "baseball-seam-windtunnel": [
    {
      src: "/prizes/sports/product-sports-575920911.avif",
      alt: "Rawlings Official League ROLB2 Youth Practice Baseballs",
      caption: "Real Alum-Tanned Cowhide Baseballs with 108 Raised Red Stitches",
      specBadge: "5.0 oz · 9.0\" Circumference · 108 Double Stitches",
      detail:
        "Look closely at the bright white alum-tanned cowhide cover and the raised red cotton seams: those seams give the pitcher's fingertips traction and trip the airflow to make a curveball dive.",
    },
    {
      src: "/prizes/sports/product-sports-6xqaqkhfjcp2.avif",
      alt: "Louisville Slugger Blue Flame Pitching Machine",
      caption: "Consistent Spin & Seam Orientation in Flight",
      specBadge: "Up to 60+ MPH · Topspin Magnus Trajectory",
      detail:
        "Whether thrown by hand or launched from a pitching machine, a ball with raised stitches and topspin drops much sharper than a worn, smooth ball.",
    },
  ],
};

export default function RealWorldGallery({ kind }: { kind: string }) {
  const items = REAL_WORLD_GALLERIES[kind];
  const [selected, setSelected] = useState(0);
  if (!items?.length) return null;
  const active = items[selected % items.length];

  return (
    <div className="real-world-gallery" aria-label="Real-world imagery and engineering specs">
      <div className="real-world-gallery-header">
        <span className="real-world-tag">📸 Real-Life Gear &amp; Material Inspection</span>
        {items.length > 1 && (
          <div className="real-world-tabs" role="group" aria-label="Switch real-world photo">
            {items.map((item, i) => (
              <button
                key={item.caption}
                type="button"
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                Photo {i + 1}: {item.caption.split("(")[0].trim()}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="real-world-body">
        <div className="real-world-photo-frame">
          <img src={active.src} alt={active.alt} loading="lazy" />
        </div>
        <div className="real-world-specs">
          <span className="real-world-spec-pill">{active.specBadge}</span>
          <h4 data-narration-text>{active.caption}</h4>
          <p data-narration-text>{active.detail}</p>
        </div>
      </div>
    </div>
  );
}
