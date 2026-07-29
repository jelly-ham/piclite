import type { MetadataRoute } from "next";
import { LOCALES } from "./i18n";
import { languageAlternates, SITE_URL } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: {
      languages: languageAlternates,
    },
    images: [`${SITE_URL}/og.png`],
  }));
}
