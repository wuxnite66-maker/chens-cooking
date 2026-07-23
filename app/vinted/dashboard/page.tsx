"use client";

import Link from "next/link";
import { useVinted } from "@/lib/vinted/store";
import { RequireAuth } from "@/components/vinted/RequireAuth";
import { Badge, Card, LinkButton } from "@/components/vinted/ui";

function DashboardInner() {
  const { user, credits, listings } = useVinted();

  const fertig = listings.filter((l) => l.status !== "entwurf").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Hallo {user?.name} 👋
          </h1>
          <p className="mt-1 text-slate-600">Was möchtest du heute verkaufen?</p>
        </div>
        <LinkButton href="/vinted/neu" className="px-5 py-3 text-base">
          + Neues Inserat erstellen
        </LinkButton>
      </div>

      {/* Kennzahlen */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="text-sm font-medium text-slate-500">Verfügbare Credits</div>
          <div className="mt-1 flex items-center gap-2 text-3xl font-extrabold text-slate-900">
            <span className="text-amber-500">⚡</span> {credits}
          </div>
          <Link href="/vinted/credits" className="mt-2 inline-block text-sm font-semibold text-teal-600 hover:underline">
            Credits aufladen →
          </Link>
        </Card>
        <Card className="p-5">
          <div className="text-sm font-medium text-slate-500">Inserate gesamt</div>
          <div className="mt-1 text-3xl font-extrabold text-slate-900">{listings.length}</div>
          <Link href="/vinted/inserate" className="mt-2 inline-block text-sm font-semibold text-teal-600 hover:underline">
            Alle ansehen →
          </Link>
        </Card>
        <Card className="p-5">
          <div className="text-sm font-medium text-slate-500">Fertig / veröffentlicht</div>
          <div className="mt-1 text-3xl font-extrabold text-slate-900">{fertig}</div>
        </Card>
      </div>

      {/* Schnellzugriff */}
      <h2 className="mt-10 text-lg font-bold text-slate-900">Schnellzugriff</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: "/vinted/neu", icon: "➕", t: "Neues Inserat", d: "Foto → fertiges Inserat" },
          { href: "/vinted/inserate", icon: "📦", t: "Meine Inserate", d: "Entwürfe & Fertige" },
          { href: "/vinted/credits", icon: "⚡", t: "Credits", d: "Guthaben & Pakete" },
          { href: "/vinted/einstellungen", icon: "⚙️", t: "Einstellungen", d: "Standardwerte" },
        ].map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div className="text-2xl">{q.icon}</div>
            <div className="mt-2 font-bold text-slate-900">{q.t}</div>
            <div className="text-sm text-slate-500">{q.d}</div>
          </Link>
        ))}
      </div>

      {/* Letzte Inserate */}
      <h2 className="mt-10 text-lg font-bold text-slate-900">Zuletzt bearbeitet</h2>
      {listings.length === 0 ? (
        <Card className="mt-4 p-10 text-center">
          <div className="text-4xl">🧺</div>
          <p className="mt-3 font-semibold text-slate-700">Noch keine Inserate</p>
          <p className="mt-1 text-sm text-slate-500">
            Erstelle dein erstes Inserat aus einem Foto.
          </p>
          <div className="mt-5 flex justify-center">
            <LinkButton href="/vinted/neu">Jetzt starten</LinkButton>
          </div>
        </Card>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.slice(0, 6).map((l) => (
            <Link
              key={l.id}
              href={`/vinted/inserate?id=${l.id}`}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-md"
            >
              <div className="aspect-[4/3] bg-slate-100">
                {l.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={l.images[0].current} alt="" className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-semibold text-slate-900">
                    {l.generated?.title ?? "Entwurf"}
                  </span>
                  <Badge tone={l.status === "entwurf" ? "amber" : "green"}>
                    {l.status}
                  </Badge>
                </div>
                {l.generated ? (
                  <div className="mt-1 text-sm font-bold text-teal-700">
                    {l.generated.price.toFixed(2)} €
                  </div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardInner />
    </RequireAuth>
  );
}
