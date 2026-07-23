"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useVinted } from "@/lib/vinted/store";
import { RequireAuth } from "@/components/vinted/RequireAuth";
import { Badge, Button, Card, LinkButton } from "@/components/vinted/ui";
import { addWatermark, downloadDataUrl } from "@/lib/vinted/imaging";
import type { Listing } from "@/lib/vinted/types";

function Detail({ listing }: { listing: Listing }) {
  const { deleteListing, saveListing, settings } = useVinted();
  const router = useRouter();
  const g = listing.generated;

  async function copyText() {
    if (!g) return;
    await navigator.clipboard.writeText(
      `${g.title}\n\n${g.description}\n\nTags: ${g.tags.join(", ")}\nPreis: ${g.price.toFixed(2)} €`,
    );
  }

  async function download() {
    for (let i = 0; i < listing.images.length; i++) {
      let url = listing.images[i].current;
      if (settings.watermark) url = (await addWatermark(url, "VintFlow")).dataUrl;
      downloadDataUrl(url, `vintflow-${i + 1}.jpg`);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link href="/vinted/inserate" className="text-sm font-semibold text-teal-600 hover:underline">
        ← Alle Inserate
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            {listing.images[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={listing.images[0].current} alt="" className="w-full object-contain" />
            ) : null}
          </div>
          {listing.images.length > 1 ? (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {listing.images.slice(1).map((img) => (
                <div key={img.id} className="aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.current} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Badge tone={listing.status === "entwurf" ? "amber" : "green"}>{listing.status}</Badge>
            {g?.aiPowered ? <Badge tone="teal">🤖 KI</Badge> : null}
          </div>
          <h1 className="mt-3 text-2xl font-bold text-slate-900">
            {g?.title ?? "Entwurf ohne Text"}
          </h1>
          {g ? (
            <>
              <div className="mt-2 text-xl font-extrabold text-teal-700">
                {g.price.toFixed(2)} €
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm text-slate-700">{g.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {g.tags.map((t) => (
                  <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                    #{t}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              Für dieses Inserat wurde noch kein Text generiert.
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {g ? (
              <Button variant="outline" onClick={copyText}>
                📋 Text kopieren
              </Button>
            ) : null}
            <Button variant="outline" onClick={download}>
              ⬇ Bilder
            </Button>
            {listing.status !== "veroeffentlicht" ? (
              <Button
                onClick={() => saveListing({ ...listing, status: "veroeffentlicht", updatedAt: Date.now() })}
              >
                Als veröffentlicht markieren
              </Button>
            ) : null}
            <Button
              variant="danger"
              onClick={() => {
                deleteListing(listing.id);
                router.push("/vinted/inserate");
              }}
            >
              Löschen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListView() {
  const { listings } = useVinted();
  const params = useSearchParams();
  const id = params.get("id");

  if (id) {
    const found = listings.find((l) => l.id === id);
    if (found) return <Detail listing={found} />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Meine Inserate</h1>
        <LinkButton href="/vinted/neu">+ Neu</LinkButton>
      </div>

      {listings.length === 0 ? (
        <Card className="mt-8 p-12 text-center">
          <div className="text-5xl">📦</div>
          <p className="mt-4 font-semibold text-slate-700">Noch keine Inserate gespeichert</p>
          <div className="mt-5 flex justify-center">
            <LinkButton href="/vinted/neu">Erstes Inserat erstellen</LinkButton>
          </div>
        </Card>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
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
                  <Badge tone={l.status === "entwurf" ? "amber" : "green"}>{l.status}</Badge>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  {l.generated ? (
                    <span className="font-bold text-teal-700">{l.generated.price.toFixed(2)} €</span>
                  ) : (
                    <span className="text-sm text-slate-400">kein Preis</span>
                  )}
                  <span className="text-xs text-slate-400">
                    {new Date(l.createdAt).toLocaleDateString("de-DE")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InseratePage() {
  return (
    <RequireAuth>
      <Suspense fallback={<div className="py-20 text-center text-slate-400">Lädt …</div>}>
        <ListView />
      </Suspense>
    </RequireAuth>
  );
}
