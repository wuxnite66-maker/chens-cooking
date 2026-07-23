"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useVinted } from "@/lib/vinted/store";
import { Button, Card, Field, inputClass } from "@/components/vinted/ui";

export default function RegisterPage() {
  const { register, loginDemo } = useVinted();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = register(name, email, password);
    if (res.ok) router.push("/vinted/dashboard");
    else setError(res.error ?? "Registrierung fehlgeschlagen.");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Card className="p-8">
        <h1 className="text-2xl font-bold text-slate-900">Konto erstellen</h1>
        <p className="mt-1 text-sm text-slate-600">
          Kostenlos, mit 20 Gratis-Credits zum Ausprobieren.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <Field label="Name">
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Vorname"
              autoComplete="name"
            />
          </Field>
          <Field label="E-Mail">
            <input
              className={inputClass}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="du@beispiel.de"
              autoComplete="email"
            />
          </Field>
          <Field label="Passwort" hint="Mindestens 4 Zeichen (Demo).">
            <input
              className={inputClass}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              autoComplete="new-password"
            />
          </Field>

          {error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}

          <Button type="submit" className="w-full">
            Registrieren
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-slate-500">
          Nur schnell testen?{" "}
          <button
            onClick={() => {
              loginDemo();
              router.push("/vinted/dashboard");
            }}
            className="font-semibold text-teal-600 hover:underline"
          >
            Als Demo-Nutzer fortfahren
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Schon ein Konto?{" "}
          <Link href="/vinted/login" className="font-semibold text-teal-600 hover:underline">
            Anmelden
          </Link>
        </p>

        <p className="mt-4 text-center text-xs text-slate-400">
          Demo-Speicher: Konto & Daten liegen nur lokal in deinem Browser.
        </p>
      </Card>
    </div>
  );
}
