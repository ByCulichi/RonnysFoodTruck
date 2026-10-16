const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");
const projectRequire = createRequire(path.join(__dirname, "../package.json"));
const ts = projectRequire("typescript");
const source = fs.readFileSync(path.join(__dirname, "../app/api/google-reviews/route.ts"), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function handler(env, fetch) {
  const sandbox = {
    exports: {}, require: projectRequire, process: { env }, fetch,
    console: { error() {} }, AbortSignal,
  };
  vm.runInNewContext(compiled, sandbox);
  return sandbox.exports.GET;
}
const configured = { GOOGLE_PLACES_API_KEY: "isolated-test-key", GOOGLE_PLACE_ID: "test-place" };

test("missing configuration never calls Google or returns invented ratings", async () => {
  let calls = 0;
  const response = await handler({}, async () => { calls++; })();
  assert.equal(response.status, 503);
  assert.equal(calls, 0);
  assert.deepEqual(await response.json(), { available: false });
});

test("returns attributed provider reviews, limits to five and keeps the key server-side", async () => {
  const response = await handler(configured, async (url, options) => {
    assert.equal(url, "https://places.googleapis.com/v1/places/test-place?languageCode=es");
    assert.equal(options.headers["X-Goog-Api-Key"], configured.GOOGLE_PLACES_API_KEY);
    assert.ok(options.headers["X-Goog-FieldMask"].includes("reviews"));
    assert.equal(options.cache, "no-store");
    return { ok: true, json: async () => ({
      rating: 4.5, userRatingCount: 12,
      googleMapsUri: "https://maps.google.com/test",
      reviews: Array.from({ length: 6 }, (_, i) => ({
        rating: 5, text: { text: `Isolated test review ${i}` },
        authorAttribution: { displayName: `Test author ${i}`, uri: "https://maps.google.com/author" },
      })),
    }) };
  })();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  const body = await response.json();
  assert.equal(body.available, true);
  assert.equal(body.rating, 4.5);
  assert.equal(body.reviews.length, 5);
  assert.equal(body.reviews[0].author, "Test author 0");
  assert.equal(body.reviews[0].authorUrl, "https://maps.google.com/author");
  assert.ok(!JSON.stringify(body).includes(configured.GOOGLE_PLACES_API_KEY));
});

test("provider denial returns unavailable without exposing its payload", async () => {
  const response = await handler(configured, async () => ({ ok: false, status: 403 }))();
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { available: false });
});

test("network failures return unavailable rather than fabricated reviews", async () => {
  const response = await handler(configured, async () => { throw new Error("test network failure"); })();
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { available: false });
});
