export type WordTiming = { text: string; start: number; end: number };
export function wordTimings(alignment: { characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[] }): WordTiming[] {
  const words: WordTiming[] = [];
  let text = "", start = 0, end = 0;
  alignment.characters.forEach((character, i) => {
    if (/\s/.test(character)) {
      if (text) { words.push({ text, start, end }); text = ""; }
    } else {
      if (!text) start = alignment.character_start_times_seconds[i];
      text += character;
      end = alignment.character_end_times_seconds[i];
    }
  });
  if (text) words.push({ text, start, end });
  return words;
}
