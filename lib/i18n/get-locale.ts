import { cookies } from "next/headers";

export type Locale = "ar" | "en";
export const DEFAULT_LOCALE: Locale = "ar";
export const LOCALE_COOKIE = "locale";

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return value === "en" ? "en" : DEFAULT_LOCALE;
}
export function getDirection(locale: Locale): "rtl" | "ltr" { return locale === "ar" ? "rtl" : "ltr"; }
