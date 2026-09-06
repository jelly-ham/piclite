import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  languageAlternates,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE,
  siteStructuredData,
} from "./site";

const title = "PicLite — Free online image converter & compressor";
const description =
  "Convert and compress HEIC, JPG, PNG, WebP and PDF files in your browser. Private image conversion with no upload required.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: SITE_NAME,
  category: "utilities",
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/en",
    languages: languageAlternates,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
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
    locale: "en",
    siteName: SITE_NAME,
    url: "/en",
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "PicLite — Private image and PDF conversion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [SOCIAL_IMAGE],
  },
};

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
    <html lang="en" data-theme="auto" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteStructuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
