// Rebuild the outlined SVG marks from the locally licensed DynaPuff font. Run from the app root.
const fs = require("fs");
const path = require("path");
const base = process.cwd();
const kit = require(
  path.join(base, "node_modules/next/dist/compiled/@next/font/dist/fontkit"),
).default;
const font = kit(
  fs.readFileSync("public/design/fonts/dynapuff-DynaPuff-wdth-wght.ttf"),
).getVariation({ wght: 600, wdth: 100 });
function wordPaths(word, target, x, y) {
  const run = font.layout(word);
  let advance = 0;
  const total = run.positions.reduce((a, p) => a + p.xAdvance, 0),
    scale = target / total;
  const parts = run.glyphs
    .map((g, i) => {
      const pos = run.positions[i],
        out = `<path d="${g.path.toSVG()}" transform="translate(${advance + pos.xOffset} ${pos.yOffset})"/>`;
      advance += pos.xAdvance;
      return out;
    })
    .join("");
  return `<g transform="translate(${x} ${y}) scale(${scale} -${scale})">${parts}</g>`;
}
const defs = `<linearGradient id="face" x1="0" y1="1" x2="0" y2="0"><stop stop-color="#f6ffe7"/><stop offset=".44" stop-color="#ddf6ba"/><stop offset=".48" stop-color="#bee698"/><stop offset="1" stop-color="#8fc971"/></linearGradient><linearGradient id="side" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#e2b9f7"/><stop offset=".5" stop-color="#b77bd4"/><stop offset="1" stop-color="#7f439e"/></linearGradient><linearGradient id="shine" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff" stop-opacity=".94"/><stop offset=".55" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`;
const paths = wordPaths("Genius Lab", 616, 22, 120);
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 164" role="img" aria-labelledby="title"><title id="title">Genius Lab</title><defs>${defs}<g id="letters">${paths}</g><clipPath id="clip"><use href="#letters"/></clipPath></defs><g stroke-linejoin="round" paint-order="stroke fill"><use href="#letters" transform="translate(0 16)" fill="#3c1452" stroke="#3c1452" stroke-width="15"/><use href="#letters" transform="translate(0 10)" fill="url(#side)" stroke="url(#side)" stroke-width="12"/><use href="#letters" transform="translate(0 4)" fill="#f0d5ff" stroke="#f0d5ff" stroke-width="14"/><use href="#letters" fill="#542368" stroke="#542368" stroke-width="11"/><use href="#letters" fill="url(#face)" stroke="#f1ffdb" stroke-width="2"/></g><g clip-path="url(#clip)"><path d="M0 15H660V67Q490 31 330 65T0 62Z" fill="url(#shine)"/><path d="M0 21Q330 7 660 21" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/></g></svg>`;
fs.writeFileSync("public/brand/genius-lab.svg", logo);
const iconPaths = wordPaths("GL", 167, 32, 157);
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-labelledby="title"><title id="title">Genius Lab</title><defs>${defs}<linearGradient id="tile" x2=".85" y2="1"><stop stop-color="#8c55aa"/><stop offset=".65" stop-color="#602977"/><stop offset="1" stop-color="#421b57"/></linearGradient><g id="letters">${iconPaths}</g></defs><rect x="7" y="13" width="226" height="221" rx="56" fill="#35113f"/><rect x="7" y="6" width="226" height="221" rx="56" fill="url(#tile)"/><rect x="15" y="14" width="210" height="203" rx="48" fill="none" stroke="#dfb5ef" stroke-opacity=".65" stroke-width="2"/><path d="M28 64Q29 25 66 25H171Q209 25 213 65Q119 42 28 64" fill="#fff" opacity=".1"/><g stroke-linejoin="round" paint-order="stroke fill"><use href="#letters" transform="translate(0 13)" fill="#2e113b" stroke="#2e113b" stroke-width="12"/><use href="#letters" transform="translate(0 8)" fill="url(#side)" stroke="url(#side)" stroke-width="10"/><use href="#letters" fill="url(#face)" stroke="#421451" stroke-width="9"/><use href="#letters" fill="url(#face)" stroke="#efffdb" stroke-width="1.5"/></g><path d="M184 40v16m-8-8h16" stroke="#edffd8" stroke-width="4" stroke-linecap="round"/></svg>`;
fs.writeFileSync("public/brand/genius-lab-icon.svg", icon);
console.log("Created outlined DynaPuff SVG logo and icon.");
