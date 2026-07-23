"use client";

import { useVinted } from "@/lib/vinted/store";
import { RequireAuth } from "@/components/vinted/RequireAuth";
import { Card, Chip, Field } from "@/components/vinted/ui";

const BG_CHOICES = [
  { id: "#f4f4f5", label: "Hellgrau" },
  { id: "#ffffff", label: "Weiß" },
  { id: "#eef2f7", label: "Studio-Blau" },
  { id: "#f6efe6", label: "Creme" },
  { id: "transparent", label: "Transparent (PNG)" },
];

const GENDERS = ["Damen", "Herren", "Unisex", "Kinder"] as const;

function SettingsInner() {
  const { user, settings, updateSettings } = useVinted();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Einstellungen</h1>
      <p className="mt-1 text-slate-600">Standardwerte für neue Inserate.</p>

      <Card className="mt-6 space-y-6 p-6">
        <div>
          <div className="mb-2 text-sm font-semibold text-slate-700">
            Standard-Hintergrund beim Freistellen
          </div>
          <div className="flex flex-wrap gap-2">
            {BG_CHOICES.map((b) => (
              <Chip
                key={b.id}
                active={settings.bgColor === b.id}
                onClick={() => updateSettings({ bgColor: b.id })}
              >
                {b.label}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 text-sm font-semibold text-slate-700">Standard-Zielgruppe</div>
          <div className="flex flex-wrap gap-2">
            {GENDERS.map((g) => (
              <Chip
                key={g}
                active={settings.defaultGender === g}
                onClick={() => updateSettings({ defaultGender: g })}
              >
                {g}
              </Chip>
            ))}
          </div>
        </div>

        <label className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-700">
              Wasserzeichen beim Export
            </div>
            <div className="text-xs text-slate-500">
              Legt beim Download ein dezentes „VintFlow“ auf die Bilder.
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.watermark}
            onChange={(e) => updateSettings({ watermark: e.target.checked })}
            className="h-5 w-5 accent-teal-600"
          />
        </label>
      </Card>

      <Card className="mt-6 p-6">
        <Field label="Konto">
          <div className="text-sm text-slate-600">
            Angemeldet als <strong>{user?.name}</strong> ({user?.email})
          </div>
        </Field>
        <p className="mt-3 text-xs text-slate-400">
          Demo-Hinweis: Alle Daten liegen ausschließlich lokal in deinem Browser
          (localStorage). Es werden keine Bilder oder Konten an einen Server gesendet –
          außer bei der optionalen KI-Textgenerierung, falls ein API-Schlüssel
          hinterlegt ist.
        </p>
      </Card>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <RequireAuth>
      <SettingsInner />
    </RequireAuth>
  );
}
