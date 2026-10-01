import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(pathname, acceptLanguage = "en-US") {
  const response = await worker.fetch(
    new Request(new URL(pathname, "http://localhost"), {
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
  assert.match(response.headers.get("vary"), /Accept-Language/i);
  assert.match(response.headers.get("cache-control"), /no-store/);
});

test("consolidates the www host and HTTP URLs without losing the path or query", async () => {
  for (const origin of ["https://www.piclite.net", "http://piclite.net"]) {
    const { response } = await render(`${origin}/zh-cn/heic-to-jpg?ref=test`);
    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), "https://piclite.net/zh-cn/heic-to-jpg?ref=test");
  }
});

const localeTags = {
  en: "en", "zh-cn": "zh-CN", "zh-tw": "zh-TW", ja: "ja", ko: "ko",
  ru: "ru", es: "es", pt: "pt", fr: "fr", de: "de", ar: "ar", hi: "hi",
};
const toolSlugs = ["image-converter", "image-compressor", "compress-image-to-kb", "heic-to-jpg", "webp-to-jpg", "png-to-jpg", "jpg-to-png", "image-to-pdf", "pdf-to-jpg"];

function htmlContent(body) {
  return body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

function structuredNodes(body) {
  return [...body.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap((match) => JSON.parse(match[1])["@graph"] ?? []);
}

test("every sitemap URL serves indexable HTML with matching language, canonical and visible content", async () => {
  const { body: sitemap } = await render("/sitemap.xml");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.equal(urls.length, 120);
  assert.equal(new Set(urls).size, urls.length);
  const titles = new Set();
  for (const url of urls) {
    const path = new URL(url).pathname;
    const [, locale, tool] = path.split("/");
    const { response, body } = await render(path, "fr");
    const visible = htmlContent(body);
    assert.equal(response.status, 200, path);
    assert.match(body, new RegExp(`<html[^>]*lang="${localeTags[locale]}"`), path);
    assert.match(body, new RegExp(`<html[^>]*dir="${locale === "ar" ? "rtl" : "ltr"}"`), path);
    assert.ok(body.includes(`rel="canonical" href="${url}"`), path);
    assert.doesNotMatch(body, /content="[^"]*noindex/i, path);
    assert.equal((visible.match(/<h1\b/g) ?? []).length, 1, path);
    assert.equal((visible.match(/<main\b/g) ?? []).length, 1, path);
    assert.match(visible, /type="file"/, `${path} must offer a working converter`);
    const title = body.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title && !titles.has(title), `${path} must have a unique title`);
    titles.add(title);
    const nodes = structuredNodes(body);
    const page = nodes.find((node) => node["@type"] === "WebPage");
    assert.equal(page.url, url);
    assert.equal(page.inLanguage, localeTags[locale]);
    const faq = nodes.find((node) => node["@type"] === "FAQPage");
    if (faq) {
      assert.equal(faq.mainEntity.length, (visible.match(/<details\b/g) ?? []).length, path);
      for (const item of faq.mainEntity) {
        // React escapes punctuation; compare the parsed text rather than RSC script data.
        const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
        assert.ok(visible.includes(escape(item.name)), `${path}: visible FAQ question`);
        assert.ok(visible.includes(escape(item.acceptedAnswer.text)), `${path}: visible FAQ answer`);
      }
    }
    if (tool) {
      assert.ok(toolSlugs.includes(tool));
      assert.ok(visible.includes(`href="/${locale === "en" ? "zh-cn" : "en"}/${tool}"`), `${path}: language navigation`);
      assert.equal(nodes.find((node) => node["@type"] === "BreadcrumbList").itemListElement[0].item, `https://piclite.net/${locale}`);
    }
  }
});

test("unknown locales and tools return 404 instead of indexable duplicate pages", async () => {
  for (const path of ["/xx", "/en/not-a-tool", "/zz/heic-to-jpg"]) {
    const { response, body } = await render(path);
    assert.equal(response.status, 404, path);
    // A real 404 is excluded from indexing even when the framework sends plain text.
    if (response.headers.get("content-type")?.includes("text/html")) {
      assert.match(body, /noindex/, path);
    }
  }
});

test("tool guides explain the actual conversion limitations in server HTML", async () => {
  for (const [slug, expected] of [
    ["image-compressor", "does not guarantee a target file size"],
    ["jpg-to-png", "cannot restore missing detail"],
    ["png-to-jpg", "replaces them with white"],
    ["image-to-pdf", "without optical character recognition"],
    ["pdf-to-jpg", "4096 pixels"],
  ]) {
    const { body } = await render(`/en/${slug}`);
    assert.ok(htmlContent(body).includes(expected), slug);
  }
});

test("renders Korean use-case content on the compress page", async () => {
  const { response, body } = await render("/ko/compress-image-to-kb");
  assert.equal(response.status, 200);
  assert.match(body, /활용 사례/);
  assert.match(body, /관공서·시험 원서접수 사진/);
  assert.match(body, /카카오톡·이메일 첨부/);
  assert.match(body, /핸드폰 사진도 압축할 수 있나요/);
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
  assert.equal((body.match(/https:\/\/buy\.stripe\.com\//g) ?? []).length, 5);
  assert.match(body, /7sY4gB79d4xO1qee9u9AA00/);
  assert.match(body, /6oU9AVgJN9S80ma0iE9AA04/);
  assert.match(body, /https:\/\/github\.com\/jelly-ham\/piclite/);
  assert.match(body, /Open source and self-hostable/);
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

test("renders the image compressor target-size control", async () => {
  for (const path of ["/en/image-compressor", "/en/compress-image-to-kb", "/zh-cn/compress-image-to-kb"]) {
    const { response, body } = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(body, /Target file size|\u76ee\u6807\u6587\u4ef6\u5927\u5c0f/, path);
  }
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
