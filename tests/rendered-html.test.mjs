import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(pathname, acceptLanguage = "en-US") {
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: {
        accept: "text/html",
        "accept-language": acceptLanguage,
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  return { response, body: await response.text() };
}

test("redirects the root to a server-selected locale", async () => {
  const { response } = await render("/", "zh-CN,zh;q=0.9");
  assert.equal(response.status, 307);
  assert.equal(new URL(response.headers.get("location")).pathname, "/zh-cn");
});

test("renders indexable SEO content on the English homepage", async () => {
  const { response, body } = await render("/en");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(body, /<title>PicLite — Free online image converter &amp; compressor<\/title>/i);
  assert.match(body, /name="description" content="Convert and compress HEIC, JPG, PNG, WebP and PDF/);
  assert.match(body, /rel="canonical" href="https:\/\/piclite\.net\/en"/);
  assert.match(body, /Free online image converter and compressor — no upload/);
  assert.match(body, /HEIC to JPG/);
  assert.match(body, /"@type":"WebApplication"/);
  assert.match(body, /"@type":"FAQPage"/);
});

test("renders a keyword landing page with metadata and structured data", async () => {
  const { response, body } = await render("/en/heic-to-jpg");
  assert.equal(response.status, 200);
  assert.match(body, /<title>HEIC to JPG converter — free, private and no upload<\/title>/i);
  assert.match(body, /rel="canonical" href="https:\/\/piclite\.net\/en\/heic-to-jpg"/);
  assert.match(body, /HEIC to JPG converter/);
  assert.match(body, /Files are processed in your browser/);
  assert.match(body, /"@type":"FAQPage"/);
  assert.match(body, /hrefLang="zh-CN"/);
});

test("publishes keyword pages in the sitemap", async () => {
  const { response, body } = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /xml/i);
  assert.match(body, /<loc>https:\/\/piclite\.net\/en<\/loc>/);
  assert.match(body, /<loc>https:\/\/piclite\.net\/en\/image-compressor<\/loc>/);
  assert.match(body, /<loc>https:\/\/piclite\.net\/zh-cn\/heic-to-jpg<\/loc>/);
  assert.match(body, /hreflang="en"/);
});

test("publishes a crawlable robots policy", async () => {
  const { response, body } = await render("/robots.txt");
  assert.equal(response.status, 200);
  assert.match(body, /User-Agent: \*/);
  assert.match(body, /Allow: \//);
  assert.match(body, /Sitemap: https:\/\/piclite\.net\/sitemap\.xml/);
});
