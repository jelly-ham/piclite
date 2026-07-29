import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "图轻 PicLite — 图片格式转换与压缩";
const description =
  "在设备本地转换 JPG、PNG、WebP、AVIF、BMP 与 HEIC 图片。无需上传，支持批量处理、离线使用和安装到桌面。";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title,
    description,
    applicationName: "图轻 PicLite",
    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "图轻",
    },
    formatDetection: {
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/favicon.png", sizes: "64x64", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "zh_CN",
      siteName: "图轻 PicLite",
      url: "/",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "图轻 PicLite — 把图片，轻轻换一种格式。",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#121311" },
  ],
};

const themeScript = `
  try {
    const value = localStorage.getItem("piclite-theme") || "auto";
    document.documentElement.dataset.theme = value;
  } catch (_) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-theme="auto" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
