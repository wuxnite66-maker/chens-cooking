/**
 * Content layer — bilingual (de / hu).
 * `de` below is the German source of truth and also defines the `Content` shape.
 * The Hungarian translation lives in ./hu and must match this shape exactly.
 *
 * Routing: "/at" -> de, "/hu" -> hu (see getContent).
 */

import { hu } from "./hu";

export const de = {
  locale: "at",
  name: "Chen's Cooking",
  tagline: "Sushi · Teppanyaki · Wok",
  city: "Sopron",

  contact: {
    phone: "+36 99 505 337",
    phoneHref: "tel:+3699505337",
    email: "reservierung@chens-cooking.at",
    address: {
      street: "Alphapark, Határdomb út 1-2",
      zip: "9400",
      city: "Sopron",
      country: "Ungarn",
    },
    mapsQuery: "Alphapark, Határdomb út 1-2, 9400 Sopron, Ungarn",
  },

  social: {
    whatsapp: {
      label: "WhatsApp-Kanal",
      url: "https://whatsapp.com/channel/0029VbDL7s911ulRvtRpHR0t",
    },
  },

  promo: {
    label: "Happy Night",
    when: "Jeden Mittwoch",
    headline: "Getränke all-inclusive.",
    text: "1. Getränk bestellen — danach ist jedes weitere gratis!",
    price: "8590 Ft",
    href: "/at/reservieren",
  },

  hours: {
    label: "Öffnungszeiten",
    range: "11:30 – 22:00",
    note: "Donnerstag Ruhetag.",
    days: [
      { day: "Montag", time: "11:30 – 22:00" },
      { day: "Dienstag", time: "11:30 – 22:00" },
      { day: "Mittwoch", time: "11:30 – 22:00" },
      { day: "Donnerstag", time: "Geschlossen" },
      { day: "Freitag", time: "11:30 – 22:00" },
      { day: "Samstag", time: "11:30 – 22:00" },
      { day: "Sonntag", time: "11:30 – 22:00" },
    ],
  },

  hero: {
    eyebrow: "All-you-can-eat · Sopron",
    headline: ["Frisch.", "Vor Ihren Augen.", "Grenzenlos."],
    sub: "Sushi von der Theke, Teppanyaki vom heißen Eisen, Wok nach Ihrem Geschmack. Ein Buffet, das wie ein Restaurant kocht.",
    primaryCta: "Tisch reservieren",
    secondaryCta: "Buffet entdecken",
    takeawayLink: "Oder bestellen Sie zum Mitnehmen",
    image: "/images/hero-innen.jpg",
    imageAlt: "Der Gastraum von Chen's Cooking in Sopron mit Blick auf die Teppanyaki- und Wok-Station",
  },

  about: {
    eyebrow: "Die Idee",
    title: "Kein gewöhnliches Buffet. Eine Küche, die lebt.",
    body: [
      "Bei Chen's Cooking wird nicht aufgewärmt — es wird gekocht. An offenen Stationen sehen Sie, wie Sushi gerollt, Garnelen am Teppanyaki gewendet und Ihr Wok-Gericht in Sekunden über der Flamme gebraten wird.",
      "Premium-Qualität, die sich anfühlt wie À-la-carte, mit der Freiheit eines All-you-can-eat. Frische Zutaten, ehrliches Handwerk und so viel, wie Sie genießen möchten.",
    ],
    stats: [
      { value: "3", label: "Live-Stationen" },
      { value: "100+", label: "Gerichte täglich" },
      { value: "Täglich", label: "Frisch zubereitet" },
    ],
    image: "/images/about-sushi-counter.svg",
    imageAlt: "Frisch zubereitete Sushi- und Sashimi-Platte an der Theke von Chen's Cooking",
  },

  stations: {
    eyebrow: "Live-Stationen",
    title: "Drei Bühnen. Ein Geschmackserlebnis.",
    saucesHref: "/menu/chens-saucen.jpg",
    saucesLabel: "Unsere Saucen",
    items: [
      {
        name: "Sushi Bar",
        desc: "Ob Sushi, Maki oder Sashimi — die japanische Tradition, mit rohem Fisch zu kochen, bietet neben einer einzigartigen Geschmackswelt noch viele weitere Vorteile. Eine reichhaltige Nährstoffquelle, voll mit Vitaminen und Mineralien, cholesterinsenkend und reich an positiv wirkenden Fettsäuren.",
        image: "/images/station-sushi.svg",
        alt: "Sushi-Meister rollt frische Maki an der Theke",
      },
      {
        name: "Teppanyaki Grill",
        desc: "Die große Edelstahlfläche dieses traditionellen japanischen Grills hält stets eine konstante Temperatur und sorgt dafür, dass Aromen, Vitamine und Mineralien in den Zutaten erhalten bleiben — ohne dass sich Geruch und Geschmack der nebeneinander liegenden Zutaten vermischen. Perfekt für Fleisch, Fisch und Gemüse.",
        image: "/images/station-teppanyaki.svg",
        alt: "Flammen und Dampf über einer Teppanyaki-Grillplatte mit Gemüse und Fleisch",
      },
      {
        name: "Wok Station",
        desc: "Speisen aus dem Wok zeichnen sich durch ein besonders geschmackvolles Aroma aus. Die hohen Temperaturen in der gewölbten Pfanne halten die Garzeiten kurz — Gemüse bleibt knackig, die Vitamine bleiben erhalten. Und weil fast kein Fett benötigt wird, sind Wok-Gerichte nicht nur lecker, sondern auch sehr gesund.",
        image: "/images/station-wok.svg",
        alt: "Flambierter Wok mit Nudeln und Gemüse über offener Flamme",
      },
    ],
  },

  experience: {
    eyebrow: "Das Buffet",
    title: "Und so viel mehr.",
    points: [
      {
        title: "Chinesische Küche",
        desc: "Unser reichhaltiges Buffet bietet Ihnen neben den klassischen Suppen auch eine große Auswahl an warmen chinesischen Vor- und Hauptspeisen. Neben Fleisch- und Fischgerichten finden Sie auch vegetarische Speisen und eine Auswahl an Soßen.",
      },
      {
        title: "Salatbar",
        desc: "Unsere Salatbar bietet täglich ein breites Angebot an frischen Salat-Variationen sowie eine Auswahl verschiedener Öl- und Essig-Sorten. Von klassisch asiatischen Sorten bis zum traditionell österreichischen Erdäpfelsalat — hier ist für alle etwas dabei.",
      },
      {
        title: "À la carte",
        desc: "Wer sich nicht am großen Buffet stärken mag, kann unser Personal gerne nach der Speisekarte fragen und sein Wunschgericht à la carte bestellen. Es wird frisch für Sie zubereitet und direkt an den Tisch serviert.",
      },
      {
        title: "Dessert",
        desc: "Für den kulinarischen Abschluss haben wir eine Auswahl an gebackenen Früchten und Kompotts für Sie parat — aber auch typisch österreichische Nachspeisen wie Torte und Eis.",
      },
    ],
  },

  pricing: {
    eyebrow: "Buffet & Preise",
    title: "Ein Preis. Grenzenloser Genuss.",
    note: "Getränke nicht inkludiert. Preise pro Person.",
    plans: [
      {
        name: "Mittagsbuffet",
        when: "Mo – Fr · 11:30 – 17:00",
        price: "6190",
        featured: false,
        includes: [
          "Inklusive Teppanyaki-Grill",
          "Suppen & Vorspeisen",
          "Chinesische Hauptgerichte",
          "Wok-Zutaten",
          "Salat- & Sushibar",
          "Dessert",
        ],
      },
      {
        name: "Abendbuffet",
        when: "Mo – Fr ab 17:00",
        price: "7590",
        featured: true,
        includes: [
          "Suppen & Vorspeisen",
          "Chinesische Hauptgerichte",
          "Wok-Station",
          "Teppanyaki-Zutaten",
          "Sushi- & Salatbar",
          "Extra Maki & Sashimi",
          "Dessert",
        ],
      },
      {
        name: "Wochenende & Feiertag",
        when: "Sa, So & Feiertage · ganztägig",
        price: "9990",
        featured: false,
        includes: [
          "Voller Abend-Umfang",
          "Suppen & Vorspeisen",
          "Chinesische Hauptgerichte",
          "Wok & Teppanyaki",
          "Sushi- & Salatbar",
          "Extra Maki & Sashimi",
          "Dessert",
        ],
      },
    ],
    kids: {
      title: "Für die Kleinen",
      tiers: [
        { age: "0 – 3 Jahre", price: "Gratis" },
        { age: "4 – 7 Jahre", price: "4190 Ft" },
        { age: "5 – 8 Jahre", price: "7590 Ft" },
      ],
    },
  },

  takeaway: {
    eyebrow: "Speisekarte",
    title: "Unsere Karte",
    sub: "Suppen, Vorspeisen, Wok-Gerichte, Sushi und mehr – frisch zubereitet, zum Hier-Essen oder Mitnehmen.",
    pickupNote: "Alle Preise in Forint (Ft), inkl. gesetzlicher MwSt. Änderungen vorbehalten.",
    orderCtaLabel: "Jetzt telefonisch bestellen",
    pdfHref: "/menu/chens-speisekarte.pdf",
    pdfLabel: "Komplette Karte als PDF",
    drinksHref: "/menu/chens-getraenkekarte-2025.pdf",
    drinksLabel: "Getränkekarte (PDF)",
    saucesHref: "/menu/chens-saucen.jpg",
    saucesLabel: "Unsere Saucen",
    categories: [
      {
        name: "Suppen",
        note: "",
        items: [
          { code: "V1", name: "Pikante Suppe", price: "1690", desc: "süß-sauer" },
          { code: "V2", name: "Hühnersuppe mit Bambus und Pilzen", price: "1690", desc: "" },
          { code: "V3", name: "Meeresfrüchte Suppe", price: "1890", desc: "" },
          { code: "V4", name: "Misosuppe", price: "1590", desc: "mit Tofu" },
          { code: "V5", name: "Gemüsesuppe", price: "1590", desc: "" },
        ],
      },
      {
        name: "Vorspeisen",
        note: "",
        items: [
          { code: "V6", name: "Vegetarische Frühlingsrolle", price: "1490", desc: "5 Stück" },
          { code: "V8", name: "Champignon gebacken", price: "1590", desc: "" },
          { code: "V9", name: "Kyosa", price: "1790", desc: "5 Teigtaschen mit Fleisch und Gemüse gefüllt" },
          { code: "V10", name: "Sateh Ayam", price: "1690", desc: "2 Hühnerspießchen auf Salat" },
          { code: "V11", name: "Garnelenspießchen", price: "1790", desc: "3 Stück, auf Salat" },
        ],
      },
      {
        name: "Salate",
        note: "",
        items: [
          { code: "V12", name: "Pikanter Krautsalat", price: "1490", desc: "" },
          { code: "V13", name: "Sojasprossen Salat", price: "1590", desc: "" },
          { code: "V14", name: "Gurkensalat", price: "1790", desc: "" },
          { code: "V15", name: "Shrimps Salat", price: "2090", desc: "mit hausgemachter Cocktailsauce" },
          { code: "V16", name: "Gemischter Salat", price: "1690", desc: "" },
        ],
      },
      {
        name: "Hauptspeisen",
        note: "",
        items: [
          { code: "H1", name: "Meeresfrüchte mit rotem Curry", price: "4890", desc: "" },
          { code: "H2", name: "Knusprige Ente", price: "4790", desc: "" },
          { code: "H3", name: "Knusprige Ente mit Kostbarkeiten", price: "5090", desc: "im Gusstopf" },
          { code: "H4", name: "Knusprige Ente mit Mango", price: "5090", desc: "" },
          { code: "H5", name: "Gebratene Nudeln mit knuspriger Ente", price: "4490", desc: "mit Knoblauch- oder Currysauce" },
          { code: "H6", name: "Knuspriges Hühnerfilet", price: "4190", desc: "" },
          { code: "H7", name: "Sesam Chicken", price: "4190", desc: "" },
          { code: "H8", name: "Lemon Chicken", price: "4190", desc: "" },
          { code: "H9", name: "Kan-Bian Chicken", price: "4190", desc: "Wok-Hühnchen mit Gemüse, scharf" },
          { code: "H10", name: "Hühnerfleisch mit Bambus und Pilzen", price: "4190", desc: "" },
          { code: "H11", name: "Gebratene Nudeln mit knusprigem Hühnerfilet", price: "4190", desc: "" },
          { code: "H12", name: "Meeresfrüchte im Gusstopf", price: "4890", desc: "" },
          { code: "H13", name: "Kan-Bian Beef", price: "5190", desc: "Wok-Rind mit Gemüse, scharf" },
          { code: "H14", name: "Sa-Za Beef", price: "4190", desc: "Rindfleisch mit Brokkoli" },
          { code: "H15", name: "Gebratene Nudeln mit Hühnerfleisch", price: "4190", desc: "" },
          { code: "H16", name: "Gebratener Reis mit Hühnerfleisch", price: "4190", desc: "" },
        ],
      },
      {
        name: "Ramen & Udon",
        note: "sättigender Suppentopf, als Hauptspeise",
        items: [
          { code: "H17", name: "Gemüse-Ramen", price: "3290", desc: "scharf, chin. Eiernudeln" },
          { code: "H18", name: "Gemüse-Udon", price: "3290", desc: "Weizennudeln" },
          { code: "H18A", name: "Enten-Ramen", price: "3790", desc: "" },
          { code: "H19", name: "Meeresfrüchte-Ramen", price: "3790", desc: "scharf, chin. Eiernudeln" },
          { code: "H20", name: "Meeresfrüchte-Udon", price: "3790", desc: "mit Soja gewürzte Nudeln" },
        ],
      },
      {
        name: "Beilagen",
        note: "",
        items: [
          { code: "H21", name: "Jasmin-Reis", price: "1190", desc: "" },
          { code: "H22", name: "Gebratener Jasmin-Reis mit Eiern", price: "1590", desc: "" },
          { code: "H23", name: "Gebratene Nudeln mit Gemüse", price: "1690", desc: "" },
        ],
      },
      {
        name: "Nachspeisen",
        note: "",
        items: [
          { code: "H24", name: "Exotische Früchteplatte", price: "1290", desc: "" },
          { code: "H25", name: "Lychee Kompott", price: "990", desc: "" },
          { code: "H26", name: "Gebackene Früchte mit Honig & Sesam", price: "1290", desc: "Banane, Ananas oder Apfel nach Wahl" },
          { code: "H27", name: "Pudding", price: "1090", desc: "Kokos" },
          { code: "H28", name: "Tiramisu", price: "1090", desc: "" },
        ],
      },
      {
        name: "Sushi",
        note: "",
        items: [
          { code: "S1", name: "Sushi-Set klein", price: "2390", desc: "6 Stück + 4 Maki" },
          { code: "S2", name: "Sushi-Set mittel", price: "2890", desc: "8 Stück + 4 Maki" },
          { code: "S3", name: "Sushi-Set groß", price: "3390", desc: "10 Stück + 4 Maki" },
          { code: "S4", name: "Sake-Set", price: "2890", desc: "8 Stück + 3 Maki; nur Lachs" },
          { code: "S5", name: "Sake-Set", price: "3390", desc: "10 Stück + 3 Maki; nur Lachs" },
          { code: "S6", name: "Maguro-Set", price: "3490", desc: "8 Stück + 3 Maki; nur Thunfisch" },
          { code: "S7", name: "Sake-Maguro-Set", price: "3290", desc: "8 Stück + 3 Maki" },
          { code: "S8", name: "Sake-Maguro-Set", price: "3490", desc: "10 Stück + 3 Maki" },
          { code: "S9", name: "Super-Mix", price: "1990", desc: "12 Stück: Lachs, Thunfisch, Gurke, Avocado" },
          { code: "S10", name: "Super-Mix", price: "2690", desc: "18 Stück: Lachs, Thunfisch, Gurke, Avocado" },
          { code: "S11", name: "Maki-Mix", price: "1990", desc: "12 Stück: Lachs, Thunfisch" },
          { code: "S12", name: "Maki-Mix", price: "2390", desc: "18 Stück: Lachs, Thunfisch" },
          { code: "S13", name: "Maki-Mix", price: "1890", desc: "12 Stück: Avocado, Gurke" },
          { code: "S14", name: "Maki-Mix", price: "2390", desc: "18 Stück: Avocado, Gurke" },
          { code: "S15", name: "Sake-Mix", price: "1990", desc: "12 Stück: mit Lachs" },
          { code: "S16", name: "Sake-Mix", price: "2390", desc: "18 Stück: mit Lachs" },
          { code: "S17", name: "Futomaki", price: "2890", desc: "10 Stück, dicke Rolle mit Surimi und Gemüse" },
          { code: "S18", name: "California-Maki", price: "2890", desc: "10 Stück, dicke Rolle mit Garnele, Surimi, Avocado" },
          { code: "S19", name: "Sushi Box", price: "7790", desc: "Sushi (12 Stück), California-Maki (10 Stück), Maki klein (8 Stück)" },
        ],
      },
      {
        name: "Saucen",
        note: "je 490 Ft",
        items: [
          { code: "", name: "Knoblauch Sauce", price: "490", desc: "" },
          { code: "", name: "Gong Bao Sauce", price: "490", desc: "chin. Hoisin mit Chili & Knoblauch" },
          { code: "", name: "Thai-Curry Sauce", price: "490", desc: "" },
          { code: "", name: "Schwarzer Pfeffer Sauce", price: "490", desc: "für Meeresfrüchte & Fleisch" },
          { code: "", name: "Acht Schätze Sauce", price: "490", desc: "scharfe chin. Sauce mit Chili" },
          { code: "", name: "Teriyaki Sauce", price: "490", desc: "süßlich, mit Knoblauch" },
          { code: "", name: "Soja Sauce", price: "490", desc: "" },
          { code: "", name: "Mango Sauce", price: "490", desc: "" },
        ],
      },
    ],
    allergenNote:
      "Allergeninformationen (A–R) entnehmen Sie bitte der PDF-Karte oder fragen Sie unser Personal.",
  },

  reservation: {
    eyebrow: "Reservierung",
    title: "Sichern Sie sich Ihren Tisch",
    sub: "Reservieren Sie in unter einer Minute. Wir bestätigen Ihre Anfrage telefonisch oder per E-Mail.",
    success: "Vielen Dank! Ihre Reservierungsanfrage ist eingegangen. Wir melden uns in Kürze zur Bestätigung.",
    error: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
  },

  nav: [
    { label: "Idee", href: "/at/idee" },
    { label: "Stationen", href: "/at/stationen" },
    { label: "Buffet", href: "/at/buffet" },
    { label: "Preise", href: "/at/preise" },
    { label: "Speisekarte", href: "/at/speisekarte" },
    { label: "Öffnungszeiten", href: "/at/oeffnungszeiten" },
    { label: "Reservieren", href: "/at/reservieren" },
  ],

  hoursPage: {
    eyebrow: "Öffnungszeiten",
    title: "Wann Sie uns besuchen können",
    sub: "Alle Zeiten auf einen Blick — mit Live-Status, ob gerade geöffnet ist.",
  },

  // UI micro-copy (buttons, labels, aria) used across components
  newsletter: {
    image: "/images/newsletter-de.jpg",
    imageAlt: "Chen's Cooking — Happy Night",
    h1: "HAPPY NIGHT & NEWS",
    h2: "ALS ERSTES ERFAHREN",
    sub: "Aktionen, neue Gerichte & jede Happy Night — direkt in dein Postfach.",
    email: "E-Mail-Adresse",
    birthday: "Geburtstag (optional)",
    submit: "Anmelden",
    submitting: "Wird gesendet …",
    success: "Danke! Du bist dabei.",
    successSub: "Wir melden uns mit den nächsten News.",
    error: "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
    invalidEmail: "Bitte eine gültige E-Mail-Adresse eingeben.",
    noThanks: "Nein danke",
    close: "Schließen",
    whatsappCta: "Auf WhatsApp folgen",
    whatsappOr: "oder",
  },

  ui: {
    mainNav: "Hauptnavigation",
    menu: "Menü",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    popular: "Beliebt",
    perPerson: "/ Person",
    contactPhone: "Telefon",
    contactAddress: "Adresse",
    route: "Route",
    daily: "Täglich",
    callAria: "Anrufen",
    footerVisit: "Besuchen Sie uns",
    footerDiscover: "Entdecken",
    footerBlurb:
      "All-you-can-eat mit Sushi-Bar, Teppanyaki-Grill und Wok-Station — frisch vor Ihren Augen zubereitet in Sopron.",
    langLabel: "Sprache",
    flipPrev: "Zurück",
    flipNext: "Weiter",
    flipPage: "Seite",
    flipHint: "Blättern: am Rand tippen · in die Mitte tippen = Vollbild",
    flipZoom: "Vollbild",
    flipClose: "Schließen",
    form: {
      name: "Name",
      phone: "Telefon",
      email: "E-Mail",
      date: "Datum",
      time: "Uhrzeit",
      guests: "Personen",
      message: "Anmerkung",
      phName: "Ihr Name",
      phPhone: "+36 …",
      phEmail: "name@email.hu",
      phGuests: "Anzahl wählen",
      phMessage: "Allergien, Kinderstuhl, besonderer Anlass …",
      helper: "Wir bestätigen Ihre Anfrage telefonisch oder per E-Mail.",
      person: "Person",
      persons: "Personen",
      submit: "Reservierung absenden",
      submitting: "Wird gesendet …",
      successTitle: "Reservierung gesendet",
      another: "Weitere Reservierung",
    },
  },

  legal: {
    copyright: `© ${new Date().getFullYear()} Chen's Cooking · Sopron`,
    impressum: "Impressum",
    privacy: "Datenschutz",
  },
};

export type Content = typeof de;

export const content = { at: de, hu } as Record<string, Content>;
export const locales = ["at", "hu"] as const;
export type Locale = (typeof locales)[number];

export function getContent(locale: string): Content {
  return locale === "hu" ? hu : de;
}

// Backward-compat default (used by the API route and root metadata)
export const site = de;
export type Site = Content;
