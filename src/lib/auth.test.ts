import test from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { sameOrigin, requireChild, AuthError } from "./auth";
import { fail } from "./http";

test("auth rejects cross-site and malformed origins before database access",()=>{
  for(const headers of ([{origin:"https://other.example"},{origin:"not a URL"},{"sec-fetch-site":"cross-site"}] as Record<string,string>[])) {
    assert.throws(()=>sameOrigin(new NextRequest("https://genius.example/api/action",{headers})), error=>error instanceof AuthError && error.status===403);
  }
  assert.doesNotThrow(()=>sameOrigin(new NextRequest("https://genius.example/api/action",{headers:{origin:"https://genius.example"}})));
});
test("cloud mode never falls through to shared local pilot without a child session",async()=>{
  const previous=process.env.DATABASE_URL;
  process.env.DATABASE_URL="postgresql://placeholder";
  try {
    await assert.rejects(requireChild(new NextRequest("https://genius.example/api/state")), error=>error instanceof AuthError && error.status===401);
    await assert.rejects(requireChild(new NextRequest("https://genius.example/api/state",{headers:{cookie:"genius-session=forged"}})), error=>error instanceof AuthError && error.status===401);
  } finally { if(previous===undefined) delete process.env.DATABASE_URL; else process.env.DATABASE_URL=previous; }
});
test("API errors preserve sign-in status and hide database driver details",async()=>{
  const denied=fail(new AuthError());
  assert.equal(denied.status,401);
  assert.equal((await denied.json()).code,"AUTH_REQUIRED");
  const error=Object.assign(new Error("sensitive database detail"),{code:"28P01"});
  const response=fail(error);
  assert.equal(response.status,503);
  assert.doesNotMatch(JSON.stringify(await response.json()),/sensitive/);
});
