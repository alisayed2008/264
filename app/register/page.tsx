"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fullName, email, password }) });
      const json = await res.json();
      if (!res.ok || !json.success) { setError(json.error?.message ?? "Something went wrong."); return; }
      setSuccess(true);
    } finally { setSubmitting(false); }
  }

  if (success) return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-[var(--color-foreground)]">{t("success")}</p>
      <Link href="/login" className="font-medium text-[var(--color-primary)]">{t("loginLink")}</Link>
    </main>
  );

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 px-6">
      <h1 className="text-xl font-semibold text-[var(--color-foreground)]">{t("title")}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1"><label htmlFor="fullName" className="text-sm font-medium">{t("nameLabel")}</label><input id="fullName" name="fullName" type="text" autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="rounded-[var(--radius-base)] border border-[var(--color-border)] bg-transparent px-3 py-2" /></div>
        <div className="flex flex-col gap-1"><label htmlFor="email" className="text-sm font-medium">{t("emailLabel")}</label><input id="email" name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-[var(--radius-base)] border border-[var(--color-border)] bg-transparent px-3 py-2" /></div>
        <div className="flex flex-col gap-1"><label htmlFor="password" className="text-sm font-medium">{t("passwordLabel")}</label><input id="password" name="password" type="password" required minLength={10} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-[var(--radius-base)] border border-[var(--color-border)] bg-transparent px-3 py-2" /><span className="text-xs text-[var(--color-muted)]">{t("passwordHint")}</span></div>
        {error && <p role="alert" className="text-sm text-[var(--color-danger)]">{error}</p>}
        <button type="submit" disabled={submitting} className="rounded-[var(--radius-base)] bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white disabled:opacity-60">{t("submit")}</button>
      </form>
      <p className="text-sm text-[var(--color-muted)]">{t("haveAccount")} <Link href="/login" className="font-medium text-[var(--color-primary)]">{t("loginLink")}</Link></p>
    </main>
  );
}
