import type { MetadataRoute } from "next";
import { LOCALES } from "./i18n";
import {
  KEYWORD_LOCALES,
  TOOL_SLUGS,
  toolLanguageAlternates,
} from "./seo";
import { languageAlternates, SITE_URL } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedHomepages = LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages: languageAlternates },
    images: [`${SITE_URL}/og.png`],
  }));

  const keywordPages = KEYWORD_LOCALES.flatMap((locale) =>
    TOOL_SLUGS.map((slug) => ({
      url: `${SITE_URL}/${locale}/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages: toolLanguageAlternates(slug) },
      images: [`${SITE_URL}/og.png`],
    })),
  );

  return [...localizedHomepages, ...keywordPages];
}
