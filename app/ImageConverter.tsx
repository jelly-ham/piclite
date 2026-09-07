"use client";

import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  dictionaries,
  fill,
  LOCALES,
  type Locale,
  type Messages,
} from "./i18n";
import TipSupport, { TipLinks } from "./TipSupport";

type RasterFormat = "jpeg" | "png" | "webp";
type OutputFormat = RasterFormat | "pdf";
type ThemeMode = "auto" | "light" | "dark";
type ItemStatus = "loading" | "ready" | "converting" | "done" | "error";

type ImageItem = {
  id: string;
  file: File;
  name: string;
  sourceFormat: string;
  size: number;
  width?: number;
  height?: number;
  previewUrl?: string;
  resultBlob?: Blob;
  resultUrl?: string;
  resultSize?: number;
  status: ItemStatus;
  error?: string;
};

type PdfResult = {
  blob: Blob;
  url: string;
  size: number;
};

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const OUTPUTS: Record<
  OutputFormat,
  { label: string; extension: string; mime: string }
> = {
  jpeg: { label: "JPG", extension: "jpg", mime: "image/jpeg" },
  png: { label: "PNG", extension: "png", mime: "image/png" },
  webp: { label: "WebP", extension: "webp", mime: "image/webp" },
  pdf: { label: "PDF", extension: "pdf", mime: "application/pdf" },
};

const QUALITY_PRESETS = [92, 82, 68] as const;
const TARGET_SIZE_MIN_KB = 50;
const TARGET_SIZE_MAX_KB = 2000;
const TARGET_SIZE_STEP_KB = 50;
const TARGET_SIZE_PRESETS = [100, 500, 1000, 2000] as const;
const DOWNLOAD_TIP_SHOWN_KEY = "piclite-download-tip-shown";
const DOWNLOAD_TIP_DISMISSED_UNTIL_KEY = "piclite-download-tip-dismissed-until";
const DOWNLOAD_TIP_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
const ACCEPTED_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "avif",
  "bmp",
  "heic",
  "heif",
  "pdf",
];

function extensionOf(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

function isHeic(file: File) {
  const ext = extensionOf(file.name);
  return (
    ext === "heic" ||
    ext === "heif" ||
    file.type === "image/heic" ||
    file.type === "image/heif"
  );
}

function isPdf(file: File) {
  return extensionOf(file.name) === "pdf" || file.type === "application/pdf";
}

function isSupported(file: File) {
  return ACCEPTED_EXTENSIONS.includes(extensionOf(file.name));
}

function formatBytes(bytes?: number) {
  if (bytes === undefined) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(bytes > 10 * 1024 * 1024 ? 1 : 2)} MB`;
}

function outputName(name: string, format: RasterFormat) {
  const base = name.replace(/\.[^.]+$/, "") || "image";
  return `${base}.${OUTPUTS[format].extension}`;
}

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function initialTheme(): ThemeMode {
  if (typeof document === "undefined") return "auto";
  const value = document.documentElement.dataset.theme;
  return value === "light" || value === "dark" ? value : "auto";
}

async function decodeImage(file: File): Promise<ImageBitmap> {
  if (isHeic(file)) {
    const { heicTo } = await import("heic-to/csp");
    return heicTo({ blob: file, type: "bitmap" });
  }
  return createImageBitmap(file, { imageOrientation: "from-image" });
}

async function bitmapToBlob(
  bitmap: ImageBitmap,
  format: RasterFormat,
  quality: number,
  maxEdge?: number,
) {
  const scale =
    maxEdge && Math.max(bitmap.width, bitmap.height) > maxEdge
      ? maxEdge / Math.max(bitmap.width, bitmap.height)
      : 1;
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const mime = OUTPUTS[format].mime;

  if (typeof OffscreenCanvas !== "undefined") {
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas unavailable");
    if (format === "jpeg") {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);
    }
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(bitmap, 0, 0, width, height);
    const blob = await canvas.convertToBlob({
      type: mime,
      quality: format === "png" ? undefined : quality / 100,
    });
    if (blob.type !== mime) throw new Error(`Cannot export ${OUTPUTS[format].label}`);
    return blob;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas unavailable");
  if (format === "jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
  }
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(bitmap, 0, 0, width, height);
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, mime, format === "png" ? undefined : quality / 100),
  );
  if (!blob || blob.type !== mime) throw new Error(`Cannot export ${OUTPUTS[format].label}`);
  return blob;
}

async function bitmapToTargetBlob(
  bitmap: ImageBitmap,
  format: "jpeg" | "webp",
  targetBytes: number,
) {
  const minQuality = 40;
  const maxQuality = 100;
  const highestQuality = await bitmapToBlob(bitmap, format, maxQuality);
  if (highestQuality.size <= targetBytes) return highestQuality;

  const lowestQuality = await bitmapToBlob(bitmap, format, minQuality);
  if (lowestQuality.size > targetBytes) return lowestQuality;

  // Canvas encoders are generally monotonic enough for a short binary search:
  // find the highest quality whose result stays at or below the selected size.
  let best = lowestQuality;
  let lower = minQuality + 1;
  let upper = maxQuality - 1;
  while (lower <= upper) {
    const quality = Math.floor((lower + upper) / 2);
    const result = await bitmapToBlob(bitmap, format, quality);
    if (result.size <= targetBytes) {
      best = result;
      lower = quality + 1;
    } else {
      upper = quality - 1;
    }
  }
  return best;
}

async function renderPdfPages(file: File) {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  const documentTask = pdfjs.getDocument({
    data: new Uint8Array(await file.arrayBuffer()),
  });
  const pdfDocument = await documentTask.promise;
  const base = file.name.replace(/\.pdf$/i, "") || "document";
  const pages: Array<{ file: File; page: number }> = [];

  try {
    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
      const page = await pdfDocument.getPage(pageNumber);
      const natural = page.getViewport({ scale: 1 });
      const scale = Math.min(2, 4096 / Math.max(natural.width, natural.height));
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) throw new Error("Canvas unavailable");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvas, canvasContext: context, viewport }).promise;
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      page.cleanup();
      if (!blob) throw new Error("PDF page render failed");
      const suffix = String(pageNumber).padStart(3, "0");
      pages.push({
        file: new File([blob], `${base}-page-${suffix}.png`, {
          type: "image/png",
        }),
        page: pageNumber,
      });
    }
  } finally {
    await documentTask.destroy();
  }
  return pages;
}

function statusText(item: ImageItem, messages: Messages) {
  if (item.status === "loading") return messages.reading;
  if (item.status === "converting") return messages.converting;
  if (item.status === "done") return messages.converted;
  if (item.status === "error") return item.error ?? messages.failed;
  return messages.waiting;
}

export default function ImageConverter({
  locale,
  messages: m,
  children,
  heading,
  introduction,
  navigation,
  initialFormat = "jpeg",
  initialQuality = 82,
  toolSlug,
  enableTargetSize = false,
}: {
  locale: Locale;
  messages: Messages;
  children?: React.ReactNode;
  heading?: string;
  introduction?: string;
  navigation?: React.ReactNode;
  initialFormat?: OutputFormat;
  initialQuality?: number;
  toolSlug?: string;
  enableTargetSize?: boolean;
}) {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [format, setFormat] = useState<OutputFormat>(initialFormat);
  const [quality, setQuality] = useState(initialQuality);
  const [targetSizeKb, setTargetSizeKb] = useState(500);
  const targetSizeEnabled = enableTargetSize && (format === "jpeg" || format === "webp");
  const [pdfResult, setPdfResult] = useState<PdfResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [installHelpOpen, setInstallHelpOpen] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [notice, setNotice] = useState("");
  const [downloadTipOpen, setDownloadTipOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrls = useRef(new Set<string>());
  const downloadTipTimer = useRef<number | undefined>(undefined);
  const downloadTipSeen = useRef(false);

  const createTrackedUrl = useCallback((blob: Blob) => {
    const url = URL.createObjectURL(blob);
    objectUrls.current.add(url);
    return url;
  }, []);

  const revokeTrackedUrl = useCallback((url?: string) => {
    if (!url) return;
    URL.revokeObjectURL(url);
    objectUrls.current.delete(url);
  }, []);

  useEffect(() => {
    document.documentElement.lang = m.tag;
    document.documentElement.dir = m.dir;
  }, [m.dir, m.tag]);

  useEffect(() => {
    const urls = objectUrls.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
      if (downloadTipTimer.current !== undefined) {
        window.clearTimeout(downloadTipTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("piclite-theme", theme);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncThemeColor = () => {
      const dark = theme === "dark" || (theme === "auto" && media.matches);
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", dark ? "#121311" : "#f4f3ee");
    };
    syncThemeColor();
    media.addEventListener("change", syncThemeColor);
    return () => media.removeEventListener("change", syncThemeColor);
  }, [theme]);

  useEffect(() => {
    const registerWorker = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    };
    if ("serviceWorker" in navigator) window.addEventListener("load", registerWorker);
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
    const frame = window.requestAnimationFrame(() => setIsStandalone(standalone));
    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const onInstalled = () => {
      setIsStandalone(true);
      setInstallPrompt(null);
      setNotice(m.installed);
    };
    window.addEventListener("beforeinstallprompt", onInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("load", registerWorker);
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [m.installed]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const updateItem = useCallback((id: string, patch: Partial<ImageItem>) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }, []);

  const prepareItem = useCallback(
    async (item: ImageItem) => {
      let bitmap: ImageBitmap | undefined;
      try {
        bitmap = await decodeImage(item.file);
        const previewUrl = isHeic(item.file)
          ? createTrackedUrl(await bitmapToBlob(bitmap, "jpeg", 86, 1200))
          : createTrackedUrl(item.file);
        updateItem(item.id, {
          width: bitmap.width,
          height: bitmap.height,
          previewUrl,
          status: "ready",
        });
      } catch {
        updateItem(item.id, { status: "error", error: m.failed });
      } finally {
        bitmap?.close();
      }
    },
    [createTrackedUrl, m.failed, updateItem],
  );

  const addImageItems = useCallback(
    (files: Array<{ file: File; sourceFormat?: string }>) => {
      const additions = files.map<ImageItem>(({ file, sourceFormat }) => ({
        id: makeId(),
        file,
        name: file.name,
        sourceFormat: sourceFormat ?? extensionOf(file.name).toUpperCase(),
        size: file.size,
        status: "loading",
      }));
      setItems((current) => [...current, ...additions]);
      additions.forEach((item) => void prepareItem(item));
    },
    [prepareItem],
  );

  const addFiles = useCallback(
    (incoming: File[]) => {
      const valid = incoming.filter(isSupported);
      const rejected = incoming.length - valid.length;
      if (rejected > 0) setNotice(fill(m.invalidFiles, { count: rejected }));
      if (!valid.length) return;

      addImageItems(valid.filter((file) => !isPdf(file)).map((file) => ({ file })));
      valid.filter(isPdf).forEach((file) => {
        const placeholder: ImageItem = {
          id: makeId(),
          file,
          name: file.name,
          sourceFormat: "PDF",
          size: file.size,
          status: "loading",
        };
        setItems((current) => [...current, placeholder]);
        setNotice(m.pdfLoading);
        void renderPdfPages(file)
          .then((pages) => {
            setItems((current) => current.filter((item) => item.id !== placeholder.id));
            addImageItems(
              pages.map((page) => ({
                file: page.file,
                sourceFormat: fill(m.pdfPage, { page: page.page }),
              })),
            );
            setNotice(fill(m.pdfAdded, { count: pages.length }));
          })
          .catch(() => {
            updateItem(placeholder.id, { status: "error", error: m.pdfError });
            setNotice(m.pdfError);
          });
      });
    },
    [addImageItems, m, updateItem],
  );

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const files = Array.from(event.clipboardData?.files ?? []).filter((file) =>
        file.type.startsWith("image/"),
      );
      if (files.length) addFiles(files);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [addFiles]);

  const clearPdfResult = useCallback(() => {
    setPdfResult((current) => {
      revokeTrackedUrl(current?.url);
      return null;
    });
  }, [revokeTrackedUrl]);

  const invalidateResults = useCallback(() => {
    clearPdfResult();
    setItems((current) =>
      current.map((item) => {
        revokeTrackedUrl(item.resultUrl);
        return {
          ...item,
          resultBlob: undefined,
          resultUrl: undefined,
          resultSize: undefined,
          status: item.status === "done" ? "ready" : item.status,
        };
      }),
    );
  }, [clearPdfResult, revokeTrackedUrl]);

  const selectFormat = (next: OutputFormat) => {
    if (next === format || isConverting) return;
    invalidateResults();
    setFormat(next);
  };

  const selectQuality = (next: number) => {
    if (next === quality || isConverting) return;
    invalidateResults();
    setQuality(next);
  };

  const selectTargetSize = (next: number) => {
    if (next === targetSizeKb || isConverting) return;
    invalidateResults();
    setTargetSizeKb(next);
  };

  const removeItem = (id: string) => {
    clearPdfResult();
    setItems((current) => {
      const target = current.find((item) => item.id === id);
      revokeTrackedUrl(target?.previewUrl);
      revokeTrackedUrl(target?.resultUrl);
      return current
        .filter((item) => item.id !== id)
        .map((item) =>
          format === "pdf" && item.status === "done"
            ? { ...item, status: "ready" as ItemStatus }
            : item,
        );
    });
  };

  const clearItems = () => {
    items.forEach((item) => {
      revokeTrackedUrl(item.previewUrl);
      revokeTrackedUrl(item.resultUrl);
    });
    clearPdfResult();
    setItems([]);
  };

  const dismissDownloadTip = useCallback(() => {
    setDownloadTipOpen(false);
    try {
      localStorage.setItem(
        DOWNLOAD_TIP_DISMISSED_UNTIL_KEY,
        String(Date.now() + DOWNLOAD_TIP_COOLDOWN_MS),
      );
    } catch {
      // Private browsing modes may block storage; the in-memory session guard still applies.
    }
  }, []);

  const queueDownloadTip = useCallback(() => {
    if (downloadTipSeen.current || typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(DOWNLOAD_TIP_SHOWN_KEY) === "1") {
        downloadTipSeen.current = true;
        return;
      }
      const dismissedUntil = Number(
        localStorage.getItem(DOWNLOAD_TIP_DISMISSED_UNTIL_KEY) ?? "0",
      );
      if (dismissedUntil > Date.now()) {
        downloadTipSeen.current = true;
        return;
      }
      sessionStorage.setItem(DOWNLOAD_TIP_SHOWN_KEY, "1");
    } catch {
      // Continue with the in-memory guard when browser storage is unavailable.
    }
    downloadTipSeen.current = true;
    downloadTipTimer.current = window.setTimeout(() => {
      downloadTipTimer.current = undefined;
      setDownloadTipOpen(true);
    }, 700);
  }, []);

  useEffect(() => {
    if (!downloadTipOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismissDownloadTip();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [dismissDownloadTip, downloadTipOpen]);

  const convertToPdf = async () => {
    const candidates = items.filter(
      (item) => item.status === "ready" || item.status === "done",
    );
    if (!candidates.length) return;
    clearPdfResult();
    setIsConverting(true);
    candidates.forEach((item) =>
      updateItem(item.id, { status: "converting", error: undefined }),
    );

    try {
      const { jsPDF } = await import("jspdf");
      let document: InstanceType<typeof jsPDF> | null = null;
      for (const item of candidates) {
        let bitmap: ImageBitmap | undefined;
        try {
          bitmap = await decodeImage(item.file);
          const width = bitmap.width;
          const height = bitmap.height;
          const orientation = width > height ? "landscape" : "portrait";
          const jpeg = await bitmapToBlob(bitmap, "jpeg", quality);
          if (!document) {
            document = new jsPDF({
              orientation,
              unit: "px",
              format: [width, height],
              compress: true,
              hotfixes: ["px_scaling"],
            });
          } else {
            document.addPage([width, height], orientation);
          }
          document.addImage(
            new Uint8Array(await jpeg.arrayBuffer()),
            "JPEG",
            0,
            0,
            width,
            height,
            undefined,
            "FAST",
          );
        } finally {
          bitmap?.close();
        }
      }
      if (!document) throw new Error("PDF generation failed");
      const blob = document.output("blob");
      const url = createTrackedUrl(blob);
      setPdfResult({ blob, url, size: blob.size });
      setItems((current) =>
        current.map((item) =>
          candidates.some((candidate) => candidate.id === item.id)
            ? {
                ...item,
                status: "done",
                resultBlob: undefined,
                resultUrl: undefined,
                resultSize: undefined,
              }
            : item,
        ),
      );
    } catch {
      candidates.forEach((item) =>
        updateItem(item.id, { status: "error", error: m.failed }),
      );
    } finally {
      setIsConverting(false);
    }
  };

  const convertAll = async () => {
    if (format === "pdf") {
      await convertToPdf();
      return;
    }
    const candidates = items.filter((item) => item.status === "ready");
    if (!candidates.length) return;
    setIsConverting(true);
    for (const item of candidates) {
      updateItem(item.id, { status: "converting", error: undefined });
      let bitmap: ImageBitmap | undefined;
      try {
        bitmap = await decodeImage(item.file);
        const result =
          targetSizeEnabled
            ? await bitmapToTargetBlob(bitmap, format, targetSizeKb * 1024)
            : await bitmapToBlob(bitmap, format, quality);
        revokeTrackedUrl(item.resultUrl);
        updateItem(item.id, {
          status: "done",
          resultBlob: result,
          resultUrl: createTrackedUrl(result),
          resultSize: result.size,
        });
      } catch (error) {
        updateItem(item.id, {
          status: "error",
          error: error instanceof Error ? error.message : m.failed,
        });
      } finally {
        bitmap?.close();
      }
    }
    setIsConverting(false);
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    queueDownloadTip();
  };

  const downloadAll = async () => {
    if (format === "pdf" && pdfResult) {
      downloadBlob(pdfResult.blob, m.pdfFileName);
      return;
    }
    const completed = items.filter((item) => item.resultBlob);
    if (!completed.length || format === "pdf") return;
    if (completed.length === 1) {
      downloadBlob(completed[0].resultBlob!, outputName(completed[0].name, format));
      return;
    }
    setIsZipping(true);
    try {
      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();
      const usedNames = new Map<string, number>();
      completed.forEach((item) => {
        let filename = outputName(item.name, format);
        const count = usedNames.get(filename) ?? 0;
        usedNames.set(filename, count + 1);
        if (count > 0) {
          const ext = OUTPUTS[format].extension;
          filename = `${filename.slice(0, -(ext.length + 1))}-${count + 1}.${ext}`;
        }
        zip.file(filename, item.resultBlob!);
      });
      const archive = await zip.generateAsync({ type: "blob" });
      downloadBlob(archive, `PicLite-${completed.length}.zip`);
    } finally {
      setIsZipping(false);
    }
  };

  const requestInstall = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") setInstallPrompt(null);
      return;
    }
    setInstallHelpOpen(true);
  };

  const pendingCount = items.filter((item) => item.status === "ready").length;
  const doneCount = items.filter((item) => item.status === "done").length;
  const completedOriginalTotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + (item.resultSize !== undefined ? item.size : 0),
        0,
      ),
    [items],
  );
  const rasterResultTotal = useMemo(
    () => items.reduce((sum, item) => sum + (item.resultSize ?? 0), 0),
    [items],
  );
  const resultTotal = format === "pdf" ? pdfResult?.size ?? 0 : rasterResultTotal;
  const savings =
    format !== "pdf" && doneCount > 0 && completedOriginalTotal > 0
      ? Math.round((1 - resultTotal / completedOriginalTotal) * 100)
      : null;

  const onFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    addFiles(Array.from(event.target.files ?? []));
    event.target.value = "";
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(event.dataTransfer.files));
  };

  const canDownload = format === "pdf" ? Boolean(pdfResult) : doneCount > 0 && pendingCount === 0;
  const convertCount =
    format === "pdf"
      ? items.filter((item) => item.status === "ready" || item.status === "done").length
      : pendingCount;

  return (
    <main className={`app-shell locale-${locale}`} lang={m.tag} dir={m.dir}>
      <header className="site-header">
        <a className="brand" href={`/${locale}`} aria-label="PicLite">
          <span className="brand-mark" aria-hidden="true"><span /><span /></span>
          <span className="brand-copy"><strong>PicLite</strong></span>
        </a>

        <div className="header-actions">
          <span className="local-pill"><span className="local-dot" />{m.localProcessing}</span>
          <label className="language-control">
            <span aria-hidden="true">文</span>
            <span className="visually-hidden">{m.languageLabel}</span>
            <select
              value={locale}
              aria-label={m.languageLabel}
              onChange={(event) => {
                const nextLocale = event.target.value;
                const suffix = toolSlug && (nextLocale === "en" || nextLocale === "zh-cn") ? `/${toolSlug}` : "";
                window.location.href = `/${nextLocale}${suffix}`;
              }}
            >
              {LOCALES.map((code) => (
                <option key={code} value={code}>{dictionaries[code].nativeName}</option>
              ))}
            </select>
          </label>
          {!isStandalone && (
            <button className="header-button install-button" onClick={requestInstall}>
              <span aria-hidden="true">↓</span><span>{m.installApp}</span>
            </button>
          )}
          <div className="theme-control">
            <button
              className="icon-button"
              aria-label={m.appearance}
              aria-expanded={themeMenuOpen}
              onClick={() => setThemeMenuOpen((open) => !open)}
            >
              <span aria-hidden="true" suppressHydrationWarning>
                {theme === "auto" ? "◐" : theme === "dark" ? "☾" : "☼"}
              </span>
            </button>
            {themeMenuOpen && (
              <div className="theme-menu" role="menu" aria-label={m.appearance}>
                {([
                  ["auto", m.auto, m.followDevice],
                  ["light", m.light, m.keepLight],
                  ["dark", m.dark, m.reduceGlare],
                ] as const).map(([value, label, detail]) => (
                  <button
                    key={value}
                    className={theme === value ? "active" : ""}
                    onClick={() => {
                      setTheme(value);
                      setThemeMenuOpen(false);
                    }}
                    role="menuitem"
                  >
                    <span>{label}</span><small>{detail}</small>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {navigation}
      <section className={`hero ${items.length ? "hero-compact" : ""}`}>
        <div className="eyebrow"><span aria-hidden="true">✦</span>{m.eyebrow}</div>
        <h1>{heading ?? <>{m.headline[0]}<em>{m.headline[1]}</em>{m.headline[2]}</>}</h1>
        <p>{introduction ?? <>{m.heroLine1}<br className="desktop-break" />{m.heroLine2}</>}</p>
      </section>

      <input
        ref={inputRef}
        className="visually-hidden"
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.webp,.avif,.bmp,.heic,.heif,.pdf,image/jpeg,image/png,image/webp,image/avif,image/bmp,image/heic,image/heif,application/pdf"
        onChange={onFileInput}
      />

      {items.length === 0 ? (
        <>
          <section
            className={`drop-zone ${isDragging ? "dragging" : ""}`}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={(event) => {
              if (event.currentTarget === event.target) setIsDragging(false);
            }}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
            }}
          >
            <div className="drop-orbit orbit-one" /><div className="drop-orbit orbit-two" />
            <div className="upload-glyph" aria-hidden="true">
              <span className="image-mini"><i /></span><span className="arrow-mini">↑</span>
            </div>
            <div className="drop-copy">
              <h2>{isDragging ? m.dropHere : m.dragImages}</h2>
              <p>
                {m.or}{" "}
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    inputRef.current?.click();
                  }}
                >
                  {m.chooseFiles}
                </button>
                {" · "}{m.pasteHint}
              </p>
            </div>
            <div className="format-list" aria-label={m.supportedFormats}>
              {["JPG", "PNG", "WEBP", "AVIF", "BMP", "HEIC", "PDF"].map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </section>

          <section className="trust-row" aria-label={m.supportedFormats}>
            {[
              ["shield-icon", "✓", m.trustLocal, m.trustLocalDesc],
              ["spark-icon", "⌁", m.trustSize, m.trustSizeDesc],
              ["offline-icon", "◎", m.trustOffline, m.trustOfflineDesc],
            ].map(([iconClass, icon, title, detail]) => (
              <article key={title}>
                <span className={`trust-icon ${iconClass}`} aria-hidden="true">{icon}</span>
                <div><h3>{title}</h3><p>{detail}</p></div>
              </article>
            ))}
          </section>
        </>
      ) : (
        <section className="workspace">
          <div className="queue-panel">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">{m.queueKicker}</span>
                <h2>{fill(m.countLabel, { count: items.length })}</h2>
              </div>
              <div className="queue-actions">
                <button onClick={() => inputRef.current?.click()}>＋ {m.add}</button>
                <button onClick={clearItems} disabled={isConverting}>{m.clear}</button>
              </div>
            </div>

            <div className="file-list">
              {items.map((item) => (
                <article key={item.id} className={`file-card status-${item.status}`}>
                  <div className="thumbnail">
                    {item.previewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.previewUrl} alt="" />
                    ) : (
                      <span>{item.sourceFormat || "IMG"}</span>
                    )}
                    {item.status === "converting" && <i className="spinner" />}
                  </div>
                  <div className="file-info">
                    <div className="file-title-row">
                      <h3 title={item.name}>{item.name}</h3>
                      <button
                        className="remove-button"
                        aria-label={`${m.remove} ${item.name}`}
                        disabled={item.status === "converting"}
                        onClick={() => removeItem(item.id)}
                      >
                        ×
                      </button>
                    </div>
                    <div className="file-meta">
                      <span>{item.sourceFormat}</span><i /><span>{formatBytes(item.size)}</span>
                      {item.width && item.height ? (
                        <><i /><span>{item.width} × {item.height}</span></>
                      ) : null}
                    </div>
                    <div className="file-result-row">
                      <span className={`status-label ${item.status}`}>
                        <i />{statusText(item, m)}
                      </span>
                      {item.status === "done" && format === "pdf" && (
                        <div className="result-summary"><span>{m.pdfIncluded}</span></div>
                      )}
                      {item.status === "done" && format !== "pdf" && item.resultBlob && (
                        <div className="result-summary">
                          <span>
                            {formatBytes(item.resultSize)}
                            {item.resultSize && item.resultSize < item.size
                              ? ` · ${fill(m.saved, { value: Math.round((1 - item.resultSize / item.size) * 100) })}`
                              : ""}
                          </span>
                          <button
                            onClick={() =>
                              downloadBlob(item.resultBlob!, outputName(item.name, format))
                            }
                          >
                            {m.download}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="settings-panel">
            <div className="settings-heading">
              <span className="section-kicker">{m.settingsKicker}</span>
              <h2>{m.settingsTitle}</h2>
            </div>
            <fieldset className="format-options" disabled={isConverting}>
              <legend>{m.outputFormat}</legend>
              <div className="format-grid">
                {(Object.keys(OUTPUTS) as OutputFormat[]).map((value) => (
                  <button
                    type="button"
                    key={value}
                    className={format === value ? "selected" : ""}
                    onClick={() => selectFormat(value)}
                  >
                    <strong>{OUTPUTS[value].label}</strong>
                    <small>{m.formatNotes[value]}</small>
                    <i aria-hidden="true">✓</i>
                  </button>
                ))}
              </div>
            </fieldset>

            {targetSizeEnabled ? (
              <fieldset className="quality-options target-size-options" disabled={isConverting}>
                <div className="legend-row">
                  <legend>{m.targetSize ?? "Target file size"}</legend>
                  <span>≤ {formatBytes(targetSizeKb * 1024)}</span>
                </div>
                <input
                  aria-label={m.targetSize ?? "Target file size"}
                  type="range"
                  min={TARGET_SIZE_MIN_KB}
                  max={TARGET_SIZE_MAX_KB}
                  step={TARGET_SIZE_STEP_KB}
                  value={targetSizeKb}
                  onChange={(event) => selectTargetSize(Number(event.target.value))}
                  style={{ "--range-value": `${((targetSizeKb - TARGET_SIZE_MIN_KB) / (TARGET_SIZE_MAX_KB - TARGET_SIZE_MIN_KB)) * 100}%` } as React.CSSProperties}
                />
                <div className="target-size-range" aria-hidden="true">
                  <span>{formatBytes(TARGET_SIZE_MIN_KB * 1024)}</span>
                  <span>{formatBytes(TARGET_SIZE_MAX_KB * 1024)}</span>
                </div>
                <p className="target-size-help">{m.targetSizeDesc ?? "Quality is adjusted automatically to approach this size."}</p>
                <div className="preset-row">
                  {TARGET_SIZE_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className={targetSizeKb === preset ? "active" : ""}
                      onClick={() => selectTargetSize(preset)}
                    >
                      {formatBytes(preset * 1024)}
                    </button>
                  ))}
                </div>
              </fieldset>
            ) : (
              <fieldset
                className={`quality-options ${format === "png" ? "is-lossless" : ""}`}
                disabled={isConverting}
              >
                <div className="legend-row">
                  <legend>{m.outputQuality}</legend>
                  <span>{format === "png" ? m.lossless : `${quality}%`}</span>
                </div>
                {format === "png" ? (
                <div className="lossless-note">
                  <span aria-hidden="true">◇</span>
                  <div><strong>{m.losslessTitle}</strong><p>{m.losslessDesc}</p></div>
                </div>
              ) : (
                <>
                  <input
                    aria-label={m.outputQuality}
                    type="range"
                    min="40"
                    max="100"
                    step="1"
                    value={quality}
                    onChange={(event) => selectQuality(Number(event.target.value))}
                    style={{ "--range-value": `${((quality - 40) / 60) * 100}%` } as React.CSSProperties}
                  />
                  <div className="preset-row">
                    {QUALITY_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        className={quality === preset ? "active" : ""}
                        onClick={() => selectQuality(preset)}
                      >
                        {preset}%
                      </button>
                    ))}
                  </div>
                </>
              )}
              </fieldset>
            )}

            <div className="conversion-note">
              <span className="lock-dot">✓</span>
              <p>{m.privacy}<strong>{m.privacyStrong}</strong></p>
            </div>
            {doneCount > 0 && (
              <div className="total-summary">
                <div>
                  <span>{m.conversionResults}</span>
                  <strong>{fill(m.countLabel, { count: doneCount })} · {formatBytes(resultTotal)}</strong>
                </div>
                {savings !== null && savings > 0 && <b>{fill(m.saved, { value: savings })}</b>}
              </div>
            )}
            <button
              className="primary-action"
              onClick={canDownload ? downloadAll : convertAll}
              disabled={(!canDownload && convertCount === 0) || isConverting || isZipping}
            >
              {isConverting ? (
                <><i className="button-spinner" />{m.convertingLocal}</>
              ) : isZipping ? (
                <><i className="button-spinner" />{m.organizing}</>
              ) : canDownload ? (
                <><span aria-hidden="true">↓</span>
                  {format === "pdf"
                    ? m.downloadPdf
                    : doneCount > 1
                      ? fill(m.downloadAll, { count: doneCount })
                      : m.downloadImage}
                </>
              ) : (
                <><span aria-hidden="true">✦</span>
                  {format === "pdf"
                    ? fill(m.createPdf, { count: convertCount })
                    : fill(m.startConvert, { count: convertCount })}
                </>
              )}
            </button>
          </aside>
        </section>
      )}

      {children}

      <TipSupport messages={m} />

      {downloadTipOpen && (
        <div
          className="modal-backdrop download-tip-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) dismissDownloadTip();
          }}
        >
          <section
            className="download-tip-prompt"
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-tip-title"
          >
            <button
              className="download-tip-close"
              type="button"
              aria-label={m.close}
              onClick={dismissDownloadTip}
            >
              ×
            </button>
            <div className="download-tip-copy">
              <span className="section-kicker">{m.tipKicker}</span>
              <h2 id="download-tip-title">{m.tipTitle}</h2>
              <p>{m.tipDescription}</p>
            </div>
            <TipLinks messages={m} onTipClick={dismissDownloadTip} />
          </section>
        </div>
      )}

      <footer>
        <p>PicLite <span>·</span> {m.footer}</p>
        <p className="codec-credit">{m.codecCredit}</p>
      </footer>

      {installHelpOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setInstallHelpOpen(false);
          }}
        >
          <section className="install-modal" role="dialog" aria-modal="true" aria-labelledby="install-title">
            <button className="modal-close" aria-label={m.close} onClick={() => setInstallHelpOpen(false)}>×</button>
            <div className="modal-app-icon" aria-hidden="true"><span /><span /></div>
            <span className="section-kicker">{m.installKicker}</span>
            <h2 id="install-title">{m.installTitle}</h2>
            <ol>
              {m.installSteps.map((step, index) => (
                <li key={step}><span>{index + 1}</span><p>{step}</p></li>
              ))}
            </ol>
            <section className="install-tip" aria-labelledby="install-tip-title">
              <span className="section-kicker">{m.tipKicker}</span>
              <h3 id="install-tip-title">{m.tipTitle}</h3>
              <p>{m.tipDescription}</p>
              <TipLinks messages={m} />
            </section>
            <button className="modal-done" onClick={() => setInstallHelpOpen(false)}>{m.gotIt}</button>
          </section>
        </div>
      )}

      <div className={`toast ${notice ? "show" : ""}`} role="status" aria-live="polite">
        <span>✓</span>{notice}
      </div>
    </main>
  );
}
