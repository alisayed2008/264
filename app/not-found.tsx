import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-xl font-semibold text-[var(--color-foreground)]">Page not found.</h1>
      <Link href="/" className="font-medium text-[var(--color-primary)]">Back home</Link>
    </main>
  );
}
