import Link from "next/link";
import { dictionaries, type Locale } from "./i18n";
import { getRootSeoCopy, isKeywordLocale, TOOL_SLUGS } from "./seo";
import { GITHUB_URL } from "./site";

const OPEN_SOURCE: Record<Locale, { kicker: string; title: string; body: string; cta: string }> = {
  en: {
    kicker: "Open source",
    title: "Open source and self-hostable",
    body: "PicLite is open source under the MIT license. You can read the code, run it locally, or host your own copy to verify that files are processed on your device. Issues and contributions are welcome.",
    cta: "View the source on GitHub",
  },
  "zh-cn": {
    kicker: "开源",
    title: "开源，可自行部署",
    body: "PicLite 以 MIT 许可证开源。你可以阅读代码、在本地运行或部署一份自己的副本，确认文件确实在设备本地处理。欢迎提交问题和改进。",
    cta: "在 GitHub 上查看源码",
  },
  "zh-tw": {
    kicker: "開源",
    title: "開源，可自行部署",
    body: "PicLite 以 MIT 授權條款開源。你可以閱讀程式碼、在本機執行或部署自己的副本，確認檔案確實在裝置本地處理。歡迎提交問題與改進。",
    cta: "在 GitHub 上查看原始碼",
  },
  ja: {
    kicker: "オープンソース",
    title: "オープンソース、セルフホスト可能",
    body: "PicLite は MIT ライセンスで公開されています。コードを確認し、自分で実行したり、自分のコピーをホストして、ファイルが端末内で処理されることを確かめられます。問題報告や改善の提案も歓迎します。",
    cta: "GitHub でソースを見る",
  },
  ko: {
    kicker: "오픈 소스",
    title: "오픈 소스, 직접 호스팅 가능",
    body: "PicLite는 MIT 라이선스로 공개되어 있습니다. 코드를 확인하고 직접 실행하거나 복사본을 직접 호스팅해 파일이 기기에서 처리되는지 확인할 수 있습니다. 문제 제기와 기여를 환영합니다.",
    cta: "GitHub에서 소스 보기",
  },
  ru: {
    kicker: "Открытый код",
    title: "Открытый исходный код и собственный хостинг",
    body: "PicLite распространяется по лицензии MIT. Вы можете изучить код, запустить его локально или развернуть свою копию и убедиться, что файлы обрабатываются на устройстве. Мы рады сообщениям о проблемах и улучшениям.",
    cta: "Открыть код на GitHub",
  },
  es: {
    kicker: "Código abierto",
    title: "Código abierto y autoalojable",
    body: "PicLite es de código abierto bajo la licencia MIT. Puedes leer el código, ejecutarlo localmente o alojar tu propia copia para comprobar que los archivos se procesan en tu dispositivo. Las incidencias y contribuciones son bienvenidas.",
    cta: "Ver el código en GitHub",
  },
  pt: {
    kicker: "Código aberto",
    title: "Código aberto e auto-hospedável",
    body: "O PicLite é de código aberto sob a licença MIT. Você pode ler o código, executá-lo localmente ou hospedar sua própria cópia para confirmar que os arquivos são processados no seu dispositivo. Problemas e contribuições são bem-vindos.",
    cta: "Ver o código no GitHub",
  },
  fr: {
    kicker: "Open source",
    title: "Open source et auto-hébergeable",
    body: "PicLite est open source sous licence MIT. Vous pouvez lire le code, l’exécuter localement ou héberger votre propre copie pour vérifier que les fichiers sont traités sur votre appareil. Les signalements et contributions sont bienvenus.",
    cta: "Voir le code sur GitHub",
  },
  de: {
    kicker: "Open Source",
    title: "Open Source und selbst hostbar",
    body: "PicLite ist unter der MIT-Lizenz quelloffen. Du kannst den Code lesen, lokal ausführen oder eine eigene Kopie hosten, um zu prüfen, dass Dateien auf deinem Gerät verarbeitet werden. Hinweise und Beiträge sind willkommen.",
    cta: "Quellcode auf GitHub ansehen",
  },
  ar: {
    kicker: "مفتوح المصدر",
    title: "مفتوح المصدر وقابل للاستضافة الذاتية",
    body: "PicLite مفتوح المصدر برخصة MIT. يمكنك قراءة الشيفرة أو تشغيله محليًا أو استضافة نسختك الخاصة للتأكد من معالجة الملفات على جهازك. نرحب بالملاحظات والمساهمات.",
    cta: "عرض الشيفرة على GitHub",
  },
  hi: {
    kicker: "ओपन सोर्स",
    title: "ओपन सोर्स और स्वयं होस्ट करने योग्य",
    body: "PicLite MIT लाइसेंस के तहत ओपन सोर्स है। आप कोड पढ़ सकते हैं, इसे लोकली चला सकते हैं, या अपनी कॉपी होस्ट करके जाँच सकते हैं कि फ़ाइलें आपके डिवाइस पर ही प्रोसेस होती हैं। सुझाव और योगदान का स्वागत है।",
    cta: "GitHub पर सोर्स देखें",
  },
};

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
  "compress-image-to-kb": {
    en: "Compress to a size",
    "zh-cn": "压缩到指定大小",
    "zh-tw": "壓縮到指定大小",
    ja: "指定サイズに圧縮",
    ko: "지정 크기로 압축",
    ru: "Сжать до размера",
    es: "Comprimir a un tamaño",
    pt: "Comprimir a um tamanho",
    fr: "Compresser à une taille",
    de: "Auf Größe komprimieren",
    ar: "ضغط إلى حجم محدد",
    hi: "आकार तक कंप्रेस करें",
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
  const openSource = OPEN_SOURCE[locale];

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

      <section className="seo-block" aria-labelledby="seo-open-source-title">
        <div className="seo-section-heading">
          <span className="section-kicker">{openSource.kicker}</span>
          <h2 id="seo-open-source-title">{openSource.title}</h2>
        </div>
        <p className="seo-proof">{openSource.body}</p>
        <p className="seo-proof">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">{openSource.cta}</a>
        </p>
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
            const supportedLocale = isKeywordLocale(locale);
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
