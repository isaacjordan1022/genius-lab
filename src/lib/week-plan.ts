// Published plan dates stay fixed when the calendar moves forward.
export const WEEK_START = "2026-10-04";
export const WEEK_TOPICS = [
  ["✨", "Vocabulary"],
  ["🔎", "Reading & thinking"],
  ["⚙️", "How things work"],
  ["📖", "Torah"],
  ["🕯️", "Gedolim"],
  ["✡️", "Halacha"],
] as const;
export function planDate(order: number, start = WEEK_START) {
  const date = new Date(`${start}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + order - 1);
  return {
    iso: date.toISOString().slice(0, 10),
    label: new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(date),
  };
}
export function planRange(start = WEEK_START) {
  const first = planDate(1, start),
    last = planDate(6, start);
  const firstLabel = first.label.replace(/^\w+, /, ""),
    lastLabel = last.label.replace(/^\w+, /, "");
  return first.iso.slice(0, 4) === last.iso.slice(0, 4)
    ? `${firstLabel} – ${lastLabel}, ${start.slice(0, 4)}`
    : `${firstLabel}, ${first.iso.slice(0, 4)} – ${lastLabel}, ${last.iso.slice(0, 4)}`;
}
export function topicEmoji(subject: string) {
  if (/^vocabulary$/i.test(subject)) return "✨";
  if (/reading & thinking/i.test(subject)) return "🔎";
  if (/gedolim|gadol|mussar/i.test(subject)) return "🕯️";
  if (/halacha|shabbos/i.test(subject)) return "✡️";
  if (/math|fraction|quantity/i.test(subject)) return "🧮";
  if (/how things|engineering/i.test(subject)) return "⚙️";
  if (/science/i.test(subject)) return "🧪";
  if (/art/i.test(subject)) return "🎨";
  if (/history|geography|map/i.test(subject)) return "🗺️";
  if (/torah|mishnah|avot|ethic/i.test(subject)) return "📖";
  if (/writing|grammar|story/i.test(subject)) return "✍️";
  return "🔎";
}
export function simpleTopics(subjects: string[]) {
  return [
    ...new Set(
      subjects
        .filter(
          (s) =>
            !/^(reasoning|analytical thinking|ethical reasoning)$/i.test(s),
        )
        .map((s) => {
          if (/^vocabulary$/i.test(s)) return "Vocabulary";
          if (/^reading & thinking$/i.test(s)) return "Reading & thinking";
          if (/^gedolim$/i.test(s)) return "Gedolim";
          if (/^halacha$/i.test(s)) return "Halacha";
          if (/how things/i.test(s)) return "How things work";
          if (/reading|vocab|literature/i.test(s)) return "Reading & words";
          if (/math|fraction/i.test(s)) return "Math";
          if (/art/i.test(s)) return "Art";
          if (/writing|grammar|literary/i.test(s)) return "Writing";
          if (/mishnah|torah/i.test(s)) return "Torah";
          return s;
        }),
    ),
  ];
}
