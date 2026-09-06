import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionaries, isLocale } from "../../i18n";
import {
  getToolPageCopy,
  isKeywordLocale,
  isToolSlug,
  KEYWORD_LOCALES,
  TOOL_SLUGS,
  toolLanguageAlternates,
  toolStructuredData,
  type KeywordLocale,
  type ToolSlug,
} from "../../seo";
import ToolLanding from "../../tool-landing";
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE } from "../../site";

type ToolPageProps = {
  params: Promise<{ locale: string; tool: string }>;
};

export function generateStaticParams() {
  return KEYWORD_LOCALES.flatMap((locale) =>
    TOOL_SLUGS.map((tool) => ({ locale, tool })),
  );
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { locale: rawLocale, tool: rawTool } = await params;
  if (!isKeywordLocale(rawLocale) || !isToolSlug(rawTool)) return {};

  const locale = rawLocale as KeywordLocale;
  const copy = getToolPageCopy(locale, rawTool as ToolSlug);
  const url = `/${locale}/${rawTool}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: copy.title,
    description: copy.description,
    applicationName: SITE_NAME,
    category: "utilities",
    alternates: {
      canonical: url,
      languages: toolLanguageAlternates(rawTool),
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
      title: copy.title,
      description: copy.description,
      type: "website",
      locale: dictionaries[locale].tag.replace("-", "_"),
      siteName: SITE_NAME,
      url,
      images: [
        {
          url: SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: copy.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [SOCIAL_IMAGE],
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { locale: rawLocale, tool: rawTool } = await params;
  if (!isLocale(rawLocale) || !isKeywordLocale(rawLocale) || !isToolSlug(rawTool)) {
    notFound();
  }

  const locale = rawLocale as KeywordLocale;
  const copy = getToolPageCopy(locale, rawTool as ToolSlug);
  const structuredData = toolStructuredData(locale, copy);

  return (
    <>
      <ToolLanding locale={locale} copy={copy} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
