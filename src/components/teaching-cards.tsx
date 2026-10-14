"use client";

import { Fragment, useEffect, useState } from "react";
import {
  BookOpen,
  Compass,
  Eye,
  Flame,
  Lightbulb,
  Palette,
  RotateCcw,
  Scale,
  ScrollText,
  Sparkles,
} from "lucide-react";
import type { TeachingBlock } from "../lib/content-types";
import "./teaching-cards.css";
import BridgeDiagram from "./bridge-diagram";
import DiscoveryDiagram from "./discovery-diagram";
import EnrichmentVisual, { VocabQuickGame } from "./enrichment-visuals";
import FractionWorkshop from "./fraction-workshop";
import ReadAlong from "./read-along";

type RichBlock = TeachingBlock;

function Highlighted({ text, words = [] }: { text: string; words?: string[] }) {
  const useful = words.filter(Boolean).sort((a, b) => b.length - a.length);
  if (!useful.length) return <>{text}</>;
  const escaped = useful.map((word) =>
    word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "gi"));
  return (
    <>
      {parts.map((part, index) =>
        useful.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
          <mark key={index}>{part}</mark>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}

// Preserve authored paragraphs; split long uninterrupted copy only at sentence boundaries.
function paragraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .filter((line) => line.trim())
    .flatMap((line) => {
      if (line.length < 390) return [line];
      const sentences = line.match(/[\s\S]+?(?:[.!?]["”’']?(?=\s|$)|$)/g) ?? [
        line,
      ];
      const result: string[] = [];
      let current = "";
      for (const sentence of sentences) {
        if (current.length > 230) {
          result.push(current.trim());
          current = "";
        }
        current += sentence;
      }
      if (current.trim()) result.push(current.trim());
      return result.length ? result : [line];
    });
}

function WordCard({
  term,
}: {
  term: { word: string; meaning: string; example: string };
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <button
      type="button"
      className={`teach-word ${revealed ? "is-revealed" : ""}`}
      onClick={() => setRevealed(!revealed)}
      aria-expanded={revealed}
    >
      <span className="teach-word-top">
        <Sparkles size={20} aria-hidden="true" />
        <span>{revealed ? "Word unlocked" : "Meet a new word"}</span>
        <RotateCcw size={17} aria-hidden="true" />
      </span>
      <strong data-narration-text>{term.word}</strong>
      {revealed ? (
        <span className="teach-word-back">
          <span data-narration-text>{term.meaning}</span>
          <span className="teach-word-example" data-narration-text>
            {term.example}
          </span>
        </span>
      ) : (
        <span className="teach-word-prompt">
          Say it. Have a guess. Tap to discover.
        </span>
      )}
    </button>
  );
}

function MaterialCard({ block }: { block: RichBlock }) {
  const [notice, setNotice] = useState(false);
  const [evidence, setEvidence] = useState<number[]>([]);
  const kind = block.kind ?? (block.terms?.length ? "vocabulary" : "concept");
  const Icon =
    kind === "vocabulary"
      ? Sparkles
      : kind === "passage"
        ? BookOpen
        : kind === "art"
          ? Palette
          : kind === "mechanism"
            ? Compass
            : kind === "torah"
              ? ScrollText
              : kind === "gadol"
                ? Flame
                : kind === "halacha"
                  ? Scale
                  : Lightbulb;
  const label = {
    vocabulary: "Word workshop",
    passage: "Read & think like a detective",
    concept: "Let's work it out",
    example: "See it in action",
    art: "Look a little closer",
    mechanism: "How things work",
    torah: "Torah & Parsha",
    gadol: "Gadol spotlight",
    halacha: "Halacha in action",
  }[kind];
  const isEnrichmentDiagram =
    block.diagram &&
    block.diagram !== "beam-bridge" &&
    block.diagram !== "shadow-theatre" &&
    block.diagram !== "mondrian-study";

  return (
    <article className={`teach-card teach-${kind}`} data-narration-scope>
      <header className="teach-card-heading">
        <span className="teach-icon">
          <Icon size={25} aria-hidden="true" />
        </span>
        <div>
          <span className="teach-kind">{label}</span>
          <h3 data-narration-text>{block.title}</h3>
        </div>
      </header>
      <ReadAlong
        text={[
          block.title,
          block.text,
          ...(block.terms?.map(
            (term) => `${term.word}. ${term.meaning} ${term.example}`,
          ) ?? []),
        ].join("\n\n")}
      />
      {block.diagram === "beam-bridge" && <BridgeDiagram />}
      {(block.diagram === "shadow-theatre" ||
        block.diagram === "mondrian-study") && (
        <DiscoveryDiagram kind={block.diagram} />
      )}
      {isEnrichmentDiagram && block.diagram && (
        <EnrichmentVisual kind={block.diagram} />
      )}
      {block.sources && (
        <div className="teach-sources">
          {block.sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
            >
              {source.label}
            </a>
          ))}
        </div>
      )}
      {kind === "vocabulary" && block.terms?.length ? (
        <>
          {block.text && (
            <div className="teach-intro">
              {paragraphs(block.text).map((paragraph, i) => (
                <p key={i} data-narration-text>
                  <Highlighted text={paragraph} words={block.highlight} />
                </p>
              ))}
            </div>
          )}
          <div className="teach-words">
            {block.terms.map((term) => (
              <WordCard key={term.word} term={term} />
            ))}
          </div>
          {block.terms.length >= 2 && <VocabQuickGame terms={block.terms} />}
        </>
      ) : (
        <>
          <div
            className={`teach-sheet ${kind === "passage" ? "teach-passage-sheet" : ""}`}
          >
            {(kind === "passage"
              ? block.text.split(/\n\s*\n/).filter(Boolean)
              : paragraphs(block.text)
            ).map((paragraph, i) =>
              kind === "passage" ? (
                <div
                  key={i}
                  className={`teach-paragraph ${evidence.includes(i) ? "is-evidence" : ""}`}
                >
                  <button
                    type="button"
                    className="teach-paragraph-marker"
                    aria-label={`${evidence.includes(i) ? "Unmark" : "Mark"} paragraph ${i + 1} as evidence`}
                    aria-pressed={evidence.includes(i)}
                    onClick={() =>
                      setEvidence((old) =>
                        old.includes(i)
                          ? old.filter((n) => n !== i)
                          : [...old, i],
                      )
                    }
                  >
                    {i + 1}
                  </button>
                  <p data-narration-text>
                    <Highlighted text={paragraph} words={block.highlight} />
                  </p>
                </div>
              ) : (
                <p key={i} data-narration-text>
                  <Highlighted text={paragraph} words={block.highlight} />
                </p>
              ),
            )}
          </div>
          {block.terms?.length ? (
            <div className="teach-words">
              {block.terms.map((term) => (
                <WordCard key={term.word} term={term} />
              ))}
            </div>
          ) : null}
        </>
      )}
      {block.fractionModel && (
        <FractionWorkshop key={block.title} model={block.fractionModel} />
      )}
      {(kind === "passage" || kind === "art") && (
        <div className="teach-notice">
          <button
            type="button"
            onClick={() => setNotice(!notice)}
            aria-expanded={notice}
          >
            <Eye size={18} aria-hidden="true" />
            {notice ? "Hide thinking prompt" : "Pause and notice"}
          </button>
          {notice && (
            <p>
              {kind === "art"
                ? "What do you notice first? Describe one detail, then explain what it makes you think or feel."
                : "Which clue in the passage stood out? Tap the paragraph number next to the sentence that backs up your thinking."}
            </p>
          )}
        </div>
      )}
    </article>
  );
}

export default function TeachingCards({
  blocks,
  compact = false,
}: {
  blocks: TeachingBlock[];
  compact?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const materialKey = blocks.map((block) => block.title).join("\u0000");
  useEffect(() => {
    setIndex(0);
  }, [materialKey]);
  const selected = Math.min(index, Math.max(0, blocks.length - 1));
  if (!blocks.length) return null;
  return (
    <div className={`teaching-cards ${compact ? "teaching-compact" : ""}`}>
      {blocks.length > 1 && (
        <div className="teach-tabs" role="group" aria-label="Learning material">
          {blocks.map((block, i) => (
            <button
              key={`${block.title}-${i}`}
              type="button"
              aria-pressed={i === selected}
              onClick={() => setIndex(i)}
            >
              <span>{i + 1}</span>
              {block.title}
            </button>
          ))}
        </div>
      )}
      <MaterialCard
        key={`${selected}-${blocks[selected].title}`}
        block={blocks[selected] as RichBlock}
      />
      {blocks.length > 1 && (
        <div className="teach-pagination">
          <span>
            Material {selected + 1} of {blocks.length}
          </span>
          {selected < blocks.length - 1 && (
            <button type="button" onClick={() => setIndex(selected + 1)}>
              Next part <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
