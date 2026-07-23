"use client";

// Clientseitiger Demo-Store: Auth, Credits, Inserate und Einstellungen werden
// im localStorage gehalten. HINWEIS: Das ist ein Demo-Speicher ohne echte
// Server-Authentifizierung – Passwörter liegen unverschlüsselt lokal im
// Browser. Für den Produktivbetrieb würde man hier eine echte Datenbank +
// Auth (z. B. Supabase, Auth.js) einsetzen.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CREDIT_COSTS } from "./types";
import type { CreditAction, Listing, Settings, User } from "./types";

const LS_USERS = "vintflow_users";
const LS_SESSION = "vintflow_session";
const nsData = (email: string) => `vintflow_data_${email}`;

const START_CREDITS = 20;

const DEFAULT_SETTINGS: Settings = {
  bgColor: "#f4f4f5",
  watermark: false,
  defaultGender: "Damen",
  autoTitleCase: false,
};

interface StoredUser extends User {
  password: string;
}

interface UserData {
  credits: number;
  listings: Listing[];
  settings: Settings;
}

interface VintedState {
  ready: boolean;
  user: User | null;
  credits: number;
  listings: Listing[];
  settings: Settings;
}

interface VintedApi extends VintedState {
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  loginDemo: () => void;
  logout: () => void;
  addCredits: (n: number) => void;
  /** Zieht Credits für eine Aktion ab. Gibt false zurück, wenn zu wenig da. */
  spend: (action: CreditAction) => boolean;
  saveListing: (listing: Listing) => void;
  deleteListing: (id: string) => void;
  getListing: (id: string) => Listing | undefined;
  updateSettings: (patch: Partial<Settings>) => void;
}

const Ctx = createContext<VintedApi | null>(null);

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function loadUserData(email: string): UserData {
  return readJSON<UserData>(nsData(email), {
    credits: START_CREDITS,
    listings: [],
    settings: DEFAULT_SETTINGS,
  });
}

export function VintedProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<VintedState>({
    ready: false,
    user: null,
    credits: 0,
    listings: [],
    settings: DEFAULT_SETTINGS,
  });

  // Hydration beim ersten Render.
  useEffect(() => {
    const email = localStorage.getItem(LS_SESSION);
    if (email) {
      const users = readJSON<StoredUser[]>(LS_USERS, []);
      const u = users.find((x) => x.email === email);
      if (u) {
        const data = loadUserData(email);
        setState({
          ready: true,
          user: { email: u.email, name: u.name, createdAt: u.createdAt },
          credits: data.credits,
          listings: data.listings,
          settings: { ...DEFAULT_SETTINGS, ...data.settings },
        });
        return;
      }
    }
    setState((s) => ({ ...s, ready: true }));
  }, []);

  // Persistenz: bei jeder Änderung die Nutzerdaten speichern.
  const persist = useCallback(
    (email: string, data: Partial<UserData>) => {
      const current = loadUserData(email);
      const merged = { ...current, ...data };
      localStorage.setItem(nsData(email), JSON.stringify(merged));
    },
    [],
  );

  const register = useCallback(
    (name: string, email: string, password: string) => {
      email = email.trim().toLowerCase();
      if (!name.trim()) return { ok: false, error: "Bitte einen Namen angeben." };
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
        return { ok: false, error: "Bitte eine gültige E-Mail angeben." };
      if (password.length < 4)
        return { ok: false, error: "Passwort muss mind. 4 Zeichen haben." };
      const users = readJSON<StoredUser[]>(LS_USERS, []);
      if (users.some((u) => u.email === email))
        return { ok: false, error: "Diese E-Mail ist bereits registriert." };
      const user: StoredUser = { name: name.trim(), email, password, createdAt: Date.now() };
      users.push(user);
      localStorage.setItem(LS_USERS, JSON.stringify(users));
      localStorage.setItem(LS_SESSION, email);
      const data: UserData = { credits: START_CREDITS, listings: [], settings: DEFAULT_SETTINGS };
      localStorage.setItem(nsData(email), JSON.stringify(data));
      setState({
        ready: true,
        user: { name: user.name, email, createdAt: user.createdAt },
        credits: data.credits,
        listings: [],
        settings: DEFAULT_SETTINGS,
      });
      return { ok: true };
    },
    [],
  );

  const login = useCallback((email: string, password: string) => {
    email = email.trim().toLowerCase();
    const users = readJSON<StoredUser[]>(LS_USERS, []);
    const u = users.find((x) => x.email === email);
    if (!u) return { ok: false, error: "Kein Konto mit dieser E-Mail." };
    if (u.password !== password) return { ok: false, error: "Falsches Passwort." };
    localStorage.setItem(LS_SESSION, email);
    const data = loadUserData(email);
    setState({
      ready: true,
      user: { name: u.name, email, createdAt: u.createdAt },
      credits: data.credits,
      listings: data.listings,
      settings: { ...DEFAULT_SETTINGS, ...data.settings },
    });
    return { ok: true };
  }, []);

  const loginDemo = useCallback(() => {
    const email = "demo@vintflow.app";
    const users = readJSON<StoredUser[]>(LS_USERS, []);
    if (!users.some((u) => u.email === email)) {
      users.push({ name: "Demo-Nutzer", email, password: "demo", createdAt: Date.now() });
      localStorage.setItem(LS_USERS, JSON.stringify(users));
    }
    localStorage.setItem(LS_SESSION, email);
    const data = loadUserData(email);
    setState({
      ready: true,
      user: { name: "Demo-Nutzer", email, createdAt: Date.now() },
      credits: data.credits,
      listings: data.listings,
      settings: { ...DEFAULT_SETTINGS, ...data.settings },
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(LS_SESSION);
    setState({ ready: true, user: null, credits: 0, listings: [], settings: DEFAULT_SETTINGS });
  }, []);

  const addCredits = useCallback(
    (n: number) => {
      setState((s) => {
        if (!s.user) return s;
        const credits = s.credits + n;
        persist(s.user.email, { credits });
        return { ...s, credits };
      });
    },
    [persist],
  );

  const spend = useCallback(
    (action: CreditAction) => {
      const cost = CREDIT_COSTS[action];
      let ok = false;
      setState((s) => {
        if (!s.user || s.credits < cost) return s;
        ok = true;
        const credits = s.credits - cost;
        persist(s.user.email, { credits });
        return { ...s, credits };
      });
      return ok;
    },
    [persist],
  );

  const saveListing = useCallback(
    (listing: Listing) => {
      setState((s) => {
        if (!s.user) return s;
        const idx = s.listings.findIndex((l) => l.id === listing.id);
        const listings =
          idx >= 0
            ? s.listings.map((l) => (l.id === listing.id ? listing : l))
            : [listing, ...s.listings];
        persist(s.user.email, { listings });
        return { ...s, listings };
      });
    },
    [persist],
  );

  const deleteListing = useCallback(
    (id: string) => {
      setState((s) => {
        if (!s.user) return s;
        const listings = s.listings.filter((l) => l.id !== id);
        persist(s.user.email, { listings });
        return { ...s, listings };
      });
    },
    [persist],
  );

  const getListing = useCallback(
    (id: string) => state.listings.find((l) => l.id === id),
    [state.listings],
  );

  const updateSettings = useCallback(
    (patch: Partial<Settings>) => {
      setState((s) => {
        if (!s.user) return s;
        const settings = { ...s.settings, ...patch };
        persist(s.user.email, { settings });
        return { ...s, settings };
      });
    },
    [persist],
  );

  const api = useMemo<VintedApi>(
    () => ({
      ...state,
      register,
      login,
      loginDemo,
      logout,
      addCredits,
      spend,
      saveListing,
      deleteListing,
      getListing,
      updateSettings,
    }),
    [
      state,
      register,
      login,
      loginDemo,
      logout,
      addCredits,
      spend,
      saveListing,
      deleteListing,
      getListing,
      updateSettings,
    ],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useVinted(): VintedApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useVinted muss innerhalb von <VintedProvider> verwendet werden");
  return ctx;
}
