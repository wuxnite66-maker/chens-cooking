// Deutsche Taxonomie für Kleidungs-Inserate: Kategorien, Marken, Farben,
// Größen und Zustände. Bewusst an Vinted angelehnt, aber eigenständig.

import type {
  Brand,
  BrandTier,
  Category,
  ColorOption,
  Condition,
} from "./types";

export const BRAND_TIERS: BrandTier[] = [
  { id: "luxus", label: "Luxus", multiplier: 3.4 },
  { id: "premium", label: "Premium", multiplier: 1.9 },
  { id: "mittel", label: "Mittelklasse", multiplier: 1.25 },
  { id: "budget", label: "Basic", multiplier: 0.85 },
  { id: "noname", label: "Ohne Marke", multiplier: 0.6 },
];

export const BRAND_TIER_MAP: Record<string, number> = Object.fromEntries(
  BRAND_TIERS.map((t) => [t.id, t.multiplier]),
);

// Sortiert nach Beliebtheit auf dem Second-Hand-Markt.
export const BRANDS: Brand[] = [
  // Luxus
  { name: "Moncler", tier: "luxus" },
  { name: "Stone Island", tier: "luxus" },
  { name: "Canada Goose", tier: "luxus" },
  { name: "Gucci", tier: "luxus" },
  { name: "Prada", tier: "luxus" },
  { name: "Burberry", tier: "luxus" },
  { name: "Balenciaga", tier: "luxus" },
  // Premium
  { name: "Ralph Lauren", tier: "premium" },
  { name: "Polo Ralph Lauren", tier: "premium" },
  { name: "Tommy Hilfiger", tier: "premium" },
  { name: "Lacoste", tier: "premium" },
  { name: "Hugo Boss", tier: "premium" },
  { name: "The North Face", tier: "premium" },
  { name: "Carhartt", tier: "premium" },
  { name: "Carhartt WIP", tier: "premium" },
  { name: "Napapijri", tier: "premium" },
  { name: "Diesel", tier: "premium" },
  { name: "Levi's", tier: "premium" },
  { name: "Patagonia", tier: "premium" },
  { name: "Arc'teryx", tier: "premium" },
  // Mittelklasse
  { name: "Nike", tier: "mittel" },
  { name: "Adidas", tier: "mittel" },
  { name: "Puma", tier: "mittel" },
  { name: "New Balance", tier: "mittel" },
  { name: "Reebok", tier: "mittel" },
  { name: "Champion", tier: "mittel" },
  { name: "Vans", tier: "mittel" },
  { name: "Converse", tier: "mittel" },
  { name: "Superdry", tier: "mittel" },
  { name: "Jack & Jones", tier: "mittel" },
  { name: "Tommy Jeans", tier: "mittel" },
  { name: "Calvin Klein", tier: "mittel" },
  { name: "Uniqlo", tier: "mittel" },
  // Basic
  { name: "Zara", tier: "budget" },
  { name: "H&M", tier: "budget" },
  { name: "Bershka", tier: "budget" },
  { name: "Pull&Bear", tier: "budget" },
  { name: "Primark", tier: "budget" },
  { name: "C&A", tier: "budget" },
  { name: "Esprit", tier: "budget" },
  { name: "Only", tier: "budget" },
  { name: "Vero Moda", tier: "budget" },
  { name: "Shein", tier: "budget" },
  // Ohne Marke
  { name: "Ohne Marke", tier: "noname" },
];

export function brandTierId(brandName: string): string {
  const found = BRANDS.find(
    (b) => b.name.toLowerCase() === brandName.trim().toLowerCase(),
  );
  return found ? found.tier : "noname";
}

export const CATEGORIES: Category[] = [
  // Damen
  { id: "d-kleid", label: "Kleider", group: "Damen", noun: "Kleid", basePrice: 16, sizeType: "kleidung", keywords: ["elegant", "sommer", "damenmode"] },
  { id: "d-rock", label: "Röcke", group: "Damen", noun: "Rock", basePrice: 12, sizeType: "kleidung", keywords: ["damenmode"] },
  { id: "d-bluse", label: "Blusen & Tuniken", group: "Damen", noun: "Bluse", basePrice: 13, sizeType: "kleidung", keywords: ["business", "damenmode"] },
  { id: "d-strick", label: "Pullover & Strick", group: "Damen", noun: "Pullover", basePrice: 15, sizeType: "kleidung", keywords: ["warm", "strick", "damenmode"] },
  { id: "d-hoodie", label: "Hoodies & Sweatshirts", group: "Damen", noun: "Hoodie", basePrice: 15, sizeType: "kleidung", keywords: ["casual", "streetwear"] },
  { id: "d-shirt", label: "T-Shirts & Tops", group: "Damen", noun: "Shirt", basePrice: 9, sizeType: "kleidung", keywords: ["basic", "sommer"] },
  { id: "d-jacke", label: "Jacken & Mäntel", group: "Damen", noun: "Jacke", basePrice: 24, sizeType: "kleidung", keywords: ["übergang", "winter", "outdoor"] },
  { id: "d-hose", label: "Hosen", group: "Damen", noun: "Hose", basePrice: 15, sizeType: "hose", keywords: ["stoffhose"] },
  { id: "d-jeans", label: "Jeans", group: "Damen", noun: "Jeans", basePrice: 17, sizeType: "hose", keywords: ["denim"] },
  { id: "d-schuhe", label: "Schuhe", group: "Damen", noun: "Schuhe", basePrice: 20, sizeType: "schuhe", keywords: ["sneaker"] },
  { id: "d-tasche", label: "Taschen", group: "Damen", noun: "Tasche", basePrice: 18, sizeType: "onesize", keywords: ["handtasche", "accessoire"] },

  // Herren
  { id: "h-hoodie", label: "Hoodies & Sweatshirts", group: "Herren", noun: "Hoodie", basePrice: 16, sizeType: "kleidung", keywords: ["streetwear", "casual"] },
  { id: "h-shirt", label: "T-Shirts", group: "Herren", noun: "Shirt", basePrice: 10, sizeType: "kleidung", keywords: ["basic"] },
  { id: "h-hemd", label: "Hemden", group: "Herren", noun: "Hemd", basePrice: 14, sizeType: "kleidung", keywords: ["business", "elegant"] },
  { id: "h-strick", label: "Pullover & Strick", group: "Herren", noun: "Pullover", basePrice: 16, sizeType: "kleidung", keywords: ["warm", "strick"] },
  { id: "h-jacke", label: "Jacken & Mäntel", group: "Herren", noun: "Jacke", basePrice: 28, sizeType: "kleidung", keywords: ["outdoor", "winter"] },
  { id: "h-hose", label: "Hosen", group: "Herren", noun: "Hose", basePrice: 16, sizeType: "hose", keywords: ["chino"] },
  { id: "h-jeans", label: "Jeans", group: "Herren", noun: "Jeans", basePrice: 18, sizeType: "hose", keywords: ["denim"] },
  { id: "h-shorts", label: "Shorts", group: "Herren", noun: "Shorts", basePrice: 11, sizeType: "kleidung", keywords: ["sommer"] },
  { id: "h-schuhe", label: "Schuhe", group: "Herren", noun: "Schuhe", basePrice: 24, sizeType: "schuhe", keywords: ["sneaker"] },

  // Unisex
  { id: "u-hoodie", label: "Hoodies", group: "Unisex", noun: "Hoodie", basePrice: 16, sizeType: "kleidung", keywords: ["streetwear", "unisex"] },
  { id: "u-cap", label: "Caps & Mützen", group: "Unisex", noun: "Cap", basePrice: 9, sizeType: "onesize", keywords: ["accessoire"] },
  { id: "u-tasche", label: "Rucksäcke & Taschen", group: "Unisex", noun: "Rucksack", basePrice: 15, sizeType: "onesize", keywords: ["accessoire"] },

  // Kinder
  { id: "k-oberteil", label: "Oberteile", group: "Kinder", noun: "Oberteil", basePrice: 7, sizeType: "kleidung", keywords: ["kids"] },
  { id: "k-hose", label: "Hosen", group: "Kinder", noun: "Hose", basePrice: 8, sizeType: "hose", keywords: ["kids"] },
  { id: "k-schuhe", label: "Schuhe", group: "Kinder", noun: "Schuhe", basePrice: 12, sizeType: "schuhe", keywords: ["kids"] },
];

export function categoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export const COLORS: ColorOption[] = [
  { id: "schwarz", label: "Schwarz", hex: "#111111" },
  { id: "weiss", label: "Weiß", hex: "#f8f8f8" },
  { id: "grau", label: "Grau", hex: "#8a8a8a" },
  { id: "navy", label: "Navy", hex: "#1f2a44" },
  { id: "blau", label: "Blau", hex: "#2f6fed" },
  { id: "hellblau", label: "Hellblau", hex: "#8ec5ff" },
  { id: "rot", label: "Rot", hex: "#d33a2c" },
  { id: "bordeaux", label: "Bordeaux", hex: "#6d1f2c" },
  { id: "gruen", label: "Grün", hex: "#3a8f4f" },
  { id: "khaki", label: "Khaki", hex: "#7c7a4a" },
  { id: "gelb", label: "Gelb", hex: "#e6c200" },
  { id: "orange", label: "Orange", hex: "#e8792b" },
  { id: "rosa", label: "Rosa", hex: "#f2a6c0" },
  { id: "pink", label: "Pink", hex: "#e0329a" },
  { id: "lila", label: "Lila", hex: "#7c3aed" },
  { id: "braun", label: "Braun", hex: "#7a4a2b" },
  { id: "beige", label: "Beige", hex: "#d8c6a8" },
  { id: "creme", label: "Creme", hex: "#efe7d3" },
  { id: "gold", label: "Gold", hex: "#c9a24b" },
  { id: "silber", label: "Silber", hex: "#c4c8cc" },
  { id: "mehrfarbig", label: "Mehrfarbig", hex: "conic" },
];

export function colorById(id: string): ColorOption | undefined {
  return COLORS.find((c) => c.id === id);
}

export const CONDITIONS: Condition[] = [
  {
    id: "neu-etikett",
    label: "Neu mit Etikett",
    multiplier: 1.0,
    hint: "Neu und ungetragen, Originaletikett noch dran.",
  },
  {
    id: "neu-ohne",
    label: "Neu ohne Etikett",
    multiplier: 0.9,
    hint: "Neuwertig, nie getragen, jedoch ohne Etikett.",
  },
  {
    id: "sehr-gut",
    label: "Sehr gut",
    multiplier: 0.72,
    hint: "Wenig getragen, keine sichtbaren Gebrauchsspuren.",
  },
  {
    id: "gut",
    label: "Gut",
    multiplier: 0.55,
    hint: "Getragen, leichte Gebrauchsspuren, insgesamt guter Zustand.",
  },
  {
    id: "zufrieden",
    label: "Zufriedenstellend",
    multiplier: 0.38,
    hint: "Deutlich getragen, sichtbare Gebrauchsspuren.",
  },
];

export function conditionById(id: string): Condition | undefined {
  return CONDITIONS.find((c) => c.id === id);
}

// Größenlisten je nach Kategorie-Typ.
export const SIZES: Record<string, string[]> = {
  kleidung: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
  hose: [
    "W28", "W29", "W30", "W31", "W32", "W33", "W34", "W36", "W38",
    "34", "36", "38", "40", "42", "44",
  ],
  schuhe: [
    "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46",
  ],
  onesize: ["Einheitsgröße"],
};
