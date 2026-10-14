import type { DailyLesson } from "./content-types";
import { buildChunkQuestions, type DayBlueprint } from "./v4-types";
import { DAYS_1_AND_2 } from "./v4-days-1-2";
import { DAYS_3_AND_4 } from "./v4-days-3-4";
import { DAY_5, buildWeeklyTestV4 } from "./v4-day-5-and-weekly";

export const WEEK_TITLE_V4 =
  "Week 1 · Words, How Leather & Gloves Work, Parshat Noach & Shabbos";

export const WEEK_OBJECTIVES_V4 = [
  "Master 20 rich vocabulary words in context with definitions, example sentences, and word-relationship games",
  "Analyze short, punchy 3-paragraph reading passages using textual evidence, inference, and voice-graded explanations",
  "Explain how raw animal hide is tanned into durable leather and engineered into a pro baseball glove and 108-stitch baseball",
  "Explore Parshat Bereishis & Noach (the 3-deck Teivah, Tzohar, Kofer, the Dove's olive leaf, and the Rainbow Covenant) with Rashi",
  "Learn from the life and Mussar teachings of Rav Yisroel Salanter, including the Shoemaker's Candle and caring for others' dignity",
  "Apply core Hilchot Shabbos principles of Borer (the 3 Golden Keys: Ochel, B'Yad, Miyad) and Muktzeh (Kli Shemelachto L'Issur vs. Muktzeh Machmas Gufo)",
];

const ALL_DAYS: DayBlueprint[] = [...DAYS_1_AND_2, ...DAYS_3_AND_4, DAY_5];

export const READING_PASSAGES_V4 = ALL_DAYS.map((d) => d.readingPassage);

const dailyLessonsV4: DailyLesson[] = ALL_DAYS.map((day) => {
  const lessonId = `lesson-v4-${day.order}`;
  const form1 = day.chunks.flatMap((c, idx) =>
    buildChunkQuestions(lessonId, idx, 0, c.form1),
  );
  const form2 = day.chunks.flatMap((c, idx) =>
    buildChunkQuestions(lessonId, idx, 1, c.form2),
  );

  return {
    id: lessonId,
    order: day.order,
    title: day.title,
    subjects: [...new Set(day.chunks.flatMap((c) => c.subjects))],
    objectives: day.chunks.flatMap((c) => c.objectives),
    version: 4,
    teaching: day.chunks.flatMap((c) => c.teaching),
    forms: [form1, form2],
    chunks: day.chunks.map((c, idx) => ({
      id: `${lessonId}-${c.idSuffix}`,
      title: c.title,
      subjects: c.subjects,
      objectives: c.objectives,
      teaching: c.teaching,
      questionIds: [
        form1.slice(idx * 5, idx * 5 + 5).map((q) => q.id),
        form2.slice(idx * 5, idx * 5 + 5).map((q) => q.id),
      ],
    })),
  };
});

const weeklyTestV4: DailyLesson = {
  id: "weekly-test-v4",
  order: 6,
  title: "Weekly Challenge · Words, Leather & Gloves, Parsha & Shabbos",
  subjects: [
    "Vocabulary",
    "Reading & thinking",
    "How things work",
    "Torah",
    "Gedolim",
    "Halacha",
  ],
  objectives: WEEK_OBJECTIVES_V4,
  version: 4,
  assessmentOnly: true,
  teaching: [],
  forms: [buildWeeklyTestV4(0), buildWeeklyTestV4(1)],
  chunks: [],
};

export const LESSONS_V4: DailyLesson[] = [...dailyLessonsV4, weeklyTestV4];
