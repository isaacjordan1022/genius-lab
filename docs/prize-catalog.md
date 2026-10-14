# Prize Room catalog

106 physical prizes plus three golden experiences. Captured October 7, 2026. Sources are Amazon and Walmart. Each physical prize retains its retailer link, observed dollar price, capture date and source screenshot, plus a clean product-only image for the child-facing room. Prices are snapshots; conditional Prime prices are labeled in the source data, and tax, shipping, sellers and variants may differ.

The collection includes sports and baseball gear, dolls and creative toys, shared board games and building sets, and electronics. Console game software is excluded; Switch hardware and accessories remain. Child interest tags are curation labels, not product-age certifications. Three Barbie product photos are lower-resolution retailer thumbnails; the rest use larger product images or product-only gallery screenshots.

Open `/prize-room` to browse and redeem. `/prize-picker` redirects there. There is no parent curation interface; Isaac manages the collection through this development conversation. Retailer prices and provenance stay out of the child-facing room.

The provisional conversion is 15 tickets per dollar, rounded up to the next ten tickets. A $200 prize is 3,000 tickets, or five base learning weeks at 600 tickets per week. Smashhouse dinner (500), a day trip (1,500), and private parent lunch (400) have separately configured experience prices. This economy still needs playtesting and approval as a final reward schedule.

Checkout records a confirmed order, deducts once, preserves lifetime earnings and creates a local parent notification. It does not make a retailer purchase or send external messages. Historical orders remain intact when products change.

Source files: `public/prizes/sports.json`, `tobi.json`, `shared.json`, and `electronics.json`. Run `node scripts/assemble-prizes.mjs` to validate and merge `public/prizes/catalog.json`. Clean images and original evidence remain in the corresponding subfolders. Golden experience records and ticket conversion live in `src/lib/prize-room.ts`.
