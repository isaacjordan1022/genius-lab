"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { RotateCcw, Unplug } from "lucide-react";
import type { Answer, PublicQuestion } from "../lib/content-types";
import "./connector-match.css";

type Point = { x: number; y: number };
type Line = { left: string; start: Point; end: Point; color: string };
const COLORS = [
  "#583095",
  "#075c54",
  "#a33558",
  "#235aa5",
  "#914c0b",
  "#543e8d",
];

export default function ConnectorMatch({
  question,
  answer,
  onChange,
  disabled = false,
}: {
  question: PublicQuestion;
  answer: Answer;
  onChange: (answer: Answer) => void;
  disabled?: boolean;
}) {
  const board = useRef<HTMLDivElement>(null);
  const leftNodes = useRef<Record<string, HTMLButtonElement | null>>({});
  const rightNodes = useRef<Record<string, HTMLButtonElement | null>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [dragEnd, setDragEnd] = useState<Point | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const pointer = useRef<{
    id: number;
    left: string;
    start: Point;
    moved: boolean;
  } | null>(null);
  const skipClick = useRef(false);
  const pairs = typeof answer === "object" && answer !== null ? answer : {};
  const left = question.left ?? [];
  const right = question.right ?? [];
  const count = left.filter((item) => right.includes(pairs[item])).length;

  function endpoint(
    node: HTMLButtonElement | null | undefined,
    side: "left" | "right",
  ): Point | null {
    if (!node || !board.current) return null;
    const rect = node.getBoundingClientRect();
    const parent = board.current.getBoundingClientRect();
    return {
      x: (side === "left" ? rect.right : rect.left) - parent.left,
      y: rect.top + rect.height / 2 - parent.top,
    };
  }

  useEffect(() => {
    const measure = () => {
      setLines(
        left.flatMap((item, i) => {
          const start = endpoint(leftNodes.current[item], "left");
          const end = endpoint(rightNodes.current[pairs[item]], "right");
          return start && end
            ? [{ left: item, start, end, color: COLORS[i % COLORS.length] }]
            : [];
        }),
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (board.current) observer.observe(board.current);
    [
      ...Object.values(leftNodes.current),
      ...Object.values(rightNodes.current),
    ].forEach((node) => {
      if (node) observer.observe(node);
    });
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(() => {
      if (board.current) measure();
    });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [question, answer]); // Re-measure saved pairs after answers, font loading, or wrapping change.

  useEffect(() => {
    setSelected(null);
    setDragEnd(null);
    pointer.current = null;
  }, [question.id, disabled]);

  function connect(from: string, to: string) {
    if (disabled) return;
    const updated = { ...pairs };
    // Each end has one connection. Choosing a used end moves that connection.
    Object.keys(updated).forEach((key) => {
      if (updated[key] === to) delete updated[key];
    });
    updated[from] = to;
    onChange(updated);
    setAnnouncement(`Connected ${from} to ${to}.`);
    setSelected(null);
  }

  function pointerDown(event: PointerEvent<HTMLButtonElement>, item: string) {
    if (disabled || (event.pointerType === "mouse" && event.button !== 0))
      return;
    pointer.current = {
      id: event.pointerId,
      left: item,
      start: { x: event.clientX, y: event.clientY },
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelected(item);
  }

  function pointerMove(event: PointerEvent<HTMLButtonElement>) {
    const current = pointer.current;
    if (!current || current.id !== event.pointerId || !board.current) return;
    if (
      Math.hypot(
        event.clientX - current.start.x,
        event.clientY - current.start.y,
      ) > 6
    )
      current.moved = true;
    if (!current.moved) return;
    const rect = board.current.getBoundingClientRect();
    setDragEnd({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  }

  function pointerUp(event: PointerEvent<HTMLButtonElement>) {
    const current = pointer.current;
    if (!current || current.id !== event.pointerId) return;
    const target = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest<HTMLButtonElement>("[data-match-right]");
    if (target && board.current?.contains(target)) {
      const to = target.dataset.matchRight;
      if (to !== undefined && right.includes(to)) connect(current.left, to);
    }
    skipClick.current = current.moved;
    pointer.current = null;
    setDragEnd(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function cancelPointer() {
    pointer.current = null;
    setDragEnd(null);
  }
  const dragStart = selected
    ? endpoint(leftNodes.current[selected], "left")
    : null;
  const curve = (from: Point, to: Point) => {
    const bend = Math.max(20, Math.abs(to.x - from.x) * 0.42);
    return `M${from.x},${from.y} C${from.x + bend},${from.y} ${to.x - bend},${to.y} ${to.x},${to.y}`;
  };

  return (
    <div className="connector-match">
      <div className="connector-instructions">
        <div>
          <strong>Make the connection</strong>
          <p>
            Pick a card on the left, then its partner on the right. You can also
            pull a line across.
          </p>
        </div>
        <span className="connector-count">
          {count}/{left.length}
          <small>connected</small>
        </span>
      </div>
      <div className="connector-board" ref={board}>
        <svg className="connector-lines" aria-hidden="true">
          {lines.map((line) => (
            <g key={line.left}>
              <path
                className="connector-line-halo"
                d={curve(line.start, line.end)}
              />
              <path stroke={line.color} d={curve(line.start, line.end)} />
              <circle
                cx={line.start.x}
                cy={line.start.y}
                r="5"
                fill={line.color}
              />
              <circle cx={line.end.x} cy={line.end.y} r="5" fill={line.color} />
            </g>
          ))}
          {dragStart && dragEnd && (
            <path
              className="connector-drag-line"
              d={curve(dragStart, dragEnd)}
            />
          )}
        </svg>
        <div className="connector-column">
          {left.map((item, i) => (
            <button
              type="button"
              className={`connector-card connector-left ${selected === item ? "is-selected" : ""} ${pairs[item] ? "is-connected" : ""}`}
              key={item}
              ref={(node) => {
                leftNodes.current[item] = node;
              }}
              disabled={disabled}
              style={
                {
                  "--connector-color": COLORS[i % COLORS.length],
                } as React.CSSProperties
              }
              aria-pressed={selected === item}
              aria-label={`${item}${pairs[item] ? `. Connected to ${pairs[item]}. Select to change.` : ". Select a partner."}`}
              onClick={() => {
                if (skipClick.current) {
                  skipClick.current = false;
                  return;
                }
                setSelected(item);
                setAnnouncement(
                  `Selected ${item}. Now choose a partner on the right.`,
                );
              }}
              onPointerDown={(event) => pointerDown(event, item)}
              onPointerMove={pointerMove}
              onPointerUp={pointerUp}
              onPointerCancel={cancelPointer}
              onLostPointerCapture={cancelPointer}
            >
              <span className="connector-badge" aria-hidden="true">
                {i + 1}
              </span>
              <span>{item}</span>
              <span className="connector-port" aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="connector-column connector-right-column">
          {right.map((item) => {
            const from = left.find((key) => pairs[key] === item);
            const colorIndex = from === undefined ? -1 : left.indexOf(from);
            return (
              <button
                type="button"
                key={item}
                className={`connector-card connector-right ${from !== undefined ? "is-connected" : ""}`}
                ref={(node) => {
                  rightNodes.current[item] = node;
                }}
                data-match-right={item}
                disabled={disabled}
                style={
                  {
                    "--connector-color":
                      colorIndex >= 0
                        ? COLORS[colorIndex % COLORS.length]
                        : "#aaa0bb",
                  } as React.CSSProperties
                }
                aria-label={`${item}${from !== undefined ? `. Connected to ${from}.` : ""}${selected ? ` Connect to ${selected}.` : " First select a card on the left."}`}
                onClick={() => {
                  if (selected) connect(selected, item);
                  else
                    setAnnouncement(
                      "First select a card on the left, then choose its partner.",
                    );
                }}
              >
                <span className="connector-port" aria-hidden="true" />
                <span>{item}</span>
                {from !== undefined && (
                  <span className="connector-badge" aria-hidden="true">
                    {colorIndex + 1}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div className="connector-footer">
        <p>
          {selected ? (
            <>
              Find the partner for <strong>{selected}</strong>.
            </>
          ) : count === left.length ? (
            "All connected. You can still change a pair."
          ) : (
            "Matching numbers show your connected pairs."
          )}
        </p>
        <div>
          {selected && (
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                const updated = { ...pairs };
                delete updated[selected];
                onChange(updated);
                setSelected(null);
                setAnnouncement("Connection removed.");
              }}
            >
              <Unplug size={15} aria-hidden="true" />
              Clear selected
            </button>
          )}
          <button
            type="button"
            disabled={disabled || count === 0}
            onClick={() => {
              onChange({});
              setSelected(null);
              setAnnouncement("All connections cleared.");
            }}
          >
            <RotateCcw size={15} aria-hidden="true" />
            Start over
          </button>
        </div>
      </div>
      <span className="connector-sr-only" role="status" aria-live="polite">
        {announcement}
      </span>
    </div>
  );
}
