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
    alternates: { languages: languageAlternates },
  }));

  const keywordPages = KEYWORD_LOCALES.flatMap((locale) =>
    TOOL_SLUGS.map((slug) => ({
      url: `${SITE_URL}/${locale}/${slug}`,
      alternates: { languages: toolLanguageAlternates(slug) },
    })),
  );

  return [...localizedHomepages, ...keywordPages];
}
