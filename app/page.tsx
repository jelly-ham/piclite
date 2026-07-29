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

type OutputFormat = "jpeg" | "png" | "webp";
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

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const OUTPUTS: Record<
  OutputFormat,
  { label: string; extension: string; mime: string; note: string }
> = {
  jpeg: {
    label: "JPG",
    extension: "jpg",
    mime: "image/jpeg",
    note: "通用兼容",
  },
  png: {
    label: "PNG",
    extension: "png",
    mime: "image/png",
    note: "无损透明",
  },
  webp: {
    label: "WebP",
    extension: "webp",
    mime: "image/webp",
    note: "轻巧高效",
  },
};

const QUALITY_PRESETS = [
  { label: "精细", value: 92 },
  { label: "均衡", value: 82 },
  { label: "轻量", value: 68 },
] as const;

const ACCEPTED_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "avif",
  "bmp",
  "heic",
  "heif",
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

function isSupported(file: File) {
  return ACCEPTED_EXTENSIONS.includes(extensionOf(file.name));
}

function formatBytes(bytes?: number) {
  if (bytes === undefined) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(bytes > 10 * 1024 * 1024 ? 1 : 2)} MB`;
}

function outputName(name: string, format: OutputFormat) {
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

  return createImageBitmap(file, {
    imageOrientation: "from-image",
  });
}

async function bitmapToBlob(
  bitmap: ImageBitmap,
  format: OutputFormat,
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
    if (!context) throw new Error("当前浏览器无法创建图片画布");
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
    if (blob.type !== mime) {
      throw new Error(`此浏览器暂不支持导出 ${OUTPUTS[format].label}`);
    }
    return blob;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("当前浏览器无法创建图片画布");
  if (format === "jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
  }
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(bitmap, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(
      resolve,
      mime,
      format === "png" ? undefined : quality / 100,
    ),
  );
  if (!blob || blob.type !== mime) {
    throw new Error(`此浏览器暂不支持导出 ${OUTPUTS[format].label}`);
  }
  return blob;
}

function statusText(item: ImageItem) {
  if (item.status === "loading") return "正在读取";
  if (item.status === "converting") return "正在转换";
  if (item.status === "done") return "转换完成";
  if (item.status === "error") return item.error ?? "无法处理";
  return "等待转换";
}

export default function Home() {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [format, setFormat] = useState<OutputFormat>("jpeg");
  const [quality, setQuality] = useState(82);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(
    null,
  );
  const [installHelpOpen, setInstallHelpOpen] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [notice, setNotice] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrls = useRef(new Set<string>());

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
    const urls = objectUrls.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
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
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", registerWorker);
    }

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
      setNotice("图轻已安装到你的设备");
    };

    window.addEventListener("beforeinstallprompt", onInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("load", registerWorker);
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

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
        let previewUrl: string;
        if (isHeic(item.file)) {
          const preview = await bitmapToBlob(bitmap, "jpeg", 86, 1200);
          previewUrl = createTrackedUrl(preview);
        } else {
          previewUrl = createTrackedUrl(item.file);
        }
        updateItem(item.id, {
          width: bitmap.width,
          height: bitmap.height,
          previewUrl,
          status: "ready",
        });
      } catch {
        updateItem(item.id, {
          status: "error",
          error: isHeic(item.file)
            ? "无法读取这张 HEIC 图片"
            : "浏览器无法读取此图片",
        });
      } finally {
        bitmap?.close();
      }
    },
    [createTrackedUrl, updateItem],
  );

  const addFiles = useCallback(
    (incoming: File[]) => {
      const valid = incoming.filter(isSupported);
      const rejected = incoming.length - valid.length;

      if (rejected > 0) {
        setNotice(`已忽略 ${rejected} 个不支持的文件`);
      }
      if (valid.length === 0) return;

      const additions = valid.map<ImageItem>((file) => ({
        id: makeId(),
        file,
        name: file.name,
        sourceFormat: extensionOf(file.name).toUpperCase(),
        size: file.size,
        status: "loading",
      }));

      setItems((current) => [...current, ...additions]);
      additions.forEach((item) => void prepareItem(item));
    },
    [prepareItem],
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

  const invalidateResults = useCallback(() => {
    setItems((current) =>
      current.map((item) => {
        if (!item.resultUrl) return item;
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
  }, [revokeTrackedUrl]);

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

  const removeItem = (id: string) => {
    setItems((current) => {
      const target = current.find((item) => item.id === id);
      revokeTrackedUrl(target?.previewUrl);
      revokeTrackedUrl(target?.resultUrl);
      return current.filter((item) => item.id !== id);
    });
  };

  const clearItems = () => {
    items.forEach((item) => {
      revokeTrackedUrl(item.previewUrl);
      revokeTrackedUrl(item.resultUrl);
    });
    setItems([]);
  };

  const convertAll = async () => {
    const candidates = items.filter((item) => item.status === "ready");
    if (!candidates.length) return;

    setIsConverting(true);
    for (const item of candidates) {
      updateItem(item.id, { status: "converting", error: undefined });
      let bitmap: ImageBitmap | undefined;
      try {
        bitmap = await decodeImage(item.file);
        const result = await bitmapToBlob(bitmap, format, quality);
        revokeTrackedUrl(item.resultUrl);
        const resultUrl = createTrackedUrl(result);
        updateItem(item.id, {
          status: "done",
          resultBlob: result,
          resultUrl,
          resultSize: result.size,
        });
      } catch (error) {
        updateItem(item.id, {
          status: "error",
          error:
            error instanceof Error ? error.message : "转换失败，请重试",
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
  };

  const downloadAll = async () => {
    const completed = items.filter((item) => item.resultBlob);
    if (!completed.length) return;
    if (completed.length === 1) {
      downloadBlob(
        completed[0].resultBlob!,
        outputName(completed[0].name, format),
      );
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
      downloadBlob(archive, `图轻-转换结果-${completed.length}张.zip`);
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
  const resultTotal = useMemo(
    () => items.reduce((sum, item) => sum + (item.resultSize ?? 0), 0),
    [items],
  );
  const savings =
    doneCount > 0 && completedOriginalTotal > 0
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

  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="#" aria-label="图轻首页">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="brand-copy">
            <strong>图轻</strong>
            <small>PicLite</small>
          </span>
        </a>

        <div className="header-actions">
          <span className="local-pill">
            <span className="local-dot" />
            本地处理
          </span>

          {!isStandalone && (
            <button className="header-button install-button" onClick={requestInstall}>
              <span aria-hidden="true">↓</span>
              <span>安装应用</span>
            </button>
          )}

          <div className="theme-control">
            <button
              className="icon-button"
              aria-label="切换外观"
              aria-expanded={themeMenuOpen}
              onClick={() => setThemeMenuOpen((open) => !open)}
            >
              <span aria-hidden="true" suppressHydrationWarning>
                {theme === "auto" ? "◐" : theme === "dark" ? "☾" : "☼"}
              </span>
            </button>
            {themeMenuOpen && (
              <div className="theme-menu" role="menu" aria-label="外观设置">
                {(
                  [
                    ["auto", "自动", "跟随设备"],
                    ["light", "浅色", "保持明亮"],
                    ["dark", "深色", "减少眩光"],
                  ] as const
                ).map(([value, label, detail]) => (
                  <button
                    key={value}
                    className={theme === value ? "active" : ""}
                    onClick={() => {
                      setTheme(value);
                      setThemeMenuOpen(false);
                    }}
                    role="menuitem"
                  >
                    <span>{label}</span>
                    <small>{detail}</small>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <section className={`hero ${items.length ? "hero-compact" : ""}`}>
        <div className="eyebrow">
          <span aria-hidden="true">✦</span>
          图片留在你的设备里
        </div>
        <h1>
          把图片，<em>轻轻</em>换一种格式。
        </h1>
        <p>
          JPG、PNG、WebP 与 HEIC，一次完成转换与压缩。
          <br className="desktop-break" />
          不上传，不等待，也不留下任何副本。
        </p>
      </section>

      <input
        ref={inputRef}
        className="visually-hidden"
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.webp,.avif,.bmp,.heic,.heif,image/jpeg,image/png,image/webp,image/avif,image/bmp,image/heic,image/heif"
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
              if (event.key === "Enter" || event.key === " ") {
                inputRef.current?.click();
              }
            }}
          >
            <div className="drop-orbit orbit-one" />
            <div className="drop-orbit orbit-two" />
            <div className="upload-glyph" aria-hidden="true">
              <span className="image-mini">
                <i />
              </span>
              <span className="arrow-mini">↑</span>
            </div>
            <div className="drop-copy">
              <h2>{isDragging ? "放在这里就好" : "拖入你的图片"}</h2>
              <p>
                或者
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    inputRef.current?.click();
                  }}
                >
                  选择文件
                </button>
                · 也可以直接粘贴
              </p>
            </div>
            <div className="format-list" aria-label="支持的图片格式">
              {["JPG", "PNG", "WEBP", "AVIF", "BMP", "HEIC"].map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </section>

          <section className="trust-row" aria-label="产品特点">
            <article>
              <span className="trust-icon shield-icon" aria-hidden="true">
                ✓
              </span>
              <div>
                <h3>设备内完成</h3>
                <p>文件从不经过服务器</p>
              </div>
            </article>
            <article>
              <span className="trust-icon spark-icon" aria-hidden="true">
                ⌁
              </span>
              <div>
                <h3>原尺寸输出</h3>
                <p>只转换格式与质量</p>
              </div>
            </article>
            <article>
              <span className="trust-icon offline-icon" aria-hidden="true">
                ◎
              </span>
              <div>
                <h3>离线也能用</h3>
                <p>安装后随时打开</p>
              </div>
            </article>
          </section>
        </>
      ) : (
        <section className="workspace">
          <div className="queue-panel">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">待处理图片</span>
                <h2>{items.length} 张图片</h2>
              </div>
              <div className="queue-actions">
                <button onClick={() => inputRef.current?.click()}>＋ 添加</button>
                <button onClick={clearItems} disabled={isConverting}>
                  清空
                </button>
              </div>
            </div>

            <div className="file-list">
              {items.map((item) => (
                <article
                  key={item.id}
                  className={`file-card status-${item.status}`}
                >
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
                        aria-label={`移除 ${item.name}`}
                        disabled={item.status === "converting"}
                        onClick={() => removeItem(item.id)}
                      >
                        ×
                      </button>
                    </div>
                    <div className="file-meta">
                      <span>{item.sourceFormat}</span>
                      <i />
                      <span>{formatBytes(item.size)}</span>
                      {item.width && item.height ? (
                        <>
                          <i />
                          <span>
                            {item.width} × {item.height}
                          </span>
                        </>
                      ) : null}
                    </div>

                    <div className="file-result-row">
                      <span className={`status-label ${item.status}`}>
                        <i />
                        {statusText(item)}
                      </span>
                      {item.status === "done" && item.resultBlob && (
                        <div className="result-summary">
                          <span>
                            {formatBytes(item.resultSize)}
                            {item.resultSize && item.resultSize < item.size
                              ? ` · 小 ${Math.round((1 - item.resultSize / item.size) * 100)}%`
                              : ""}
                          </span>
                          <button
                            onClick={() =>
                              downloadBlob(
                                item.resultBlob!,
                                outputName(item.name, format),
                              )
                            }
                          >
                            下载
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
              <span className="section-kicker">转换设置</span>
              <h2>选择输出方式</h2>
            </div>

            <fieldset className="format-options" disabled={isConverting}>
              <legend>输出格式</legend>
              <div className="format-grid">
                {(Object.keys(OUTPUTS) as OutputFormat[]).map((value) => (
                  <button
                    type="button"
                    key={value}
                    className={format === value ? "selected" : ""}
                    onClick={() => selectFormat(value)}
                  >
                    <strong>{OUTPUTS[value].label}</strong>
                    <small>{OUTPUTS[value].note}</small>
                    <i aria-hidden="true">✓</i>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset
              className={`quality-options ${format === "png" ? "is-lossless" : ""}`}
              disabled={isConverting}
            >
              <div className="legend-row">
                <legend>输出质量</legend>
                <span>{format === "png" ? "无损" : `${quality}%`}</span>
              </div>

              {format === "png" ? (
                <div className="lossless-note">
                  <span aria-hidden="true">◇</span>
                  <div>
                    <strong>保留每一个像素</strong>
                    <p>PNG 使用无损方式输出，文件可能比原图更大。</p>
                  </div>
                </div>
              ) : (
                <>
                  <input
                    aria-label="输出质量"
                    type="range"
                    min="40"
                    max="100"
                    step="1"
                    value={quality}
                    onChange={(event) =>
                      selectQuality(Number(event.target.value))
                    }
                    style={
                      {
                        "--range-value": `${((quality - 40) / 60) * 100}%`,
                      } as React.CSSProperties
                    }
                  />
                  <div className="preset-row">
                    {QUALITY_PRESETS.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        className={quality === preset.value ? "active" : ""}
                        onClick={() => selectQuality(preset.value)}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </fieldset>

            <div className="conversion-note">
              <span className="lock-dot">✓</span>
              <p>
                图片仅在当前设备的浏览器中处理，
                <strong>不会上传到任何地方。</strong>
              </p>
            </div>

            {doneCount > 0 && (
              <div className="total-summary">
                <div>
                  <span>转换结果</span>
                  <strong>
                    {doneCount} 张 · {formatBytes(resultTotal)}
                  </strong>
                </div>
                {savings !== null && savings > 0 && <b>节省 {savings}%</b>}
              </div>
            )}

            <button
              className="primary-action"
              onClick={
                pendingCount === 0 && doneCount > 0 ? downloadAll : convertAll
              }
              disabled={
                (pendingCount === 0 && doneCount === 0) ||
                isConverting ||
                isZipping
              }
            >
              {isConverting ? (
                <>
                  <i className="button-spinner" />
                  正在本地转换
                </>
              ) : isZipping ? (
                <>
                  <i className="button-spinner" />
                  正在整理文件
                </>
              ) : pendingCount === 0 && doneCount > 0 ? (
                <>
                  <span aria-hidden="true">↓</span>
                  {doneCount > 1 ? `下载全部 ${doneCount} 张` : "下载图片"}
                </>
              ) : (
                <>
                  <span aria-hidden="true">✦</span>
                  开始转换 {pendingCount} 张
                </>
              )}
            </button>
          </aside>
        </section>
      )}

      <footer>
        <p>
          图轻 PicLite <span>·</span> 私密、轻巧、始终在本地
        </p>
        <p className="codec-credit">HEIC 解码由 libheif 提供支持</p>
      </footer>

      {installHelpOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setInstallHelpOpen(false);
          }}
        >
          <section
            className="install-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-title"
          >
            <button
              className="modal-close"
              aria-label="关闭"
              onClick={() => setInstallHelpOpen(false)}
            >
              ×
            </button>
            <div className="modal-app-icon" aria-hidden="true">
              <span />
              <span />
            </div>
            <span className="section-kicker">安装图轻</span>
            <h2 id="install-title">放到手机桌面，离线也能用</h2>
            <ol>
              <li>
                <span>1</span>
                <p>打开浏览器的分享或更多菜单</p>
              </li>
              <li>
                <span>2</span>
                <p>选择“添加到主屏幕”或“安装应用”</p>
              </li>
              <li>
                <span>3</span>
                <p>以后像普通 App 一样从桌面打开</p>
              </li>
            </ol>
            <button
              className="modal-done"
              onClick={() => setInstallHelpOpen(false)}
            >
              知道了
            </button>
          </section>
        </div>
      )}

      <div
        className={`toast ${notice ? "show" : ""}`}
        role="status"
        aria-live="polite"
      >
        <span>✓</span>
        {notice}
      </div>
    </main>
  );
}
