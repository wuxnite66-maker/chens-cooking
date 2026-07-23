"use client";

import Link from "next/link";
import { useVinted } from "@/lib/vinted/store";
import { LinkButton } from "./ui";

/** Zeigt Kinder nur an, wenn ein Nutzer angemeldet ist. Sonst Login-Hinweis. */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { ready, user } = useVinted();

  if (!ready) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center text-slate-400">
        Lädt …
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <div className="mb-4 text-4xl">🔒</div>
        <h1 className="text-xl font-bold text-slate-900">
          Bitte anmelden
        </h1>
        <p className="mt-2 text-slate-600">
          Für diesen Bereich brauchst du ein (kostenloses) Konto.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <LinkButton href="/vinted/register">Kostenlos registrieren</LinkButton>
          <Link
            href="/vinted/login"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Anmelden
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
