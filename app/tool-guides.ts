import type { KeywordLocale, SeoFaq, ToolSlug } from "./seo";

type Guide = {
  summary: string;
  notes: string[];
  faq: SeoFaq[];
  useCases?: Array<{ title: string; body: string }>;
};

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
    ko: {
      summary: "PicLite는 이미지를 해독해 선택한 형식의 새 파일을 만듭니다. 파일 확장자만 바꾸는 것으로는 형식이 변환되지 않습니다.",
      notes: [
        "투명 배경이 필요 없으면 JPG, 스크린샷·글자·투명 이미지는 PNG, 받는 앱이 지원하면 WebP, 여러 이미지를 문서로 묶을 때는 PDF를 선택하세요.",
        "비트맵 내보내기는 해독된 픽셀 크기를 유지합니다. 크기 조절, 벡터 변환, 애니메이션 내보내기는 제공하지 않습니다. AVIF 해독과 WebP 인코딩은 브라우저 지원에 따라 달라집니다.",
      ],
      faq: [
        { question: "변환하면 EXIF와 GPS 정보가 유지되나요?", answer: "PicLite는 해독한 픽셀을 캔버스에 다시 그려 새 파일로 내보내므로 원본 EXIF나 GPS 정보를 복사하지 않습니다. 촬영 정보나 위치 정보가 필요하면 원본을 보관하세요." },
        { question: "움직이는 이미지도 변환할 수 있나요?", answer: "PicLite는 정지 이미지를 만듭니다. 움직이는 WebP의 애니메이션 순서를 유지하거나 애니메이션 파일로 내보내지 않습니다. 움직이는 이미지는 전용 도구를 사용하세요." },
        { question: "JPG, PNG, WebP 중 무엇을 선택해야 하나요?", answer: "사진에는 JPG, 스크린샷·로고·글자나 투명 배경이 있는 이미지에는 PNG, 받는 쪽이 지원하고 용량을 줄이고 싶을 때는 WebP를 선택하세요." },
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
    ko: {
      summary: "JPG와 WebP는 목표 용량 슬라이더로 크기를 조절하고, PicLite가 기기 안에서 인코딩 품질을 조정합니다. 다운로드 전에 원본과 결과를 비교하세요.",
      notes: [
        "목표 용량은 JPG와 WebP에 적용됩니다. PNG는 무손실로 저장되어 목표 슬라이더를 사용하지 않으며, 다시 인코딩해도 파일이 작아진다고 보장할 수 없습니다.",
        "이미지 크기(픽셀)는 그대로 유지되고, 파일 크기는 이미지 내용과 브라우저 인코더에 따라 달라지므로 목표 용량을 정확히 맞출 수는 없습니다. 이미 최적화된 사진은 최저 품질에서도 더 클 수 있으니 파일 목록의 크기를 확인하세요.",
      ],
      faq: [
        { question: "이미지를 정확히 100KB로 압축할 수 있나요?", answer: "JPG 또는 WebP 목표 슬라이더로 목표에 가깝게 맞출 수 있지만 정확한 크기를 보장하지는 않습니다. 표시된 결과를 확인하고, 여전히 크면 목표를 낮추거나 먼저 이미지 크기를 줄이세요." },
        { question: "압축은 무손실인가요?", answer: "JPG와 품질을 지정한 WebP는 손실 압축이라 세부 정보가 줄어들 수 있습니다. PNG는 해독된 픽셀에 대해 무손실이지만 파일이 더 커질 수 있고, JPG에서 이미 사라진 정보는 되살리지 못합니다." },
        { question: "크기를 줄이는 것과 압축하는 것 중 무엇이 좋나요?", answer: "PicLite는 픽셀 크기를 바꾸지 않고 압축합니다. 사진이 쓰일 곳보다 훨씬 크다면 편집기에서 먼저 크기를 줄이는 편이 품질만 낮추는 것보다 용량을 더 절약합니다." },
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
    ko: {
      summary: "목표 용량을 설정하면 PicLite가 기기 안에서 JPG 또는 WebP 품질을 조절해 목표에 가깝게 맞춥니다. 결과는 새 파일이므로 다운로드 전에 원본과 비교하세요.",
      notes: [
        "목표 용량은 JPG와 WebP에 적용됩니다. PNG는 무손실로 저장되어 목표를 무시합니다.",
        "목표는 보장이 아니라 목표값입니다. 최종 크기는 이미지 내용과 브라우저 인코더에 따라 달라지며, 이미 최적화된 사진은 최저 품질에서도 목표를 넘을 수 있습니다.",
        "PicLite는 이미지 크기(픽셀)를 유지합니다. 파일이 제한을 넘으면 편집기에서 먼저 크기를 줄이고 다시 압축하세요.",
        "원본과 결과 파일 크기는 파일 목록에 바로 표시되므로, 내려받기 전에 얼마나 줄었는지 확인할 수 있습니다.",
        "HEIC 사진도 이 페이지에서 JPG로 변환하면서 같은 목표 용량을 적용할 수 있습니다. 변환과 압축은 모두 기기 안에서 처리됩니다.",
      ],
      faq: [
        { question: "정확히 100KB로 압축할 수 있나요?", answer: "목표값에 가깝게 맞추며 보통 그 이하로 저장되지만 정확한 크기를 보장하지는 않습니다. 파일 목록에서 결과를 확인하고, 양식이 거부하면 목표를 낮추거나 이미지 크기를 먼저 줄이세요." },
        { question: "어떤 형식이 목표 용량을 지원하나요?", answer: "JPG와 WebP 출력에 적용됩니다. PNG는 무손실이라 목표가 적용되지 않으므로, 작은 용량이 필요하면 PNG를 JPG로 변환하는 방법을 사용하세요." },
        { question: "왜 압축 후에도 목표보다 큰가요?", answer: "매우 크거나 세부 묘사가 많은 사진은 최저 품질에서도 목표 이하로 줄지 않을 수 있습니다. 먼저 크기를 줄인 뒤 다시 압축하세요." },
        { question: "여러 장을 같은 목표로 압축할 수 있나요?", answer: "네. 여러 장을 한 번에 추가하면 모든 파일이 같은 목표로 압축되고, ZIP 파일로 함께 다운로드됩니다." },
        { question: "사진 용량은 어떻게 확인하나요?", answer: "파일 목록에 원본과 결과 파일 크기가 표시되고 얼마나 줄었는지도 함께 보여 줍니다. 내려받은 파일은 운영체제의 파일 정보에서 확인할 수 있습니다." },
        { question: "핸드폰 사진도 압축할 수 있나요?", answer: "네. 최신 모바일 브라우저에서 사용할 수 있고 변환은 기기에서 실행됩니다. 아이폰 HEIC 사진은 JPG로 변환하면서 같은 목표 용량을 적용할 수 있습니다." },
        { question: "압축하면 사진이 흐려지나요?", answer: "JPG와 WebP는 손실 압축이라 품질을 낮추면 세부 묘사가 줄어들 수 있습니다. 목표 용량이 충분히 크면 차이가 크지 않지만, 결과를 원본과 비교해 확인하세요." },
        { question: "압축하면 해상도(픽셀 크기)도 줄어드나요?", answer: "아니요. PicLite는 픽셀 크기를 그대로 유지합니다. 해상도를 낮춰야 한다면 이미지 편집기에서 먼저 크기를 조절한 뒤 다시 압축하세요." },
        { question: "회원가입이나 워터마크가 있나요?", answer: "없습니다. 계정 없이 무료로 사용할 수 있고 워터마크가 추가되지 않으며, 파일은 서버로 업로드되지 않습니다." },
        { question: "파일이 목표 용량까지 줄지 않으면 어떻게 하나요?", answer: "사진이 매우 크거나 세부 묘사가 많으면 최저 품질에서도 목표를 넘을 수 있습니다. 편집기에서 픽셀 크기를 줄이거나 PNG를 JPG로 변환한 뒤 다시 압축해 보세요." },
      ],
      useCases: [
        { title: "관공서·시험 원서접수 사진", body: "접수 사이트는 보통 'JPG, 500KB 이하'처럼 용량을 지정합니다. 목표 용량을 제한보다 조금 낮게 잡으면 양식에서 거부될 위험을 줄일 수 있습니다." },
        { title: "이력서·채용 사이트 프로필 사진", body: "지원 시스템마다 프로필 사진 용량 제한이 다릅니다. 100KB나 200KB를 목표로 잡고 결과 크기를 바로 확인하세요." },
        { title: "카카오톡·이메일 첨부", body: "여러 장을 한 번에 추가해 같은 목표로 압축하면 첨부 용량 제한을 넘기지 않기 쉬워지고, 결과는 ZIP으로 함께 내려받습니다." },
        { title: "블로그·쇼핑몰 이미지", body: "게시 전에 사진 용량을 줄이면 페이지 로딩이 가벼워집니다. 여러 장을 일괄 처리하면 시간도 아낄 수 있습니다." },
        { title: "휴대폰 저장 공간", body: "아이폰 HEIC 사진은 JPG로 바꾸면서 동시에 목표 용량까지 줄일 수 있습니다. 원본은 남겨 두고 사본을 압축하세요." },
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
    ko: {
      summary: "양식이나 앱이 원본을 열지 못할 때 HEIC 또는 HEIF 정지 사진을 JPG로 변환하세요. HEIC 파일을 선택하면 PicLite가 기기 안에서 동작하는 해독기를 불러옵니다. 한 장 또는 여러 장을 변환할 수 있고, 결과가 여러 개면 ZIP으로 함께 다운로드됩니다.",
      notes: [
        "JPG는 품질 82%로 미리 선택됩니다. HEIC는 이미 효율이 높은 형식이라 결과 JPG가 더 커질 수 있으니 확인 후 품질을 조절하세요.",
        "아이폰 카메라가 '높은 호환성'이 아닌 '높은 효율성'으로 설정되어 있으면 사진이 HEIC로 저장됩니다. Windows, Android, 많은 웹 양식이 HEIC를 열지 못해 JPG 사본이 필요합니다.",
        "앨범 전체를 한 번에 추가할 수 있습니다. 모든 사진이 같은 기기 안 세션에서 변환되고, 결과가 여러 개면 ZIP 파일로 함께 다운로드됩니다.",
        "이 흐름은 정지 이미지를 내보냅니다. 라이브 포토 동영상, 깊이 데이터, 원본 HEIC 컨테이너 메타데이터는 유지되지 않습니다. 편집과 보관을 위해 원본을 남겨 두세요.",
      ],
      faq: [
        { question: "왜 Windows에서 아이폰 사진이 열리지 않나요?", answer: "아이폰은 기본적으로 사진을 HEIC로 저장하고, Windows는 별도 코덱 없이 HEIC를 열지 못합니다. JPG로 변환하면 Windows, Android, 이메일 앱, 웹 양식에서 바로 열립니다." },
        { question: "여러 장의 HEIC 사진을 한 번에 변환할 수 있나요?", answer: "네. 원하는 만큼 HEIC 사진을 선택하세요. 각 사진은 기기 안에서 변환되고, 결과가 여러 개면 ZIP 파일 하나로 다운로드됩니다." },
        { question: "아이폰이 HEIC 대신 JPG로 찍게 하려면?", answer: "설정에서 카메라, 포맷 순서로 들어가 '높은 호환성'을 선택하세요. 이후 새 사진은 JPG로 저장됩니다. 이미 찍은 HEIC 사진은 한 번 변환해야 합니다." },
        { question: "HEIC와 HEIF는 같은 건가요?", answer: "HEIF는 컨테이너 형식이고, HEIC는 애플이 사진용 HEIF 변형에 붙인 이름입니다. PicLite는 .heic와 .heif 파일을 모두 JPG로 변환합니다." },
        { question: "변환한 JPG가 HEIC보다 큰 이유는?", answer: "HEIC가 JPG보다 사진을 더 효율적으로 저장할 수 있기 때문입니다. 호환성은 좋아지지만 파일이 작아진다고 보장하지는 않습니다. 용량 제한이 있으면 JPG 품질을 낮추세요." },
        { question: "첫 HEIC 변환이 느린 이유는?", answer: "브라우저가 HEIC 해독기를 필요할 때 내려받은 뒤 사진을 해독합니다. 큰 사진은 기기 메모리도 필요하므로, 메모리가 부족하면 한 번에 처리하는 파일 수를 줄이세요." },
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
    ko: {
      summary: "PicLite는 WebP 이미지를 흰 배경의 정지 JPG로 바꿉니다. WebP를 받지 않는 업로드 양식이나 오래된 편집기에서 사용하세요.",
      notes: [
        "JPG는 투명도를 저장하지 못합니다. PicLite는 투명한 영역을 흰색으로 채우므로, 투명 배경이 필요하면 PNG를 선택하세요.",
        "손실 WebP를 JPG로 바꾸면 손실 인코딩이 한 번 더 적용됩니다. 품질을 높여도 사라진 세부 정보는 돌아오지 않고 파일이 커질 수 있습니다.",
      ],
      faq: [
        { question: "투명한 WebP 배경은 어떻게 되나요?", answer: "PicLite는 JPG로 내보내기 전에 흰 배경을 그립니다. 투명 픽셀을 유지하려면 출력 형식으로 PNG를 선택하세요." },
        { question: "움직이는 WebP도 JPG에서 움직이나요?", answer: "아니요. JPG는 정지 이미지 형식이고 PicLite는 애니메이션을 내보내지 않습니다. 움직임이 필요하면 원본 WebP를 남겨 두세요." },
        { question: "WebP를 JPG와 PNG 중 무엇으로 변환해야 하나요?", answer: "용량이 중요하고 사진일 때는 JPG, 투명 영역이나 선명한 가장자리가 있을 때는 PNG를 선택하세요. JPG는 투명 영역을 흰색으로 바꾸고 가는 선을 흐리게 만들 수 있습니다." },
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
    ko: {
      summary: "JPEG 업로드가 필요한 곳을 위해 PNG를 JPG로 변환하세요. PicLite는 픽셀 크기를 유지하고 투명 영역을 흰색으로 바꿉니다.",
      notes: [
        "사진에는 JPG가 잘 맞습니다. 작은 글자, 선명한 도표, 로고에는 PNG가 더 나을 수 있으며, JPG는 가장자리에 눈에 띄는 흔적을 남길 수 있습니다.",
        "JPG 출력은 품질이 높아도 손실입니다. 나중에 편집할 수 있도록 원본 PNG를 남기고, 변환이 항상 파일을 작게 만들지는 않으므로 결과 크기를 확인하세요.",
      ],
      faq: [
        { question: "PNG를 JPG로 바꾸면 투명 배경이 유지되나요?", answer: "아니요. JPG는 투명 픽셀을 저장하지 못합니다. PicLite는 흰색으로 바꾸므로, 투명도가 필요하면 PNG를 유지하거나 WebP를 선택하세요." },
        { question: "PNG를 JPG로 바꾸면 이미지 크기가 줄어드나요?", answer: "아니요. PicLite는 해독된 이미지 크기로 내보냅니다. 품질은 인코딩과 파일 크기에 영향을 주고 가로·세로 길이는 바꾸지 않습니다." },
        { question: "언제 PNG를 유지하는 게 좋나요?", answer: "스크린샷, 도표, 로고, 글자나 투명 배경이 있는 이미지는 PNG를 유지하세요. JPG는 사진에 잘 맞지만 선명한 가장자리에 압축 흔적을 남길 수 있습니다." },
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
    ko: {
      summary: "편집기나 작업 흐름이 PNG를 요구할 때 JPG 또는 JPEG를 PNG로 변환하세요. PNG가 미리 선택되고 해독된 픽셀은 무손실로 인코딩됩니다.",
      notes: [
        "JPG를 PNG로 바꾸어도 JPEG 압축에서 사라진 세부 정보는 돌아오지 않습니다. 현재 해독된 이미지를 무손실로 인코딩할 뿐입니다.",
        "PNG는 JPG보다 훨씬 클 수 있습니다. 변환이 배경을 지우거나 투명하게 만들지도 않으며, 배경 제거는 이미지 편집기에서 해야 합니다.",
      ],
      faq: [
        { question: "JPG를 PNG로 바꾸면 화질이 좋아지나요?", answer: "손실 JPG 인코딩을 한 번 더 거치는 일은 피하지만, 사라진 세부 정보를 되살리거나 JPEG 흔적을 없애지는 못합니다. 보이는 내용과 픽셀 크기는 그대로입니다." },
        { question: "PNG를 선택하면 품질 슬라이더가 비활성화되는 이유는?", answer: "PicLite는 PNG를 무손실로 내보냅니다. 브라우저의 PNG 인코더는 JPG와 WebP 품질 설정을 사용하지 않으므로 슬라이더가 적용되지 않습니다." },
        { question: "편집이나 인쇄 전에 JPG를 PNG로 바꿔야 하나요?", answer: "편집기가 PNG를 요구하면 변환이 도움이 되지만, 사라진 세부 정보를 되살리거나 더 선명하게 만들지는 않습니다. 인쇄에는 보통 원본 JPG로 충분합니다." },
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
    ko: {
      summary: "PicLite는 파일 목록의 이미지를 하나의 PDF로 합칩니다. 이미지마다 한 페이지가 됩니다.",
      notes: [
        "각 페이지는 이미지의 크기와 방향을 따르며 고정된 A4 레이아웃은 없습니다. 변환 전에 파일 목록 순서를 확인하세요. 현재 드래그로 순서를 바꾸는 기능은 없습니다.",
        "PDF 안의 이미지는 선택한 품질로 JPG로 인코딩되고 투명 영역은 흰색이 됩니다. 결과물은 이미지 페이지이며 검색 가능한 OCR 텍스트는 없습니다.",
      ],
      faq: [
        { question: "여러 장의 사진을 하나의 PDF로 만들 수 있나요?", answer: "네. 이미지를 추가하고 파일 목록에서 순서를 확인한 뒤 PDF를 선택하면, 이미지마다 한 페이지씩 배치된 PDF 하나를 내려받습니다." },
        { question: "스캔한 문서의 글자를 PDF에서 검색할 수 있나요?", answer: "아니요. PicLite는 이미지를 PDF 페이지에 넣을 뿐 문자 인식을 하지 않습니다. 검색하거나 선택할 수 있는 텍스트가 필요하면 OCR 도구를 사용하세요." },
        { question: "PDF와 원본 이미지 중 무엇을 보내야 하나요?", answer: "PDF는 여러 이미지를 한 파일에 순서대로 담아 양식 제출에 적합합니다. 받는 사람이 이미지를 각각 편집하거나 잘라야 하면 이미지를 그대로 보내세요." },
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
    ko: {
      summary: "PicLite는 PDF의 모든 페이지를 각각의 이미지로 렌더링한 뒤 JPG 파일로 내보냅니다. 문서에 들어 있는 원본 사진을 추출하는 대신 페이지 전체 모양을 캡처합니다.",
      notes: [
        "페이지는 PDF 원본 크기의 최대 두 배로 렌더링되고 긴 변이 4096 픽셀로 제한됩니다. JPG 품질 설정은 압축 정도를 바꿀 뿐 렌더링 해상도를 바꾸지 않습니다.",
        "결과가 여러 개면 ZIP으로 다운로드됩니다. 큰 문서는 기기 메모리를 많이 사용하므로 렌더링이 실패하면 더 작은 문서로 나눠 보세요. 이 화면에는 비밀번호 입력 기능이 없어 암호화된 PDF는 잠금을 해제한 사본이 필요합니다.",
      ],
      faq: [
        { question: "PDF JPG 변환은 원본 이미지를 추출하나요?", answer: "아니요. PicLite는 글자, 그래픽, 배치를 포함한 페이지 전체를 이미지로 렌더링합니다. PDF에 포함된 원본 이미지 파일이 필요하면 PDF 이미지 추출 도구를 사용하세요." },
        { question: "PDF에서 일부 페이지만 변환할 수 있나요?", answer: "PicLite는 먼저 모든 페이지를 렌더링합니다. 파일 목록에 나타난 뒤 필요 없는 페이지를 지우고 남은 이미지를 변환해 내려받으세요." },
        { question: "스크린샷 대신 PDF JPG 변환을 쓰는 게 좋은 때는?", answer: "PDF JPG 변환은 페이지 전체를 긴 변 최대 4096 픽셀로 렌더링하므로 스크린샷보다 페이지를 온전하게 담습니다. 슬라이드, 포스터, 단일 페이지 문서에 적합합니다." },
      ],
    },
  },
};
