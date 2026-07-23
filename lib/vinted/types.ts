// Zentrale Typdefinitionen für die VintFlow-App (Vinted-KI-Assistent).
// Alle Daten werden im Demo-Modus clientseitig (localStorage) gehalten.

export type SizeType = "kleidung" | "hose" | "schuhe" | "onesize";

export interface Category {
  id: string;
  label: string;
  /** Oberkategorie / Zielgruppe */
  group: "Damen" | "Herren" | "Unisex" | "Kinder";
  /** Substantiv für Titelbildung, z. B. "Hoodie" */
  noun: string;
  /** Richt-Basispreis in € für die Preisheuristik */
  basePrice: number;
  sizeType: SizeType;
  /** Stichwörter für automatische Tags */
  keywords: string[];
}

export interface BrandTier {
  id: string;
  label: string;
  /** Faktor auf den Basispreis */
  multiplier: number;
}

export interface Brand {
  name: string;
  tier: string; // BrandTier.id
}

export interface Condition {
  id: string;
  label: string;
  /** Faktor auf den Preis (Neu = 1.0) */
  multiplier: number;
  /** Kurzbeschreibung für die Beschreibung */
  hint: string;
}

export interface ColorOption {
  id: string;
  label: string;
  /** Hex für Farbchip in der UI */
  hex: string;
}

/** Die vom Nutzer/KI gepflegten Merkmale eines Inserats. */
export interface ListingAttributes {
  categoryId: string;
  brand: string;
  colorId: string;
  size: string;
  conditionId: string;
  material?: string;
  gender?: string;
  flaws?: string; // freitext Mängel
}

/** Das fertige, KI-generierte Inserat. */
export interface GeneratedListing {
  title: string;
  description: string;
  tags: string[];
  category: string;
  brand: string;
  color: string;
  size: string;
  condition: string;
  price: number;
  priceMin: number;
  priceMax: number;
  /** true, wenn Text von der echten KI (Claude) kam, false = Vorlage */
  aiPowered: boolean;
}

/** Ein Bild in einem Projekt inkl. Bearbeitungsstatus. */
export interface ProjectImage {
  id: string;
  /** Original als Data-URL */
  original: string;
  /** Aktuell angezeigtes (bearbeitetes) Bild als Data-URL */
  current: string;
  /** angewandte Bearbeitungen */
  edits: string[];
  width: number;
  height: number;
}

/** Ein vollständiges gespeichertes Inserat/Projekt. */
export interface Listing {
  id: string;
  createdAt: number;
  updatedAt: number;
  images: ProjectImage[];
  attributes: ListingAttributes;
  generated?: GeneratedListing;
  status: "entwurf" | "fertig" | "veroeffentlicht";
}

export interface User {
  email: string;
  name: string;
  createdAt: number;
}

export interface Settings {
  /** Standard-Hintergrundfarbe beim Freistellen */
  bgColor: string;
  /** Wasserzeichen auf exportierte Bilder legen */
  watermark: boolean;
  /** Standardgruppe/Zielgruppe */
  defaultGender: "Damen" | "Herren" | "Unisex" | "Kinder";
  /** automatische Titel großschreiben */
  autoTitleCase: boolean;
}

/** Preis in Credits pro KI-Aktion. */
export const CREDIT_COSTS = {
  background: 1,
  enhance: 1,
  upscale: 2,
  model: 3,
  listing: 2,
} as const;

export type CreditAction = keyof typeof CREDIT_COSTS;
