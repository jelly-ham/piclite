import { dictionaries, type Locale } from "./i18n";
import { SITE_NAME, SITE_URL } from "./site";
import { TOOL_GUIDES } from "./tool-guides";

export type SeoFaq = {
  question: string;
  answer: string;
};

export type RootSeoCopy = {
  kicker: string;
  title: string;
  intro: string;
  featuresTitle: string;
  features: Array<{ title: string; body: string }>;
  howTitle: string;
  steps: Array<{ title: string; body: string }>;
  privacyTitle: string;
  privacy: string;
  faqTitle: string;
  faq: SeoFaq[];
  toolsTitle: string;
  openTool: string;
  keywords: string[];
};

export const KEYWORD_LOCALES = ["en", "zh-cn"] as const;
export type KeywordLocale = (typeof KEYWORD_LOCALES)[number];

export const TOOL_SLUGS = [
  "image-converter",
  "image-compressor",
  "heic-to-jpg",
  "webp-to-jpg",
  "png-to-jpg",
  "jpg-to-png",
  "image-to-pdf",
  "pdf-to-jpg",
] as const;

export type ToolSlug = (typeof TOOL_SLUGS)[number];

type ToolIntent = {
  name: string;
  title: string;
  description: string;
  intro: string;
  input: string;
  output: string;
  why: string;
  quality: string;
  keywords: string[];
};

export type ToolPageCopy = ToolIntent & {
  slug: ToolSlug;
  eyebrow: string;
  cta: string;
  backLabel: string;
  stepsTitle: string;
  steps: Array<{ title: string; body: string }>;
  benefitsTitle: string;
  benefits: Array<{ title: string; body: string }>;
  faqTitle: string;
  faq: SeoFaq[];
  relatedTitle: string;
};

const ROOT_SEO_COPY: Partial<Record<Locale, RootSeoCopy>> = {
  en: {
    kicker: "Private browser tools",
    title: "Free online image converter and compressor — no upload",
    intro:
      "PicLite is a private image converter and compressor that runs in your browser. Convert HEIC to JPG, PNG to JPG, WebP to JPG, JPG to PNG, images to PDF, and PDF pages to JPG without uploading your files.",
    featuresTitle: "Convert and compress common image formats",
    features: [
      {
        title: "HEIC to JPG",
        body: "Turn iPhone HEIC and HEIF photos into JPG files that work across Windows, Android, email and web forms.",
      },
      {
        title: "JPG, PNG and WebP",
        body: "Change between everyday image formats and adjust quality before downloading a smaller copy.",
      },
      {
        title: "Images and PDF",
        body: "Convert images to a combined PDF or render PDF pages to images in the same local workflow.",
      },
    ],
    howTitle: "How to convert an image without uploading",
    steps: [
      {
        title: "Choose a file",
        body: "Drop an image or PDF, browse your device, or paste an image from the clipboard.",
      },
      {
        title: "Choose the output",
        body: "Select JPG, PNG, WebP or PDF, then set the output quality when the format supports it.",
      },
      {
        title: "Download the result",
        body: "Convert one file or process a batch, then download the result or a ZIP of the results.",
      },
    ],
    privacyTitle: "Private by design",
    privacy:
      "Files are decoded and converted in this browser. PicLite does not need an account, upload queue or server-side copy of your images. Close the tab and your working files are gone from the page.",
    faqTitle: "Image conversion questions",
    faq: [
      {
        question: "Is PicLite an online image converter?",
        answer:
          "Yes. PicLite is an online image converter that runs in your browser, so you can convert JPG, PNG, WebP and HEIC files without sending the file to a server.",
      },
      {
        question: "Can I convert HEIC to JPG without uploading?",
        answer:
          "Yes. Select a HEIC or HEIF photo, keep JPG as the output format, and convert it locally in the browser. The original photo is not uploaded by PicLite.",
      },
      {
        question: "Can PicLite convert PDF to JPG and images to PDF?",
        answer:
          "Yes. PicLite can render PDF pages as images and combine image files into a multi-page PDF. The conversion happens on your device.",
      },
    ],
    toolsTitle: "Popular image conversion tools",
    openTool: "Open tool",
    keywords: [
      "online image converter",
      "image compressor",
      "HEIC to JPG converter",
      "WebP to JPG converter",
      "PNG to JPG converter",
      "image to PDF converter",
      "PDF to JPG converter",
      "private image converter",
      "image converter no upload",
    ],
  },
  "zh-cn": {
    kicker: "私密的浏览器图片工具",
    title: "免费在线图片转换器与压缩工具｜不上传文件",
    intro:
      "PicLite 是一款在浏览器本地运行的图片转换与压缩工具。支持 HEIC 转 JPG、PNG 转 JPG、WebP 转 JPG、JPG 转 PNG、图片转 PDF 和 PDF 转 JPG，文件不会上传到服务器。",
    featuresTitle: "转换和压缩常用图片格式",
    features: [
      {
        title: "HEIC 转 JPG",
        body: "把 iPhone 的 HEIC、HEIF 照片转换成 JPG，方便在 Windows、Android、邮件和网页表单中使用。",
      },
      {
        title: "JPG、PNG 与 WebP",
        body: "在常用图片格式之间转换，并在下载前调整质量，得到更小的文件。",
      },
      {
        title: "图片与 PDF 互转",
        body: "把多张图片合并为 PDF，也可以把 PDF 页面转成图片，整个流程在设备本地完成。",
      },
    ],
    howTitle: "如何在不上传文件的情况下转换图片",
    steps: [
      {
        title: "选择文件",
        body: "拖入图片或 PDF，浏览设备中的文件，也可以直接粘贴剪贴板图片。",
      },
      {
        title: "选择输出格式",
        body: "选择 JPG、PNG、WebP 或 PDF，并在支持的格式下调整输出质量。",
      },
      {
        title: "下载结果",
        body: "可以转换单个文件或批量处理，然后下载结果，或将结果打包为 ZIP。",
      },
    ],
    privacyTitle: "以隐私为默认设计",
    privacy:
      "文件在当前浏览器中读取和转换。PicLite 不需要账号、上传队列，也不会在服务器保存图片副本。关闭页面后，工作文件就会从页面中清除。",
    faqTitle: "图片格式转换常见问题",
    faq: [
      {
        question: "PicLite 是在线图片转换器吗？",
        answer:
          "是的。PicLite 是一款浏览器在线图片转换器，可以在不把文件发送到服务器的情况下转换 JPG、PNG、WebP 和 HEIC。",
      },
      {
        question: "可以不上传文件把 HEIC 转成 JPG 吗？",
        answer:
          "可以。选择 HEIC 或 HEIF 照片，将输出格式设为 JPG，即可在浏览器本地完成转换；原始照片不会上传到 PicLite。",
      },
      {
        question: "PicLite 支持 PDF 转 JPG 和图片转 PDF 吗？",
        answer:
          "支持。PicLite 可以把 PDF 页面渲染为图片，也可以把多张图片合并为多页 PDF，转换过程在你的设备上完成。",
      },
    ],
    toolsTitle: "常用图片转换工具",
    openTool: "打开工具",
    keywords: [
      "在线图片转换器",
      "图片压缩",
      "HEIC 转 JPG",
      "WebP 转 JPG",
      "PNG 转 JPG",
      "图片转 PDF",
      "PDF 转 JPG",
      "私密图片转换",
      "不上传图片转换",
    ],
  },
  "zh-tw": {
    kicker: "私密的瀏覽器圖片工具",
    title: "免費線上圖片轉換器與壓縮工具｜不上傳檔案",
    intro:
      "PicLite 是一款在瀏覽器本機執行的圖片轉換與壓縮工具。支援 HEIC 轉 JPG、PNG 轉 JPG、WebP 轉 JPG、JPG 轉 PNG、圖片轉 PDF 與 PDF 轉 JPG，檔案不會上傳到伺服器。",
    featuresTitle: "轉換與壓縮常用圖片格式",
    features: [
      {
        title: "HEIC 轉 JPG",
        body: "將 iPhone 的 HEIC、HEIF 相片轉成 JPG，方便在 Windows、Android、電子郵件與網頁表單使用。",
      },
      {
        title: "JPG、PNG 與 WebP",
        body: "在常見圖片格式之間轉換，並在下載前調整品質，取得更小的檔案。",
      },
      {
        title: "圖片與 PDF 互轉",
        body: "將多張圖片合併成 PDF，也可以把 PDF 頁面轉成圖片，整個流程在裝置本機完成。",
      },
    ],
    howTitle: "如何在不上傳檔案的情況下轉換圖片",
    steps: [
      { title: "選擇檔案", body: "拖入圖片或 PDF，瀏覽裝置中的檔案，也可以直接貼上剪貼簿圖片。" },
      { title: "選擇輸出格式", body: "選擇 JPG、PNG、WebP 或 PDF，並在支援的格式下調整輸出品質。" },
      { title: "下載結果", body: "可以轉換單一檔案或批次處理，然後下載結果，或將結果打包成 ZIP。" },
    ],
    privacyTitle: "以隱私為預設設計",
    privacy:
      "檔案在目前瀏覽器中讀取與轉換。PicLite 不需要帳號、上傳佇列，也不會在伺服器保存圖片副本。關閉頁面後，工作檔案就會從頁面清除。",
    faqTitle: "圖片格式轉換常見問題",
    faq: [
      {
        question: "PicLite 是線上圖片轉換器嗎？",
        answer: "是的。PicLite 是一款瀏覽器線上圖片轉換器，可以不上傳檔案到伺服器，轉換 JPG、PNG、WebP 與 HEIC。",
      },
      {
        question: "可以不上傳檔案把 HEIC 轉成 JPG 嗎？",
        answer: "可以。選擇 HEIC 或 HEIF 相片，將輸出格式設為 JPG，即可在瀏覽器本機完成轉換。",
      },
      {
        question: "PicLite 支援 PDF 轉 JPG 和圖片轉 PDF 嗎？",
        answer: "支援。PicLite 可以把 PDF 頁面轉成圖片，也可以把多張圖片合併成多頁 PDF，轉換過程在你的裝置上完成。",
      },
    ],
    toolsTitle: "常用圖片轉換工具",
    openTool: "開啟工具",
    keywords: ["線上圖片轉換器", "圖片壓縮", "HEIC 轉 JPG", "WebP 轉 JPG", "圖片轉 PDF", "PDF 轉 JPG"],
  },
};

export function getRootSeoCopy(locale: Locale): RootSeoCopy {
  const localized = ROOT_SEO_COPY[locale];
  if (localized) return localized;

  const messages = dictionaries[locale];
  return {
    kicker: messages.localProcessing,
    title: messages.metaTitle,
    intro: messages.metaDescription,
    featuresTitle: messages.supportedFormats,
    features: [
      { title: messages.trustLocal, body: messages.trustLocalDesc },
      { title: messages.trustSize, body: messages.trustSizeDesc },
      { title: messages.trustOffline, body: messages.trustOfflineDesc },
    ],
    howTitle: messages.settingsTitle,
    steps: [
      { title: messages.chooseFiles, body: messages.pasteHint },
      { title: messages.outputFormat, body: messages.outputQuality },
      { title: messages.download, body: messages.privacyStrong },
    ],
    privacyTitle: messages.trustLocal,
    privacy: `${messages.privacy}${messages.privacyStrong}`,
    faqTitle: messages.privacy,
    faq: [],
    toolsTitle: messages.supportedFormats,
    openTool: messages.chooseFiles,
    keywords: [],
  };
}

const TOOL_INTENTS: Record<ToolSlug, Record<KeywordLocale, ToolIntent>> = {
  "image-converter": {
    en: {
      name: "Image converter",
      title: "Free online image converter — JPG, PNG, WebP and HEIC",
      description: "Convert JPG, PNG, WebP, AVIF, BMP and HEIC images online in your browser. Batch conversion with no upload, no account and no server copy.",
      intro: "Convert common image formats in your browser with PicLite. Change HEIC, JPG, PNG, WebP, AVIF or BMP files to JPG, PNG, WebP or PDF without uploading them.",
      input: "JPG, PNG, WebP, AVIF, BMP or HEIC",
      output: "JPG, PNG, WebP or PDF",
      why: "Useful when a website, app, email or device accepts a different image format from the one you have.",
      quality: "Choose a quality level for JPG and WebP, or use lossless PNG output.",
      keywords: ["online image converter", "free image converter", "convert image format", "image converter no upload"],
    },
    "zh-cn": {
      name: "在线图片格式转换器",
      title: "免费在线图片格式转换器｜JPG、PNG、WebP、HEIC",
      description: "在浏览器中转换 JPG、PNG、WebP、AVIF、BMP 和 HEIC 图片。支持批量处理，不上传文件、不需要账号。",
      intro: "使用 PicLite 在浏览器中转换常用图片格式。可以把 HEIC、JPG、PNG、WebP、AVIF 或 BMP 转为 JPG、PNG、WebP 或 PDF，文件无需上传。",
      input: "JPG、PNG、WebP、AVIF、BMP 或 HEIC",
      output: "JPG、PNG、WebP 或 PDF",
      why: "适合网页、应用、邮件或设备要求特定图片格式的场景。",
      quality: "JPG 和 WebP 可以调整质量，也可以选择无损 PNG 输出。",
      keywords: ["在线图片格式转换器", "免费图片转换", "图片格式转换", "不上传图片转换"],
    },
  },
  "image-compressor": {
    en: {
      name: "Image compressor",
      title: "Free image compressor — compress JPG & WebP, no upload",
      description: "Reduce image file size with JPG or WebP quality controls. Convert PNG photos to smaller formats, compare output sizes and process batches without uploading.",
      intro: "Make image files smaller before sending, publishing or storing them. PicLite compresses images locally, so your photos do not need to be uploaded to a cloud service.",
      input: "JPG, PNG, WebP, AVIF, BMP or HEIC",
      output: "JPG, PNG or WebP",
      why: "Useful for email attachments, web uploads, messaging apps and storage limits.",
      quality: "Lower JPG or WebP quality to reduce file size; PNG remains lossless.",
      keywords: ["image compressor", "compress image online", "reduce image file size", "image compressor no upload"],
    },
    "zh-cn": {
      name: "在线图片压缩工具",
      title: "免费在线图片压缩｜JPG、WebP 压缩与 PNG 格式转换",
      description: "通过调整 JPG 或 WebP 质量减小图片文件，把 PNG 照片转换为更小的格式。支持比较输出大小和批量处理，无需上传图片。",
      intro: "在发送、发布或保存之前减小图片文件大小。PicLite 在本地浏览器中压缩图片，无需把照片上传到云端服务。",
      input: "JPG、PNG、WebP、AVIF、BMP 或 HEIC",
      output: "JPG、PNG 或 WebP",
      why: "适合邮件附件、网页上传、聊天应用和存储空间有限的场景。",
      quality: "降低 JPG 或 WebP 质量可以减小文件；PNG 保持无损。",
      keywords: ["在线图片压缩", "图片压缩", "压缩图片大小", "不上传图片压缩"],
    },
  },
  "heic-to-jpg": {
    en: {
      name: "HEIC to JPG converter",
      title: "HEIC to JPG converter — free, private and no upload",
      description: "Convert HEIC and HEIF photos to JPG online in your browser. A private iPhone photo converter with batch processing and no upload.",
      intro: "Turn iPhone HEIC or HEIF photos into widely supported JPG files. PicLite converts them on your device, so the original photos never need to leave your browser.",
      input: "HEIC or HEIF photos",
      output: "JPG images",
      why: "JPG is easier to open on Windows, Android, email services, web forms and older photo apps.",
      quality: "Choose the JPG quality before downloading, and convert multiple iPhone photos in one batch.",
      keywords: ["HEIC to JPG converter", "convert HEIC to JPG", "iPhone photo converter", "HEIC converter no upload"],
    },
    "zh-cn": {
      name: "HEIC 转 JPG",
      title: "HEIC 转 JPG 在线工具｜免费、私密、不上传",
      description: "在浏览器中把 HEIC 和 HEIF 照片转换为 JPG。适用于 iPhone 照片，支持批量处理且不会上传文件。",
      intro: "把 iPhone 的 HEIC 或 HEIF 照片转换成兼容性更好的 JPG。PicLite 在你的设备上完成转换，原始照片无需离开浏览器。",
      input: "HEIC 或 HEIF 照片",
      output: "JPG 图片",
      why: "JPG 更容易在 Windows、Android、邮件服务、网页表单和旧版图片应用中打开。",
      quality: "下载前可以选择 JPG 质量，也可以一次转换多张 iPhone 照片。",
      keywords: ["HEIC 转 JPG", "HEIC 转换器", "iPhone 照片转 JPG", "不上传 HEIC 转 JPG"],
    },
  },
  "webp-to-jpg": {
    en: {
      name: "WebP to JPG converter",
      title: "WebP to JPG converter — free online and no upload",
      description: "Convert WebP images to JPG in your browser. Keep files private, choose output quality and download single or batch results without an upload.",
      intro: "Convert WebP graphics and downloads to JPG for apps, forms, email and editors that do not accept WebP. The conversion runs locally in your browser.",
      input: "WebP images",
      output: "JPG images",
      why: "JPG is supported by more legacy apps, upload forms, printers and document workflows.",
      quality: "Set JPG quality to balance a smaller file with visual detail.",
      keywords: ["WebP to JPG converter", "convert WebP to JPG", "WebP converter online", "WebP to JPG no upload"],
    },
    "zh-cn": {
      name: "WebP 转 JPG",
      title: "WebP 转 JPG 在线工具｜免费、不上传文件",
      description: "在浏览器中将 WebP 图片转换为 JPG，支持选择输出质量和批量下载，文件不会上传。",
      intro: "把 WebP 图片或下载的 WebP 文件转换成 JPG，方便在不支持 WebP 的应用、表单、邮件和编辑器中使用。转换在浏览器本地进行。",
      input: "WebP 图片",
      output: "JPG 图片",
      why: "JPG 在旧版应用、上传表单、打印机和文档流程中的兼容性更好。",
      quality: "调整 JPG 质量，在更小的文件和画面细节之间取得平衡。",
      keywords: ["WebP 转 JPG", "WebP 转换器", "在线 WebP 转 JPG", "不上传 WebP 转 JPG"],
    },
  },
  "png-to-jpg": {
    en: {
      name: "PNG to JPG converter",
      title: "PNG to JPG converter — free online, private and simple",
      description: "Convert PNG images to JPG online in your browser. Reduce file size and download private results without uploading your images.",
      intro: "Convert PNG screenshots, photos and graphics to JPG when you need smaller files or broader compatibility. PicLite processes the image on your device.",
      input: "PNG images",
      output: "JPG images",
      why: "JPG is often smaller for photos and is accepted by more upload forms and messaging tools.",
      quality: "Transparent PNG areas are rendered against a white JPG background; choose the output quality you need.",
      keywords: ["PNG to JPG converter", "convert PNG to JPG", "PNG to JPG online", "PNG to JPG no upload"],
    },
    "zh-cn": {
      name: "PNG 转 JPG",
      title: "PNG 转 JPG 在线工具｜免费、私密、简单",
      description: "在浏览器中把 PNG 图片转换为 JPG，减小文件大小并下载结果，无需上传图片。",
      intro: "当你需要更小的文件或更广泛的兼容性时，可以把 PNG 截图、照片和图形转成 JPG。PicLite 在设备本地处理图片。",
      input: "PNG 图片",
      output: "JPG 图片",
      why: "对于照片，JPG 通常更小，并且被更多上传表单和聊天工具接受。",
      quality: "透明 PNG 区域会以白色 JPG 背景输出，可以选择需要的图片质量。",
      keywords: ["PNG 转 JPG", "PNG 转换器", "在线 PNG 转 JPG", "不上传 PNG 转 JPG"],
    },
  },
  "jpg-to-png": {
    en: {
      name: "JPG to PNG converter",
      title: "JPG to PNG converter — free online and no upload",
      description: "Convert JPG photos to PNG in your browser. Create a lossless PNG copy locally without uploading your image or creating an account.",
      intro: "Convert JPG images to PNG when you need a lossless output format for editing, design work or a compatible workflow. The original stays on your device.",
      input: "JPG or JPEG images",
      output: "PNG images",
      why: "PNG is useful for lossless exports and workflows that expect a PNG file.",
      quality: "PNG output is lossless, so the new file may be larger than the JPG source.",
      keywords: ["JPG to PNG converter", "convert JPG to PNG", "JPEG to PNG online", "JPG to PNG no upload"],
    },
    "zh-cn": {
      name: "JPG 转 PNG",
      title: "JPG 转 PNG 在线工具｜免费、不上传",
      description: "在浏览器中将 JPG 照片转换为 PNG。本地生成无损 PNG 副本，不上传图片，也不需要账号。",
      intro: "当编辑、设计或工作流程需要 PNG 时，可以把 JPG 图片转换为 PNG。原始图片始终保留在你的设备上。",
      input: "JPG 或 JPEG 图片",
      output: "PNG 图片",
      why: "PNG 适合无损导出，以及要求使用 PNG 文件的工作流程。",
      quality: "PNG 输出是无损的，因此新文件可能比 JPG 原图更大。",
      keywords: ["JPG 转 PNG", "JPEG 转 PNG", "在线 JPG 转 PNG", "不上传 JPG 转 PNG"],
    },
  },
  "image-to-pdf": {
    en: {
      name: "Image to PDF converter",
      title: "Image to PDF converter — combine JPG and PNG files privately",
      description: "Convert JPG, PNG, WebP and HEIC images to a multi-page PDF in your browser. Reorder files and create a PDF without uploading your photos.",
      intro: "Combine image files into one PDF for sharing, printing, applications or archiving. PicLite creates the PDF locally and keeps the source images on your device.",
      input: "JPG, PNG, WebP, AVIF, BMP or HEIC images",
      output: "A combined multi-page PDF",
      why: "A single PDF is easier to send, print or attach when you have several photos or scanned pages.",
      quality: "Add multiple images and download one combined PDF directly from the browser.",
      keywords: ["image to PDF converter", "JPG to PDF", "PNG to PDF", "images to PDF no upload"],
    },
    "zh-cn": {
      name: "图片转 PDF",
      title: "图片转 PDF 在线工具｜JPG、PNG 合并为 PDF 且不上传",
      description: "在浏览器中把 JPG、PNG、WebP 和 HEIC 图片合并为多页 PDF。支持批量添加，不上传照片。",
      intro: "把多张图片合并成一个 PDF，方便分享、打印、提交材料或归档。PicLite 在本地生成 PDF，源图片留在你的设备上。",
      input: "JPG、PNG、WebP、AVIF、BMP 或 HEIC 图片",
      output: "合并后的多页 PDF",
      why: "当你有多张照片或扫描页时，合并成一个 PDF 更方便发送、打印和提交。",
      quality: "添加多张图片，然后直接从浏览器下载一个合并后的 PDF。",
      keywords: ["图片转 PDF", "JPG 转 PDF", "PNG 转 PDF", "不上传图片转 PDF"],
    },
  },
  "pdf-to-jpg": {
    en: {
      name: "PDF to JPG converter",
      title: "PDF to JPG converter — convert PDF pages privately in your browser",
      description: "Convert PDF pages to JPG images online without uploading the document. Render every page locally and download the results in a batch.",
      intro: "Turn PDF pages into JPG images for presentations, email, previews or web forms. PicLite reads the document in your browser and does not send it to a server.",
      input: "PDF documents",
      output: "JPG images, one per page",
      why: "JPG pages are convenient for image previews, slides, messages and systems that do not accept PDF files.",
      quality: "Every page is rendered as an image, then you can choose JPG quality before downloading.",
      keywords: ["PDF to JPG converter", "convert PDF to JPG", "PDF pages to images", "PDF to JPG no upload"],
    },
    "zh-cn": {
      name: "PDF 转 JPG",
      title: "PDF 转 JPG 在线工具｜逐页转换、私密、不上传",
      description: "在浏览器中把 PDF 页面转换成 JPG 图片，无需上传文档。每一页在本地渲染，支持批量下载。",
      intro: "把 PDF 页面转换成 JPG，方便用于演示、邮件、预览或网页表单。PicLite 在浏览器中读取文档，不会把文件发送到服务器。",
      input: "PDF 文档",
      output: "按页生成的 JPG 图片",
      why: "JPG 页面适合图片预览、幻灯片、消息发送，以及不接受 PDF 的系统。",
      quality: "每一页会被渲染为图片，然后可以在下载前选择 JPG 质量。",
      keywords: ["PDF 转 JPG", "PDF 转图片", "在线 PDF 转 JPG", "不上传 PDF 转 JPG"],
    },
  },
};

const LANDING_UI: Record<KeywordLocale, {
  eyebrow: string;
  cta: string;
  backLabel: string;
  stepsTitle: string;
  chooseTitle: string;
  chooseBody: string;
  outputTitle: string;
  outputBody: string;
  downloadTitle: string;
  downloadBody: string;
  benefitsTitle: string;
  privateTitle: string;
  privateBody: string;
  batchTitle: string;
  batchBody: string;
  controlTitle: string;
  faqTitle: string;
  freeQuestion: string;
  freeAnswer: string;
  deviceQuestion: string;
  deviceAnswer: string;
  relatedTitle: string;
}> = {
  en: {
    eyebrow: "Private, browser-based conversion",
    cta: "Open the converter",
    backLabel: "Back to PicLite",
    stepsTitle: "How to use this converter",
    chooseTitle: "Choose a file",
    chooseBody: "Select or drop a supported file from your device.",
    outputTitle: "Choose the output",
    outputBody: "Pick the output format and adjust quality when available.",
    downloadTitle: "Download privately",
    downloadBody: "Convert the file in your browser and download the result.",
    benefitsTitle: "Why use PicLite",
    privateTitle: "No upload required",
    privateBody: "Files are processed in your browser and are not sent to a conversion server.",
    batchTitle: "Batch-friendly",
    batchBody: "Add multiple files and download the results together when the workflow supports it.",
    controlTitle: "You control quality",
    faqTitle: "Frequently asked questions",
    freeQuestion: "Is this converter free?",
    freeAnswer: "Yes. PicLite is free to use in the browser and does not require an account or a paid plan.",
    deviceQuestion: "Does it work on phones and tablets?",
    deviceAnswer: "Yes. PicLite works in modern desktop and mobile browsers, and the conversion runs on the device.",
    relatedTitle: "More private conversion tools",
  },
  "zh-cn": {
    eyebrow: "私密、基于浏览器的格式转换",
    cta: "打开转换器",
    backLabel: "返回 PicLite",
    stepsTitle: "如何使用这个转换工具",
    chooseTitle: "选择文件",
    chooseBody: "从设备中选择或拖入支持的文件。",
    outputTitle: "选择输出格式",
    outputBody: "选择输出格式，并在支持时调整图片质量。",
    downloadTitle: "私密下载",
    downloadBody: "在浏览器中完成转换，然后下载结果。",
    benefitsTitle: "为什么选择 PicLite",
    privateTitle: "无需上传",
    privateBody: "文件在浏览器中处理，不会发送到转换服务器。",
    batchTitle: "适合批量处理",
    batchBody: "可以添加多个文件，并在工作流程支持时一起下载结果。",
    controlTitle: "质量由你控制",
    faqTitle: "常见问题",
    freeQuestion: "这个转换工具免费吗？",
    freeAnswer: "免费。PicLite 可以直接在浏览器中使用，不需要账号或付费套餐。",
    deviceQuestion: "手机和平板可以使用吗？",
    deviceAnswer: "可以。PicLite 支持现代桌面和移动浏览器，转换在设备本地运行。",
    relatedTitle: "更多私密格式转换工具",
  },
};

export function isKeywordLocale(value: string): value is KeywordLocale {
  return KEYWORD_LOCALES.includes(value as KeywordLocale);
}

export function isToolSlug(value: string): value is ToolSlug {
  return TOOL_SLUGS.includes(value as ToolSlug);
}

export function getToolPageCopy(locale: KeywordLocale, slug: ToolSlug): ToolPageCopy {
  const data = TOOL_INTENTS[slug][locale];
  const ui = LANDING_UI[locale];

  return {
    ...data,
    slug,
    eyebrow: ui.eyebrow,
    cta: ui.cta,
    backLabel: ui.backLabel,
    stepsTitle: ui.stepsTitle,
    steps: [
      { title: ui.chooseTitle, body: `${ui.chooseBody} ${data.input}.` },
      { title: ui.outputTitle, body: `${ui.outputBody} ${data.output}.` },
      { title: ui.downloadTitle, body: ui.downloadBody },
    ],
    benefitsTitle: ui.benefitsTitle,
    benefits: [
      { title: ui.privateTitle, body: ui.privateBody },
      { title: ui.batchTitle, body: ui.batchBody },
      { title: ui.controlTitle, body: data.quality },
    ],
    faqTitle: ui.faqTitle,
    faq: [
      ...TOOL_GUIDES[slug][locale].faq,
      {
        question:
          locale === "en"
            ? `Can I use this ${data.name.toLowerCase()} without uploading a file?`
            : `可以不上传文件使用这个${data.name}吗？`,
        answer: `${data.intro} ${ui.privateBody}`,
      },
      { question: ui.freeQuestion, answer: ui.freeAnswer },
      { question: ui.deviceQuestion, answer: ui.deviceAnswer },
    ],
    relatedTitle: ui.relatedTitle,
  };
}

export function toolLanguageAlternates(slug: ToolSlug) {
  return {
    ...Object.fromEntries(
      KEYWORD_LOCALES.map((locale) => [
        dictionaries[locale].tag,
        `${SITE_URL}/${locale}/${slug}`,
      ]),
    ),
    "x-default": `${SITE_URL}/en/${slug}`,
  };
}

export function rootStructuredData(locale: Locale) {
  const copy = getRootSeoCopy(locale);
  const url = `${SITE_URL}/${locale}`;
  const applicationId = `${url}#application`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": applicationId,
        name: SITE_NAME,
        url,
        description: copy.intro,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires a modern browser with JavaScript enabled",
        isAccessibleForFree: true,
        inLanguage: dictionaries[locale].tag,
        featureList: copy.features.map((feature) => feature.title),
        keywords: copy.keywords.join(", "),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        provider: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: copy.title,
        description: copy.intro,
        inLanguage: dictionaries[locale].tag,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": applicationId },
        mainEntity: { "@id": applicationId },
      },
      ...(copy.faq.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: copy.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ]
        : []),
    ],
  };
}

export function toolStructuredData(locale: KeywordLocale, copy: ToolPageCopy) {
  const url = `${SITE_URL}/${locale}/${copy.slug}`;
  const applicationId = `${url}#application`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": applicationId,
        name: copy.name,
        url,
        description: copy.description,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires a modern browser with JavaScript enabled",
        isAccessibleForFree: true,
        inLanguage: dictionaries[locale].tag,
        keywords: copy.keywords.join(", "),
        featureList: [copy.input, copy.output, "No upload required", "Batch processing"],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        provider: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: copy.title,
        description: copy.description,
        inLanguage: dictionaries[locale].tag,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": applicationId },
        mainEntity: { "@id": applicationId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/${locale}` },
          { "@type": "ListItem", position: 2, name: copy.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: copy.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}
