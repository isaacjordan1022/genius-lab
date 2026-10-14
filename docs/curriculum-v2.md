# Curriculum v2 — smaller teaching and practice loops

Status: implemented pilot content for Aharon Zev, age 10 / grade 5. This replaces the structure for new attempts; legacy content stays unchanged so historical answers retain their original prompts and keys.

## Language and learning structure

- **Weekly plan:** the overview, outcomes, five daily lessons and weekly test. It is a navigation and orientation page, not an assessment screen.
- **Daily lesson:** approximately 15–20 minutes is the design target, not a tested duration. This pilot has three chunks, with 15 scored activities in total.
- **Chunk:** one coherent small cluster of teaching cards followed by five activities. Its practice sequence is choice → open response → matching → choice → open response. Complete the teaching, practice the idea, then change topic.
- **Weekly test:** 24 fresh activities using ideas already taught during the week. It contains 11 choice, five matching and eight open responses per form, interleaved to avoid a multiple-choice wall. Allow more time than a daily lesson. The pilot does not time or penalize reflective answers.

A chunk is not a tiny standalone subject course. For example, reading, vocabulary and writing naturally support each other. The daily sequence changes domains without inventing a strained theme that ties everything together.

## Week 1 map

| Day | Chunk 1 | Chunk 2 | Chunk 3 |
|---|---|---|---|
| Sunday | Reading inferences; infer/evidence | Equivalent fractions and equal parts | Monet, light, art vocabulary |
| Monday | Reluctant/resourceful; character actions | Fair evaporation comparisons | Historical sources and their purposes |
| Tuesday | Metaphor, analogy, agreement, pronouns | Fraction addition and subtraction | Mishnah Avot 1:6 and thoughtful friendship |
| Wednesday | Evidence, summaries and cautious conclusions | Water-loss data and repeated trials | Compass direction, scale, route distance |
| Thursday | Story goals, obstacles, actions and results | Fractions of quantities | Composition, brushwork and interpretation |
| Friday | Independent weekly test across the taught objectives | | |

The repeated domains revisit ideas at greater depth; they do not simply replay the same daily worksheet. Daily lessons have two forms with different open-response situations and many changed objective questions. Some matching review tasks intentionally repeat relationships between forms. The second form is not an unlimited fresh-item bank.

## What counts as learning

Each activity is worth four **assessment points**, not four spendable tickets. Choice items currently earn zero or four; matching earns one per correct relationship; open responses earn one per specified criterion. Open criteria reward evidence, explanation, accurate reasoning and intentional creative choices. They do not require copying the exemplar or sharing one aesthetic interpretation.

Learning objectives include eight vocabulary words; supporting inferences with two details and their connection; explaining fraction reasoning; designing fair comparisons; interpreting art from visual evidence; comparing historical sources; using direction and scale; applying Avot 1:6 thoughtfully; and writing clear causal scenes with purposeful figurative language.

Daily first-attempt, retry and assisted-review performance should be retained separately. A pass after rereading is useful practice evidence but is not equivalent to independent delayed retention. The independent weekly test provides a separate signal; one short pilot test is not a complete or standardized measure of learning.

Open responses currently need human rubric review. The answer exemplars are examples, not exclusive answers. A future AI reviewer must return criterion-level evidence and specific explanations, allow alternatives, and defer ambiguous judgments. It must not pretend local static explanations are AI-generated.

## Teaching-card design requirements

Teaching is structured as vocabulary, passage, concept, worked-example and art cards. Vocabulary supplies a word, plain meaning and example. Highlighted terms are metadata for the renderer. Paragraph breaks and short cards make the material scannable. The text length cap in the shape tests protects against returning to large prose blocks.

The current art teaching describes original imagined scenes. It does **not** display a historical artwork. A real image-and-looking activity remains a necessary next content improvement. AI-generated decorative imagery must never be presented as a Monet painting.

Children must be able to return to the weekly plan without losing their lesson. Learning-mode material review should be available and its use recorded, with clear distinction from an independent weekly test. Corrective explanations should connect the misconception to the relevant card and a fresh opportunity to reason; they should not simply award points for looking at an answer.

## Coverage boundaries

This is a coherent first pilot week, **not the full requested curriculum breadth**. Music, spelling-specific practice, substantive Jewish history, Gemara and Hilchos Shabbos are not yet taught or tested here. The high-level weekly planning system must schedule all requested domains over the eventual course and track what was actually taught. It must never count an omitted domain as covered because it appears in a product category list.

Avot 1:6 is a sourced introductory Mishnah discussion. It is not a substitute for the family’s chosen Gemara or halachic curriculum. Add those from selected, reviewed source material; do not invent rulings or claim a source says more than it does. Historical practice documents are labeled fictional. Reading passages and examples are original instructional fiction.

The existing reference basis is preserved from the original curriculum:

- [Mishnah Avot 1:6](https://www.sefaria.org/Pirkei_Avot.1.6) — teacher, friend and favorable judgment; paraphrased rather than quoted.
- [The Met: Claude Monet](https://www.metmuseum.org/essays/claude-monet-1840-1926) — artist context and repeated subjects under changing light.
- [The Met: Impressionism](https://www.metmuseum.org/essays/impressionism-art-and-modernity) — looking at light and visible brushwork.
- [Library of Congress: What is a primary source?](https://ask.loc.gov/faq/303148) — primary source concepts.

These references come from the previously verified source set. This change primarily reorganizes and authors instructional practice; it is not a new source-verification pass.

## Content and migration contract

`LESSONS` contains version-2 IDs. Each daily chunk lists its five question IDs separately for both forms. The public client receives question prompts, choices, matching labels and rubric criteria; correct answers and exemplars remain in the server content module until the allowed feedback state.

Weekly assessments have `assessmentOnly: true`, no teaching cards and no teaching chunks. Their two forms contain 24 questions each. No weekly-test prompt repeats a daily-practice prompt. Content tests verify cardinality, complete chunk membership, format interleaving, unique IDs, unambiguous matching keys, complete rubrics and preservation of legacy IDs.

Do not silently reuse version-1 attempts as version-2 completion. Do not erase previously earned tickets or historical results when changing the learning sequence. Migration and wallet behavior belong to the state layer and must be tested independently of these content checks.
