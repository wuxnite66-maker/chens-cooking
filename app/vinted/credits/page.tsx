"use client";

import { useState } from "react";
import { useVinted } from "@/lib/vinted/store";
import { RequireAuth } from "@/components/vinted/RequireAuth";
import { Badge, Button, Card } from "@/components/vinted/ui";
import { CREDIT_COSTS } from "@/lib/vinted/types";

const PACKS = [
  { credits: 50, price: "4,99 €", popular: false },
  { credits: 150, price: "9,99 €", popular: true },
  { credits: 500, price: "24,99 €", popular: false },
];

const COSTS: { label: string; cost: number }[] = [
  { label: "Hintergrund entfernen", cost: CREDIT_COSTS.background },
  { label: "Bild verbessern", cost: CREDIT_COSTS.enhance },
  { label: "Hochskalieren (2×)", cost: CREDIT_COSTS.upscale },
  { label: "Virtuelles Model", cost: CREDIT_COSTS.model },
  { label: "Inserat-Text (KI)", cost: CREDIT_COSTS.listing },
];

function CreditsInner() {
  const { credits, addCredits } = useVinted();
  const [msg, setMsg] = useState<string | null>(null);

  function buy(n: number) {
    addCredits(n);
    setMsg(`${n} Credits gutgeschrieben (Demo – keine echte Zahlung).`);
    setTimeout(() => setMsg(null), 3500);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Credits</h1>
      <p className="mt-1 text-slate-600">
        Credits werden für KI-Aktionen verbraucht. Neue Konten starten mit 20 Gratis-Credits.
      </p>

      <Card className="mt-6 flex items-center justify-between p-6">
        <div>
          <div className="text-sm font-medium text-slate-500">Dein Guthaben</div>
          <div className="mt-1 text-4xl font-extrabold text-slate-900">
            <span className="text-amber-500">⚡</span> {credits}
          </div>
        </div>
        <Badge tone="amber">Demo-Guthaben</Badge>
      </Card>

      {msg ? (
        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          {msg}
        </div>
      ) : null}

      <h2 className="mt-10 text-lg font-bold text-slate-900">Pakete</h2>
      <p className="text-sm text-slate-500">
        Dies ist eine Demo – es wird nichts abgebucht. In der echten App käme hier
        ein Zahlungsanbieter (z. B. Stripe) an.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {PACKS.map((p) => (
          <Card
            key={p.credits}
            className={`relative p-6 text-center ${p.popular ? "ring-2 ring-teal-500" : ""}`}
          >
            {p.popular ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white">
                Beliebt
              </span>
            ) : null}
            <div className="text-3xl font-extrabold text-slate-900">{p.credits}</div>
            <div className="text-sm text-slate-500">Credits</div>
            <div className="mt-3 text-lg font-bold text-teal-700">{p.price}</div>
            <Button className="mt-4 w-full" onClick={() => buy(p.credits)}>
              Kaufen (Demo)
            </Button>
          </Card>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-bold text-slate-900">Was kostet was?</h2>
      <Card className="mt-4 divide-y divide-slate-100">
        {COSTS.map((c) => (
          <div key={c.label} className="flex items-center justify-between px-5 py-3">
            <span className="text-slate-700">{c.label}</span>
            <span className="font-bold text-amber-600">⚡ {c.cost}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

export default function CreditsPage() {
  return (
    <RequireAuth>
      <CreditsInner />
    </RequireAuth>
  );
}
