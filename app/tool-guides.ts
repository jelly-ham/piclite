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
        { question: "Which format should I choose: JPG, PNG or WebP?", answer: "Choose JPG for photos, PNG for screenshots, logos and anything with sharp text or transparency, and WebP when the receiving app or site accepts it and a smaller file helps." },
      ],
    },
    "zh-cn": {
      summary: "PicLite 会解码图片，并按选定格式创建新文件。只修改文件扩展名并不能完成格式转换。",
      notes: ["不需要透明背景的照片可选 JPG；截图、文字和透明图形可选 PNG；接收方支持时可选 WebP；合并图片为文档可选 PDF。", "导出位图保留解码后的图片尺寸，不提供调整尺寸、矢量转换或动画导出。AVIF 解码和 WebP 编码取决于浏览器支持。"],
      faq: [
        { question: "转换会保留 EXIF 和 GPS 信息吗？", answer: "PicLite 在画布上重绘解码后的像素并导出新文件，不复制原始 EXIF 或 GPS 信息。如需保留拍摄参数或位置信息，请保存原件。" },
        { question: "可以转换动态图片吗？", answer: "PicLite 输出静态图片，不保留动态 WebP 的动画序列，也不导出动画文件。处理动画请使用专用工具。" },
        { question: "应该如何选择 JPG、PNG 还是 WebP？", answer: "照片选 JPG；截图、标志以及带文字或透明背景的图片选 PNG；接收方支持且希望减小体积时选 WebP。" },
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
        { question: "Should I resize an image or compress it?", answer: "PicLite compresses without changing the pixel dimensions. When a photo is much larger than the place it will be used, resizing it in an editor first usually saves more space than quality reduction alone." },
      ],
    },
    "zh-cn": {
      summary: "PicLite 提供目标文件大小滑块，并在浏览器本地调整 JPG 或 WebP 的编码质量，尽量接近选定大小。下载前请对比输出结果和原图。",
      notes: ["目标大小滑块适用于 JPG 和 WebP，目标是让输出不超过选定大小。PNG 为无损输出，不使用目标大小滑块，重新编码也不保证文件更小。", "转换保持图片尺寸，无法保证精确达到目标，因为文件大小取决于图片内容和浏览器编码器。已优化的图片在最低质量下仍可能更大，请对比文件列表中显示的大小。"],
      faq: [
        { question: "可以把图片压缩到指定的 100 KB 或 200 KB 吗？", answer: "PicLite 可以通过 JPG 或 WebP 的目标大小滑块尽量接近指定大小，但不保证输出到指定大小。请检查显示的结果；若仍然过大，可以先用图片编辑器缩小尺寸。" },
        { question: "图片压缩是无损的吗？", answer: "JPG 和带质量设置的 WebP 使用有损编码，可能损失细节。PNG 对解码后的像素采用无损编码，但文件可能更大，也无法恢复 JPG 已经丢失的细节。" },
        { question: "应该缩小尺寸还是压缩质量？", answer: "PicLite 压缩时保持像素尺寸不变。如果照片远大于实际用途，先用编辑器缩小尺寸，通常比单纯降低质量更省空间。" },
      ],
    },
  },
  "compress-image-to-kb": {
    en: {
      summary: "Set a target file size and PicLite adjusts JPG or WebP quality locally to approach it. The result is a new file; compare it with the original before downloading.",
      notes: [
        "The target control applies to JPG and WebP. PNG output is encoded losslessly and ignores the target, because re-encoding a PNG does not guarantee a smaller file.",
        "A target is a goal, not a guarantee: the final size depends on image content and the browser encoder. An already optimized photo can stay above the target even at the lowest quality.",
        "PicLite keeps the image dimensions. If a file still exceeds a hard limit, resize the photo first and compress it again.",
      ],
      faq: [
        { question: "Can PicLite compress an image to exactly 100 KB?", answer: "PicLite aims for the target and usually lands at or just below it, but it does not guarantee an exact size. Check the result in the file list, and lower the target or resize the image if a form still rejects it." },
        { question: "Which formats support a target file size?", answer: "The target control applies to JPG and WebP output. PNG is lossless and ignores the target, so converting a PNG to JPG is often the way to reach a small limit." },
        { question: "Why is my image still larger than the target?", answer: "Very large or detailed photos may not compress below the target even at the lowest quality. Resize the image first, then compress it again." },
        { question: "Can I compress several images to the same target?", answer: "Yes. Add a batch and every file is compressed toward the same target in one pass, then downloaded together as a ZIP." },
      ],
    },
    "zh-cn": {
      summary: "设置目标文件大小后，PicLite 会在本地调整 JPG 或 WebP 质量，尽量接近该大小。输出的是新文件，下载前请与原图对比。",
      notes: [
        "目标大小仅适用于 JPG 和 WebP。PNG 采用无损编码，不受目标大小控制，因为重新编码 PNG 并不保证文件更小。",
        "目标只是目标，不是保证：最终大小取决于图片内容和浏览器编码器。已优化过的照片即使使用最低质量也可能高于目标值。",
        "PicLite 保持图片尺寸不变。如果文件仍然超过硬性限制，请先用编辑器缩小尺寸，再重新压缩。",
      ],
      faq: [
        { question: "可以把图片精确压缩到 100 KB 吗？", answer: "PicLite 会尽量达到目标值，通常略低于该值，但不保证精确大小。请在文件列表中查看结果；如果表单仍然拒绝，可以调低目标或先缩小图片尺寸。" },
        { question: "哪些格式支持目标文件大小？", answer: "目标大小适用于 JPG 和 WebP 输出。PNG 为无损格式，不受目标控制；很多时候需要先把 PNG 转成 JPG 才能达到较小的体积限制。" },
        { question: "为什么压缩后图片仍然大于目标值？", answer: "尺寸很大或细节很多的照片，即使使用最低质量也可能无法压到目标值以下。请先缩小图片尺寸，再重新压缩。" },
        { question: "可以批量压缩到同一个目标大小吗？", answer: "可以。一次添加多张图片，所有文件都会朝同一目标压缩，最后打包为 ZIP 一起下载。" },
      ],
    },
  },
  "heic-to-jpg": {
    en: {
      summary: "Convert HEIC or HEIF still photos to JPG when a form or app cannot open the originals. PicLite loads a local HEIC decoder when you select a HEIC file. Convert one photo or a full batch; several results download together as a ZIP.",
      notes: [
        "JPG is preselected at 82% quality. HEIC is already an efficient format, so the resulting JPG may be larger. Adjust quality after checking the result.",
        "iPhones save photos as HEIC when Camera is set to High Efficiency. Windows, Android and many web forms cannot open HEIC, which is why a JPG copy is the usual fix.",
        "Add a whole album at once. Every photo converts in the same on-device session, and when there are multiple results they download together as one ZIP file.",
        "This workflow exports a still image. It does not preserve Live Photo motion, depth data or the original HEIC container metadata. Keep the original for editing and archiving.",
      ],
      faq: [
        { question: "Why can't my Windows PC open my iPhone photos?", answer: "iPhones save photos as HEIC by default, and Windows cannot open HEIC without an extra codec. Converting the photos to JPG gives you files that open on Windows, Android, email apps and web forms." },
        { question: "Can I convert multiple HEIC photos at once?", answer: "Yes. Drop or select as many HEIC photos as you need. Each one converts on your device, and multiple results download together as a single ZIP file." },
        { question: "How do I stop my iPhone from taking HEIC photos?", answer: "Open Settings, then Camera, then Formats, and choose Most Compatible. New photos are saved as JPG from then on. Photos already taken in HEIC still need a one-time conversion." },
        { question: "Is HEIC the same as HEIF?", answer: "HEIF is the container format, and HEIC is the name Apple uses for its HEIF photo variant. PicLite accepts both .heic and .heif files and converts either to JPG." },
        { question: "Why is the converted JPG larger than my HEIC photo?", answer: "HEIC can store a photo more efficiently than JPG. Converting improves compatibility but does not guarantee a smaller file. Lower JPG quality if the receiving service has a size limit." },
        { question: "Why does the first HEIC conversion take longer?", answer: "The browser downloads the HEIC decoder on demand before it can decode the photo. Large photos also need device memory. Start with fewer files if your phone runs out of memory." },
      ],
    },
    "zh-cn": {
      summary: "表单或应用无法打开原片时，可把 HEIC 或 HEIF 静态照片转为 JPG。选择 HEIC 文件后，PicLite 会按需加载在本地运行的解码器。可以转换单张或整批照片，多个结果会打包为 ZIP 下载。",
      notes: [
        "本页预选 JPG，质量为 82%。HEIC 本身压缩效率较高，转换后的 JPG 可能更大，请查看结果后调整质量。",
        "iPhone 相机设置为“高效”时会将照片存为 HEIC。Windows、Android 和许多网页表单无法打开 HEIC，因此通常需要转成 JPG 副本。",
        "可以一次添加整个相册。所有照片在同一个设备本地会话中转换，有多个结果时会打包为一个 ZIP 文件下载。",
        "该流程导出静态图片，不保留实况照片的动态内容、深度数据或原始 HEIC 容器元数据。编辑和归档请保留原件。",
      ],
      faq: [
        { question: "为什么 Windows 电脑打不开 iPhone 照片？", answer: "iPhone 默认将照片存为 HEIC，Windows 不安装额外解码器就无法打开 HEIC。把照片转成 JPG 后，Windows、Android、邮件应用和网页表单都能正常打开。" },
        { question: "可以一次转换多张 HEIC 照片吗？", answer: "可以。拖入或选择任意数量的 HEIC 照片，每张都在你的设备上完成转换；有多个结果时会打包为一个 ZIP 文件一起下载。" },
        { question: "如何让 iPhone 不再拍 HEIC 照片？", answer: "打开“设置”，进入“相机”，再进入“格式”，选择“兼容性最佳”。之后新拍的照片会直接存为 JPG，此前已拍的 HEIC 照片仍需转换一次。" },
        { question: "HEIC 和 HEIF 是一回事吗？", answer: "HEIF 是容器格式，HEIC 是 Apple 为其照片使用的 HEIF 变体所起的名字。PicLite 同时接受 .heic 和 .heif 文件，都可以转成 JPG。" },
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
        { question: "Should I convert WebP to JPG or PNG?", answer: "Choose JPG for photos when a small file matters. Choose PNG instead when the image has transparency or sharp edges, because JPG replaces transparent areas with white and can blur fine lines." },
      ],
    },
    "zh-cn": {
      summary: "PicLite 将 WebP 转成白色背景的静态 JPG，适用于不接受 WebP 的上传表单或旧版编辑器。",
      notes: ["JPG 不保留透明度，PicLite 会把透明区域填充为白色。如需透明背景，请改选 PNG。", "有损 WebP 转成 JPG 会经历再次有损编码。提高质量不能恢复已丢失的细节，输出文件也可能变大。"],
      faq: [
        { question: "WebP 的透明背景会变成什么？", answer: "PicLite 在导出 JPG 前绘制白色背景。如需保留透明像素，请选择 PNG 输出。" },
        { question: "动态 WebP 转成 JPG 后还能动吗？", answer: "不能。JPG 是静态图片格式，PicLite 不导出动画序列。如果需要动态效果，请保留原始 WebP。" },
        { question: "WebP 应该转成 JPG 还是 PNG？", answer: "照片且在意体积时选 JPG；图片有透明区域或清晰边缘时选 PNG，因为 JPG 会把透明区域变成白色，还可能让细线变模糊。" },
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
        { question: "When should I keep PNG instead of converting to JPG?", answer: "Keep PNG for screenshots, diagrams, logos and any image with text or transparency. JPG compresses photos well but can add visible artifacts around sharp edges." },
      ],
    },
    "zh-cn": {
      summary: "需要上传 JPEG 照片时，可以把 PNG 转成 JPG。PicLite 保持像素尺寸，并将透明区域替换为白色。",
      notes: ["JPG 通常适合照片。小字、清晰线条和标志可能更适合 PNG；JPG 可能在边缘产生可见的压缩痕迹。", "即使质量较高，JPG 仍为有损输出。请保留原始 PNG 以便后续编辑，并检查输出大小，因为转换不一定让文件更小。"],
      faq: [
        { question: "PNG 转 JPG 能保留透明背景吗？", answer: "不能。JPG 无法储存透明像素，PicLite 会将它们替换为白色。如需透明度，请保留 PNG 或选择 WebP。" },
        { question: "PNG 转 JPG 会缩小图片尺寸吗？", answer: "不会。PicLite 按解码后的图片尺寸导出，质量设置影响编码和文件大小，不改变宽高。" },
        { question: "什么情况下应该保留 PNG 而不转成 JPG？", answer: "截图、图表、标志以及带文字或透明背景的图片建议保留 PNG。JPG 适合照片，但在清晰边缘处可能产生可见的压缩痕迹。" },
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
        { question: "Should I convert JPG to PNG before editing or printing?", answer: "Converting to PNG is useful when an editor requires PNG, but it does not restore lost detail or make the image sharper. For printing, the original JPG usually works fine." },
      ],
    },
    "zh-cn": {
      summary: "编辑器或工作流程要求 PNG 时，可以把 JPG 或 JPEG 转为 PNG。本页预选 PNG，对解码后的像素进行无损编码。",
      notes: ["JPG 转 PNG 不会恢复 JPEG 压缩中丢失的细节，只会无损编码当前解码出的图像。", "PNG 可能比 JPG 大很多。格式转换也不会抠图或让背景透明；去除背景需要使用图片编辑器。"],
      faq: [
        { question: "JPG 转 PNG 能提高画质吗？", answer: "它可以避免再次进行 JPG 有损编码，但不能恢复缺失的细节或去除 JPEG 压缩痕迹。可见内容和像素尺寸保持不变。" },
        { question: "为什么选择 PNG 后不能调整质量？", answer: "PicLite 以无损方式导出 PNG。浏览器的 PNG 编码器不使用 JPG 和 WebP 的质量设置，因此质量滑块不适用。" },
        { question: "编辑或打印前应该把 JPG 转成 PNG 吗？", answer: "当编辑器要求 PNG 时转换是合理的选择，但它不会恢复丢失的细节，也不会让图片更清晰。打印通常用原始 JPG 即可。" },
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
        { question: "Should I send a PDF or the original images?", answer: "A PDF keeps several images in one file and preserves their order, which suits forms and document uploads. Send the images themselves when the receiver needs to edit or crop them separately." },
      ],
    },
    "zh-cn": {
      summary: "PicLite 将文件列表中的图片合并为一个 PDF，每张图片占一页。本页已预选 PDF。",
      notes: ["每页跟随图片的尺寸和横竖方向，不提供固定 A4 或 Letter 排版。转换前请检查文件列表顺序，目前界面不支持拖动排序。", "PDF 内的图片按所选质量编码为 JPG，透明区域变为白色。输出为图片页面，不包含 OCR 识别的可搜索文字。"],
      faq: [
        { question: "可以把多张照片合并成一个 PDF 吗？", answer: "可以。添加图片并检查文件列表顺序，选择 PDF 后创建文档。PicLite 将每张图片放在单独一页，下载一个合并后的 PDF。" },
        { question: "图片转 PDF 后，扫描的文字可以搜索吗？", answer: "不可以。PicLite 将图片嵌入 PDF 页面，不进行文字识别。如需搜索或选择文字，请使用 OCR 工具。" },
        { question: "应该发送 PDF 还是原始图片？", answer: "PDF 把多张图片放进一个文件并保留顺序，适合表单和文档上传。接收方需要单独编辑或裁剪时，直接发送图片更合适。" },
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
        { question: "When is PDF to JPG useful instead of a screenshot?", answer: "PDF to JPG renders each full page at up to 4096 pixels on the longer edge, so it captures a complete page more reliably than a screenshot, and it suits slides, posters and single pages." },
      ],
    },
    "zh-cn": {
      summary: "PicLite 将 PDF 每一页渲染为独立图片，再导出 JPG。它保留整页外观，而不是提取文档中嵌入的原始照片。",
      notes: ["页面按 PDF 自然尺寸最多两倍渲染，长边最多 4096 像素。JPG 质量设置改变压缩程度，不改变这一渲染分辨率。", "多个结果会打包为 ZIP 下载。大文档需要更多设备内存，渲染失败时可以尝试较小的文档。界面没有密码输入功能，加密 PDF 需要先准备解锁副本。"],
      faq: [
        { question: "PDF 转 JPG 是提取 PDF 中的原始图片吗？", answer: "不是。PicLite 把包括文字、图形和排版在内的整页渲染为图片。如需嵌入的原始图片文件，请使用 PDF 图片提取工具。" },
        { question: "可以只转换 PDF 中选定的页面吗？", answer: "PicLite 会先渲染全部页面。页面出现在文件列表后，可以删除不需要的页面，再转换并下载剩余图片。" },
        { question: "什么时候用 PDF 转 JPG 而不是截图？", answer: "PDF 转 JPG 会把整页渲染为长边最多 4096 像素的图片，比截图更完整可靠，适合幻灯片、海报和单页文档。" },
      ],
    },
  },
};
