import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const expected = "Find an assistant who fits your workday.";

test("homepage exposes one unfragmented h1", () => {
  const headings = [...source.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  assert.equal(headings.length, 1, "homepage must define exactly one h1");
  const body = headings[0][1].trim();
  assert.doesNotMatch(body, /[<{]/, "h1 text must not be split across JSX elements or expressions");
  assert.equal(body.replace(/\s+/g, " "), expected);
});
