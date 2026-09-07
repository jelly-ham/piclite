import Link from "next/link";
import { dictionaries, type Locale } from "./i18n";
import { getRootSeoCopy, TOOL_SLUGS } from "./seo";

const TOOL_LABELS: Record<string, Record<Locale, string>> = {
  "image-converter": {
    en: "Image converter",
    "zh-cn": "图片格式转换",
    "zh-tw": "圖片格式轉換",
    ja: "画像変換",
    ko: "이미지 변환",
    ru: "Конвертер изображений",
    es: "Conversor de imágenes",
    pt: "Conversor de imagens",
    fr: "Convertisseur d’images",
    de: "Bildkonverter",
    ar: "محوّل الصور",
    hi: "इमेज कन्वर्टर",
  },
  "image-compressor": {
    en: "Image compressor",
    "zh-cn": "图片压缩",
    "zh-tw": "圖片壓縮",
    ja: "画像圧縮",
    ko: "이미지 압축",
    ru: "Сжатие изображений",
    es: "Compresor de imágenes",
    pt: "Compressor de imagens",
    fr: "Compresseur d’images",
    de: "Bildkompressor",
    ar: "ضغط الصور",
    hi: "इमेज कंप्रेसर",
  },
  "heic-to-jpg": {
    en: "HEIC to JPG",
    "zh-cn": "HEIC 转 JPG",
    "zh-tw": "HEIC 轉 JPG",
    ja: "HEICからJPG",
    ko: "HEIC에서 JPG",
    ru: "HEIC в JPG",
    es: "HEIC a JPG",
    pt: "HEIC para JPG",
    fr: "HEIC en JPG",
    de: "HEIC in JPG",
    ar: "HEIC إلى JPG",
    hi: "HEIC से JPG",
  },
  "webp-to-jpg": {
    en: "WebP to JPG",
    "zh-cn": "WebP 转 JPG",
    "zh-tw": "WebP 轉 JPG",
    ja: "WebPからJPG",
    ko: "WebP에서 JPG",
    ru: "WebP в JPG",
    es: "WebP a JPG",
    pt: "WebP para JPG",
    fr: "WebP en JPG",
    de: "WebP in JPG",
    ar: "WebP إلى JPG",
    hi: "WebP से JPG",
  },
  "png-to-jpg": {
    en: "PNG to JPG",
    "zh-cn": "PNG 转 JPG",
    "zh-tw": "PNG 轉 JPG",
    ja: "PNGからJPG",
    ko: "PNG에서 JPG",
    ru: "PNG в JPG",
    es: "PNG a JPG",
    pt: "PNG para JPG",
    fr: "PNG en JPG",
    de: "PNG in JPG",
    ar: "PNG إلى JPG",
    hi: "PNG से JPG",
  },
  "jpg-to-png": {
    en: "JPG to PNG",
    "zh-cn": "JPG 转 PNG",
    "zh-tw": "JPG 轉 PNG",
    ja: "JPGからPNG",
    ko: "JPG에서 PNG",
    ru: "JPG в PNG",
    es: "JPG a PNG",
    pt: "JPG para PNG",
    fr: "JPG en PNG",
    de: "JPG in PNG",
    ar: "JPG إلى PNG",
    hi: "JPG से PNG",
  },
  "image-to-pdf": {
    en: "Image to PDF",
    "zh-cn": "图片转 PDF",
    "zh-tw": "圖片轉 PDF",
    ja: "画像をPDFに",
    ko: "이미지를 PDF로",
    ru: "Изображения в PDF",
    es: "Imágenes a PDF",
    pt: "Imagens para PDF",
    fr: "Images en PDF",
    de: "Bilder in PDF",
    ar: "الصور إلى PDF",
    hi: "इमेज से PDF",
  },
  "pdf-to-jpg": {
    en: "PDF to JPG",
    "zh-cn": "PDF 转 JPG",
    "zh-tw": "PDF 轉 JPG",
    ja: "PDFからJPG",
    ko: "PDF에서 JPG",
    ru: "PDF в JPG",
    es: "PDF a JPG",
    pt: "PDF para JPG",
    fr: "PDF en JPG",
    de: "PDF in JPG",
    ar: "PDF إلى JPG",
    hi: "PDF से JPG",
  },
};

export default function SeoContent({ locale }: { locale: Locale }) {
  const copy = getRootSeoCopy(locale);
  const messages = dictionaries[locale];

  return (
    <section className="seo-content" aria-labelledby="seo-content-title">
      <div className="seo-intro">
        <span className="section-kicker">{copy.kicker}</span>
        <h2 id="seo-content-title">{copy.title}</h2>
        <p>{copy.intro}</p>
      </div>

      <section className="seo-block" aria-labelledby="seo-features-title">
        <div className="seo-section-heading">
          <span className="section-kicker">{messages.supportedFormats}</span>
          <h2 id="seo-features-title">{copy.featuresTitle}</h2>
        </div>
        <div className="seo-card-grid">
          {copy.features.map((feature) => (
            <article className="seo-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="seo-block" aria-labelledby="seo-how-title">
        <div className="seo-section-heading">
          <span className="section-kicker">{messages.localProcessing}</span>
          <h2 id="seo-how-title">{copy.howTitle}</h2>
        </div>
        <ol className="seo-steps">
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

      <section className="seo-privacy" aria-labelledby="seo-privacy-title">
        <div>
          <span className="section-kicker">{messages.privacyStrong}</span>
          <h2 id="seo-privacy-title">{copy.privacyTitle}</h2>
        </div>
        <p>{copy.privacy}</p>
      </section>

      {copy.faq.length > 0 && (
        <section className="seo-block seo-faq" aria-labelledby="seo-faq-title">
          <div className="seo-section-heading">
            <span className="section-kicker">FAQ</span>
            <h2 id="seo-faq-title">{copy.faqTitle}</h2>
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
      )}

      <nav className="seo-tools" aria-labelledby="seo-tools-title">
        <div className="seo-section-heading">
          <span className="section-kicker">{messages.outputFormat}</span>
          <h2 id="seo-tools-title">{copy.toolsTitle}</h2>
        </div>
        <div className="seo-tool-links">
          {TOOL_SLUGS.map((slug) => {
            const supportedLocale = locale === "en" || locale === "zh-cn";
            const href = `/${supportedLocale ? locale : "en"}/${slug}`;
            return (
              <Link href={href} key={slug}>
                <span>{TOOL_LABELS[slug][locale]}</span>
                <small>{supportedLocale ? copy.openTool : "English →"}</small>
              </Link>
            );
          })}
        </div>
      </nav>
    </section>
  );
}
