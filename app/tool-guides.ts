import type { KeywordLocale, SeoFaq, ToolSlug } from "./seo";

type Guide = { summary: string; notes: string[]; faq: SeoFaq[] };

// These details describe this converter's implementation, not generic format claims.
export const TOOL_GUIDES: Record<ToolSlug, Record<KeywordLocale, Guide>> = {
  "image-converter": {
    en: {
      summary: "PicLite decodes an image and creates a new file in the format you choose. Renaming a file extension alone does not convert it.",
      notes: ["Choose JPG for photos when transparency is unnecessary; PNG for screenshots, text and transparent graphics; WebP when the receiving app accepts it; PDF to combine images into a document.", "Raster exports keep the decoded image dimensions. PicLite does not offer resizing, vector conversion or animation export. AVIF decoding and WebP encoding depend on browser support."],
      faq: [
        { question: "Does conversion preserve EXIF and GPS metadata?", answer: "PicLite redraws decoded pixels on a canvas and exports a new file. It does not copy the original EXIF or GPS metadata. Keep your original if you need camera settings or location data." },
        { question: "Can I convert animated images?", answer: "PicLite produces still images. It does not preserve an animated WebP sequence or export animated files; use a dedicated animation converter for that task." },
      ],
    },
    "zh-cn": {
      summary: "PicLite 会解码图片，并按选定格式创建新文件。只修改文件扩展名并不能完成格式转换。",
      notes: ["不需要透明背景的照片可选 JPG；截图、文字和透明图形可选 PNG；接收方支持时可选 WebP；合并图片为文档可选 PDF。", "导出位图保留解码后的图片尺寸，不提供调整尺寸、矢量转换或动画导出。AVIF 解码和 WebP 编码取决于浏览器支持。"],
      faq: [
        { question: "转换会保留 EXIF 和 GPS 信息吗？", answer: "PicLite 在画布上重绘解码后的像素并导出新文件，不复制原始 EXIF 或 GPS 信息。如需保留拍摄参数或位置信息，请保存原件。" },
        { question: "可以转换动态图片吗？", answer: "PicLite 输出静态图片，不保留动态 WebP 的动画序列，也不导出动画文件。处理动画请使用专用工具。" },
      ],
    },
  },
  "image-compressor": {
    en: {
      summary: "PicLite uses a target-size slider for JPG and WebP, then adjusts encoding quality locally to approach the selected size. Compare the actual result with your original before downloading.",
      notes: ["The target slider applies to JPG and WebP and aims for an output at or below the selected size. PNG output is lossless and does not use the target slider; re-encoding a PNG does not guarantee a smaller file.", "The converter keeps image dimensions and cannot guarantee an exact target because file size depends on image content and browser encoders. An already optimized image may still be larger at the minimum quality. Compare the sizes shown in the file list."],
      faq: [
        { question: "Can I compress an image to exactly 100 KB or 200 KB?", answer: "PicLite can aim for a selected target size with the JPG or WebP slider, but it does not guarantee a target file size. Check the displayed result and resize the image first if it remains too large." },
        { question: "Is image compression lossless?", answer: "JPG and the WebP quality setting use lossy encoding, which may remove detail. PNG encoding is lossless for the decoded pixels, but it may produce a larger file and cannot restore detail already lost in a JPG." },
      ],
    },
    "zh-cn": {
      summary: "PicLite 提供目标文件大小滑块，并在浏览器本地调整 JPG 或 WebP 的编码质量，尽量接近选定大小。下载前请对比输出结果和原图。",
      notes: ["目标大小滑块适用于 JPG 和 WebP，目标是让输出不超过选定大小。PNG 为无损输出，不使用目标大小滑块，重新编码也不保证文件更小。", "转换保持图片尺寸，无法保证精确达到目标，因为文件大小取决于图片内容和浏览器编码器。已优化的图片在最低质量下仍可能更大，请对比文件列表中显示的大小。"],
      faq: [
        { question: "可以把图片压缩到指定的 100 KB 或 200 KB 吗？", answer: "PicLite 可以通过 JPG 或 WebP 的目标大小滑块尽量接近指定大小，但不保证输出到指定大小。请检查显示的结果；若仍然过大，可以先用图片编辑器缩小尺寸。" },
        { question: "图片压缩是无损的吗？", answer: "JPG 和带质量设置的 WebP 使用有损编码，可能损失细节。PNG 对解码后的像素采用无损编码，但文件可能更大，也无法恢复 JPG 已经丢失的细节。" },
      ],
    },
  },
  "heic-to-jpg": {
    en: {
      summary: "Convert HEIC or HEIF still photos to JPG when a form or app cannot open the originals. PicLite loads a local HEIC decoder when you select a HEIC file.",
      notes: ["JPG is preselected at 82% quality. HEIC is already an efficient format, so the resulting JPG may be larger. Adjust quality after checking the result.", "This workflow exports a still image. It does not preserve Live Photo motion, depth data or the original HEIC container metadata. Keep the original for editing and archiving."],
      faq: [
        { question: "Why is the converted JPG larger than my HEIC photo?", answer: "HEIC can store a photo more efficiently than JPG. Converting improves compatibility but does not guarantee a smaller file. Lower JPG quality if the receiving service has a size limit." },
        { question: "Why does the first HEIC conversion take longer?", answer: "The browser downloads the HEIC decoder on demand before it can decode the photo. Large photos also need device memory. Start with fewer files if your phone runs out of memory." },
      ],
    },
    "zh-cn": {
      summary: "表单或应用无法打开原片时，可把 HEIC 或 HEIF 静态照片转为 JPG。选择 HEIC 文件后，PicLite 会按需加载在本地运行的解码器。",
      notes: ["本页预选 JPG，质量为 82%。HEIC 本身压缩效率较高，转换后的 JPG 可能更大，请查看结果后调整质量。", "该流程导出静态图片，不保留实况照片的动态内容、深度数据或原始 HEIC 容器元数据。编辑和归档请保留原件。"],
      faq: [
        { question: "为什么转换后的 JPG 比 HEIC 更大？", answer: "HEIC 储存照片的效率可能高于 JPG。转换改善兼容性，但不保证减小文件。如接收方有文件大小限制，可以降低 JPG 质量。" },
        { question: "为什么第一次转换 HEIC 比较慢？", answer: "浏览器需要先按需下载 HEIC 解码器，再解码照片。大照片也需要设备内存，手机内存不足时可以减少每批文件数量。" },
      ],
    },
  },
  "webp-to-jpg": {
    en: {
      summary: "PicLite turns a WebP image into a still JPG with a white background. Use this when an upload form or older editor does not accept WebP.",
      notes: ["JPG cannot keep transparency. PicLite fills transparent areas with white; choose PNG instead if you need a transparent background.", "Converting a lossy WebP to JPG introduces another lossy encoding step. A higher quality setting cannot recover missing detail, and output size can increase."],
      faq: [
        { question: "What happens to transparent WebP backgrounds?", answer: "PicLite draws a white background before exporting JPG. To retain transparent pixels, select PNG as the output instead." },
        { question: "Will an animated WebP stay animated as JPG?", answer: "No. JPG is a still-image output and PicLite does not export an animation sequence. Keep the original WebP if motion matters." },
      ],
    },
    "zh-cn": {
      summary: "PicLite 将 WebP 转成白色背景的静态 JPG，适用于不接受 WebP 的上传表单或旧版编辑器。",
      notes: ["JPG 不保留透明度，PicLite 会把透明区域填充为白色。如需透明背景，请改选 PNG。", "有损 WebP 转成 JPG 会经历再次有损编码。提高质量不能恢复已丢失的细节，输出文件也可能变大。"],
      faq: [
        { question: "WebP 的透明背景会变成什么？", answer: "PicLite 在导出 JPG 前绘制白色背景。如需保留透明像素，请选择 PNG 输出。" },
        { question: "动态 WebP 转成 JPG 后还能动吗？", answer: "不能。JPG 是静态图片格式，PicLite 不导出动画序列。如果需要动态效果，请保留原始 WebP。" },
      ],
    },
  },
  "png-to-jpg": {
    en: {
      summary: "Convert PNG to JPG for photo uploads that require JPEG. PicLite preserves pixel dimensions and replaces transparent areas with white.",
      notes: ["JPG often works well for photos. PNG can be a better choice for small text, sharp diagrams and logos; JPG may introduce visible artifacts around edges.", "JPG output is lossy, even at high quality. Keep the original PNG for future edits, and check the converted size because conversion does not always make a file smaller."],
      faq: [
        { question: "Can PNG to JPG keep a transparent background?", answer: "No. JPG cannot store transparent pixels. PicLite replaces them with white; keep PNG or choose WebP if transparency is required." },
        { question: "Will PNG to JPG reduce my image dimensions?", answer: "No. PicLite exports at the decoded image dimensions. Quality affects encoding and file size, not width or height." },
      ],
    },
    "zh-cn": {
      summary: "需要上传 JPEG 照片时，可以把 PNG 转成 JPG。PicLite 保持像素尺寸，并将透明区域替换为白色。",
      notes: ["JPG 通常适合照片。小字、清晰线条和标志可能更适合 PNG；JPG 可能在边缘产生可见的压缩痕迹。", "即使质量较高，JPG 仍为有损输出。请保留原始 PNG 以便后续编辑，并检查输出大小，因为转换不一定让文件更小。"],
      faq: [
        { question: "PNG 转 JPG 能保留透明背景吗？", answer: "不能。JPG 无法储存透明像素，PicLite 会将它们替换为白色。如需透明度，请保留 PNG 或选择 WebP。" },
        { question: "PNG 转 JPG 会缩小图片尺寸吗？", answer: "不会。PicLite 按解码后的图片尺寸导出，质量设置影响编码和文件大小，不改变宽高。" },
      ],
    },
  },
  "jpg-to-png": {
    en: {
      summary: "Convert JPG or JPEG to PNG when an editor or workflow requires PNG. PNG is preselected and its quality setting is lossless for the decoded pixels.",
      notes: ["Converting JPG to PNG does not restore detail lost during JPEG compression. It creates a lossless encoding of the image as currently decoded.", "The PNG can be much larger than the JPG. Conversion also does not remove the background or make it transparent; background removal requires an image editor."],
      faq: [
        { question: "Does JPG to PNG improve image quality?", answer: "It avoids a new lossy JPG encoding step, but it cannot restore missing detail or remove JPEG artifacts. The visible content and pixel dimensions remain the same." },
        { question: "Why is the quality slider disabled for PNG?", answer: "PicLite exports PNG losslessly. The browser's PNG encoder does not use the JPG and WebP quality setting, so the slider does not apply." },
      ],
    },
    "zh-cn": {
      summary: "编辑器或工作流程要求 PNG 时，可以把 JPG 或 JPEG 转为 PNG。本页预选 PNG，对解码后的像素进行无损编码。",
      notes: ["JPG 转 PNG 不会恢复 JPEG 压缩中丢失的细节，只会无损编码当前解码出的图像。", "PNG 可能比 JPG 大很多。格式转换也不会抠图或让背景透明；去除背景需要使用图片编辑器。"],
      faq: [
        { question: "JPG 转 PNG 能提高画质吗？", answer: "它可以避免再次进行 JPG 有损编码，但不能恢复缺失的细节或去除 JPEG 压缩痕迹。可见内容和像素尺寸保持不变。" },
        { question: "为什么选择 PNG 后不能调整质量？", answer: "PicLite 以无损方式导出 PNG。浏览器的 PNG 编码器不使用 JPG 和 WebP 的质量设置，因此质量滑块不适用。" },
      ],
    },
  },
  "image-to-pdf": {
    en: {
      summary: "PicLite combines the images in the file list into one PDF, with one image per page. PDF is preselected on this page.",
      notes: ["Each page follows its image's dimensions and orientation; there is no fixed A4 or Letter layout. Check the file list order before converting. The interface does not currently support drag-to-reorder.", "Images are encoded as JPG inside the PDF at the chosen quality, and transparent areas become white. The result contains image pages, not searchable OCR text."],
      faq: [
        { question: "Can I combine several photos into one PDF?", answer: "Yes. Add the images, check their order in the file list, select PDF and create the document. PicLite places one image on each page and downloads a single combined PDF." },
        { question: "Does image to PDF make scanned text searchable?", answer: "No. PicLite embeds images into PDF pages without optical character recognition. Use an OCR tool if you need searchable or selectable text." },
      ],
    },
    "zh-cn": {
      summary: "PicLite 将文件列表中的图片合并为一个 PDF，每张图片占一页。本页已预选 PDF。",
      notes: ["每页跟随图片的尺寸和横竖方向，不提供固定 A4 或 Letter 排版。转换前请检查文件列表顺序，目前界面不支持拖动排序。", "PDF 内的图片按所选质量编码为 JPG，透明区域变为白色。输出为图片页面，不包含 OCR 识别的可搜索文字。"],
      faq: [
        { question: "可以把多张照片合并成一个 PDF 吗？", answer: "可以。添加图片并检查文件列表顺序，选择 PDF 后创建文档。PicLite 将每张图片放在单独一页，下载一个合并后的 PDF。" },
        { question: "图片转 PDF 后，扫描的文字可以搜索吗？", answer: "不可以。PicLite 将图片嵌入 PDF 页面，不进行文字识别。如需搜索或选择文字，请使用 OCR 工具。" },
      ],
    },
  },
  "pdf-to-jpg": {
    en: {
      summary: "PicLite renders every PDF page into a separate image, then exports JPG files. It captures the complete page appearance rather than extracting the original embedded photos.",
      notes: ["Pages render at up to twice their natural PDF size, capped at 4096 pixels on the longer edge. The JPG quality setting changes compression, not this rendering resolution.", "Several results download as a ZIP. Large documents need more device memory; try a smaller document if rendering fails. Password-protected PDFs need an unlocked copy because this interface has no password entry."],
      faq: [
        { question: "Does PDF to JPG extract the original images from a PDF?", answer: "No. PicLite renders each full page, including text, graphics and layout, into an image. Use a PDF image-extraction tool if you need the original embedded image files." },
        { question: "Can I convert only selected PDF pages?", answer: "PicLite initially renders all pages. Once they appear in the file list, remove the pages you do not need, then convert and download the remaining images." },
      ],
    },
    "zh-cn": {
      summary: "PicLite 将 PDF 每一页渲染为独立图片，再导出 JPG。它保留整页外观，而不是提取文档中嵌入的原始照片。",
      notes: ["页面按 PDF 自然尺寸最多两倍渲染，长边最多 4096 像素。JPG 质量设置改变压缩程度，不改变这一渲染分辨率。", "多个结果会打包为 ZIP 下载。大文档需要更多设备内存，渲染失败时可以尝试较小的文档。界面没有密码输入功能，加密 PDF 需要先准备解锁副本。"],
      faq: [
        { question: "PDF 转 JPG 是提取 PDF 中的原始图片吗？", answer: "不是。PicLite 把包括文字、图形和排版在内的整页渲染为图片。如需嵌入的原始图片文件，请使用 PDF 图片提取工具。" },
        { question: "可以只转换 PDF 中选定的页面吗？", answer: "PicLite 会先渲染全部页面。页面出现在文件列表后，可以删除不需要的页面，再转换并下载剩余图片。" },
      ],
    },
  },
};
