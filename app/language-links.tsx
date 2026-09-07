import { dictionaries, LOCALES, type Locale } from "./i18n";
import { KEYWORD_LOCALES, type ToolSlug } from "./seo";

export default function LanguageLinks({ locale, tool }: { locale: Locale; tool?: ToolSlug }) {
  const locales = tool ? KEYWORD_LOCALES : LOCALES;
  return (
    <nav className="language-links" aria-label={dictionaries[locale].languageLabel}>
      {locales.map((code) => (
        <a key={code} href={`/${code}${tool ? `/${tool}` : ""}`}
          hrefLang={dictionaries[code].tag} lang={dictionaries[code].tag}
          aria-current={code === locale ? "page" : undefined}>
          {dictionaries[code].nativeName}
        </a>
      ))}
    </nav>
  );
}
