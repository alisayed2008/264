"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await signIn("credentials", { email, password, redirect: false });
    setSubmitting(false);
    if (!result || result.error) { setError(t("error")); return; }
    router.push(callbackUrl);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 px-6">
      <h1 className="text-xl font-semibold text-[var(--color-foreground)]">{t("title")}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">{t("emailLabel")}</label>
          <input id="email" name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-[var(--radius-base)] border border-[var(--color-border)] bg-transparent px-3 py-2" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium">{t("passwordLabel")}</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-[var(--radius-base)] border border-[var(--color-border)] bg-transparent px-3 py-2" />
        </div>
        {error && <p role="alert" className="text-sm text-[var(--color-danger)]">{error}</p>}
        <button type="submit" disabled={submitting} className="rounded-[var(--radius-base)] bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white disabled:opacity-60">{t("submit")}</button>
      </form>
      <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]"><span className="h-px flex-1 bg-[var(--color-border)]" />{t("orDivider")}<span className="h-px flex-1 bg-[var(--color-border)]" /></div>
      <button type="button" onClick={() => signIn("google", { callbackUrl })} className="rounded-[var(--radius-base)] border border-[var(--color-border)] px-4 py-2 text-sm font-medium">{t("googleButton")}</button>
      <p className="text-sm text-[var(--color-muted)]">{t("noAccount")} <Link href="/register" className="font-medium text-[var(--color-primary)]">{t("registerLink")}</Link></p>
    </main>
  );
}
