import { test } from "node:test";
import assert from "node:assert/strict";
import { parsePrizeCatalog } from "./prize-catalog";
const sample = {
  id: "sample-only",
  title: "Schema test fixture",
  retailer: "Target",
  url: "https://www.target.com/p/example",
  price: 19.99,
  category: "Building",
  interests: ["Engineering"],
  screenshot: "/prizes/screenshots/example.png",
  checkedAt: "2026-10-07",
};
test("prize research keeps unknown prices unknown and preserves supplied source metadata", () => {
  const record = { ...sample, price: null, priceNote: "Price unavailable" };
  assert.deepEqual(parsePrizeCatalog([record]), [record]);
});
test("duplicate product IDs cannot silently share draft selection state", () => {
  assert.throws(
    () => parsePrizeCatalog([sample, sample]),
    /Duplicate prize ID/,
  );
});
test("prize links and screenshots must be usable secure sources", () => {
  assert.throws(
    () => parsePrizeCatalog([{ ...sample, url: "javascript:alert(1)" }]),
    /secure retailer/,
  );
  assert.throws(
    () => parsePrizeCatalog([{ ...sample, screenshot: "/prizes/../secret" }]),
    /local/,
  );
  assert.throws(
    () =>
      parsePrizeCatalog([
        { ...sample, screenshot: "https://example.com/image" },
      ]),
    /local/,
  );
});
test("invalid research amounts and capture dates are surfaced instead of silently displayed", () => {
  assert.throws(
    () => parsePrizeCatalog([{ ...sample, price: "19.99" }]),
    /dollar price/,
  );
  assert.throws(
    () => parsePrizeCatalog([{ ...sample, price: -1 }]),
    /dollar price/,
  );
  assert.throws(
    () => parsePrizeCatalog([{ ...sample, checkedAt: "unknown" }]),
    /capture date/,
  );
});
