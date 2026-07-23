"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useVinted } from "@/lib/vinted/store";
import { Button, Card, Field, inputClass } from "@/components/vinted/ui";

export default function LoginPage() {
  const { login, loginDemo } = useVinted();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = login(email, password);
    if (res.ok) router.push("/vinted/dashboard");
    else setError(res.error ?? "Anmeldung fehlgeschlagen.");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Card className="p-8">
        <h1 className="text-2xl font-bold text-slate-900">Anmelden</h1>
        <p className="mt-1 text-sm text-slate-600">Willkommen zurück bei VintFlow.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
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
          <Field label="Passwort">
            <input
              className={inputClass}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              autoComplete="current-password"
            />
          </Field>

          {error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}

          <Button type="submit" className="w-full">
            Anmelden
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-slate-500">
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
          Noch kein Konto?{" "}
          <Link href="/vinted/register" className="font-semibold text-teal-600 hover:underline">
            Kostenlos registrieren
          </Link>
        </p>
      </Card>
    </div>
  );
}
