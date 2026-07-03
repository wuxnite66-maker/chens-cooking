"use client";

import { useEffect, useState } from "react";
import type { Content } from "@/content/site";

function ClockIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7.5V12l3 2" />
    </svg>
  );
}

const CLOSED = ["Geschlossen", "Zárva"];

/** Parse "11:30 – 22:00" → { open, close } in minutes, or null if closed/unparseable. */
function parseRange(time: string): { open: number; close: number; closeLabel: string } | null {
  const m = time.match(/(\d{1,2}):(\d{2}).*?(\d{1,2}):(\d{2})/);
  if (!m) return null;
  const open = +m[1] * 60 + +m[2];
  const close = +m[3] * 60 + +m[4];
  return { open, close, closeLabel: `${m[3]}:${m[4]}` };
}

type Now = { dow: number; mins: number } | null;

export function OpeningHours({ site }: { site: Content }) {
  const { hours } = site;
  const isHu = site.locale === "hu";
  const [now, setNow] = useState<Now>(null);

  useEffect(() => {
    const compute = () => {
      // Current time in the restaurant's timezone (Hungary) → correct for every visitor
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Budapest",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).formatToParts(new Date());
      const wd = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
      const hh = +(parts.find((p) => p.type === "hour")?.value ?? "0");
      const mm = +(parts.find((p) => p.type === "minute")?.value ?? "0");
      const map: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
      setNow({ dow: map[wd] ?? 0, mins: hh * 60 + mm });
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);

  // Live status badge
  let badge: { open: boolean; text: string } | null = null;
  if (now) {
    const today = hours.days[now.dow];
    const r = today ? parseRange(today.time) : null;
    if (!r) {
      badge = { open: false, text: isHu ? "Ma zárva" : "Heute geschlossen" };
    } else if (now.mins < r.open) {
      const openLabel = `${Math.floor(r.open / 60)}:${String(r.open % 60).padStart(2, "0")}`;
      badge = { open: false, text: isHu ? `Nyitás ${openLabel}-kor` : `Öffnet um ${openLabel} Uhr` };
    } else if (now.mins < r.close) {
      badge = {
        open: true,
        text: isHu ? `Most nyitva · ${r.closeLabel}-ig` : `Jetzt geöffnet · bis ${r.closeLabel} Uhr`,
      };
    } else {
      badge = { open: false, text: isHu ? "Most zárva" : "Jetzt geschlossen" };
    }
  }

  return (
    <div className="flex items-start gap-4">
      <ClockIcon />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-xs uppercase tracking-wider text-muted">{hours.label}</span>
          {badge && (
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                badge.open
                  ? "border-emerald-400/40 bg-emerald-500/12 text-emerald-300"
                  : "border-line bg-ink/50 text-muted"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${badge.open ? "animate-pulse bg-emerald-400" : "bg-muted"}`}
              />
              {badge.text}
            </span>
          )}
        </div>

        <ul className="mt-2.5 space-y-1">
          {hours.days.map((d, i) => {
            const closed = CLOSED.includes(d.time);
            const isToday = now?.dow === i;
            return (
              <li
                key={d.day}
                className={`flex items-baseline justify-between gap-3 text-sm ${
                  isToday ? "rounded-md bg-gold/10 px-2 -mx-2 py-0.5" : ""
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={isToday ? "font-semibold text-gold-soft" : "text-cream"}>{d.day}</span>
                  {isToday && (
                    <span className="rounded bg-gold/25 px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-gold-soft">
                      {isHu ? "Ma" : "Heute"}
                    </span>
                  )}
                </span>
                <span
                  aria-hidden
                  className="mx-1 h-px flex-1 translate-y-[-2px] border-b border-dotted border-line"
                />
                <span
                  className={
                    closed
                      ? "font-medium text-lacquer"
                      : isToday
                        ? "tabular font-semibold text-gold-soft"
                        : "tabular text-cream"
                  }
                >
                  {d.time}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
