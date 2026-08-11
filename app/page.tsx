import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function HomePage() {
  const t = await getTranslations("home");
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">{t("title")}</h1>
      <p className="text-[var(--color-muted)]">{t("subtitle")}</p>
      <div className="mt-4 flex gap-3">
        <Link href="/login" className="rounded-[var(--radius-base)] border border-[var(--color-border)] px-4 py-2 text-sm font-medium">{t("loginCta")}</Link>
        <Link href="/register" className="rounded-[var(--radius-base)] bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white">{t("registerCta")}</Link>
      </div>
    </main>
  );
}
