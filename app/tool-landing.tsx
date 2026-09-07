import Link from "next/link";
import type { KeywordLocale, ToolPageCopy, ToolSlug } from "./seo";
import { TOOL_SLUGS } from "./seo";
import { TOOL_GUIDES } from "./tool-guides";

export default function ToolLanding({
  locale,
  copy,
}: {
  locale: KeywordLocale;
  copy: ToolPageCopy;
}) {
  const guide = TOOL_GUIDES[copy.slug][locale];
  return (
    <div className="seo-landing">
      <article>
        <section className="seo-landing-section" aria-labelledby="landing-guide-title">
          <div className="seo-section-heading">
            <h2 id="landing-guide-title">{locale === "en" ? `What to know about ${copy.name.toLowerCase()}` : `${copy.name}使用说明`}</h2>
          </div>
          <p className="seo-proof">{guide.summary}</p>
          <dl className="tool-facts">
            <div><dt>{locale === "en" ? "Input" : "输入"}</dt><dd>{copy.input}</dd></div>
            <div><dt>{locale === "en" ? "Output" : "输出"}</dt><dd>{copy.output}</dd></div>
            <div><dt>{locale === "en" ? "Processing" : "处理方式"}</dt><dd>{locale === "en" ? "On your device; no file upload or account required" : "设备本地处理，无需上传文件或注册账号"}</dd></div>
          </dl>
          {guide.notes.map((note) => <p className="seo-proof" key={note}>{note}</p>)}
        </section>
        <section className="seo-landing-section" aria-labelledby="landing-steps-title">
          <div className="seo-section-heading">
            <span className="section-kicker">{copy.input}</span>
            <h2 id="landing-steps-title">{copy.stepsTitle}</h2>
          </div>
          <ol className="seo-steps seo-landing-steps">
            {copy.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="seo-landing-section" aria-labelledby="landing-benefits-title">
          <div className="seo-section-heading">
            <span className="section-kicker">{copy.output}</span>
            <h2 id="landing-benefits-title">{copy.benefitsTitle}</h2>
          </div>
          <div className="seo-card-grid">
            {copy.benefits.map((benefit) => (
              <article className="seo-card" key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </article>
            ))}
          </div>
          <p className="seo-proof">{copy.why}</p>
        </section>

        <section className="seo-landing-section seo-faq" aria-labelledby="landing-faq-title">
          <div className="seo-section-heading">
            <span className="section-kicker">FAQ</span>
            <h2 id="landing-faq-title">{copy.faqTitle}</h2>
          </div>
          <div className="faq-list">
            {copy.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </article>

      <nav className="seo-related" aria-label={copy.relatedTitle}>
        <div>
          <span className="section-kicker">PicLite</span>
          <h2>{copy.relatedTitle}</h2>
        </div>
        <div className="seo-tool-links">
          {TOOL_SLUGS.filter((slug: ToolSlug) => slug !== copy.slug).map((slug) => (
            <Link href={`/${locale}/${slug}`} key={slug}>
              <span>{getRelatedLabel(locale, slug)}</span>
              <small>→</small>
            </Link>
          ))}
        </div>
      </nav>

      <Link className="seo-back-link" href={`/${locale}`}>
        ← {copy.backLabel}
      </Link>
    </div>
  );
}

const RELATED_LABELS: Record<KeywordLocale, Record<ToolSlug, string>> = {
  en: {
    "image-converter": "Image converter",
    "image-compressor": "Image compressor",
    "heic-to-jpg": "HEIC to JPG",
    "webp-to-jpg": "WebP to JPG",
    "png-to-jpg": "PNG to JPG",
    "jpg-to-png": "JPG to PNG",
    "image-to-pdf": "Image to PDF",
    "pdf-to-jpg": "PDF to JPG",
  },
  "zh-cn": {
    "image-converter": "图片格式转换",
    "image-compressor": "图片压缩",
    "heic-to-jpg": "HEIC 转 JPG",
    "webp-to-jpg": "WebP 转 JPG",
    "png-to-jpg": "PNG 转 JPG",
    "jpg-to-png": "JPG 转 PNG",
    "image-to-pdf": "图片转 PDF",
    "pdf-to-jpg": "PDF 转 JPG",
  },
};

function getRelatedLabel(locale: KeywordLocale, slug: ToolSlug) {
  return RELATED_LABELS[locale][slug];
}
