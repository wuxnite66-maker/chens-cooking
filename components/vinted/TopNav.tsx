"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useVinted } from "@/lib/vinted/store";

const NAV = [
  { href: "/vinted/dashboard", label: "Dashboard" },
  { href: "/vinted/neu", label: "Neues Inserat" },
  { href: "/vinted/inserate", label: "Meine Inserate" },
  { href: "/vinted/credits", label: "Credits" },
  { href: "/vinted/tipps", label: "Tipps" },
];

export function TopNav() {
  const { user, credits, logout, ready } = useVinted();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/vinted" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 text-white font-black">
            V
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            Vint<span className="text-teal-600">Flow</span>
          </span>
        </Link>

        {user ? (
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-teal-50 text-teal-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        ) : null}

        <div className="flex items-center gap-2">
          {ready && user ? (
            <>
              <Link
                href="/vinted/credits"
                title="Verfügbare Credits"
                className="hidden items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-800 sm:inline-flex"
              >
                <span aria-hidden>⚡</span> {credits}
              </Link>
              <button
                onClick={() => {
                  logout();
                  router.push("/vinted");
                }}
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 sm:block"
              >
                Abmelden
              </button>
              <button
                onClick={() => setOpen((o) => !o)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:hidden"
                aria-label="Menü"
              >
                ☰
              </button>
            </>
          ) : ready ? (
            <>
              <Link
                href="/vinted/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Anmelden
              </Link>
              <Link
                href="/vinted/register"
                className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
              >
                Kostenlos starten
              </Link>
            </>
          ) : null}
        </div>
      </div>

      {/* Mobile-Menü */}
      {open && user ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {n.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                logout();
                router.push("/vinted");
              }}
              className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-500 hover:bg-slate-100"
            >
              Abmelden
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
