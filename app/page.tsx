import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { localeFromBrowser } from "./i18n";

export default async function RootPage() {
  const requestHeaders = await headers();
  const acceptLanguage = requestHeaders.get("accept-language") ?? "en";
  redirect(`/${localeFromBrowser(acceptLanguage)}`);
}
