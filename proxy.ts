import { NextRequest, NextResponse } from "next/server";
import { isLocale } from "./app/i18n";
import { SITE_URL } from "./app/site";

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const canonical = new URL(SITE_URL);
  if (url.hostname === `www.${canonical.hostname}` ||
      (url.hostname === canonical.hostname && url.protocol !== "https:")) {
    const destination = new URL(url.pathname + url.search, canonical);
    return NextResponse.redirect(destination, 308);
  }

  // Derive the document language from the URL, never from a client-supplied header.
  const locale = url.pathname.split("/")[1];
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-piclite-locale", isLocale(locale) ? locale : "en");
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (url.pathname === "/") {
    response.headers.set("Vary", "Accept-Language");
    response.headers.set("Cache-Control", "private, no-store");
  }
  return response;
}

export const config = {
  matcher: ["/((?!_vinext/|_next/|assets/|.*\\.).*)"],
};
