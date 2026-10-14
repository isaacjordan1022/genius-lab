"use client";

import { useState } from "react";
import type { TeachingBlock } from "../lib/content-types";

type Model = NonNullable<TeachingBlock["fractionModel"]>;
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const fraction = (n: number, d: number) => `${n}/${d}`;

function FractionBar({
  numerator,
  denominator,
  label,
  removed = 0,
  second = 0,
}: {
  numerator: number;
  denominator: number;
  label: string;
  removed?: number;
  second?: number;
}) {
  return (
    <div className="fraction-row">
      <div className="fraction-row-label">
        <strong>{label}</strong>
        <span>
          {numerator - removed + second} of {denominator} equal pieces
        </span>
      </div>
      <div
        className="fraction-bar"
        role="img"
        aria-label={`${label}: ${numerator} pieces shaded${removed ? `, ${removed} crossed out` : ""}${second ? `, ${second} pieces added` : ""}, out of ${denominator} equal pieces.`}
        style={{
          gridTemplateColumns: `repeat(${denominator}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: denominator }, (_, i) => (
          <span
            key={i}
            className={`${i < numerator ? "is-filled" : ""} ${i >= numerator - removed && i < numerator ? "is-removed" : ""} ${i >= numerator && i < numerator + second ? "is-added" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function FractionWorkshop({ model }: { model: Model }) {
  const [factor, setFactor] = useState(3);
  const [common, setCommon] = useState(false);
  const [step, setStep] = useState(0);
  const [groups, setGroups] = useState<number[]>(
    Array.from({ length: model.numerator }, (_, i) => i),
  );
  const { numerator: n, denominator: d, mode } = model;
  const n2 = model.otherNumerator ?? 0,
    d2 = model.otherDenominator ?? d;
  const shared = (d * d2) / gcd(d, d2),
    a = (n * shared) / d,
    b = (n2 * shared) / d2;
  const isOperation = mode === "add" || mode === "subtract";
  const chosen = ((model.total ?? 0) / d) * groups.length;
  return (
    <section
      className="fraction-workshop"
      aria-label="Interactive fraction model"
    >
      <div className="fraction-worktop">
        <strong>
          {mode === "quantity"
            ? "Share the counters"
            : "Keep the whole the same size"}
        </strong>
        <span>
          {mode === "quantity"
            ? `${model.total} counters altogether`
            : "Each complete bar is one whole ribbon."}
        </span>
      </div>
      {mode === "equivalence" && (
        <>
          <FractionBar numerator={n} denominator={d} label={fraction(n, d)} />
          <FractionBar
            numerator={n * factor}
            denominator={d * factor}
            label={fraction(n * factor, d * factor)}
          />
          <fieldset className="fraction-controls">
            <legend>Split every piece into…</legend>
            {[2, 3, 4].map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={factor === v}
                onClick={() => setFactor(v)}
              >
                {v} smaller pieces
              </button>
            ))}
          </fieldset>
          <p className="fraction-insight" aria-live="polite">
            {fraction(n, d)} = {fraction(n * factor, d * factor)}. The lines
            changed. The shaded amount stayed the same.
          </p>
        </>
      )}
      {(mode === "compare" || isOperation) && (
        <>
          <FractionBar
            numerator={common ? a : n}
            denominator={common ? shared : d}
            label={
              common
                ? `${fraction(n, d)} = ${fraction(a, shared)}`
                : fraction(n, d)
            }
          />
          <FractionBar
            numerator={common ? b : n2}
            denominator={common ? shared : d2}
            label={
              common
                ? `${fraction(n2, d2)} = ${fraction(b, shared)}`
                : fraction(n2, d2)
            }
          />
          <button
            type="button"
            className="fraction-rename"
            aria-pressed={common}
            onClick={() => setCommon(!common)}
          >
            {common
              ? "Show original pieces"
              : `Rename both in ${shared} equal pieces`}
          </button>
          {common && mode === "compare" && (
            <p className="fraction-insight" aria-live="polite">
              {fraction(a, shared)} {a > b ? ">" : a < b ? "<" : "="}{" "}
              {fraction(b, shared)}. Compare the counts now that every piece is
              the same size.
            </p>
          )}
          {common && isOperation && (
            <>
              <FractionBar
                numerator={a}
                denominator={shared}
                removed={mode === "subtract" ? b : 0}
                second={mode === "add" ? b : 0}
                label={`${fraction(a, shared)} ${mode === "add" ? "+" : "−"} ${fraction(b, shared)} = ${fraction(mode === "add" ? a + b : a - b, shared)}`}
              />
              <p className="fraction-insight">
                {mode === "add"
                  ? "Teal pieces were there first. Gold pieces were added. Count both colours."
                  : "Crossed-out pieces were removed. Count the coloured pieces that remain."}{" "}
                The denominator stays {shared}.
              </p>
            </>
          )}
        </>
      )}
      {mode === "quantity" && (
        <>
          <div className="fraction-groups">
            {Array.from({ length: d }, (_, i) => (
              <button
                type="button"
                key={i}
                aria-pressed={groups.includes(i)}
                aria-label={`Group ${i + 1}: ${(model.total ?? 0) / d} counters. ${groups.includes(i) ? "Selected" : "Not selected"}.`}
                className={groups.includes(i) ? "is-selected" : ""}
                onClick={() =>
                  setGroups((old) =>
                    old.includes(i) ? old.filter((x) => x !== i) : [...old, i],
                  )
                }
              >
                <span>Group {i + 1}</span>
                <span className="fraction-dots" aria-hidden="true">
                  {Array.from({ length: (model.total ?? 0) / d }, (_, j) => (
                    <i key={j} />
                  ))}
                </span>
                <strong>{(model.total ?? 0) / d} counters</strong>
              </button>
            ))}
          </div>
          <p className="fraction-insight" aria-live="polite">
            {groups.length} of {d} groups selected: {fraction(groups.length, d)}{" "}
            of {model.total} = {chosen} counters.
          </p>
          <button
            type="button"
            className="fraction-rename"
            onClick={() => setGroups(Array.from({ length: n }, (_, i) => i))}
          >
            Show {fraction(n, d)} again
          </button>
        </>
      )}
      <div className="fraction-steps">
        <h4>Work it through</h4>
        <ol>
          {model.steps.slice(0, step + 1).map((text, i) => (
            <li key={text}>
              <span aria-hidden="true">{i + 1}</span>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        {step < model.steps.length - 1 ? (
          <button type="button" onClick={() => setStep(step + 1)}>
            Next step
          </button>
        ) : (
          <button type="button" onClick={() => setStep(0)}>
            Work through it again
          </button>
        )}
      </div>
    </section>
  );
}
