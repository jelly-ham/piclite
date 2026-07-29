import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import ImageConverter from "../ImageConverter";
import { dictionaries, isLocale, LOCALES } from "../i18n";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const messages = dictionaries[locale];
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
    title: messages.metaTitle,
    description: messages.metaDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(LOCALES.map((code) => [dictionaries[code].tag, `/${code}`])),
    },
    openGraph: {
      title: messages.metaTitle,
      description: messages.metaDescription,
      type: "website",
      locale: messages.tag.replace("-", "_"),
      siteName: "图轻 PicLite",
      url: `/${locale}`,
      images: [
        {
          url: "/og-v2.png",
          width: 1200,
          height: 630,
          alt: messages.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.metaTitle,
      description: messages.metaDescription,
      images: ["/og-v2.png"],
    },
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ImageConverter locale={locale} messages={dictionaries[locale]} />;
}
