import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const folder = path.join(root, "public/prizes");
const canonicalTags = new Map();
function tag(value) {
  const key = value.toLowerCase();
  const name = value[0].toUpperCase() + value.slice(1);
  if (!canonicalTags.has(key)) canonicalTags.set(key, name);
  return canonicalTags.get(key);
}
const groups = ["sports", "tobi", "shared", "electronics"].map(
  (name, group) => {
    const records = JSON.parse(
      fs.readFileSync(path.join(folder, `${name}.json`), "utf8"),
    );
    return records.map((prize) => {
      let source = new URL(prize.url);
      if (source.pathname === "/sp/track" && source.searchParams.has("rd"))
        source = new URL(source.searchParams.get("rd"));
      source.search = "";
      let children =
        group === 0 ? ["Aharon Zev"] : group === 1 ? ["Tobi"] : ["Family"];
      if (group === 0 && /Ezra\/Tobi/.test(prize.ageNote ?? ""))
        children = ["Ezra", "Tobi"];
      else if (group === 0 && /Ezra option/.test(prize.ageNote ?? ""))
        children = ["Ezra"];
      else if (
        group === 0 &&
        /Tee Ball Set|Red Light Green Light/.test(prize.title)
      )
        children = ["Ezra"];
      return {
        ...prize,
        category:
          prize.category === "Electronics & electronic games"
            ? "Electronics"
            : prize.category === "Outdoor & active play"
              ? "Outdoor play"
              : prize.category,
        url: source.href,
        interests: [
          ...new Set(
            [...children, ...prize.interests.filter((t) => t !== "Shared")].map(
              tag,
            ),
          ),
        ],
      };
    });
  },
);
const catalog = [];
for (
  let index = 0;
  index < Math.max(...groups.map((group) => group.length));
  index++
) {
  for (const group of groups) if (group[index]) catalog.push(group[index]);
}
if (catalog.length < 100)
  throw new Error(`Expected at least 100 prizes, found ${catalog.length}`);
for (const field of ["id", "url"])
  if (new Set(catalog.map((prize) => prize[field])).size !== catalog.length)
    throw new Error(`Duplicate ${field}`);
for (const prize of catalog) {
  if (/^(video|console) games$/i.test(prize.category))
    throw new Error(`Console software is excluded: ${prize.id}`);
  if (
    !prize.productImage?.startsWith("/prizes/") ||
    prize.productImage.includes("..")
  )
    throw new Error(`Missing clean product image: ${prize.id}`);
  if (fs.statSync(path.join(root, "public", prize.productImage)).size < 1000)
    throw new Error(`Empty product image: ${prize.id}`);
  if (
    !prize.screenshot.startsWith("/prizes/") ||
    prize.screenshot.includes("..")
  )
    throw new Error(`Invalid screenshot: ${prize.id}`);
  if (fs.statSync(path.join(root, "public", prize.screenshot)).size < 1000)
    throw new Error(`Missing capture: ${prize.id}`);
  if (!Number.isFinite(prize.price) || prize.price < 8 || prize.price > 350)
    throw new Error(`Check price: ${prize.id}`);
}
fs.writeFileSync(
  path.join(folder, "catalog.json"),
  JSON.stringify(catalog, null, 2) + "\n",
);
console.log(
  `Assembled ${catalog.length} unique prizes with clean product images and source captures. Range: $${Math.min(...catalog.map((p) => p.price))}–$${Math.max(...catalog.map((p) => p.price))}.`,
);
