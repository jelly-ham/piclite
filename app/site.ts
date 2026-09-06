import { dictionaries, LOCALES } from "./i18n";

export const SITE_NAME = "PicLite";
export const SITE_URL = "https://piclite.net";
export const SOCIAL_IMAGE = "/og.png";
export const SOCIAL_IMAGE_URL = `${SITE_URL}${SOCIAL_IMAGE}`;
export const SITE_LOGO_URL = `${SITE_URL}/icon-512.png`;

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: SITE_LOGO_URL,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: "Private, browser-based image and PDF conversion.",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export const languageAlternates = {
  ...Object.fromEntries(
    LOCALES.map((locale) => [
      dictionaries[locale].tag,
      `${SITE_URL}/${locale}`,
    ]),
  ),
  "x-default": `${SITE_URL}/en`,
};
