import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ImageConverter from "../ImageConverter";
import { dictionaries, isLocale, LOCALES } from "../i18n";
import {
  languageAlternates,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE,
} from "../site";

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

  return {
    metadataBase: new URL(SITE_URL),
    title: messages.metaTitle,
    description: messages.metaDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: languageAlternates,
    },
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
    openGraph: {
      title: messages.metaTitle,
      description: messages.metaDescription,
      type: "website",
      locale: messages.tag.replace("-", "_"),
      alternateLocale: LOCALES
        .filter((code) => code !== locale)
        .map((code) => dictionaries[code].tag.replace("-", "_")),
      siteName: SITE_NAME,
      url: `/${locale}`,
      images: [
        {
          url: SOCIAL_IMAGE,
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
      images: [SOCIAL_IMAGE],
    },
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ImageConverter locale={locale} messages={dictionaries[locale]} />;
}
