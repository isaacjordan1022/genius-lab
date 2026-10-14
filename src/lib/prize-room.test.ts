import { test } from "node:test";
import assert from "node:assert/strict";
import {
  catalogToRoom,
  dollarTicketCost,
  EXPERIENCE_PRIZES,
  getPrizeRoomPrizes,
} from "./prize-room";
import { createStore } from "./store";
import { CHUNKS } from "./content";
import type { CatalogPrize } from "./prize-catalog";
const product: CatalogPrize = {
  id: "fixture-product",
  title: "Art kit",
  retailer: "Target",
  url: "https://www.target.com/p/example",
  price: 6,
  category: "Art & making",
  interests: ["Art"],
  screenshot: "/prizes/test.jpg",
  productImage: "/prizes/product-test.jpg",
  checkedAt: "2026-10-07",
};
test("pilot ticket conversion makes a $200 prize a five-week base-earning goal", () => {
  assert.equal(dollarTicketCost(200), 3000);
  assert.equal(dollarTicketCost(200) / 600, 5);
  assert.equal(dollarTicketCost(41.97), 630);
  assert.throws(() => dollarTicketCost(0), /positive/);
});
test("child prize records use product photos, exclude console games, and never substitute retailer screenshots", () => {
  const room = catalogToRoom([
    product,
    { ...product, id: "game", category: "Video games" },
  ]);
  assert.equal(room.length, 1);
  assert.equal(room[0].productImage, product.productImage);
  assert.ok(!("screenshot" in room[0]));
  assert.equal(
    catalogToRoom([{ ...product, productImage: undefined }])[0].productImage,
    undefined,
  );
  assert.equal(EXPERIENCE_PRIZES.length, 3);
});
test("real catalog prizes and golden tickets redeem against the same saved wallet without changing learning history", () => {
  const s = createStore(":memory:", () => [
    ...EXPERIENCE_PRIZES,
    ...catalogToRoom([product]),
  ]);
  try {
    assert.throws(
      () => s.checkout(product.id, 90, "prize-room-purchase-01"),
      /more tickets/,
    );
    assert.throws(
      () => s.checkout("art-kit", 100, "retired-sample-prize"),
      /price changed/,
    );
    const c = CHUNKS[0],
      id = s.start(c.id);
    s.taught(id);
    for (const q of c.forms[0])
      s.save(
        id,
        q.id,
        q.kind === "choice"
          ? q.correct!
          : q.kind === "match"
            ? Object.fromEntries(q.matches!.map((m) => [m.left, m.right]))
            : q.exemplar!,
        s.read().revision,
      );
    s.submit(id);
    for (const review of s.reviews().pending)
      s.grade(id, review.question.id, 4);
    const attempt = structuredClone(s.read().attempts[0]);
    const order = s.checkout(product.id, 90, "prize-room-purchase-01");
    assert.equal(s.read().balance, 10);
    assert.equal(s.read().lifetime, 100);
    assert.equal(order.productUrl, product.url);
    assert.equal(
      s.checkout(product.id, 90, "prize-room-purchase-01").id,
      order.id,
    );
    assert.equal(s.read().orders.length, 1);
    assert.equal(s.read().notifications.length, 1);
    assert.deepEqual(s.read().attempts[0], attempt);
    assert.throws(
      () =>
        s.checkout(
          EXPERIENCE_PRIZES[0].id,
          EXPERIENCE_PRIZES[0].cost,
          "prize-room-golden-01",
        ),
      /more tickets/,
    );
    assert.ok(
      s.view().prizes.every((p) => !("productUrl" in p) && !("retailer" in p)),
    );
  } finally {
    s.close();
  }
});
test("published room reads researched records and carries no retired sample shelf", () => {
  const prizes = getPrizeRoomPrizes();
  assert.ok(prizes.filter((p) => p.kind === "physical").length >= 100);
  assert.ok(
    prizes.every(
      (p) =>
        ![
          "shared-walmart-802115980",
          "shared-walmart-55432571",
          "shared-walmart-10510007121",
        ].includes(p.id),
    ),
  );
  assert.equal(prizes.filter((p) => p.kind === "experience").length, 3);
  assert.ok(prizes.every((p) => Number.isInteger(p.cost) && p.cost > 0));
  assert.ok(
    prizes.every((p) => !["art-kit", "lunch", "building"].includes(p.id)),
  );
});

test("retiring an old shelf item leaves its saved order, scores and spent tickets unchanged", () => {
  let active = [
    {
      ...catalogToRoom([product])[0],
      id: "art-kit",
      title: "Mini art kit",
      cost: 100,
    },
  ];
  const s = createStore(":memory:", () => active);
  try {
    const c = CHUNKS[0],
      id = s.start(c.id);
    s.taught(id);
    for (const q of c.forms[0])
      s.save(
        id,
        q.id,
        q.kind === "choice"
          ? q.correct!
          : q.kind === "match"
            ? Object.fromEntries(q.matches!.map((m) => [m.left, m.right]))
            : q.exemplar!,
        s.read().revision,
      );
    s.submit(id);
    for (const review of s.reviews().pending)
      s.grade(id, review.question.id, 4);
    const order = s.checkout("art-kit", 100, "legacy-order-before-room");
    const before = structuredClone(s.read());
    active = catalogToRoom([product]);
    const after = s.view();
    assert.deepEqual(after.orders[0], order);
    assert.deepEqual(after.attempts, before.attempts);
    assert.deepEqual(after.ledger, before.ledger);
    assert.equal(after.balance, 0);
    assert.equal(after.lifetime, 100);
    assert.equal(after.prizes[0].id, product.id);
    assert.equal(
      s.checkout("art-kit", 100, "legacy-order-before-room").id,
      order.id,
    );
    assert.equal(s.read().orders.length, 1);
  } finally {
    s.close();
  }
});
