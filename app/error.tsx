"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error.digest ?? error.message);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-xl font-semibold text-[var(--color-foreground)]">Something went wrong.</h1>
      <p className="text-[var(--color-muted)]">Please try again. If this keeps happening, contact support.</p>
      <button type="button" onClick={reset} className="rounded-[var(--radius-base)] bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white">
        Try again
      </button>
    </main>
  );
}
