"use client";

import { useEffect } from "react";
import { localeFromBrowser } from "./i18n";

export default function LanguageRedirect() {
  useEffect(() => {
    window.location.replace(`/${localeFromBrowser(navigator.language)}`);
  }, []);

  return (
    <main className="language-loading" aria-live="polite">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
      </span>
      <strong>图轻 PicLite</strong>
      <p>Choosing your language…</p>
    </main>
  );
}
