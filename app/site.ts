import { dictionaries, LOCALES } from "./i18n";

export const SITE_NAME = "PicLite";
export const SITE_URL = "https://piclite.net";
export const SOCIAL_IMAGE = "/og.png";

export const languageAlternates = {
  ...Object.fromEntries(
    LOCALES.map((locale) => [
      dictionaries[locale].tag,
      `${SITE_URL}/${locale}`,
    ]),
  ),
  "x-default": `${SITE_URL}/en`,
};

