import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parsePrizeCatalog, type CatalogPrize } from "./prize-catalog";

/** Pilot economy: 600 base tickets/week makes a $200 reward a five-week goal. */
export const TICKETS_PER_DOLLAR = 15;
export type RoomPrize = {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: string;
  interests: string[];
  kind: "physical" | "experience";
  productImage?: string;
  experience?: "dinner" | "adventure" | "together";
  productUrl?: string;
  retailer?: string;
};
export const EXPERIENCE_PRIZES: RoomPrize[] = [
  {
    id: "experience-smashhouse",
    title: "Smashhouse dinner",
    description: "A delicious night out with your family.",
    cost: 500,
    category: "Golden experiences",
    interests: ["Family time", "Food"],
    kind: "experience",
    experience: "dinner",
  },
  {
    id: "experience-day-trip",
    title: "A day of adventure",
    description: "A family day trip. Pick the adventure together.",
    cost: 1500,
    category: "Golden experiences",
    interests: ["Family time", "Adventure"],
    kind: "experience",
    experience: "adventure",
  },
  {
    id: "experience-parent-lunch",
    title: "Just-us lunch",
    description:
      "A private lunch with a parent. A whole table of time for you.",
    cost: 400,
    category: "Golden experiences",
    interests: ["Family time"],
    kind: "experience",
    experience: "together",
  },
];
export function dollarTicketCost(dollars: number) {
  if (!Number.isFinite(dollars) || dollars <= 0)
    throw new Error("A prize needs a positive verified dollar price.");
  return Math.ceil((dollars * TICKETS_PER_DOLLAR) / 10) * 10;
}
export function isConsoleGame(prize: CatalogPrize) {
  return /^(video|console) games$/i.test(prize.category.trim());
}
export function catalogToRoom(catalog: CatalogPrize[]): RoomPrize[] {
  return catalog
    .filter((p) => !isConsoleGame(p))
    .map((p) => {
      if (p.price === null)
        throw new Error(
          `Prize ${p.id} needs a verified price before publishing.`,
        );
      return {
        id: p.id,
        title: p.title,
        description: p.interests
          .filter((tag) => !["Aharon Zev", "Tobi", "Ezra"].includes(tag))
          .slice(0, 3)
          .join(" · "),
        cost: dollarTicketCost(p.price),
        category: p.category,
        interests: p.interests,
        kind: "physical" as const,
        productImage: p.productImage,
        productUrl: p.url,
        retailer: p.retailer,
      };
    });
}
export function getPrizeRoomPrizes(): RoomPrize[] {
  const catalog = parsePrizeCatalog(
    JSON.parse(
      readFileSync(join(process.cwd(), "public/prizes/catalog.json"), "utf8"),
    ),
  );
  return [...EXPERIENCE_PRIZES, ...catalogToRoom(catalog)];
}
