# Aharon Zev pilot — curriculum v3

Published as new IDs (`lesson-v3-1` through `lesson-v3-5`, `weekly-test-v3`), with old v2 content and attempts retained. Exports are `LESSONS_V3`, `WEEK_TITLE_V3`, `WEEK_OBJECTIVES_V3`; content is server-side and answer keys must use the store's public projection.

## What changed

Five original passages, each about 350–380 words and six authored paragraphs, replace the previous brief reading snippets. Each first chunk contains five core activities: choice, open explanation, relationship matching, choice, open analysis/creative response. Every core reading prompt names its passage and refers to the passage's actual events. Both forms use different choice and open-response prompts; matching revisits the same four relationships. These are guided-practice forms, not independent parallel tests. Each open response has four specific criteria and an exemplar; creative answers need not match the exemplar's wording.

Sunday: observations, inferences and qualified claims in a windmill investigation.
Monday: character change, pride, revision and learning from failed boat models.
Tuesday: metaphor, concrete details, pronoun ambiguity and subject–verb agreement in an art report.
Wednesday: cautious conclusions, controlled conditions and limits of evidence in a drying investigation.
Thursday: goals, obstacles, prepared solutions and theme in a writer's revision process.

Non-reading subject chunks retain the v2 science, art, history, geography and Avot sequence, deep-cloned under new IDs. Fraction teaching is replaced with fuller explanations, equal-whole bar models, equivalent partitions, common-unit comparison, addition/subtraction, and two equal-group quantity examples. The question sets remain aligned to these underlying objectives.

The independent 24-question weekly test retains its broader non-reading tasks and adds two new reading tasks per form with a self-contained unseen passage, plus a new grammar transfer task. Retained non-reading prompts are intentionally not claimed to be newly authored or psychometrically equivalent to other forms. No daily passage is reused as the weekly passage. Weekly test teaching stays empty.

## Teaching design decisions

Applied `frontend-design` to the existing child learning context rather than adding decorative cards around every paragraph. Reading uses a continuous blue-framed paper surface, left-aligned Lexend, six stable paragraph numbers, a comfortable measure under 64 characters, and optional evidence marking. Vocabulary uses the established plum palette. Math uses teal, gold additions and crossed-out removed pieces so meaning is not conveyed by colour alone. Each entire ribbon is the same width; the denominator changes the partition, never the size of the whole.

Palette: reading blue `#194e87`, reading mist `#e3f2ff`, math teal `#075c54`, mint `#e6f6ed`, added-pieces gold `#ffc45c`, plain white work surface. DynaPuff headings use 500; Lexend reading and controls are at least 18px. Mobile reflows group controls and retains labelled keyboard-operable buttons. No automatic animation competes with reading. ReadAlong is connected to each teaching block's title, prose and vocabulary text via the root-owned voice component.

The fraction workbench follows `explanation → visible model → optional manipulation → worked steps`. Story paragraphs are not automatically split at arbitrary character counts; their numbers remain stable for evidence discussion. Highlight and counter selection is local teaching interaction only and never changes learning scores or tickets.

## Limits and next evidence

The original 15–20 minute daily target is now especially uncertain: a 350-word story, oral discussion, six written/oral responses and two other subject chunks may take longer. Measure with Aharon before promising a duration; do not solve this by quietly reducing text size or grading on keywords. Separate adaptive bonus questions are owned by the store/AI work and are not part of the 15 core items.

Existing coverage gaps remain explicit: full music instruction, systematic spelling, Jewish history, parent-selected Gemara and halacha. Avot 1:6 is not a substitute for those domains. The separately implemented weekly bridge exploration continues to address “How things work”; it is not silently counted as coverage in this 24-question test. The next planned curriculum should integrate a mechanism chunk and independent transfer item directly into the daily/weekly sequence.

Verification: content tests enforce passage length/paragraph count, reference to each passage in its core prompts, 15/24 counts, complete question-to-chunk membership, valid answer keys/rubrics, version separation, and all five visual fraction modes. The equal-group models require totals divisible by their denominators; add/subtract examples stay within one whole. Actual child timing and learning gains remain unmeasured.
