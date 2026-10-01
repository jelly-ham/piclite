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
    es: {
      summary: "PicLite decodifica la imagen y crea un archivo nuevo en el formato que elijas. Cambiar solo la extensión del archivo no lo convierte.",
      notes: [
        "Elige JPG para fotos cuando la transparencia no importe; PNG para capturas, texto y gráficos transparentes; WebP cuando la app receptora lo acepte; PDF para combinar imágenes en un documento.",
        "Las exportaciones de mapa de bits conservan las dimensiones de la imagen decodificada. PicLite no ofrece redimensionar, convertir a vectores ni exportar animaciones. La decodificación AVIF y la codificación WebP dependen del navegador.",
      ],
      faq: [
        { question: "¿La conversión conserva los metadatos EXIF y GPS?", answer: "PicLite redibuja los píxeles decodificados en un lienzo y exporta un archivo nuevo, así que no copia los metadatos EXIF ni GPS. Guarda el original si necesitas los datos de la cámara o la ubicación." },
        { question: "¿Puedo convertir imágenes animadas?", answer: "PicLite produce imágenes fijas. No conserva secuencias WebP animadas ni exporta archivos animados; usa un conversor especializado para eso." },
        { question: "¿Qué formato elijo: JPG, PNG o WebP?", answer: "Elige JPG para fotos, PNG para capturas, logotipos y todo lo que tenga texto o transparencia, y WebP cuando la app o el sitio de destino lo acepte y ayude un archivo más pequeño." },
      ],
    },
    pt: {
      summary: "O PicLite decodifica a imagem e cria um arquivo novo no formato escolhido. Mudar só a extensão do arquivo não converte.",
      notes: [
        "Escolha JPG para fotos quando a transparência não importa; PNG para capturas, texto e gráficos transparentes; WebP quando o app de destino aceitar; PDF para juntar imagens em um documento.",
        "As exportações de bitmap mantêm as dimensões da imagem decodificada. O PicLite não oferece redimensionamento, conversão vetorial nem exportação de animação. A decodificação AVIF e a codificação WebP dependem do navegador.",
      ],
      faq: [
        { question: "A conversão mantém metadados EXIF e GPS?", answer: "O PicLite redesenha os pixels decodificados em um canvas e exporta um arquivo novo, então não copia metadados EXIF nem GPS. Guarde o original se precisar dos dados da câmera ou da localização." },
        { question: "Posso converter imagens animadas?", answer: "O PicLite produz imagens estáticas. Ele não mantém sequências WebP animadas nem exporta arquivos animados; use um conversor especializado." },
        { question: "Qual formato escolher: JPG, PNG ou WebP?", answer: "Escolha JPG para fotos, PNG para capturas, logotipos e tudo com texto ou transparência, e WebP quando o app ou site de destino aceitar e um arquivo menor ajudar." },
      ],
    },
    de: {
      summary: "PicLite dekodiert das Bild und erstellt eine neue Datei im gewählten Format. Nur die Dateiendung zu ändern, konvertiert nicht.",
      notes: [
        "Wähle JPG für Fotos, wenn Transparenz keine Rolle spielt; PNG für Screenshots, Text und transparente Grafiken; WebP, wenn die Ziel-App es akzeptiert; PDF, um Bilder in einem Dokument zu bündeln.",
        "Bitmap-Exporte behalten die Abmessungen des dekodierten Bildes. PicLite bietet kein Verkleinern, keine Vektorkonvertierung und keinen Animationsexport. AVIF-Dekodierung und WebP-Kodierung hängen vom Browser ab.",
      ],
      faq: [
        { question: "Bleiben EXIF- und GPS-Daten bei der Konvertierung erhalten?", answer: "PicLite zeichnet die dekodierten Pixel auf ein Canvas und exportiert eine neue Datei, daher werden EXIF- oder GPS-Daten nicht kopiert. Behalte das Original, wenn du Kameradaten oder den Standort brauchst." },
        { question: "Kann ich animierte Bilder konvertieren?", answer: "PicLite erzeugt Standbilder. Animierte WebP-Sequenzen bleiben nicht erhalten und animierte Dateien werden nicht exportiert; nutze dafür einen spezialisierten Konverter." },
        { question: "Welches Format wählen: JPG, PNG oder WebP?", answer: "Wähle JPG für Fotos, PNG für Screenshots, Logos und alles mit Text oder Transparenz, und WebP, wenn die Ziel-App oder Website es akzeptiert und eine kleinere Datei hilft." },
      ],
    },
    fr: {
      summary: "PicLite décode l’image et crée un nouveau fichier au format choisi. Changer seulement l’extension du fichier ne le convertit pas.",
      notes: [
        "Choisissez le JPG pour les photos quand la transparence n’importe pas ; le PNG pour les captures, le texte et les graphiques transparents ; le WebP quand l’application destinataire l’accepte ; le PDF pour regrouper des images dans un document.",
        "Les exports bitmap conservent les dimensions de l’image décodée. PicLite ne propose ni redimensionnement, ni conversion vectorielle, ni export d’animation. Le décodage AVIF et l’encodage WebP dépendent du navigateur.",
      ],
      faq: [
        { question: "La conversion conserve-t-elle les métadonnées EXIF et GPS ?", answer: "PicLite redessine les pixels décodés sur un canevas et exporte un nouveau fichier : les métadonnées EXIF et GPS ne sont donc pas copiées. Gardez l’original si vous avez besoin des réglages de l’appareil ou de la localisation." },
        { question: "Puis-je convertir des images animées ?", answer: "PicLite produit des images fixes. Il ne conserve pas les séquences WebP animées et n’exporte pas de fichier animé ; utilisez un convertisseur spécialisé pour cela." },
        { question: "Quel format choisir : JPG, PNG ou WebP ?", answer: "Choisissez le JPG pour les photos, le PNG pour les captures, les logos et tout ce qui contient du texte ou de la transparence, et le WebP quand l’application ou le site de destination l’accepte et qu’un fichier plus léger aide." },
      ],
    },
    "zh-tw": {
      summary: "PicLite 會解碼圖片，並依選定格式建立新檔案。只改副檔名不會完成轉換。",
      notes: [
        "不需要透明背景的照片可選 JPG；截圖、文字和透明圖形可選 PNG；接收方支援時可選 WebP；要合併成文件可選 PDF。",
        "點陣匯出會保留解碼後的圖片尺寸，不提供調整尺寸、向量轉換或動畫匯出。AVIF 解碼與 WebP 編碼取決於瀏覽器支援。",
      ],
      faq: [
        { question: "轉換會保留 EXIF 與 GPS 資訊嗎？", answer: "PicLite 會在畫布上重繪解碼後的像素並匯出新檔案，不會複製原始 EXIF 或 GPS 資訊。如需保留拍攝參數或位置資訊，請保存原檔。" },
        { question: "可以轉換動態圖片嗎？", answer: "PicLite 輸出靜態圖片，不保留動態 WebP 的動畫序列，也不匯出動畫檔案。處理動畫請使用專用工具。" },
        { question: "該如何選擇 JPG、PNG 還是 WebP？", answer: "照片選 JPG；截圖、標誌，以及含文字或透明背景的圖片選 PNG；接收方支援且希望縮小檔案時選 WebP。" },
      ],
    },
    ja: {
      summary: "PicLiteは画像をデコードし、選んだ形式で新しいファイルを作成します。拡張子を変えるだけでは変換されません。",
      notes: [
        "透過が必要ない写真はJPG、スクリーンショット・文字・透過グラフィックはPNG、受け取り側が対応していればWebP、画像を文書にまとめるならPDFを選んでください。",
        "ビットマップ出力はデコード後の画像サイズを維持します。リサイズ、ベクター変換、アニメーション出力には対応していません。AVIFのデコードとWebPのエンコードはブラウザの対応状況によります。",
      ],
      faq: [
        { question: "変換するとEXIFやGPS情報は残りますか？", answer: "PicLiteはデコードしたピクセルをキャンバスに描き直して新しいファイルを書き出すため、元のEXIFやGPS情報はコピーされません。撮影情報や位置情報が必要な場合は元ファイルを保管してください。" },
        { question: "アニメーション画像も変換できますか？", answer: "PicLiteは静止画を出力します。アニメーションWebPのコマを保持したり、アニメーションファイルを書き出したりはしません。動きが必要な場合は専用ツールを使ってください。" },
        { question: "JPG、PNG、WebPのどれを選ぶべき？", answer: "写真はJPG、スクリーンショット・ロゴ・文字や透過を含む画像はPNG、受け取り側が対応していてファイルを小さくしたい場合はWebPを選んでください。" },
      ],
    },
    ru: {
      summary: "PicLite декодирует изображение и создаёт новый файл в выбранном формате. Смена только расширения файл не конвертирует.",
      notes: [
        "Выбирайте JPG для фото, когда прозрачность не нужна; PNG для скриншотов, текста и прозрачной графики; WebP, если принимающее приложение его поддерживает; PDF, чтобы объединить изображения в документ.",
        "Экспорт в растровые форматы сохраняет размеры декодированного изображения. PicLite не масштабирует, не конвертирует в вектор и не экспортирует анимацию. Декодирование AVIF и кодирование WebP зависят от браузера.",
      ],
      faq: [
        { question: "Сохраняются ли метаданные EXIF и GPS при конвертации?", answer: "PicLite перерисовывает декодированные пиксели на холсте и экспортирует новый файл, поэтому метаданные EXIF и GPS не копируются. Оставьте оригинал, если нужны параметры съёмки или геоданные." },
        { question: "Можно ли конвертировать анимированные изображения?", answer: "PicLite создаёт статичные изображения. Он не сохраняет анимацию WebP и не экспортирует анимированные файлы; для этого нужен специализированный конвертер." },
        { question: "Что выбрать: JPG, PNG или WebP?", answer: "Выбирайте JPG для фото, PNG для скриншотов, логотипов и всего с текстом или прозрачностью, а WebP — когда приложение или сайт его поддерживает и меньший файл помогает." },
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
    es: {
      summary: "PicLite usa un control de tamaño objetivo en JPG y WebP y ajusta la calidad de codificación en tu dispositivo para acercarse. Compara el resultado con el original antes de descargar.",
      notes: [
        "El control de tamaño objetivo se aplica a JPG y WebP y busca una salida igual o menor al tamaño elegido. La salida PNG es sin pérdida y no usa el control; recodificar un PNG no garantiza un archivo más pequeño.",
        "El conversor mantiene las dimensiones de la imagen y no puede garantizar el objetivo exacto porque el tamaño depende del contenido y del codificador del navegador. Una imagen ya optimizada puede seguir siendo más grande con la calidad mínima. Compara los tamaños de la lista de archivos.",
      ],
      faq: [
        { question: "¿Puedo comprimir una imagen a exactamente 100 KB o 200 KB?", answer: "PicLite puede apuntar a un tamaño con el control de JPG o WebP, pero no garantiza el tamaño exacto. Revisa el resultado y redimensiona la imagen primero si sigue siendo demasiado grande." },
        { question: "¿La compresión es sin pérdida?", answer: "JPG y WebP con calidad usan compresión con pérdida, que puede quitar detalle. La codificación PNG es sin pérdida para los píxeles decodificados, pero puede producir un archivo más grande y no recupera el detalle ya perdido en un JPG." },
        { question: "¿Conviene redimensionar o comprimir?", answer: "PicLite comprime sin cambiar las dimensiones en píxeles. Si la foto es mucho más grande que el uso final, redimensionarla antes en un editor suele ahorrar más espacio que solo bajar la calidad." },
      ],
    },
    pt: {
      summary: "O PicLite usa um controle de tamanho alvo em JPG e WebP e ajusta a qualidade de codificação no aparelho para chegar perto. Compare com o original antes de baixar.",
      notes: [
        "O controle de tamanho alvo vale para JPG e WebP e busca uma saída igual ou abaixo do tamanho escolhido. A saída PNG é sem perdas e não usa o controle; recodificar um PNG não garante um arquivo menor.",
        "O conversor mantém as dimensões e não garante o alvo exato porque o tamanho depende do conteúdo e do codificador do navegador. Uma imagem já otimizada pode continuar maior na qualidade mínima. Compare os tamanhos na lista de arquivos.",
      ],
      faq: [
        { question: "Dá para comprimir para exatamente 100 KB ou 200 KB?", answer: "O PicLite mira o tamanho com o controle de JPG ou WebP, mas não garante o valor exato. Confira o resultado e reduza a imagem antes se continuar grande demais." },
        { question: "A compressão é sem perdas?", answer: "JPG e WebP com qualidade usam compressão com perdas, que pode remover detalhes. A codificação PNG é sem perdas para os pixels decodificados, mas pode gerar um arquivo maior e não recupera o detalhe já perdido no JPG." },
        { question: "Vale mais redimensionar ou comprimir?", answer: "O PicLite comprime sem mudar as dimensões em pixels. Se a foto for muito maior que o uso final, redimensionar antes em um editor costuma economizar mais espaço do que só baixar a qualidade." },
      ],
    },
    de: {
      summary: "PicLite nutzt einen Regler für die Zielgröße bei JPG und WebP und passt die Kodierqualität auf deinem Gerät an. Vergleiche das Ergebnis vor dem Download mit dem Original.",
      notes: [
        "Der Regler für die Zielgröße gilt für JPG und WebP und strebt eine Ausgabe auf oder unter dem gewählten Wert an. PNG ist verlustfrei und nutzt den Regler nicht; erneutes Kodieren eines PNG verkleinert die Datei nicht zuverlässig.",
        "Der Konverter behält die Bildabmessungen bei und kann die exakte Zielgröße nicht garantieren, weil die Dateigröße vom Bildinhalt und vom Encoder des Browsers abhängt. Ein bereits optimiertes Bild kann selbst bei niedrigster Qualität größer bleiben. Vergleiche die Größen in der Dateiliste.",
      ],
      faq: [
        { question: "Kann ich ein Bild exakt auf 100 KB oder 200 KB komprimieren?", answer: "PicLite kann mit dem JPG- oder WebP-Regler eine Zielgröße anstreben, garantiert sie aber nicht. Prüfe das angezeigte Ergebnis und verkleinere das Bild zuerst, wenn es zu groß bleibt." },
        { question: "Ist die Kompression verlustfrei?", answer: "JPG und WebP mit Qualitätseinstellung nutzen verlustbehaftete Kompression, die Details entfernen kann. PNG ist für die dekodierten Pixel verlustfrei, kann aber größer sein und stellt bereits verlorene JPEG-Details nicht wieder her." },
        { question: "Sollte ich verkleinern oder komprimieren?", answer: "PicLite komprimiert ohne die Pixelmaße zu ändern. Ist ein Foto viel größer als der Verwendungszweck, spart Verkleinern in einem Editor meist mehr Platz als nur die Qualität zu senken." },
      ],
    },
    fr: {
      summary: "PicLite utilise un réglage de taille cible en JPG et WebP, puis ajuste la qualité d’encodage sur votre appareil pour s’en approcher. Comparez le résultat à l’original avant de télécharger.",
      notes: [
        "Le réglage de taille cible s’applique au JPG et au WebP et vise une sortie égale ou inférieure à la taille choisie. Le PNG est sans perte et ignore le réglage ; réencoder un PNG ne garantit pas un fichier plus léger.",
        "Le convertisseur conserve les dimensions de l’image et ne peut pas garantir la cible exacte, car la taille dépend du contenu et de l’encodeur du navigateur. Une image déjà optimisée peut rester plus lourde même à la qualité minimale. Comparez les tailles dans la liste des fichiers.",
      ],
      faq: [
        { question: "Puis-je compresser une image à exactement 100 Ko ou 200 Ko ?", answer: "PicLite peut viser une taille avec le réglage JPG ou WebP, mais ne garantit pas la valeur exacte. Vérifiez le résultat affiché et redimensionnez d’abord l’image si elle reste trop lourde." },
        { question: "La compression est-elle sans perte ?", answer: "Le JPG et le WebP avec réglage de qualité utilisent une compression avec pertes, qui peut supprimer des détails. Le PNG est sans perte pour les pixels décodés, mais peut produire un fichier plus lourd et ne restaure pas les détails déjà perdus en JPG." },
        { question: "Vaut-il mieux redimensionner ou compresser ?", answer: "PicLite compresse sans changer les dimensions en pixels. Si la photo est bien plus grande que son usage final, la redimensionner d’abord dans un éditeur économise souvent plus d’espace que baisser la qualité seule." },
      ],
    },
    "zh-tw": {
      summary: "PicLite 提供目標大小滑桿，並在裝置本機調整 JPG 或 WebP 的編碼品質，盡量接近選定大小。下載前請與原圖比較。",
      notes: [
        "目標大小適用於 JPG 與 WebP，目標是讓輸出不超過選定大小。PNG 為無損輸出，不使用目標大小滑桿，重新編碼也不保證檔案更小。",
        "轉換會保持圖片尺寸，無法保證精確達標，因為檔案大小取決於圖片內容與瀏覽器編碼器。已最佳化的圖片在最低品質下仍可能更大，請比較檔案清單顯示的大小。",
      ],
      faq: [
        { question: "可以把圖片壓縮到指定的 100KB 或 200KB 嗎？", answer: "PicLite 可以透過 JPG 或 WebP 的目標大小滑桿盡量接近指定大小，但不保證精確達標。請檢查顯示的結果；若仍然過大，可以先用編輯器縮小尺寸。" },
        { question: "圖片壓縮是無損的嗎？", answer: "JPG 與帶品質設定的 WebP 使用有損編碼，可能損失細節。PNG 對解碼後的像素採無損編碼，但檔案可能更大，也無法還原 JPG 已丟失的細節。" },
        { question: "該縮小尺寸還是壓縮品質？", answer: "PicLite 壓縮時保持像素尺寸不變。若照片遠大於實際用途，先用編輯器縮小尺寸，通常比單純降低品質更省空間。" },
      ],
    },
    ja: {
      summary: "PicLiteはJPGとWebPに目標サイズのスライダーを使い、端末内でエンコード品質を調整して近づけます。ダウンロード前に元画像と比較してください。",
      notes: [
        "目標サイズはJPGとWebPに適用され、選んだサイズ以下に収めることを目指します。PNGは可逆で目標は使われません。PNGを再エンコードしても必ず小さくなるわけではありません。",
        "画像の寸法はそのまま維持され、ファイルサイズは画像の内容とブラウザのエンコーダーに左右されるため、目標を正確に達成することはできません。すでに最適化された画像は最低品質でも大きいままのことがあります。ファイル一覧のサイズを比較してください。",
      ],
      faq: [
        { question: "画像をちょうど100KBや200KBに圧縮できますか？", answer: "PicLiteはJPGまたはWebPのスライダーで目標に近づけますが、正確なサイズは保証しません。表示された結果を確認し、大きすぎる場合は先に画像を縮小してください。" },
        { question: "圧縮は可逆ですか？", answer: "JPGと品質設定つきのWebPは非可逆圧縮で、細部が失われることがあります。PNGはデコード後のピクセルに対して可逆ですが、ファイルが大きくなることがあり、すでに失われたJPGの細部は戻りません。" },
        { question: "縮小と圧縮のどちらがよいですか？", answer: "PicLiteはピクセルサイズを変えずに圧縮します。写真が用途に対して大きすぎる場合は、先に編集ソフトで縮小した方が品質低下だけより容量を節約できることが多いです。" },
      ],
    },
    ru: {
      summary: "PicLite использует ползунок целевого размера для JPG и WebP и настраивает качество кодирования на вашем устройстве. Сравните результат с оригиналом перед скачиванием.",
      notes: [
        "Настройка целевого размера действует для JPG и WebP и стремится к результату на уровне выбранного значения или ниже. PNG сжимается без потерь и не использует цель; повторное кодирование PNG не гарантирует меньший файл.",
        "Конвертер сохраняет размеры изображения и не может гарантировать точную цель, потому что размер зависит от содержимого и кодировщика браузера. Уже оптимизированное изображение может остаться больше даже при минимальном качестве. Сравните размеры в списке файлов.",
      ],
      faq: [
        { question: "Можно ли сжать изображение ровно до 100 КБ или 200 КБ?", answer: "PicLite может стремиться к цели с помощью ползунка JPG или WebP, но не гарантирует точный размер. Проверьте результат и сначала уменьшите изображение, если оно остаётся слишком большим." },
        { question: "Сжатие без потерь?", answer: "JPG и WebP с настройкой качества используют сжатие с потерями, которое может убрать детали. PNG без потерь для декодированных пикселей, но может быть больше и не возвращает детали, уже потерянные в JPG." },
        { question: "Что лучше: уменьшить размеры или сжать?", answer: "PicLite сжимает, не меняя размеры в пикселях. Если фото намного больше места применения, уменьшение размеров в редакторе обычно экономит больше места, чем одно снижение качества." },
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
    es: {
      summary: "Define un tamaño objetivo y PicLite ajusta la calidad de JPG o WebP en tu dispositivo para acercarse a él. El resultado es un archivo nuevo; compáralo con el original antes de descargar.",
      notes: [
        "El objetivo se aplica a JPG y WebP. PNG se guarda sin pérdida e ignora el objetivo, porque volver a codificar un PNG no garantiza un archivo más pequeño.",
        "El objetivo es una meta, no una garantía: el tamaño final depende del contenido de la imagen y del codificador del navegador. Una foto ya optimizada puede superar el objetivo incluso con la calidad mínima.",
        "PicLite mantiene las dimensiones en píxeles. Si el archivo sigue superando un límite estricto, reduce primero el tamaño en un editor y vuelve a comprimir.",
        "El tamaño original y el resultado aparecen en la lista de archivos, así puedes comparar antes de descargar.",
        "Las fotos HEIC también se pueden convertir a JPG en esta página aplicando el mismo tamaño objetivo; todo se procesa en tu dispositivo.",
      ],
      faq: [
        { question: "¿Puedo comprimir una imagen exactamente a 100 KB?", answer: "PicLite apunta al objetivo y suele quedar por debajo, pero no garantiza un tamaño exacto. Revisa el resultado en la lista y baja el objetivo o reduce la imagen si un formulario la rechaza." },
        { question: "¿Qué formatos admiten un tamaño objetivo?", answer: "El control se aplica a JPG y WebP. PNG es sin pérdida e ignora el objetivo, así que convertir un PNG a JPG suele ser la forma de alcanzar un límite pequeño." },
        { question: "¿Por qué mi imagen sigue siendo más grande que el objetivo?", answer: "Las fotos muy grandes o con mucho detalle pueden no bajar del objetivo ni con la calidad mínima. Reduce primero las dimensiones y vuelve a comprimir." },
        { question: "¿Puedo comprimir varias imágenes al mismo objetivo?", answer: "Sí. Agrega un lote y todos los archivos se comprimen al mismo objetivo en una sola pasada; se descargan juntos en un ZIP." },
        { question: "¿Cómo puedo saber el tamaño de la foto?", answer: "La lista de archivos muestra el tamaño original y el resultado, junto con cuánto se redujo. También puedes verlo en las propiedades del archivo descargado." },
        { question: "¿Funciona con fotos del teléfono?", answer: "Sí. Funciona en navegadores móviles modernos y la conversión se ejecuta en el dispositivo. Las fotos HEIC del iPhone se convierten a JPG con el mismo objetivo." },
        { question: "¿Comprimir reduce la calidad de la foto?", answer: "JPG y WebP usan compresión con pérdida, así que bajar la calidad puede eliminar detalles. Con un objetivo amplio la diferencia suele ser mínima; compara el resultado con el original." },
        { question: "¿La compresión reduce la resolución?", answer: "No. PicLite mantiene las dimensiones en píxeles. Si necesitas menos resolución, ajusta el tamaño en un editor y vuelve a comprimir." },
        { question: "¿Necesito una cuenta o hay marca de agua?", answer: "No. Se usa gratis sin cuenta, no agrega marcas de agua y los archivos no se suben a un servidor." },
        { question: "¿Qué hago si el archivo no baja del objetivo?", answer: "Reduce las dimensiones en un editor o convierte el PNG a JPG y vuelve a comprimir." },
      ],
      useCases: [
        { title: "Trámites y formularios oficiales", body: "Muchos portales piden 'JPG, máximo 500 KB'. Fijar el objetivo un poco por debajo del límite reduce el riesgo de que el formulario rechace la foto." },
        { title: "Currículums y portales de empleo", body: "Cada sistema tiene su propio límite para la foto de perfil. Usa 100 KB o 200 KB como objetivo y revisa el resultado al instante." },
        { title: "WhatsApp, Telegram y correo", body: "Comprime varias fotos al mismo objetivo para no superar el límite de adjuntos; los resultados se descargan juntos en un ZIP." },
        { title: "Blogs y tiendas en línea", body: "Reducir el peso antes de publicar aligera la carga de la página. Procesar varias imágenes a la vez ahorra tiempo." },
        { title: "Espacio en el teléfono", body: "Puedes convertir fotos HEIC del iPhone a JPG y reducirlas al mismo tiempo. Conserva el original y comprime una copia." },
      ],
    },
    pt: {
      summary: "Defina um tamanho alvo e o PicLite ajusta a qualidade de JPG ou WebP no dispositivo para chegar perto dele. O resultado é um arquivo novo; compare com o original antes de baixar.",
      notes: [
        "O alvo vale para JPG e WebP. PNG é salvo sem perdas e ignora o alvo, porque recodificar um PNG não garante um arquivo menor.",
        "O alvo é uma meta, não uma garantia: o tamanho final depende do conteúdo da imagem e do codificador do navegador. Uma foto já otimizada pode passar do alvo mesmo na qualidade mínima.",
        "O PicLite mantém as dimensões em pixels. Se o arquivo ainda passar de um limite rígido, reduza primeiro o tamanho em um editor e comprima de novo.",
        "O tamanho original e o resultado aparecem na lista de arquivos, então dá para comparar antes de baixar.",
        "Fotos HEIC também podem ser convertidas para JPG nesta página com o mesmo alvo; tudo é processado no seu dispositivo.",
      ],
      faq: [
        { question: "Dá para comprimir uma imagem exatamente para 100 KB?", answer: "O PicLite mira o alvo e costuma ficar abaixo, mas não garante um tamanho exato. Confira o resultado na lista e baixe o alvo ou reduza a imagem se um formulário recusar." },
        { question: "Quais formatos aceitam um tamanho alvo?", answer: "O controle vale para saída JPG e WebP. PNG é sem perdas e ignora o alvo, então converter um PNG para JPG costuma ser o caminho para atingir um limite pequeno." },
        { question: "Por que minha imagem continua maior que o alvo?", answer: "Fotos muito grandes ou com muito detalhe podem não descer até o alvo nem na qualidade mínima. Reduza as dimensões primeiro e comprima de novo." },
        { question: "Posso comprimir várias imagens para o mesmo alvo?", answer: "Sim. Adicione um lote e todos os arquivos são comprimidos para o mesmo alvo de uma vez; eles baixam juntos em um ZIP." },
        { question: "Como vejo o tamanho da foto?", answer: "A lista de arquivos mostra o tamanho original e o resultado, além de quanto foi reduzido. Você também pode ver nas propriedades do arquivo baixado." },
        { question: "Funciona com fotos do celular?", answer: "Sim. Funciona em navegadores móveis modernos e a conversão roda no dispositivo. Fotos HEIC do iPhone são convertidas para JPG com o mesmo alvo." },
        { question: "Comprimir deixa a foto com menos qualidade?", answer: "JPG e WebP usam compressão com perdas, então baixar a qualidade pode remover detalhes. Com um alvo folgado a diferença costuma ser pequena; compare com o original." },
        { question: "A compressão reduz a resolução?", answer: "Não. O PicLite mantém as dimensões em pixels. Se precisar de menos resolução, ajuste o tamanho em um editor e comprima de novo." },
        { question: "Preciso de conta ou tem marca d'água?", answer: "Não. O uso é gratuito, sem conta, não adiciona marca d'água e os arquivos não são enviados a um servidor." },
        { question: "O que faço se o arquivo não chegar ao alvo?", answer: "Reduza as dimensões em um editor ou converta o PNG para JPG e comprima de novo." },
      ],
      useCases: [
        { title: "Formulários e processos oficiais", body: "Muitos portais pedem 'JPG, até 500 KB'. Definir o alvo um pouco abaixo do limite reduz o risco de o formulário recusar a foto." },
        { title: "Currículos e sites de emprego", body: "Cada sistema tem um limite para a foto de perfil. Use 100 KB ou 200 KB como alvo e confira o resultado na hora." },
        { title: "WhatsApp, Telegram e e-mail", body: "Comprima várias fotos para o mesmo alvo e fique dentro do limite de anexos; os resultados baixam juntos em um ZIP." },
        { title: "Blogs e lojas online", body: "Reduzir o peso antes de publicar deixa o carregamento mais leve. Processar várias imagens de uma vez economiza tempo." },
        { title: "Espaço no celular", body: "Dá para converter fotos HEIC do iPhone para JPG e reduzir ao mesmo tempo. Guarde o original e comprima uma cópia." },
      ],
    },
    de: {
      summary: "Setze eine Zielgröße und PicLite passt die Qualität von JPG oder WebP auf deinem Gerät an, um sie zu erreichen. Das Ergebnis ist eine neue Datei; vergleiche sie vor dem Download mit dem Original.",
      notes: [
        "Die Zielgröße gilt für JPG und WebP. PNG wird verlustfrei gespeichert und ignoriert das Ziel, weil erneutes Kodieren eines PNG keine kleinere Datei garantiert.",
        "Das Ziel ist ein Richtwert, keine Garantie: Die endgültige Größe hängt vom Bildinhalt und vom Encoder des Browsers ab. Ein bereits optimiertes Foto kann selbst bei niedrigster Qualität über dem Ziel bleiben.",
        "PicLite behält die Pixelmaße bei. Wenn eine Datei ein hartes Limit weiter überschreitet, verkleinere zuerst die Abmessungen in einem Editor und komprimiere erneut.",
        "Original- und Ergebnisgröße stehen in der Dateiliste, sodass du vor dem Download vergleichen kannst.",
        "HEIC-Fotos lassen sich auf dieser Seite auch zu JPG konvertieren und mit derselben Zielgröße verkleinern; alles läuft auf deinem Gerät.",
      ],
      faq: [
        { question: "Kann ich ein Bild exakt auf 100 KB komprimieren?", answer: "PicLite strebt das Ziel an und bleibt meist knapp darunter, garantiert aber keine exakte Größe. Prüfe das Ergebnis in der Liste und senke das Ziel oder verkleinere das Bild, wenn ein Formular es ablehnt." },
        { question: "Welche Formate unterstützen eine Zielgröße?", answer: "Der Regler gilt für JPG- und WebP-Ausgabe. PNG ist verlustfrei und ignoriert das Ziel; ein PNG zu JPG zu konvertieren ist daher oft der Weg zu einem kleinen Limit." },
        { question: "Warum ist mein Bild noch größer als das Ziel?", answer: "Sehr große oder detailreiche Fotos erreichen das Ziel auch bei niedrigster Qualität nicht. Verkleinere zuerst die Abmessungen und komprimiere erneut." },
        { question: "Kann ich mehrere Bilder auf dasselbe Ziel komprimieren?", answer: "Ja. Füge einen Stapel hinzu; alle Dateien werden in einem Durchgang auf dasselbe Ziel komprimiert und zusammen als ZIP heruntergeladen." },
        { question: "Wie sehe ich die Dateigröße meines Fotos?", answer: "Die Dateiliste zeigt Originalgröße und Ergebnis sowie die Einsparung. Auch in den Dateieigenschaften der heruntergeladenen Datei findest du die Größe." },
        { question: "Funktioniert es mit Handyfotos?", answer: "Ja. Es läuft in modernen mobilen Browsern und die Konvertierung läuft auf dem Gerät. HEIC-Fotos vom iPhone werden zu JPG konvertiert und erhalten dieselbe Zielgröße." },
        { question: "Verliert das Foto beim Komprimieren an Qualität?", answer: "JPG und WebP nutzen verlustbehaftete Kompression, daher kann eine niedrige Qualität Details entfernen. Bei einer großzügigen Zielgröße ist der Unterschied meist gering; vergleiche mit dem Original." },
        { question: "Wird die Auflösung beim Komprimieren verringert?", answer: "Nein. PicLite behält die Pixelmaße bei. Wenn du weniger Auflösung brauchst, passe die Größe in einem Editor an und komprimiere erneut." },
        { question: "Brauche ich ein Konto oder gibt es ein Wasserzeichen?", answer: "Nein. Die Nutzung ist kostenlos, ohne Konto, ohne Wasserzeichen, und die Dateien werden nicht auf einen Server hochgeladen." },
        { question: "Was mache ich, wenn die Datei das Ziel nicht erreicht?", answer: "Verkleinere die Abmessungen in einem Editor oder konvertiere das PNG zu JPG und komprimiere erneut." },
      ],
      useCases: [
        { title: "Behördliche Formulare und Bewerbungen", body: "Viele Portale verlangen JPG mit maximal 500 KB. Ein Ziel knapp unter dem Limit senkt das Risiko, dass das Formular das Foto ablehnt." },
        { title: "Lebenslauf und Jobportale", body: "Jedes System hat ein eigenes Limit fürs Profilfoto. Nutze 100 KB oder 200 KB als Ziel und prüfe das Ergebnis sofort." },
        { title: "WhatsApp, Telegram und E-Mail", body: "Komprimiere mehrere Fotos auf dasselbe Ziel, um Anhanglimits einzuhalten; die Ergebnisse kommen zusammen als ZIP." },
        { title: "Blogs und Onlineshops", body: "Vor dem Veröffentlichen reduziert, lädt die Seite schneller. Mehrere Bilder auf einmal zu verarbeiten spart Zeit." },
        { title: "Speicherplatz auf dem Handy", body: "HEIC-Fotos vom iPhone lassen sich zu JPG konvertieren und gleichzeitig verkleinern. Behalte das Original und komprimiere eine Kopie." },
      ],
    },
    fr: {
      summary: "Fixez une taille cible et PicLite ajuste la qualité JPG ou WebP sur votre appareil pour s’en approcher. Le résultat est un nouveau fichier ; comparez-le à l’original avant de télécharger.",
      notes: [
        "La cible s’applique au JPG et au WebP. Le PNG est enregistré sans perte et ignore la cible, car réencoder un PNG ne garantit pas un fichier plus petit.",
        "La cible est un objectif, pas une garantie : la taille finale dépend du contenu de l’image et de l’encodeur du navigateur. Une photo déjà optimisée peut dépasser la cible même à la qualité minimale.",
        "PicLite conserve les dimensions en pixels. Si le fichier dépasse encore une limite stricte, réduisez d’abord les dimensions dans un éditeur, puis compressez à nouveau.",
        "La taille d’origine et le résultat apparaissent dans la liste des fichiers, pour comparer avant de télécharger.",
        "Les photos HEIC peuvent aussi être converties en JPG sur cette page avec la même taille cible ; tout est traité sur votre appareil.",
      ],
      faq: [
        { question: "Puis-je compresser une image exactement à 100 Ko ?", answer: "PicLite vise la cible et reste généralement juste en dessous, mais ne garantit pas une taille exacte. Vérifiez le résultat dans la liste et baissez la cible ou réduisez l’image si un formulaire la refuse." },
        { question: "Quels formats acceptent une taille cible ?", answer: "Le réglage s’applique à la sortie JPG et WebP. Le PNG est sans perte et ignore la cible ; convertir un PNG en JPG est souvent le moyen d’atteindre une petite limite." },
        { question: "Pourquoi mon image reste-t-elle plus lourde que la cible ?", answer: "Les photos très grandes ou très détaillées peuvent ne pas descendre sous la cible même à la qualité minimale. Réduisez d’abord les dimensions, puis compressez à nouveau." },
        { question: "Puis-je compresser plusieurs images vers la même cible ?", answer: "Oui. Ajoutez un lot : tous les fichiers sont compressés vers la même cible en une passe et téléchargés ensemble dans un ZIP." },
        { question: "Comment connaître le poids de ma photo ?", answer: "La liste des fichiers affiche la taille d’origine et le résultat, ainsi que la réduction. Vous pouvez aussi le voir dans les propriétés du fichier téléchargé." },
        { question: "Est-ce que ça marche avec les photos du téléphone ?", answer: "Oui. Cela fonctionne dans les navigateurs mobiles modernes et la conversion s’exécute sur l’appareil. Les photos HEIC de l’iPhone sont converties en JPG avec la même cible." },
        { question: "La compression dégrade-t-elle la qualité ?", answer: "Le JPG et le WebP utilisent une compression avec pertes, donc baisser la qualité peut supprimer des détails. Avec une cible généreuse, la différence est souvent minime ; comparez avec l’original." },
        { question: "La compression réduit-elle la résolution ?", answer: "Non. PicLite conserve les dimensions en pixels. Si vous avez besoin de moins de résolution, ajustez la taille dans un éditeur puis compressez à nouveau." },
        { question: "Faut-il un compte ou y a-t-il un filigrane ?", answer: "Non. L’usage est gratuit, sans compte, sans filigrane, et les fichiers ne sont pas envoyés à un serveur." },
        { question: "Que faire si le fichier n’atteint pas la cible ?", answer: "Réduisez les dimensions dans un éditeur ou convertissez le PNG en JPG, puis compressez à nouveau." },
      ],
      useCases: [
        { title: "Démarches et formulaires officiels", body: "Beaucoup de portails demandent « JPG, 500 Ko maximum ». Une cible légèrement en dessous de la limite réduit le risque de refus." },
        { title: "CV et sites d’emploi", body: "Chaque système a sa propre limite pour la photo de profil. Utilisez 100 Ko ou 200 Ko comme cible et vérifiez le résultat immédiatement." },
        { title: "WhatsApp, Telegram et e-mail", body: "Compressez plusieurs photos vers la même cible pour rester sous la limite des pièces jointes ; les résultats se téléchargent ensemble dans un ZIP." },
        { title: "Blogs et boutiques en ligne", body: "Réduire le poids avant publication allège le chargement des pages. Traiter plusieurs images d’un coup fait gagner du temps." },
        { title: "Espace sur le téléphone", body: "Vous pouvez convertir les photos HEIC de l’iPhone en JPG et les réduire en même temps. Gardez l’original et compressez une copie." },
      ],
    },
    "zh-tw": {
      summary: "設定目標大小後，PicLite 會在裝置上調整 JPG 或 WebP 品質，盡量接近該大小。輸出的是新檔案，下載前請與原圖比較。",
      notes: [
        "目標大小僅適用於 JPG 與 WebP。PNG 以無損方式儲存，不受目標大小控制，因為重新編碼 PNG 不保證檔案更小。",
        "目標是參考值而非保證：最終大小取決於圖片內容與瀏覽器編碼器。已最佳化的照片即使使用最低品質，也可能高於目標值。",
        "PicLite 保持圖片像素尺寸不變。若檔案仍超過硬性限制，請先用編輯器縮小尺寸，再重新壓縮。",
        "檔案清單會顯示原始與結果檔案大小，下載前就能比較縮小幅度。",
        "HEIC 照片也可以在本頁轉成 JPG，並套用相同的目標大小；轉換與壓縮都在你的裝置上完成。",
      ],
      faq: [
        { question: "可以把圖片精確壓縮到 100KB 嗎？", answer: "PicLite 會盡量接近目標值，通常會略低於目標，但不保證精確大小。請在清單中查看結果；如果表單仍不接受，可以調低目標或先縮小圖片尺寸。" },
        { question: "哪些格式支援目標大小？", answer: "目標大小適用於 JPG 與 WebP 輸出。PNG 為無損格式，不受目標控制；若需要小檔案，把 PNG 轉成 JPG 通常是最快的方法。" },
        { question: "為什麼壓縮後仍大於目標值？", answer: "尺寸很大或細節很多照片，即使使用最低品質也可能無法低於目標。請先縮小尺寸，再重新壓縮。" },
        { question: "可以一次把多張圖片壓縮到同一目標嗎？", answer: "可以。一次加入多張圖片，所有檔案會朝同一目標壓縮，最後打包成 ZIP 一起下載。" },
        { question: "要怎麼確認照片的檔案大小？", answer: "檔案清單會顯示原始與結果大小，以及縮小的比例。下載後的檔案也可以在系統的檔案資訊中查看。" },
        { question: "手機照片也能壓縮嗎？", answer: "可以。支援現代手機瀏覽器，轉換在裝置上執行。iPhone 的 HEIC 照片可以轉成 JPG 並套用相同目標。" },
        { question: "壓縮會讓照片變模糊嗎？", answer: "JPG 與 WebP 使用有損壓縮，降低品質可能減少細節。目標大小充裕時差異通常不明顯，建議與原圖比較確認。" },
        { question: "壓縮會降低解析度嗎？", answer: "不會。PicLite 保持像素尺寸不變。若需要較低解析度，請先用編輯器調整尺寸再壓縮。" },
        { question: "需要註冊或會有浮水印嗎？", answer: "不需要。免費使用、免註冊、不會加上浮水印，檔案也不會上傳到伺服器。" },
        { question: "檔案縮不到目標大小怎麼辦？", answer: "先用編輯器縮小尺寸，或把 PNG 轉成 JPG 後再壓縮一次。" },
      ],
      useCases: [
        { title: "公務與考試報名照片", body: "許多報名網站要求「JPG、500KB 以下」。把目標設定得比限制稍低，可以降低被表單拒絕的風險。" },
        { title: "履歷與求職網站大頭照", body: "各系統的照片大小限制不同。以 100KB 或 200KB 為目標，並立即確認結果。" },
        { title: "LINE、WhatsApp 與電子郵件", body: "多張照片一次壓縮到相同目標，就不容易超過附件限制，結果會打包成 ZIP 下載。" },
        { title: "部落格與網路商店圖片", body: "發布前先縮小檔案，可讓網頁載入更輕快；批次處理多張圖片也能節省時間。" },
        { title: "手機儲存空間", body: "iPhone 的 HEIC 照片可以同時轉成 JPG 並縮小。保留原檔，壓縮複本就好。" },
      ],
    },
    ja: {
      summary: "目標サイズを設定すると、PicLiteが端末内でJPGまたはWebPの品質を調整して近づけます。出力は新しいファイルなので、ダウンロード前に元画像と比較してください。",
      notes: [
        "目標サイズはJPGとWebPに適用されます。PNGは可逆で保存され、目標は適用されません。PNGを再エンコードしてもファイルが小さくなる保証はありません。",
        "目標は目安であり保証ではありません。最終的なサイズは画像の内容とブラウザのエンコーダーに左右されます。すでに最適化された写真は最低品質でも目標を超えることがあります。",
        "PicLiteはピクセルサイズを維持します。厳しい上限を超える場合は、先に編集ソフトで寸法を縮めてから再圧縮してください。",
        "元ファイルと結果のサイズはファイル一覧に表示されるので、ダウンロード前に削減量を確認できます。",
        "HEIC写真もこのページでJPGに変換しながら同じ目標サイズを適用できます。変換と圧縮はすべて端末内で処理されます。",
      ],
      faq: [
        { question: "画像を正確に100KBに圧縮できますか？", answer: "PicLiteは目標値に近づけ、多くの場合は少し下回りますが、正確なサイズは保証しません。一覧で結果を確認し、フォームに拒否されたら目標を下げるか画像を縮小してください。" },
        { question: "目標サイズに対応する形式は？", answer: "JPGとWebPの出力に適用されます。PNGは可逆で目標が効かないため、小さな上限にはPNGをJPGに変換するのが近道です。" },
        { question: "圧縮しても目標より大きいのはなぜ？", answer: "非常に大きい、または細部の多い写真は最低品質でも目標を下回らないことがあります。まず寸法を縮めてから再圧縮してください。" },
        { question: "複数の画像を同じ目標に圧縮できますか？", answer: "はい。複数追加すると、すべて同じ目標に向けて一度に圧縮され、ZIPでまとめてダウンロードされます。" },
        { question: "ファイルサイズはどう確認しますか？", answer: "ファイル一覧に元サイズと結果、削減量が表示されます。ダウンロードしたファイルのプロパティでも確認できます。" },
        { question: "スマホの写真にも使えますか？", answer: "はい。最新のモバイルブラウザで動作し、変換は端末内で実行されます。iPhoneのHEIC写真も同じ目標でJPGに変換できます。" },
        { question: "圧縮すると画質は落ちますか？", answer: "JPGとWebPは非可逆圧縮のため、品質を下げると細部が失われることがあります。目標に余裕があれば差は小さいことが多く、元画像と比較して確認してください。" },
        { question: "圧縮すると解像度も下がりますか？", answer: "いいえ。PicLiteはピクセルサイズを維持します。解像度を下げたい場合は、編集ソフトでサイズを調整してから再圧縮してください。" },
        { question: "アカウント登録や透かしはありますか？", answer: "いいえ。無料で、アカウント不要、透かしも付かず、ファイルはサーバーに送信されません。" },
        { question: "目標サイズまで縮まないときは？", answer: "編集ソフトで寸法を縮めるか、PNGをJPGに変換してから再圧縮してください。" },
      ],
      useCases: [
        { title: "行政・試験の応募写真", body: "応募サイトは「JPG、500KB以下」のように指定することが多く、目標を少し低めに設定すると拒否されるリスクを減らせます。" },
        { title: "履歴書・求人サイトのプロフィール写真", body: "システムごとに上限が異なります。100KBや200KBを目標にして、結果をすぐ確認しましょう。" },
        { title: "LINE・メールの添付", body: "複数の写真を同じ目標に圧縮すれば添付上限を超えにくくなり、結果はZIPでまとめてダウンロードされます。" },
        { title: "ブログ・ネットショップの画像", body: "公開前に軽くするとページの読み込みが軽くなります。複数まとめて処理すると時短になります。" },
        { title: "スマホの空き容量", body: "iPhoneのHEIC写真をJPGに変換しながら容量も削減できます。元ファイルを残し、コピーを圧縮しましょう。" },
      ],
    },
    ru: {
      summary: "Задайте целевой размер, и PicLite подстроит качество JPG или WebP на вашем устройстве, чтобы приблизиться к нему. Результат — новый файл; сравните его с оригиналом перед скачиванием.",
      notes: [
        "Целевой размер действует для JPG и WebP. PNG сохраняется без потерь и игнорирует цель: повторное кодирование PNG не гарантирует меньший файл.",
        "Цель — ориентир, а не гарантия: итоговый размер зависит от содержимого изображения и кодировщика браузера. Уже оптимизированное фото может остаться больше цели даже при минимальном качестве.",
        "PicLite сохраняет размеры в пикселях. Если файл всё ещё превышает жёсткий лимит, сначала уменьшите размеры в редакторе, а затем сожмите снова.",
        "Исходный и итоговый размер показаны в списке файлов, поэтому результат можно сравнить до скачивания.",
        "Фото HEIC тоже можно конвертировать в JPG на этой странице с той же целью; всё обрабатывается на вашем устройстве.",
      ],
      faq: [
        { question: "Можно ли сжать изображение ровно до 100 КБ?", answer: "PicLite стремится к цели и обычно остаётся чуть ниже, но точный размер не гарантирует. Проверьте результат в списке и снизьте цель или уменьшите изображение, если форма его отклоняет." },
        { question: "Какие форматы поддерживают целевой размер?", answer: "Настройка действует для JPG и WebP. PNG не использует цель, поэтому для маленького лимита часто помогает конвертация PNG в JPG." },
        { question: "Почему изображение всё ещё больше цели?", answer: "Очень большие или детализированные фото могут не уложиться в цель даже при минимальном качестве. Сначала уменьшите размеры, затем сожмите снова." },
        { question: "Можно сжать несколько изображений до одной цели?", answer: "Да. Добавьте пакет: все файлы сжимаются к одной цели за один проход и скачиваются вместе в ZIP." },
        { question: "Как узнать размер фото?", answer: "В списке файлов показаны исходный и итоговый размер, а также экономия. Размер можно посмотреть и в свойствах скачанного файла." },
        { question: "Работает ли это с фото с телефона?", answer: "Да. Всё работает в современных мобильных браузерах, конвертация выполняется на устройстве. Фото HEIC с iPhone конвертируются в JPG с той же целью." },
        { question: "Сжатие ухудшает качество фото?", answer: "JPG и WebP используют сжатие с потерями, поэтому снижение качества может убрать детали. При щедрой цели разница обычно незаметна; сравните с оригиналом." },
        { question: "Сжатие уменьшает разрешение?", answer: "Нет. PicLite сохраняет размеры в пикселях. Если нужно меньшее разрешение, измените размер в редакторе и сожмите снова." },
        { question: "Нужна регистрация или есть водяной знак?", answer: "Нет. Всё бесплатно, без аккаунта, без водяных знаков, файлы не отправляются на сервер." },
        { question: "Что делать, если файл не укладывается в цель?", answer: "Уменьшите размеры в редакторе или конвертируйте PNG в JPG и сожмите снова." },
      ],
      useCases: [
        { title: "Госуслуги и заявления", body: "Многие порталы требуют «JPG, не более 500 КБ». Цель чуть ниже лимита снижает риск отказа формы." },
        { title: "Резюме и сайты вакансий", body: "У каждой системы свой лимит для фото профиля. Используйте 100 или 200 КБ и сразу проверяйте результат." },
        { title: "Мессенджеры и почта", body: "Сожмите несколько фото к одной цели, чтобы не превысить лимит вложений; результаты скачиваются вместе в ZIP." },
        { title: "Блоги и интернет-магазины", body: "Уменьшение веса до публикации ускоряет загрузку страниц. Пакетная обработка экономит время." },
        { title: "Место на телефоне", body: "Фото HEIC с iPhone можно конвертировать в JPG и сразу уменьшить. Сохраните оригинал и сожмите копию." },
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
    es: {
      summary: "Convierte fotos HEIC o HEIF a JPG cuando un formulario o una app no abra el original. PicLite carga un decodificador HEIC local al seleccionar el archivo. Puedes convertir una foto o un álbum completo; si hay varios resultados, se descargan juntos en un ZIP.",
      notes: [
        "El JPG se preselecciona con calidad 82%. El HEIC ya es eficiente, así que el JPG resultante puede pesar más; ajusta la calidad después de ver el resultado.",
        "El iPhone guarda las fotos como HEIC cuando la cámara está en 'Alta eficiencia'. Windows, Android y muchos formularios no abren HEIC, por eso suele necesitarse una copia en JPG.",
        "Puedes añadir un álbum completo. Todas las fotos se convierten en la misma sesión en tu dispositivo y los resultados se descargan juntos en un ZIP.",
        "Este flujo exporta una imagen fija: no conserva el movimiento de Live Photos, los datos de profundidad ni los metadatos del contenedor HEIC. Guarda el original para editar y archivar.",
      ],
      faq: [
        { question: "¿Por qué Windows no abre las fotos de mi iPhone?", answer: "El iPhone guarda las fotos como HEIC y Windows no las abre sin un códec adicional. Al convertirlas a JPG se abren en Windows, Android, aplicaciones de correo y formularios web." },
        { question: "¿Puedo convertir varias fotos HEIC a la vez?", answer: "Sí. Añade tantas fotos HEIC como necesites. Cada una se convierte en tu dispositivo y varios resultados se descargan juntos en un solo ZIP." },
        { question: "¿Cómo hago que el iPhone deje de tomar fotos HEIC?", answer: "Ve a Ajustes, Cámara, Formatos y elige 'Más compatible'. Las fotos nuevas se guardarán como JPG; las que ya tomaste en HEIC necesitan una conversión." },
        { question: "¿HEIC y HEIF son lo mismo?", answer: "HEIF es el formato contenedor y HEIC es el nombre que Apple usa para su variante de foto HEIF. PicLite acepta archivos .heic y .heif y los convierte a JPG." },
        { question: "¿Por qué el JPG pesa más que la foto HEIC?", answer: "El HEIC puede almacenar la foto de forma más eficiente que el JPG. La conversión mejora la compatibilidad pero no garantiza un archivo más pequeño; baja la calidad si hay un límite de tamaño." },
        { question: "¿Por qué la primera conversión HEIC tarda más?", answer: "El navegador descarga el decodificador HEIC cuando lo necesita y luego decodifica la foto. Las fotos grandes también requieren memoria del dispositivo; prueba con menos archivos si el teléfono se queda sin memoria." },
      ],
    },
    pt: {
      summary: "Converta fotos HEIC ou HEIF para JPG quando um formulário ou app não abrir o original. O PicLite carrega um decodificador HEIC local ao selecionar o arquivo. Dá para converter uma foto ou um álbum inteiro; com vários resultados, eles baixam juntos em um ZIP.",
      notes: [
        "O JPG vem predefinido com qualidade 82%. O HEIC já é eficiente, então o JPG pode ficar maior; ajuste a qualidade depois de ver o resultado.",
        "O iPhone salva fotos como HEIC quando a câmera está em 'Alta eficiência'. Windows, Android e muitos formulários não abrem HEIC, por isso uma cópia em JPG costuma ser necessária.",
        "Dá para adicionar um álbum inteiro. Todas as fotos são convertidas na mesma sessão no seu dispositivo e os resultados baixam juntos em um ZIP.",
        "Este fluxo exporta uma imagem estática: não mantém o movimento das Live Photos, dados de profundidade nem os metadados do contêiner HEIC. Guarde o original para editar e arquivar.",
      ],
      faq: [
        { question: "Por que o Windows não abre as fotos do meu iPhone?", answer: "O iPhone salva como HEIC e o Windows não abre sem um codec extra. Convertendo para JPG, as fotos abrem no Windows, Android, apps de e-mail e formulários." },
        { question: "Posso converter várias fotos HEIC de uma vez?", answer: "Sim. Adicione quantas fotos HEIC precisar. Cada uma é convertida no seu dispositivo e vários resultados baixam juntos em um único ZIP." },
        { question: "Como faço o iPhone parar de tirar fotos HEIC?", answer: "Vá em Ajustes, Câmera, Formatos e escolha 'Mais compatível'. As fotos novas serão JPG; as que já estão em HEIC precisam de uma conversão." },
        { question: "HEIC e HEIF são a mesma coisa?", answer: "HEIF é o formato contêiner e HEIC é o nome que a Apple usa para sua variante de foto HEIF. O PicLite aceita arquivos .heic e .heif e converte para JPG." },
        { question: "Por que o JPG fica maior que a foto HEIC?", answer: "O HEIC pode armazenar a foto de forma mais eficiente que o JPG. A conversão melhora a compatibilidade, mas não garante um arquivo menor; baixe a qualidade se houver limite de tamanho." },
        { question: "Por que a primeira conversão HEIC demora mais?", answer: "O navegador baixa o decodificador HEIC quando precisa e depois decodifica a foto. Fotos grandes também exigem memória do aparelho; use menos arquivos se o celular ficar sem memória." },
      ],
    },
    de: {
      summary: "Wandle HEIC- oder HEIF-Fotos in JPG um, wenn ein Formular oder eine App das Original nicht öffnet. PicLite lädt beim Auswählen einen lokalen HEIC-Decoder. Du kannst ein Foto oder ein ganzes Album konvertieren; mehrere Ergebnisse kommen zusammen als ZIP.",
      notes: [
        "JPG ist mit 82% Qualität voreingestellt. HEIC ist bereits effizient, daher kann das JPG größer ausfallen; prüfe das Ergebnis und passe die Qualität an.",
        "Das iPhone speichert Fotos als HEIC, wenn die Kamera auf 'Hohe Effizienz' steht. Windows, Android und viele Formulare öffnen HEIC nicht, deshalb ist eine JPG-Kopie meist nötig.",
        "Du kannst ein ganzes Album hinzufügen. Alle Fotos werden in derselben Sitzung auf deinem Gerät konvertiert und die Ergebnisse zusammen als ZIP heruntergeladen.",
        "Dieser Ablauf exportiert ein Standbild: Live-Photo-Bewegung, Tiefendaten und die Metadaten des HEIC-Containers bleiben nicht erhalten. Behalte das Original zum Bearbeiten und Archivieren.",
      ],
      faq: [
        { question: "Warum öffnet Windows die Fotos meines iPhones nicht?", answer: "Das iPhone speichert Fotos als HEIC und Windows öffnet sie ohne zusätzlichen Codec nicht. Nach der Konvertierung zu JPG öffnen sie sich unter Windows, Android, in E-Mail-Apps und Webformularen." },
        { question: "Kann ich mehrere HEIC-Fotos auf einmal konvertieren?", answer: "Ja. Füge so viele HEIC-Fotos hinzu, wie du brauchst. Jedes wird auf deinem Gerät konvertiert und mehrere Ergebnisse kommen zusammen als eine ZIP-Datei." },
        { question: "Wie stelle ich das iPhone auf JPG statt HEIC um?", answer: "Öffne Einstellungen, Kamera, Formate und wähle 'Maximale Kompatibilität'. Neue Fotos werden als JPG gespeichert; bereits aufgenommene HEIC-Fotos müssen einmal konvertiert werden." },
        { question: "Sind HEIC und HEIF dasselbe?", answer: "HEIF ist das Containerformat, HEIC ist Apples Name für seine HEIF-Fotovariante. PicLite akzeptiert .heic- und .heif-Dateien und konvertiert beide zu JPG." },
        { question: "Warum ist das JPG größer als das HEIC-Foto?", answer: "HEIC kann ein Foto effizienter speichern als JPG. Die Konvertierung verbessert die Kompatibilität, garantiert aber keine kleinere Datei; senke die Qualität, wenn es ein Größenlimit gibt." },
        { question: "Warum dauert die erste HEIC-Konvertierung länger?", answer: "Der Browser lädt den HEIC-Decoder bei Bedarf herunter und dekodiert dann das Foto. Große Fotos brauchen außerdem Gerätespeicher; nutze weniger Dateien, wenn dem Handy der Speicher ausgeht." },
      ],
    },
    fr: {
      summary: "Convertissez des photos HEIC ou HEIF en JPG lorsqu’un formulaire ou une application n’ouvre pas l’original. PicLite charge un décodeur HEIC local quand vous sélectionnez le fichier. Vous pouvez convertir une photo ou un album entier ; plusieurs résultats se téléchargent ensemble dans un ZIP.",
      notes: [
        "Le JPG est présélectionné à 82 % de qualité. Le HEIC étant déjà efficace, le JPG peut être plus lourd ; ajustez la qualité après avoir vu le résultat.",
        "L’iPhone enregistre les photos en HEIC quand l’appareil photo est réglé sur « Haute efficacité ». Windows, Android et de nombreux formulaires n’ouvrent pas le HEIC, d’où la copie JPG.",
        "Vous pouvez ajouter un album entier. Toutes les photos sont converties dans la même session sur votre appareil et les résultats se téléchargent ensemble dans un ZIP.",
        "Ce flux exporte une image fixe : il ne conserve ni le mouvement des Live Photos, ni les données de profondeur, ni les métadonnées du conteneur HEIC. Gardez l’original pour l’édition et l’archivage.",
      ],
      faq: [
        { question: "Pourquoi Windows n’ouvre-t-il pas les photos de mon iPhone ?", answer: "L’iPhone enregistre les photos en HEIC et Windows ne les ouvre pas sans codec supplémentaire. Après conversion en JPG, elles s’ouvrent sous Windows, Android, dans les applis de messagerie et les formulaires web." },
        { question: "Puis-je convertir plusieurs photos HEIC d’un coup ?", answer: "Oui. Ajoutez autant de photos HEIC que nécessaire. Chacune est convertie sur votre appareil et plusieurs résultats se téléchargent ensemble dans un seul ZIP." },
        { question: "Comment empêcher l’iPhone de prendre des photos HEIC ?", answer: "Ouvrez Réglages, Appareil photo, Formats et choisissez « Le plus compatible ». Les nouvelles photos seront en JPG ; celles déjà prises en HEIC nécessitent une conversion." },
        { question: "HEIC et HEIF, est-ce la même chose ?", answer: "HEIF est le format conteneur et HEIC le nom qu’Apple donne à sa variante photo HEIF. PicLite accepte les fichiers .heic et .heif et les convertit en JPG." },
        { question: "Pourquoi le JPG est-il plus lourd que la photo HEIC ?", answer: "Le HEIC peut stocker une photo plus efficacement que le JPG. La conversion améliore la compatibilité mais ne garantit pas un fichier plus petit ; baissez la qualité en cas de limite." },
        { question: "Pourquoi la première conversion HEIC est-elle plus lente ?", answer: "Le navigateur télécharge le décodeur HEIC à la demande puis décode la photo. Les grandes photos demandent aussi de la mémoire ; utilisez moins de fichiers si le téléphone manque de mémoire." },
      ],
    },
    "zh-tw": {
      summary: "表單或應用程式打不開原檔時，可把 HEIC 或 HEIF 靜態照片轉成 JPG。選擇 HEIC 檔案後，PicLite 會載入在裝置上執行的解碼器。可以轉換單張或整個相簿；多個結果會打包成 ZIP 一起下載。",
      notes: [
        "本頁預設 JPG 品質 82%。HEIC 本身壓縮效率高，轉出的 JPG 可能更大，請查看結果後調整品質。",
        "iPhone 相機設為「高效率」時會把照片存成 HEIC。Windows、Android 和許多網頁表單無法開啟 HEIC，因此通常需要 JPG 複本。",
        "可以一次加入整個相簿。所有照片都在同一個裝置端工作階段中轉換，多個結果會打包成 ZIP 一起下載。",
        "此流程輸出靜態圖片，不保留原況照片的動態內容、景深資料或原始 HEIC 容器中繼資料。編輯與備份請保留原檔。",
      ],
      faq: [
        { question: "為什麼 Windows 打不開 iPhone 照片？", answer: "iPhone 預設把照片存成 HEIC，Windows 未安裝額外解碼器就無法開啟。轉成 JPG 後，Windows、Android、郵件程式與網頁表單都能正常開啟。" },
        { question: "可以一次轉換多張 HEIC 照片嗎？", answer: "可以。一次加入任意數量的 HEIC 照片，每張都在你的裝置上轉換，多個結果會打包成單一 ZIP 下載。" },
        { question: "如何讓 iPhone 不再拍 HEIC 照片？", answer: "開啟「設定」→「相機」→「格式」，選擇「最相容」。之後新拍的照片會存成 JPG；先前拍攝的 HEIC 照片仍需轉換一次。" },
        { question: "HEIC 和 HEIF 一樣嗎？", answer: "HEIF 是容器格式，HEIC 是 Apple 為其照片變體使用的名稱。PicLite 同時接受 .heic 與 .heif 檔案，都能轉成 JPG。" },
        { question: "為什麼轉出的 JPG 比 HEIC 大？", answer: "HEIC 儲存照片的效率可能高於 JPG。轉換能改善相容性，但不保證檔案更小；若有容量限制，可以降低 JPG 品質。" },
        { question: "為什麼第一次轉換 HEIC 比較慢？", answer: "瀏覽器需要先下載 HEIC 解碼器，再解碼照片。大照片也需要裝置記憶體；手機記憶體不足時，請減少一次處理的檔案數量。" },
      ],
    },
    ja: {
      summary: "フォームやアプリが元ファイルを開けないとき、HEICまたはHEIFの静止画をJPGに変換します。HEICファイルを選ぶと、端末内で動くデコーダーを読み込みます。1枚でもアルバム全体でも変換でき、結果が複数ある場合はZIPでまとめてダウンロードされます。",
      notes: [
        "JPGは品質82%で選択されています。HEICはすでに効率のよい形式なので、変換後のJPGが大きくなることがあります。結果を確認して品質を調整してください。",
        "iPhoneのカメラが「高効率」設定の場合、写真はHEICで保存されます。Windows、Android、多くのWebフォームはHEICを開けないため、JPGのコピーが必要になります。",
        "アルバム全体をまとめて追加できます。すべての写真は同じ端末内セッションで変換され、複数の結果はZIPでまとめてダウンロードされます。",
        "この流れでは静止画を出力します。Live Photosの動き、深度データ、元のHEICコンテナのメタデータは保持されません。編集・保管用に元ファイルを残してください。",
      ],
      faq: [
        { question: "WindowsでiPhoneの写真が開けないのはなぜ？", answer: "iPhoneは既定でHEICで保存し、Windowsは追加コーデックなしでは開けません。JPGに変換すれば、Windows、Android、メールアプリ、Webフォームで開けます。" },
        { question: "複数のHEIC写真を一度に変換できますか？", answer: "はい。必要な数だけHEIC写真を追加してください。それぞれ端末内で変換され、複数の結果は1つのZIPでダウンロードされます。" },
        { question: "iPhoneでHEICではなくJPGで撮るには？", answer: "設定のカメラ、フォーマットの順に開き、「互換性優先」を選びます。以降の新しい写真はJPGで保存され、すでに撮ったHEIC写真は一度変換が必要です。" },
        { question: "HEICとHEIFは同じものですか？", answer: "HEIFはコンテナ形式で、HEICはAppleが写真用HEIFに付けた名前です。PicLiteは.heicと.heifの両方を受け付け、JPGに変換します。" },
        { question: "変換したJPGがHEICより大きいのはなぜ？", answer: "HEICはJPGより効率よく保存できることがあります。変換は互換性を高めますが、ファイルが小さくなる保証はありません。上限がある場合はJPG品質を下げてください。" },
        { question: "最初のHEIC変換が遅いのはなぜ？", answer: "ブラウザが必要になった時点でHEICデコーダーをダウンロードし、その後で写真をデコードします。大きな写真は端末メモリも使うため、メモリ不足なら一度に処理する枚数を減らしてください。" },
      ],
    },
    ru: {
      summary: "Конвертируйте фото HEIC или HEIF в JPG, когда форма или приложение не открывает оригинал. PicLite загружает локальный декодер HEIC при выборе файла. Можно конвертировать одно фото или целый альбом; несколько результатов скачиваются вместе в ZIP.",
      notes: [
        "JPG выбран с качеством 82%. HEIC уже эффективен, поэтому JPG может получиться больше; проверьте результат и настройте качество.",
        "iPhone сохраняет фото в HEIC, когда камера настроена на «Высокая эффективность». Windows, Android и многие формы не открывают HEIC, поэтому нужна копия в JPG.",
        "Можно добавить целый альбом. Все фото конвертируются в одной сессии на вашем устройстве, а результаты скачиваются вместе в ZIP.",
        "Этот режим сохраняет только статичное изображение: движение Live Photos, данные глубины и метаданные контейнера HEIC не сохраняются. Оставьте оригинал для редактирования и архива.",
      ],
      faq: [
        { question: "Почему Windows не открывает фото с iPhone?", answer: "iPhone сохраняет фото в HEIC, а Windows не открывает их без дополнительного кодека. После конвертации в JPG они открываются в Windows, Android, почтовых приложениях и веб-формах." },
        { question: "Можно конвертировать несколько фото HEIC сразу?", answer: "Да. Добавьте столько фото HEIC, сколько нужно. Каждое конвертируется на вашем устройстве, а несколько результатов скачиваются вместе одним ZIP-архивом." },
        { question: "Как заставить iPhone снимать в JPG вместо HEIC?", answer: "Откройте «Настройки», затем «Камера», затем «Форматы» и выберите «Наиболее совместимый». Новые фото будут сохраняться в JPG; уже снятые HEIC нужно конвертировать." },
        { question: "HEIC и HEIF — это одно и то же?", answer: "HEIF — это формат-контейнер, а HEIC — название, которое Apple использует для своего варианта фото HEIF. PicLite принимает файлы .heic и .heif и конвертирует их в JPG." },
        { question: "Почему JPG больше фото HEIC?", answer: "HEIC может хранить фото эффективнее, чем JPG. Конвертация улучшает совместимость, но не гарантирует меньший файл; снизьте качество, если есть лимит размера." },
        { question: "Почему первая конвертация HEIC идёт дольше?", answer: "Браузер загружает декодер HEIC при необходимости, а затем декодирует фото. Большим фото нужна ещё и память устройства; уменьшите число файлов, если телефону не хватает памяти." },
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
    es: {
      summary: "PicLite convierte una imagen WebP en un JPG fijo con fondo blanco. Úsalo cuando un formulario de carga o un editor antiguo no acepte WebP.",
      notes: [
        "El JPG no conserva la transparencia. PicLite rellena las zonas transparentes con blanco; elige PNG si necesitas mantenerla.",
        "Convertir un WebP con pérdida a JPG añade otra codificación con pérdida. Subir la calidad no recupera el detalle perdido y el archivo puede pesar más.",
      ],
      faq: [
        { question: "¿Qué pasa con los fondos transparentes de WebP?", answer: "PicLite dibuja un fondo blanco antes de exportar el JPG. Para conservar píxeles transparentes, selecciona PNG como salida." },
        { question: "¿Un WebP animado sigue animado como JPG?", answer: "No. El JPG es un formato fijo y PicLite no exporta secuencias de animación. Conserva el WebP original si el movimiento importa." },
        { question: "¿Conviene convertir WebP a JPG o a PNG?", answer: "Elige JPG para fotos cuando importe un archivo pequeño y PNG cuando la imagen tenga transparencia o bordes definidos, porque el JPG rellena la transparencia con blanco y puede difuminar líneas finas." },
      ],
    },
    pt: {
      summary: "O PicLite transforma uma imagem WebP em um JPG estático com fundo branco. Use quando um formulário ou editor antigo não aceitar WebP.",
      notes: [
        "O JPG não guarda transparência. O PicLite preenche as áreas transparentes com branco; escolha PNG se precisar mantê-las.",
        "Converter um WebP com perdas para JPG adiciona outra etapa com perdas. Aumentar a qualidade não recupera o detalhe perdido e o arquivo pode ficar maior.",
      ],
      faq: [
        { question: "O que acontece com fundos transparentes do WebP?", answer: "O PicLite desenha um fundo branco antes de exportar o JPG. Para manter pixels transparentes, selecione PNG como saída." },
        { question: "Um WebP animado continua animado como JPG?", answer: "Não. O JPG é estático e o PicLite não exporta sequências de animação. Guarde o WebP original se o movimento importa." },
        { question: "Devo converter WebP para JPG ou PNG?", answer: "Escolha JPG para fotos quando um arquivo pequeno importa e PNG quando a imagem tiver transparência ou bordas nítidas, porque o JPG troca a transparência por branco e pode borrar linhas finas." },
      ],
    },
    de: {
      summary: "PicLite macht aus einem WebP-Bild ein Standbild-JPG mit weißem Hintergrund. Nutze es, wenn ein Upload-Formular oder ein älterer Editor WebP nicht akzeptiert.",
      notes: [
        "JPG speichert keine Transparenz. PicLite füllt transparente Bereiche mit Weiß; wähle PNG, wenn sie erhalten bleiben sollen.",
        "Ein verlustbehaftetes WebP zu JPG zu konvertieren, fügt einen weiteren verlustbehafteten Schritt hinzu. Höhere Qualität holt verlorene Details nicht zurück und die Datei kann größer werden.",
      ],
      faq: [
        { question: "Was passiert mit transparenten WebP-Hintergründen?", answer: "PicLite zeichnet vor dem Export ein weißes Feld. Um transparente Pixel zu behalten, wähle PNG als Ausgabe." },
        { question: "Bleibt ein animiertes WebP als JPG animiert?", answer: "Nein. JPG ist ein Standbildformat und PicLite exportiert keine Animationsfolgen. Behalte das originale WebP, wenn Bewegung wichtig ist." },
        { question: "Sollte ich WebP zu JPG oder PNG konvertieren?", answer: "Wähle JPG für Fotos, wenn eine kleine Datei wichtig ist, und PNG, wenn das Bild Transparenz oder scharfe Kanten hat, weil JPG Transparenz durch Weiß ersetzt und feine Linien weichzeichnen kann." },
      ],
    },
    fr: {
      summary: "PicLite transforme une image WebP en JPG fixe avec fond blanc. À utiliser quand un formulaire ou un éditeur ancien n’accepte pas le WebP.",
      notes: [
        "Le JPG ne conserve pas la transparence. PicLite remplit les zones transparentes en blanc ; choisissez le PNG si vous devez la garder.",
        "Convertir un WebP avec pertes en JPG ajoute une autre étape avec pertes. Augmenter la qualité ne récupère pas les détails perdus et le fichier peut grossir.",
      ],
      faq: [
        { question: "Que deviennent les fonds transparents du WebP ?", answer: "PicLite dessine un fond blanc avant d’exporter le JPG. Pour conserver les pixels transparents, choisissez le PNG en sortie." },
        { question: "Un WebP animé reste-t-il animé en JPG ?", answer: "Non. Le JPG est une image fixe et PicLite n’exporte pas de séquence animée. Gardez le WebP d’origine si le mouvement compte." },
        { question: "Faut-il convertir le WebP en JPG ou en PNG ?", answer: "Choisissez le JPG pour les photos quand un fichier léger compte, et le PNG quand l’image a de la transparence ou des bords nets, car le JPG remplace la transparence par du blanc et peut flouter les traits fins." },
      ],
    },
    "zh-tw": {
      summary: "PicLite 會把 WebP 圖片轉成白底靜態 JPG。適合不接受 WebP 的上傳表單或舊版編輯器。",
      notes: [
        "JPG 不保留透明度。PicLite 會把透明區域填成白色；若需要保留透明度，請選擇 PNG。",
        "有損 WebP 轉成 JPG 會再經過一次有損編碼。提高品質無法還原已遺失的細節，輸出檔案也可能變大。",
      ],
      faq: [
        { question: "WebP 的透明背景會變成什麼？", answer: "PicLite 在輸出 JPG 前會先畫上白色背景。若要保留透明像素，請選擇 PNG 輸出。" },
        { question: "動態 WebP 轉成 JPG 後還會動嗎？", answer: "不會。JPG 是靜態格式，PicLite 不輸出動畫序列。若需要動態效果，請保留原始 WebP。" },
        { question: "WebP 該轉成 JPG 還是 PNG？", answer: "重視檔案大小且是照片時選 JPG；圖片有透明區域或清晰邊緣時選 PNG，因為 JPG 會把透明區域變成白色，也可能讓細線變模糊。" },
      ],
    },
    ja: {
      summary: "PicLiteはWebP画像を白背景の静止JPGに変換します。WebPを受け付けないアップロードフォームや古い編集ソフトで使えます。",
      notes: [
        "JPGは透過を保存できません。PicLiteは透明部分を白で塗りつぶすため、透過を保ちたい場合はPNGを選んでください。",
        "非可逆WebPをJPGにすると、さらに非可逆エンコードが加わります。品質を上げても失われた細部は戻らず、ファイルが大きくなることがあります。",
      ],
      faq: [
        { question: "WebPの透明な背景はどうなりますか？", answer: "PicLiteはJPGを書き出す前に白い背景を描きます。透明ピクセルを残したい場合はPNGを選んでください。" },
        { question: "アニメーションWebPはJPGでも動きますか？", answer: "いいえ。JPGは静止画形式で、PicLiteはアニメーションを出力しません。動きが必要なら元のWebPを残してください。" },
        { question: "WebPはJPGとPNGのどちらに変換すべき？", answer: "ファイルサイズが重要な写真はJPG、透過や輪郭がはっきりした画像はPNGを選んでください。JPGは透明部分を白に置き換え、細い線をぼかすことがあります。" },
      ],
    },
    ru: {
      summary: "PicLite превращает изображение WebP в статичный JPG с белым фоном. Используйте, когда форма загрузки или старый редактор не принимает WebP.",
      notes: [
        "JPG не сохраняет прозрачность. PicLite заполняет прозрачные области белым; если она нужна, выберите PNG.",
        "Конвертация WebP с потерями в JPG добавляет ещё один этап с потерями. Повышение качества не вернёт утраченные детали, а файл может стать больше.",
      ],
      faq: [
        { question: "Что происходит с прозрачным фоном WebP?", answer: "Перед экспортом JPG PicLite рисует белый фон. Чтобы сохранить прозрачные пиксели, выберите PNG." },
        { question: "Анимированный WebP останется анимированным в JPG?", answer: "Нет. JPG — формат статичного изображения, и PicLite не экспортирует анимацию. Сохраните оригинал WebP, если важна анимация." },
        { question: "Что лучше: WebP в JPG или в PNG?", answer: "Выбирайте JPG для фото, когда важен небольшой файл, и PNG, когда в изображении есть прозрачность или чёткие края: JPG заменяет прозрачность белым и может размывать тонкие линии." },
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
    es: {
      summary: "Convierte PNG a JPG para cargas que exigen JPEG. PicLite conserva las dimensiones en píxeles y reemplaza las zonas transparentes con blanco.",
      notes: [
        "El JPG funciona bien en fotos. Para textos pequeños, diagramas definidos y logotipos puede convenir más el PNG, ya que el JPG puede crear artefactos visibles en los bordes.",
        "La salida JPG tiene pérdida, incluso con calidad alta. Guarda el PNG original para futuras ediciones y revisa el tamaño del resultado, porque la conversión no siempre reduce el archivo.",
      ],
      faq: [
        { question: "¿PNG a JPG conserva el fondo transparente?", answer: "No. El JPG no almacena píxeles transparentes; PicLite los reemplaza con blanco. Conserva el PNG o usa WebP si necesitas transparencia." },
        { question: "¿PNG a JPG reduce las dimensiones de la imagen?", answer: "No. PicLite exporta con las dimensiones decodificadas. La calidad afecta la codificación y el tamaño del archivo, no el ancho ni el alto." },
        { question: "¿Cuándo conviene conservar el PNG?", answer: "Conserva el PNG en capturas, diagramas, logotipos e imágenes con texto o transparencia. El JPG funciona bien en fotos, pero puede dejar artefactos en bordes definidos." },
      ],
    },
    pt: {
      summary: "Converta PNG para JPG para envios que exigem JPEG. O PicLite mantém as dimensões em pixels e troca as áreas transparentes por branco.",
      notes: [
        "O JPG funciona bem em fotos. Para textos pequenos, diagramas nítidos e logotipos, o PNG pode ser melhor, pois o JPG pode criar artefatos visíveis nas bordas.",
        "A saída JPG tem perdas, mesmo em qualidade alta. Guarde o PNG original para edições futuras e confira o tamanho do resultado, porque a conversão nem sempre reduz o arquivo.",
      ],
      faq: [
        { question: "PNG para JPG mantém o fundo transparente?", answer: "Não. O JPG não guarda pixels transparentes; o PicLite troca por branco. Mantenha o PNG ou use WebP se precisar de transparência." },
        { question: "PNG para JPG reduz as dimensões da imagem?", answer: "Não. O PicLite exporta nas dimensões decodificadas. A qualidade afeta a codificação e o tamanho do arquivo, não a largura nem a altura." },
        { question: "Quando vale a pena manter o PNG?", answer: "Mantenha o PNG em capturas, diagramas, logotipos e imagens com texto ou transparência. O JPG funciona bem em fotos, mas pode deixar artefatos em bordas nítidas." },
      ],
    },
    de: {
      summary: "Wandle PNG in JPG um, wenn ein Upload JPEG verlangt. PicLite behält die Pixelmaße bei und ersetzt transparente Bereiche durch Weiß.",
      notes: [
        "JPG eignet sich gut für Fotos. Bei kleiner Schrift, scharfen Diagrammen und Logos ist PNG oft besser, weil JPG an Kanten sichtbare Artefakte erzeugen kann.",
        "JPG ist auch bei hoher Qualität verlustbehaftet. Behalte das PNG für spätere Bearbeitungen und prüfe die Ergebnisgröße, denn die Konvertierung verkleinert die Datei nicht immer.",
      ],
      faq: [
        { question: "Bleibt ein transparenter Hintergrund bei PNG zu JPG erhalten?", answer: "Nein. JPG speichert keine transparenten Pixel; PicLite ersetzt sie durch Weiß. Behalte PNG oder nutze WebP, wenn Transparenz nötig ist." },
        { question: "Verringert PNG zu JPG die Bildabmessungen?", answer: "Nein. PicLite exportiert in den dekodierten Abmessungen. Die Qualität beeinflusst Kodierung und Dateigröße, nicht Breite oder Höhe." },
        { question: "Wann sollte ich PNG behalten?", answer: "Behalte PNG bei Screenshots, Diagrammen, Logos und Bildern mit Text oder Transparenz. JPG eignet sich gut für Fotos, kann aber an scharfen Kanten Artefakte hinterlassen." },
      ],
    },
    fr: {
      summary: "Convertissez un PNG en JPG pour les envois qui exigent du JPEG. PicLite conserve les dimensions en pixels et remplace les zones transparentes par du blanc.",
      notes: [
        "Le JPG convient bien aux photos. Pour les petits textes, les schémas nets et les logos, le PNG peut être préférable, car le JPG peut créer des artefacts visibles sur les bords.",
        "La sortie JPG est avec pertes, même à haute qualité. Gardez le PNG d’origine pour les retouches et vérifiez la taille du résultat, car la conversion ne réduit pas toujours le fichier.",
      ],
      faq: [
        { question: "Le PNG vers JPG garde-t-il un fond transparent ?", answer: "Non. Le JPG ne stocke pas de pixels transparents ; PicLite les remplace par du blanc. Gardez le PNG ou utilisez le WebP si la transparence est nécessaire." },
        { question: "Le PNG vers JPG réduit-il les dimensions de l’image ?", answer: "Non. PicLite exporte aux dimensions décodées. La qualité influe sur l’encodage et le poids, pas sur la largeur ni la hauteur." },
        { question: "Quand faut-il garder le PNG ?", answer: "Gardez le PNG pour les captures d’écran, schémas, logos et images avec du texte ou de la transparence. Le JPG convient aux photos mais peut laisser des artefacts sur les bords nets." },
      ],
    },
    "zh-tw": {
      summary: "需要 JPEG 上傳時，可把 PNG 轉成 JPG。PicLite 保持像素尺寸，並把透明區域換成白色。",
      notes: [
        "照片用 JPG 通常合適。小字、清晰圖表與標誌用 PNG 可能更好；JPG 可能在邊緣產生可見的壓縮痕跡。",
        "JPG 即使品質高仍是有損輸出。請保留原始 PNG 以便後續編輯，並檢查輸出大小，因為轉換不一定能縮小檔案。",
      ],
      faq: [
        { question: "PNG 轉 JPG 會保留透明背景嗎？", answer: "不會。JPG 無法儲存透明像素，PicLite 會填成白色。需要透明度時請保留 PNG 或改用 WebP。" },
        { question: "PNG 轉 JPG 會縮小圖片尺寸嗎？", answer: "不會。PicLite 依解碼後的尺寸輸出。品質影響編碼與檔案大小，不會改變寬高。" },
        { question: "什麼情況該保留 PNG？", answer: "截圖、圖表、標誌，以及含文字或透明背景的圖片建議保留 PNG。JPG 適合照片，但可能在清晰邊緣留下壓縮痕跡。" },
      ],
    },
    ja: {
      summary: "JPEGでのアップロードが必要なとき、PNGをJPGに変換します。PicLiteはピクセルサイズを維持し、透明部分を白に置き換えます。",
      notes: [
        "写真にはJPGが向いています。小さな文字、鮮明な図表、ロゴにはPNGの方が適することがあり、JPGは輪郭に目立つ圧縮の跡が出ることがあります。",
        "JPGは高品質でも非可逆です。後から編集できるよう元のPNGを残し、変換で必ずしも小さくならないため結果サイズを確認してください。",
      ],
      faq: [
        { question: "PNGからJPGで透明な背景は残りますか？", answer: "いいえ。JPGは透明ピクセルを保存できず、PicLiteは白で置き換えます。透過が必要ならPNGを残すかWebPを使ってください。" },
        { question: "PNGからJPGで画像サイズは小さくなりますか？", answer: "いいえ。PicLiteはデコード後のサイズで出力します。品質はエンコードとファイルサイズに影響し、幅や高さは変わりません。" },
        { question: "PNGのまま残すべきなのはどんなとき？", answer: "スクリーンショット、図表、ロゴ、文字や透過を含む画像はPNGのままがおすすめです。JPGは写真に向きますが、輪郭に圧縮の跡が残ることがあります。" },
      ],
    },
    ru: {
      summary: "Конвертируйте PNG в JPG для загрузок, где требуется JPEG. PicLite сохраняет размеры в пикселях и заменяет прозрачные области белым.",
      notes: [
        "JPG хорошо подходит для фото. Для мелкого текста, чётких схем и логотипов PNG может быть лучше: JPG оставляет заметные артефакты по краям.",
        "JPG остаётся форматом с потерями даже при высоком качестве. Сохраните оригинал PNG для дальнейшего редактирования и проверяйте размер результата: конвертация не всегда уменьшает файл.",
      ],
      faq: [
        { question: "Сохранится ли прозрачный фон при конвертации PNG в JPG?", answer: "Нет. JPG не хранит прозрачные пиксели, PicLite заменяет их белым. Оставьте PNG или используйте WebP, если нужна прозрачность." },
        { question: "Уменьшит ли PNG в JPG размеры изображения?", answer: "Нет. PicLite экспортирует с декодированными размерами. Качество влияет на кодирование и размер файла, но не на ширину и высоту." },
        { question: "Когда лучше сохранить PNG?", answer: "Оставляйте PNG для скриншотов, схем, логотипов и изображений с текстом или прозрачностью. JPG хорош для фото, но может оставлять артефакты на чётких краях." },
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
    es: {
      summary: "Convierte JPG o JPEG a PNG cuando un editor o flujo de trabajo requiera PNG. El PNG viene preseleccionado y se codifica sin pérdida a partir de los píxeles decodificados.",
      notes: [
        "Convertir JPG a PNG no recupera el detalle perdido en la compresión JPEG: solo codifica sin pérdida la imagen tal como se decodifica.",
        "El PNG puede pesar mucho más que el JPG. La conversión tampoco elimina el fondo ni lo vuelve transparente; para eso necesitas un editor de imágenes.",
      ],
      faq: [
        { question: "¿JPG a PNG mejora la calidad?", answer: "Evita otra codificación JPG con pérdida, pero no recupera detalle perdido ni elimina los artefactos JPEG. El contenido visible y las dimensiones siguen igual." },
        { question: "¿Por qué el control de calidad está desactivado para PNG?", answer: "PicLite exporta PNG sin pérdida. El codificador PNG del navegador no usa el ajuste de calidad de JPG y WebP, así que el control no se aplica." },
        { question: "¿Conviene convertir JPG a PNG antes de editar o imprimir?", answer: "Convertir a PNG es útil cuando el editor lo exige, pero no recupera detalle ni da más nitidez. Para imprimir, el JPG original suele bastar." },
      ],
    },
    pt: {
      summary: "Converta JPG ou JPEG para PNG quando um editor ou fluxo exigir PNG. O PNG vem predefinido e é codificado sem perdas a partir dos pixels decodificados.",
      notes: [
        "Converter JPG para PNG não recupera o detalhe perdido na compressão JPEG: apenas codifica sem perdas a imagem como ela foi decodificada.",
        "O PNG pode ser bem maior que o JPG. A conversão também não remove o fundo nem o deixa transparente; para isso é preciso um editor de imagens.",
      ],
      faq: [
        { question: "JPG para PNG melhora a qualidade?", answer: "Evita outra codificação JPG com perdas, mas não recupera detalhe perdido nem remove artefatos JPEG. O conteúdo visível e as dimensões continuam iguais." },
        { question: "Por que o controle de qualidade fica desativado no PNG?", answer: "O PicLite exporta PNG sem perdas. O codificador PNG do navegador não usa o ajuste de qualidade de JPG e WebP, então o controle não se aplica." },
        { question: "Devo converter JPG para PNG antes de editar ou imprimir?", answer: "Converter para PNG ajuda quando o editor exige, mas não recupera detalhe nem deixa a imagem mais nítida. Para imprimir, o JPG original costuma bastar." },
      ],
    },
    de: {
      summary: "Wandle JPG oder JPEG in PNG um, wenn ein Editor oder Ablauf PNG verlangt. PNG ist vorausgewählt und wird verlustfrei aus den dekodierten Pixeln kodiert.",
      notes: [
        "JPG zu PNG stellt keine Details wieder her, die bei der JPEG-Kompression verloren gingen: Es kodiert das dekodierte Bild nur verlustfrei.",
        "PNG kann deutlich größer sein als JPG. Die Konvertierung entfernt auch keinen Hintergrund und macht ihn nicht transparent; dafür brauchst du einen Bildeditor.",
      ],
      faq: [
        { question: "Verbessert JPG zu PNG die Qualität?", answer: "Es vermeidet einen weiteren verlustbehafteten JPG-Schritt, holt aber keine verlorenen Details zurück und entfernt keine JPEG-Artefakte. Sichtbarer Inhalt und Abmessungen bleiben gleich." },
        { question: "Warum ist der Qualitätsregler bei PNG deaktiviert?", answer: "PicLite exportiert PNG verlustfrei. Der PNG-Encoder des Browsers nutzt die Qualitätseinstellung von JPG und WebP nicht, daher greift der Regler nicht." },
        { question: "Sollte ich JPG vor dem Bearbeiten oder Drucken in PNG umwandeln?", answer: "Die Konvertierung hilft, wenn der Editor PNG verlangt, macht das Bild aber nicht schärfer und stellt keine Details wieder her. Zum Drucken reicht meist das originale JPG." },
      ],
    },
    fr: {
      summary: "Convertissez un JPG ou JPEG en PNG lorsqu’un éditeur ou un flux exige du PNG. Le PNG est présélectionné et encodé sans perte à partir des pixels décodés.",
      notes: [
        "Convertir un JPG en PNG ne restaure pas les détails perdus à la compression JPEG : cela encode simplement sans perte l’image telle qu’elle est décodée.",
        "Le PNG peut être bien plus lourd que le JPG. La conversion ne détoure pas le fond et ne le rend pas transparent ; cela nécessite un éditeur d’images.",
      ],
      faq: [
        { question: "Le JPG vers PNG améliore-t-il la qualité ?", answer: "Cela évite un nouvel encodage JPG avec pertes, mais ne restaure pas les détails perdus et ne supprime pas les artefacts JPEG. Le contenu visible et les dimensions restent identiques." },
        { question: "Pourquoi le réglage de qualité est-il désactivé pour le PNG ?", answer: "PicLite exporte le PNG sans perte. L’encodeur PNG du navigateur n’utilise pas le réglage de qualité JPG et WebP, donc le curseur ne s’applique pas." },
        { question: "Faut-il convertir le JPG en PNG avant d’éditer ou d’imprimer ?", answer: "La conversion aide quand l’éditeur l’exige, mais ne restaure pas les détails et ne rend pas l’image plus nette. Pour l’impression, le JPG d’origine suffit généralement." },
      ],
    },
    "zh-tw": {
      summary: "編輯器或工作流程需要 PNG 時，可把 JPG 或 JPEG 轉成 PNG。本頁預設 PNG，並對解碼後的像素採無損編碼。",
      notes: [
        "JPG 轉 PNG 不會還原 JPEG 壓縮時遺失的細節，只是把目前解碼出的影像以無損方式編碼。",
        "PNG 可能比 JPG 大很多。轉換也不會去背或讓背景透明；去背需要使用影像編輯器。",
      ],
      faq: [
        { question: "JPG 轉 PNG 會提升畫質嗎？", answer: "可以避免再一次 JPG 有損編碼，但無法還原遺失的細節或移除 JPEG 壓縮痕跡。可見內容與像素尺寸都不變。" },
        { question: "為什麼選 PNG 後品質滑桿不能調整？", answer: "PicLite 以無損方式輸出 PNG。瀏覽器的 PNG 編碼器不使用 JPG 與 WebP 的品質設定，因此滑桿不適用。" },
        { question: "編輯或列印前該把 JPG 轉成 PNG 嗎？", answer: "編輯器要求 PNG 時轉換是合理的，但不會還原細節或讓圖片更銳利。列印通常用原始 JPG 就足夠。" },
      ],
    },
    ja: {
      summary: "編集ソフトやフローがPNGを求める場合に、JPGやJPEGをPNGへ変換します。PNGが選択済みで、デコード後のピクセルは可逆でエンコードされます。",
      notes: [
        "JPGをPNGにしても、JPEG圧縮で失われた細部は戻りません。デコードされた画像を可逆でエンコードするだけです。",
        "PNGはJPGよりはるかに大きくなることがあります。変換で背景が消えたり透明になったりもしません。背景の除去には画像編集ソフトが必要です。",
      ],
      faq: [
        { question: "JPGからPNGにすると画質は良くなりますか？", answer: "非可逆のJPGエンコードをもう一度行うのは避けられますが、失われた細部は戻らず、JPEGの圧縮痕も消えません。見た目とピクセルサイズは同じです。" },
        { question: "PNGを選ぶと品質スライダーが使えないのはなぜ？", answer: "PicLiteはPNGを可逆で出力します。ブラウザのPNGエンコーダーはJPGとWebPの品質設定を使わないため、スライダーは適用されません。" },
        { question: "編集や印刷の前にJPGをPNGへ変換すべき？", answer: "編集ソフトがPNGを求める場合は役立ちますが、細部は戻らず、よりシャープにもなりません。印刷なら元のJPGで十分なことがほとんどです。" },
      ],
    },
    ru: {
      summary: "Конвертируйте JPG или JPEG в PNG, когда редактор или процесс требует PNG. PNG выбран заранее и кодируется без потерь из декодированных пикселей.",
      notes: [
        "Конвертация JPG в PNG не возвращает детали, потерянные при сжатии JPEG: изображение просто кодируется без потерь в текущем декодированном виде.",
        "PNG может быть намного больше JPG. Конвертация также не удаляет фон и не делает его прозрачным; для этого нужен графический редактор.",
      ],
      faq: [
        { question: "Улучшает ли конвертация JPG в PNG качество?", answer: "Она избегает ещё одного этапа сжатия JPEG, но не возвращает утраченные детали и не убирает артефакты JPEG. Видимое содержимое и размеры остаются теми же." },
        { question: "Почему для PNG отключён ползунок качества?", answer: "PicLite экспортирует PNG без потерь. Кодировщик PNG в браузере не использует настройку качества JPG и WebP, поэтому ползунок не применяется." },
        { question: "Стоит ли конвертировать JPG в PNG перед редактированием или печатью?", answer: "Конвертация помогает, если редактор требует PNG, но не возвращает детали и не делает изображение чётче. Для печати обычно достаточно исходного JPG." },
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
    es: {
      summary: "PicLite combina las imágenes de la lista de archivos en un solo PDF, con una imagen por página. En esta página el PDF viene preseleccionado.",
      notes: [
        "Cada página sigue las dimensiones y la orientación de su imagen; no hay un diseño fijo A4 o Carta. Revisa el orden de la lista antes de convertir; por ahora no se puede reordenar arrastrando.",
        "Las imágenes se codifican como JPG dentro del PDF con la calidad elegida y las zonas transparentes se vuelven blancas. El resultado contiene páginas de imagen, no texto OCR buscable.",
      ],
      faq: [
        { question: "¿Puedo combinar varias fotos en un solo PDF?", answer: "Sí. Añade las imágenes, revisa el orden en la lista, elige PDF y crea el documento. PicLite coloca una imagen por página y descarga un único PDF combinado." },
        { question: "¿El texto escaneado queda buscable en el PDF?", answer: "No. PicLite inserta las imágenes en las páginas sin reconocimiento óptico de caracteres. Usa una herramienta OCR si necesitas texto buscable o seleccionable." },
        { question: "¿Conviene enviar el PDF o las imágenes originales?", answer: "El PDF guarda varias imágenes en un archivo y conserva su orden, lo que conviene para formularios y envíos de documentos. Envía las imágenes si la otra persona necesita editarlas o recortarlas por separado." },
      ],
    },
    pt: {
      summary: "O PicLite junta as imagens da lista de arquivos em um único PDF, com uma imagem por página. Nesta página o PDF vem predefinido.",
      notes: [
        "Cada página segue as dimensões e a orientação da imagem; não existe layout fixo A4 ou Carta. Confira a ordem da lista antes de converter; por enquanto não dá para reordenar arrastando.",
        "As imagens são codificadas como JPG dentro do PDF na qualidade escolhida e áreas transparentes viram branco. O resultado tem páginas de imagem, sem texto OCR pesquisável.",
      ],
      faq: [
        { question: "Posso juntar várias fotos em um PDF?", answer: "Sim. Adicione as imagens, confira a ordem na lista, escolha PDF e crie o documento. O PicLite coloca uma imagem por página e baixa um único PDF." },
        { question: "O texto digitalizado fica pesquisável no PDF?", answer: "Não. O PicLite insere as imagens nas páginas sem reconhecimento óptico de caracteres. Use uma ferramenta de OCR se precisar de texto pesquisável ou selecionável." },
        { question: "Devo enviar o PDF ou as imagens originais?", answer: "O PDF guarda várias imagens em um arquivo e mantém a ordem, o que ajuda em formulários e envios de documento. Envie as imagens se a outra pessoa precisar editar ou recortar cada uma." },
      ],
    },
    de: {
      summary: "PicLite fügt die Bilder der Dateiliste zu einem PDF zusammen, ein Bild pro Seite. Auf dieser Seite ist PDF vorausgewählt.",
      notes: [
        "Jede Seite übernimmt Abmessungen und Ausrichtung ihres Bildes; ein festes A4- oder Letter-Layout gibt es nicht. Prüfe die Reihenfolge in der Liste vor der Konvertierung; per Ziehen lässt sie sich derzeit nicht ändern.",
        "Die Bilder werden im PDF als JPG mit der gewählten Qualität kodiert, transparente Bereiche werden weiß. Das Ergebnis enthält Bildseiten, keinen durchsuchbaren OCR-Text.",
      ],
      faq: [
        { question: "Kann ich mehrere Fotos in einem PDF zusammenfassen?", answer: "Ja. Füge die Bilder hinzu, prüfe die Reihenfolge in der Liste, wähle PDF und erstelle das Dokument. PicLite legt ein Bild pro Seite an und lädt ein einzelnes PDF herunter." },
        { question: "Wird gescannter Text im PDF durchsuchbar?", answer: "Nein. PicLite bettet die Bilder ohne Texterkennung in PDF-Seiten ein. Nutze ein OCR-Werkzeug, wenn du durchsuchbaren oder markierbaren Text brauchst." },
        { question: "Sollte ich das PDF oder die Originalbilder senden?", answer: "Das PDF bündelt mehrere Bilder in einer Datei und behält die Reihenfolge, was für Formulare und Dokumentenversand praktisch ist. Sende die Bilder, wenn die andere Person sie einzeln bearbeiten oder zuschneiden muss." },
      ],
    },
    fr: {
      summary: "PicLite assemble les images de la liste en un seul PDF, une image par page. Sur cette page, le PDF est présélectionné.",
      notes: [
        "Chaque page reprend les dimensions et l’orientation de son image ; il n’y a pas de mise en page A4 ou Lettre fixe. Vérifiez l’ordre dans la liste avant de convertir ; le glisser-déposer n’est pas encore possible.",
        "Les images sont encodées en JPG dans le PDF à la qualité choisie et les zones transparentes deviennent blanches. Le résultat contient des pages d’images, sans texte OCR recherchable.",
      ],
      faq: [
        { question: "Puis-je rassembler plusieurs photos dans un seul PDF ?", answer: "Oui. Ajoutez les images, vérifiez l’ordre dans la liste, choisissez PDF et créez le document. PicLite place une image par page et télécharge un seul PDF." },
        { question: "Le texte scanné devient-il recherchable dans le PDF ?", answer: "Non. PicLite insère les images dans les pages sans reconnaissance de caractères. Utilisez un outil OCR si vous avez besoin de texte recherchable ou sélectionnable." },
        { question: "Faut-il envoyer le PDF ou les images d’origine ?", answer: "Le PDF regroupe plusieurs images dans un fichier et conserve l’ordre, ce qui convient aux formulaires et aux dépôts de documents. Envoyez les images si la personne doit les retoucher ou les recadrer séparément." },
      ],
    },
    "zh-tw": {
      summary: "PicLite 會把檔案清單中的圖片合併成一份 PDF，每張圖片一頁。本頁預設輸出 PDF。",
      notes: [
        "每頁依圖片本身的尺寸與方向呈現，沒有固定的 A4 或 Letter 版面。轉換前請確認檔案清單順序；目前不支援拖曳排序。",
        "PDF 內的圖片以選定品質編碼成 JPG，透明區域會變成白色。輸出內容是圖片頁面，沒有可搜尋的 OCR 文字。",
      ],
      faq: [
        { question: "可以把多張照片合併成一份 PDF 嗎？", answer: "可以。加入圖片、確認清單順序、選擇 PDF 後建立文件。PicLite 會每頁放一張圖片，並下載單一合併 PDF。" },
        { question: "圖片轉 PDF 後，掃描的文字可以搜尋嗎？", answer: "不行。PicLite 把圖片嵌入 PDF 頁面，不進行文字辨識。需要可搜尋或可選取的文字時，請使用 OCR 工具。" },
        { question: "該傳送 PDF 還是原始圖片？", answer: "PDF 把多張圖片收進單一檔案並保留順序，適合表單與文件送件。若對方需要個別編輯或裁切，直接傳送圖片更合適。" },
      ],
    },
    ja: {
      summary: "PicLiteはファイル一覧の画像を1つのPDFにまとめ、1枚につき1ページにします。このページではPDFが選択済みです。",
      notes: [
        "各ページは画像の寸法と向きに従い、固定のA4やレターのレイアウトはありません。変換前に一覧の順序を確認してください。現在ドラッグでの並べ替えはできません。",
        "PDF内の画像は選んだ品質でJPGとしてエンコードされ、透明部分は白になります。出力は画像ページで、検索可能なOCRテキストは含まれません。",
      ],
      faq: [
        { question: "複数の写真を1つのPDFにできますか？", answer: "はい。画像を追加し、一覧で順序を確認してPDFを選ぶと、1枚につき1ページのPDFを1つダウンロードできます。" },
        { question: "スキャンした文字はPDFで検索できますか？", answer: "いいえ。PicLiteは画像をPDFページに埋め込むだけで、文字認識は行いません。検索・選択できるテキストが必要な場合はOCRツールを使ってください。" },
        { question: "PDFと元画像のどちらを送るべき？", answer: "PDFは複数の画像を1ファイルに順序どおりまとめるため、フォーム提出や書類送付に向いています。相手が個別に編集・トリミングする場合は画像をそのまま送ってください。" },
      ],
    },
    ru: {
      summary: "PicLite объединяет изображения из списка файлов в один PDF, по одной картинке на страницу. На этой странице PDF выбран заранее.",
      notes: [
        "Каждая страница повторяет размеры и ориентацию своего изображения; фиксированного формата A4 или Letter нет. Проверьте порядок в списке до конвертации; перетаскивать строки пока нельзя.",
        "Изображения внутри PDF кодируются как JPG с выбранным качеством, прозрачные области становятся белыми. Результат содержит страницы с картинками, без распознанного OCR-текста.",
      ],
      faq: [
        { question: "Можно объединить несколько фото в один PDF?", answer: "Да. Добавьте изображения, проверьте порядок в списке, выберите PDF и создайте документ. PicLite разместит по одной картинке на страницу и скачает один объединённый PDF." },
        { question: "Будет ли отсканированный текст доступен для поиска в PDF?", answer: "Нет. PicLite вставляет изображения в страницы PDF без распознавания текста. Для поиска и выделения текста используйте OCR-инструмент." },
        { question: "Что отправить: PDF или исходные изображения?", answer: "PDF объединяет несколько картинок в одном файле и сохраняет порядок, что удобно для форм и подачи документов. Отправляйте изображения, если получателю нужно редактировать или обрезать их по отдельности." },
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
    es: {
      summary: "PicLite renderiza cada página del PDF como una imagen independiente y exporta archivos JPG. Captura la apariencia completa de la página en lugar de extraer las fotos originales incrustadas.",
      notes: [
        "Las páginas se renderizan hasta el doble de su tamaño natural en el PDF, con un máximo de 4096 píxeles en el lado largo. La calidad JPG cambia la compresión, no esta resolución de renderizado.",
        "Varios resultados se descargan como ZIP. Los documentos grandes necesitan más memoria del dispositivo; prueba con un documento más pequeño si falla. Los PDF protegidos con contraseña necesitan una copia desbloqueada porque esta interfaz no pide contraseña.",
      ],
      faq: [
        { question: "¿PDF a JPG extrae las imágenes originales del PDF?", answer: "No. PicLite renderiza cada página completa, incluidos texto, gráficos y diseño, como imagen. Si necesitas los archivos de imagen incrustados, usa una herramienta de extracción de imágenes de PDF." },
        { question: "¿Puedo convertir solo algunas páginas del PDF?", answer: "PicLite renderiza todas las páginas al inicio. Cuando aparezcan en la lista, elimina las que no necesites y convierte las restantes." },
        { question: "¿Cuándo conviene PDF a JPG en vez de una captura de pantalla?", answer: "PDF a JPG renderiza la página completa con hasta 4096 píxeles en el lado largo, así que captura la página de forma más fiable que una captura de pantalla; funciona bien con diapositivas, carteles y páginas sueltas." },
      ],
    },
    pt: {
      summary: "O PicLite renderiza cada página do PDF como uma imagem separada e exporta arquivos JPG. Ele captura a aparência completa da página em vez de extrair as fotos originais embutidas.",
      notes: [
        "As páginas são renderizadas em até o dobro do tamanho natural no PDF, com limite de 4096 pixels no lado maior. A qualidade do JPG muda a compressão, não essa resolução de renderização.",
        "Vários resultados baixam como ZIP. Documentos grandes exigem mais memória do aparelho; teste um documento menor se falhar. PDFs com senha precisam de uma cópia desbloqueada porque esta interface não pede senha.",
      ],
      faq: [
        { question: "PDF para JPG extrai as imagens originais do PDF?", answer: "Não. O PicLite renderiza a página inteira, com texto, gráficos e layout, como imagem. Se precisar dos arquivos de imagem embutidos, use uma ferramenta de extração de imagens de PDF." },
        { question: "Posso converter só algumas páginas do PDF?", answer: "O PicLite renderiza todas as páginas primeiro. Quando elas aparecerem na lista, remova as que não precisar e converta as restantes." },
        { question: "Quando é melhor usar PDF para JPG em vez de uma captura de tela?", answer: "O PDF para JPG renderiza a página inteira com até 4096 pixels no lado maior, então captura a página de forma mais confiável que uma captura de tela; funciona bem com slides, pôsteres e páginas únicas." },
      ],
    },
    de: {
      summary: "PicLite rendert jede PDF-Seite als eigenes Bild und exportiert JPG-Dateien. Es erfasst das vollständige Seitenbild, statt die eingebetteten Originalfotos zu extrahieren.",
      notes: [
        "Seiten werden bis zur doppelten natürlichen PDF-Größe gerendert, begrenzt auf 4096 Pixel an der längeren Kante. Die JPG-Qualität ändert die Kompression, nicht diese Renderauflösung.",
        "Mehrere Ergebnisse werden als ZIP heruntergeladen. Große Dokumente brauchen mehr Gerätespeicher; versuche bei Fehlern ein kleineres Dokument. Passwortgeschützte PDFs brauchen eine entsperrte Kopie, weil diese Oberfläche kein Passwort abfragt.",
      ],
      faq: [
        { question: "Extrahiert PDF zu JPG die Originalbilder aus dem PDF?", answer: "Nein. PicLite rendert jede vollständige Seite inklusive Text, Grafik und Layout als Bild. Wenn du die eingebetteten Bilddateien brauchst, nutze ein PDF-Bildextraktionswerkzeug." },
        { question: "Kann ich nur ausgewählte PDF-Seiten konvertieren?", answer: "PicLite rendert zunächst alle Seiten. Sobald sie in der Dateiliste erscheinen, entferne die nicht benötigten und konvertiere die übrigen." },
        { question: "Wann ist PDF zu JPG besser als ein Screenshot?", answer: "PDF zu JPG rendert die ganze Seite mit bis zu 4096 Pixeln an der längeren Kante und erfasst sie damit zuverlässiger als ein Screenshot; das eignet sich gut für Folien, Poster und einzelne Seiten." },
      ],
    },
    fr: {
      summary: "PicLite rend chaque page du PDF en image distincte puis exporte des fichiers JPG. Il capture l’apparence complète de la page au lieu d’extraire les photos d’origine intégrées.",
      notes: [
        "Les pages sont rendues jusqu’à deux fois leur taille naturelle dans le PDF, avec un maximum de 4096 pixels sur le bord le plus long. La qualité JPG change la compression, pas cette résolution de rendu.",
        "Plusieurs résultats se téléchargent en ZIP. Les gros documents demandent plus de mémoire ; essayez un document plus petit en cas d’échec. Les PDF protégés par mot de passe nécessitent une copie déverrouillée, car cette interface ne demande pas de mot de passe.",
      ],
      faq: [
        { question: "Le PDF vers JPG extrait-il les images d’origine du PDF ?", answer: "Non. PicLite rend la page entière, texte, graphiques et mise en page compris, sous forme d’image. Si vous voulez les fichiers images intégrés, utilisez un outil d’extraction d’images PDF." },
        { question: "Puis-je convertir seulement certaines pages du PDF ?", answer: "PicLite rend d’abord toutes les pages. Quand elles apparaissent dans la liste, supprimez celles dont vous n’avez pas besoin puis convertissez les autres." },
        { question: "Quand préférer PDF vers JPG à une capture d’écran ?", answer: "PDF vers JPG rend la page entière avec jusqu’à 4096 pixels sur le bord le plus long : la page est capturée plus fidèlement qu’avec une capture d’écran, idéal pour les diapositives, affiches et pages uniques." },
      ],
    },
    "zh-tw": {
      summary: "PicLite 會把 PDF 每一頁轉成獨立圖片，再輸出 JPG 檔案。它保留整頁外觀，而不是取出文件中嵌入的原始照片。",
      notes: [
        "頁面最高以 PDF 原始尺寸的兩倍轉換，長邊上限為 4096 像素。JPG 品質只改變壓縮程度，不影響這個轉換解析度。",
        "多個結果會打包成 ZIP 下載。大型文件需要較多裝置記憶體；若轉換失敗，可改用較小的文件。此介面沒有密碼輸入功能，加密 PDF 需要先解除鎖定的副本。",
      ],
      faq: [
        { question: "PDF 轉 JPG 會取出 PDF 中的原始圖片嗎？", answer: "不會。PicLite 會把包含文字、圖形與版面的整頁轉成圖片。若需要文件中嵌入的原始圖片檔，請使用 PDF 圖片擷取工具。" },
        { question: "可以只轉換 PDF 中特定頁面嗎？", answer: "PicLite 會先轉換所有頁面。頁面出現在檔案清單後，可以移除不需要的頁面，再轉換剩下的圖片。" },
        { question: "什麼時候該用 PDF 轉 JPG 而不是截圖？", answer: "PDF 轉 JPG 會把整頁以長邊最高 4096 像素轉換，比截圖更完整可靠，適合投影片、海報與單頁文件。" },
      ],
    },
    ja: {
      summary: "PicLiteはPDFの各ページを個別の画像として描画し、JPGファイルで書き出します。埋め込まれた元写真を抽出するのではなく、ページ全体の見た目をキャプチャします。",
      notes: [
        "ページはPDFの自然なサイズの最大2倍まで、長辺4096ピクセルを上限に描画されます。JPG品質は圧縮を変えるだけで、この描画解像度は変わりません。",
        "結果が複数あるとZIPでダウンロードされます。大きな文書は端末メモリを多く使うため、失敗する場合は小さめの文書で試してください。この画面にはパスワード入力がなく、暗号化PDFはロック解除済みのコピーが必要です。",
      ],
      faq: [
        { question: "PDFからJPGは元の画像を抽出しますか？", answer: "いいえ。PicLiteは文字、図形、レイアウトを含むページ全体を画像として描画します。埋め込まれた元画像ファイルが必要な場合はPDF画像抽出ツールを使ってください。" },
        { question: "PDFの一部のページだけ変換できますか？", answer: "PicLiteはまず全ページを描画します。一覧に表示された後、不要なページを削除して残りを変換・ダウンロードできます。" },
        { question: "スクリーンショットではなくPDFからJPGを使うべき場面は？", answer: "PDFからJPGは長辺最大4096ピクセルでページ全体を描画するため、スクリーンショットより確実にページを捉えられます。スライド、ポスター、単一ページの文書に向いています。" },
      ],
    },
    ru: {
      summary: "PicLite отрисовывает каждую страницу PDF как отдельное изображение и экспортирует JPG. Он сохраняет внешний вид всей страницы, а не извлекает встроенные оригинальные фото.",
      notes: [
        "Страницы отрисовываются максимум в двойном размере от исходного в PDF, с ограничением 4096 пикселей по длинной стороне. Качество JPG меняет сжатие, но не это разрешение отрисовки.",
        "Несколько результатов скачиваются одним ZIP-архивом. Большим документам нужно больше памяти устройства; при сбое попробуйте меньший документ. Для PDF с паролем нужна разблокированная копия: в этом интерфейсе нет ввода пароля.",
      ],
      faq: [
        { question: "Извлекает ли PDF в JPG оригинальные изображения из PDF?", answer: "Нет. PicLite отрисовывает всю страницу, включая текст, графику и вёрстку, как изображение. Если нужны встроенные файлы изображений, используйте инструмент извлечения картинок из PDF." },
        { question: "Можно конвертировать только выбранные страницы PDF?", answer: "PicLite сначала отрисовывает все страницы. Когда они появятся в списке, удалите ненужные и конвертируйте остальные." },
        { question: "Когда лучше использовать PDF в JPG вместо скриншота?", answer: "PDF в JPG отрисовывает всю страницу с длинной стороной до 4096 пикселей, поэтому передаёт её надёжнее скриншота; подходит для слайдов, плакатов и отдельных страниц." },
      ],
    },
  },
};
