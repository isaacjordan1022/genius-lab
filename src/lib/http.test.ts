import { test } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { localOnly, isParent, parentLogin } from "./http";
test("local origin follows the validated Host header when Next normalizes its URL", () => {
  const request = new NextRequest("http://localhost:3100/api/action", {
    headers: { host: "127.0.0.1:3100", origin: "http://127.0.0.1:3100" },
  });
  assert.doesNotThrow(() => localOnly(request));
  assert.throws(
    () =>
      localOnly(
        new NextRequest("http://localhost:3100/api/action", {
          headers: {
            host: "127.0.0.1:3100",
            origin: "https://elsewhere.example",
          },
        }),
      ),
    /must come/,
  );
  assert.throws(
    () =>
      localOnly(
        new NextRequest("http://localhost:3100/api/action", {
          headers: { host: "elsewhere.example" },
        }),
      ),
    /local pilot/,
  );
});
test("parent access needs a valid session and rejects an incorrect PIN", () => {
  assert.equal(
    isParent(new NextRequest("http://localhost:3100/api/parent")),
    false,
  );
  assert.throws(() => parentLogin("incorrect-pin"), /did not match/);
  const token = parentLogin(process.env.DEMO_PARENT_PIN ?? "2468");
  assert.equal(
    isParent(
      new NextRequest("http://localhost:3100/api/parent", {
        headers: { cookie: `arcade-parent=${token}` },
      }),
    ),
    true,
  );
});
