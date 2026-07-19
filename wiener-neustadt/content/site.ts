/**
 * Zentrale Content-Datei — ALLE Texte, Preise und Kontaktdaten der Website.
 *
 * ⚠️ PLATZHALTER: Adresse, Telefonnummer, Öffnungszeiten, Preise (EUR) und
 * die Speisekarte sind Beispieldaten für Wiener Neustadt. Sobald die echten
 * Daten vorliegen, nur diese Datei anpassen — die Seiten aktualisieren sich
 * automatisch. Bilder liegen unter /public/images und werden hier referenziert.
 */

export const site = {
  name: "Chen's Cooking",
  city: "Wiener Neustadt",
  tagline: "Sushi · Teppanyaki · Wok",
  domainNote: "Eigene Domain folgt — läuft aktuell lokal.",

  contact: {
    // TODO: echte Daten einsetzen
    phone: "+43 2622 00 000",
    phoneHref: "tel:+43262200000",
    email: "reservierung@example.at",
    address: {
      street: "Musterstraße 12",
      zip: "2700",
      city: "Wiener Neustadt",
      country: "Österreich",
    },
    mapsQuery: "Musterstraße 12, 2700 Wiener Neustadt, Österreich",
  },

  hours: {
    label: "Öffnungszeiten",
    range: "11:30 – 22:00",
    note: "Küche bis 21:30 Uhr.",
    days: [
      { day: "Montag", time: "11:30 – 22:00" },
      { day: "Dienstag", time: "11:30 – 22:00" },
      { day: "Mittwoch", time: "11:30 – 22:00" },
      { day: "Donnerstag", time: "11:30 – 22:00" },
      { day: "Freitag", time: "11:30 – 22:30" },
      { day: "Samstag", time: "11:30 – 22:30" },
      { day: "Sonntag & Feiertag", time: "11:30 – 22:00" },
    ],
  },

  nav: [
    { label: "Start", href: "/" },
    { label: "Buffet", href: "/buffet" },
    { label: "Speisekarte", href: "/speisekarte" },
    { label: "Galerie", href: "/galerie" },
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  reserveCta: "Tisch reservieren",

  hero: {
    script: "Willkommen bei",
    headline: ["Chen's", "Cooking"],
    subline: "All-you-can-eat in Wiener Neustadt",
    sub: "Sushi von der Theke, Teppanyaki vom heißen Eisen, Wok über offener Flamme — frisch, vor Ihren Augen, so oft Sie möchten.",
    primaryCta: "Tisch reservieren",
    secondaryCta: "Buffet entdecken",
    image: "/images/hero-teppanyaki.svg",
    imageAlt: "Köchin grillt frische Garnelen und Gemüse auf einer glühenden Teppanyaki-Platte",
  },

  features: {
    eyebrow: "Warum Chen's Cooking",
    items: [
      {
        icon: "leaf",
        title: "Frische Zutaten",
        desc: "Täglich frisch angeliefert und vor Ihren Augen zubereitet — kein Aufwärmen, nur ehrliches Handwerk.",
      },
      {
        icon: "chef",
        title: "Erfahrene Köche",
        desc: "Sushi-Meister, Teppanyaki-Grill und Wok-Küche von Profis, die ihr Handwerk seit Jahren perfektionieren.",
      },
      {
        icon: "flame",
        title: "Live vor Ihren Augen",
        desc: "Drei offene Stationen, an denen Ihr Gericht in Sekunden über der Flamme entsteht — Restaurant-Qualität als Buffet.",
      },
    ],
  },

  intro: {
    eyebrow: "Das Konzept",
    title: "Kein gewöhnliches Buffet. Eine Küche, die lebt.",
    body: [
      "Bei Chen's Cooking wird nicht aufgewärmt — es wird gekocht. An offenen Stationen sehen Sie, wie Sushi gerollt, Garnelen am Teppanyaki gewendet und Ihr Wok-Gericht in Sekunden über der Flamme gebraten wird.",
      "Premium-Qualität, die sich anfühlt wie À-la-carte, mit der Freiheit eines All-you-can-eat: frische Zutaten, ehrliches Handwerk und so viel, wie Sie genießen möchten.",
    ],
    stats: [
      { value: "3", label: "Live-Stationen" },
      { value: "100+", label: "Gerichte täglich" },
      { value: "7", label: "Tage die Woche" },
    ],
    image: "/images/about-sushi-counter.svg",
    imageAlt: "Frisch zubereitete Sushi- und Sashimi-Platte an der Theke",
  },

  stations: {
    eyebrow: "Live-Stationen",
    title: "Drei Bühnen. Ein Geschmackserlebnis.",
    items: [
      {
        name: "Sushi Bar",
        desc: "Ob Sushi, Maki oder Sashimi — die japanische Tradition, mit rohem Fisch zu kochen, eröffnet eine einzigartige Geschmackswelt. Reich an Vitaminen, Mineralien und wertvollen Fettsäuren, täglich frisch an der Theke gerollt.",
        image: "/images/station-sushi.svg",
        alt: "Sushi-Meister rollt frische Maki an der Theke",
      },
      {
        name: "Teppanyaki Grill",
        desc: "Die große Edelstahlfläche des traditionellen japanischen Grills hält konstante Hitze und bewahrt Aromen, Vitamine und Mineralien — ohne dass sich Geschmäcker vermischen. Perfekt für Fleisch, Fisch und Gemüse.",
        image: "/images/station-teppanyaki.svg",
        alt: "Flammen und Dampf über einer Teppanyaki-Grillplatte mit Gemüse und Fleisch",
      },
      {
        name: "Wok Station",
        desc: "Hohe Temperaturen, kurze Garzeiten: Gemüse bleibt knackig, Vitamine bleiben erhalten. Sie wählen die Zutaten, unsere Köche braten Ihr Wunschgericht in Sekunden über offener Flamme — fast ohne Fett.",
        image: "/images/station-wok.svg",
        alt: "Flambierter Wok mit Nudeln und Gemüse über offener Flamme",
      },
    ],
  },

  buffet: {
    eyebrow: "Das Buffet",
    title: "Und so viel mehr.",
    points: [
      {
        title: "Asiatische Küche",
        desc: "Unser reichhaltiges Buffet bietet neben klassischen Suppen eine große Auswahl an warmen Vor- und Hauptspeisen — Fleisch, Fisch und vegetarische Gerichte, dazu eine Auswahl hausgemachter Saucen.",
      },
      {
        title: "Salatbar",
        desc: "Täglich frische Salat-Variationen mit verschiedenen Öl- und Essigsorten — von asiatisch bis klassisch österreichisch.",
      },
      {
        title: "À la carte",
        desc: "Lieber vom Blatt? Fragen Sie unser Personal nach der Speisekarte — Ihr Wunschgericht wird frisch zubereitet und direkt an den Tisch serviert.",
      },
      {
        title: "Dessert",
        desc: "Zum Abschluss: gebackene Früchte, Kompotts und österreichische Klassiker wie Torte und Eis.",
      },
    ],
  },

  pricing: {
    eyebrow: "Buffet & Preise",
    title: "Ein Preis. Grenzenloser Genuss.",
    note: "Preise pro Person, Getränke nicht inkludiert. Alle Angaben vorläufig.",
    currency: "€",
    plans: [
      {
        name: "Mittagsbuffet",
        when: "Mo – Fr · 11:30 – 16:00",
        price: "16,90",
        featured: false,
        includes: [
          "Suppen & Vorspeisen",
          "Warme Hauptgerichte",
          "Wok-Station",
          "Salat- & Sushibar",
          "Dessert",
        ],
      },
      {
        name: "Abendbuffet",
        when: "Mo – Fr ab 16:00",
        price: "24,90",
        featured: true,
        includes: [
          "Voller Buffet-Umfang",
          "Teppanyaki-Grill",
          "Wok-Station",
          "Sushi- & Salatbar",
          "Extra Maki & Sashimi",
          "Dessert",
        ],
      },
      {
        name: "Wochenende & Feiertag",
        when: "Sa, So & Feiertage · ganztägig",
        price: "26,90",
        featured: false,
        includes: [
          "Voller Abend-Umfang",
          "Teppanyaki & Wok",
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
        { age: "4 – 7 Jahre", price: "€ 8,90" },
        { age: "8 – 11 Jahre", price: "€ 12,90" },
      ],
    },
  },

  menu: {
    eyebrow: "Speisekarte",
    title: "Unsere Karte",
    sub: "Suppen, Vorspeisen, Wok-Gerichte, Sushi und mehr — frisch zubereitet, zum Hier-Essen oder Mitnehmen.",
    note: "Beispielkarte — die endgültige Karte mit echten Preisen folgt. Alle Preise in Euro, inkl. MwSt.",
    allergenNote: "Allergeninformationen (A–R) erhalten Sie bei unserem Personal.",
    categories: [
      {
        name: "Suppen",
        items: [
          { code: "V1", name: "Pikante Suppe", price: "4,50", desc: "süß-sauer" },
          { code: "V2", name: "Hühnersuppe mit Bambus und Pilzen", price: "4,50", desc: "" },
          { code: "V3", name: "Meeresfrüchte-Suppe", price: "5,50", desc: "" },
          { code: "V4", name: "Misosuppe", price: "4,20", desc: "mit Tofu" },
        ],
      },
      {
        name: "Vorspeisen",
        items: [
          { code: "V6", name: "Vegetarische Frühlingsrollen", price: "3,90", desc: "5 Stück" },
          { code: "V9", name: "Gyoza", price: "4,90", desc: "5 Teigtaschen mit Fleisch und Gemüse" },
          { code: "V10", name: "Sateh Ayam", price: "4,90", desc: "2 Hühnerspießchen auf Salat" },
          { code: "V11", name: "Garnelenspießchen", price: "5,50", desc: "3 Stück, auf Salat" },
        ],
      },
      {
        name: "Hauptspeisen",
        items: [
          { code: "H1", name: "Meeresfrüchte mit rotem Curry", price: "14,90", desc: "" },
          { code: "H2", name: "Knusprige Ente", price: "13,90", desc: "" },
          { code: "H4", name: "Knusprige Ente mit Mango", price: "14,90", desc: "" },
          { code: "H7", name: "Sesam Chicken", price: "11,90", desc: "" },
          { code: "H9", name: "Kan-Bian Chicken", price: "11,90", desc: "Wok-Hühnchen mit Gemüse, scharf" },
          { code: "H13", name: "Kan-Bian Beef", price: "12,90", desc: "Wok-Rind mit Gemüse, scharf" },
          { code: "H14", name: "Sa-Za Beef", price: "12,90", desc: "Rindfleisch mit Brokkoli" },
          { code: "H16", name: "Gebratener Reis mit Hühnerfleisch", price: "10,90", desc: "" },
        ],
      },
      {
        name: "Ramen & Udon",
        items: [
          { code: "H17", name: "Gemüse-Ramen", price: "12,90", desc: "scharf, chinesische Eiernudeln" },
          { code: "H19", name: "Meeresfrüchte-Ramen", price: "14,90", desc: "scharf" },
          { code: "H20", name: "Meeresfrüchte-Udon", price: "14,90", desc: "Weizennudeln, mit Soja gewürzt" },
        ],
      },
      {
        name: "Sushi",
        items: [
          { code: "S1", name: "Sushi-Set klein", price: "9,90", desc: "6 Nigiri + 4 Maki" },
          { code: "S2", name: "Sushi-Set mittel", price: "12,90", desc: "8 Nigiri + 4 Maki" },
          { code: "S3", name: "Sushi-Set groß", price: "14,90", desc: "10 Nigiri + 4 Maki" },
          { code: "S9", name: "Super-Mix", price: "8,90", desc: "12 Maki: Lachs, Thunfisch, Gurke, Avocado" },
          { code: "S18", name: "California Maki", price: "11,90", desc: "10 Stück: Garnele, Surimi, Avocado" },
        ],
      },
      {
        name: "Desserts",
        items: [
          { code: "H24", name: "Exotische Früchteplatte", price: "5,50", desc: "" },
          { code: "H26", name: "Gebackene Früchte mit Honig & Sesam", price: "5,50", desc: "Banane, Ananas oder Apfel" },
          { code: "H28", name: "Tiramisu", price: "4,90", desc: "" },
        ],
      },
    ],
  },

  gallery: {
    eyebrow: "Galerie",
    title: "Einblicke in unsere Küche",
    sub: "Frische, Handwerk und Atmosphäre — ein Blick hinter die Theke. (Platzhalter — echte Fotos folgen.)",
    images: [
      { src: "/images/gallery-1.svg", alt: "Sushi-Platte mit Nigiri und Maki", tall: false },
      { src: "/images/gallery-2.svg", alt: "Teppanyaki-Grill mit Flammen", tall: true },
      { src: "/images/gallery-3.svg", alt: "Wok mit frischem Gemüse", tall: false },
      { src: "/images/gallery-4.svg", alt: "Dessertauswahl am Buffet", tall: true },
      { src: "/images/gallery-5.svg", alt: "Frische Zutaten an der Salatbar", tall: false },
      { src: "/images/gallery-6.svg", alt: "Restaurant-Innenraum am Abend", tall: false },
    ],
  },

  about: {
    eyebrow: "Über uns",
    title: "Gastfreundschaft, die man schmeckt.",
    body: [
      "Chen's Cooking bringt die lebendige Buffet-Kultur Asiens nach Wiener Neustadt: offene Küchen, frische Zutaten und Köche, die ihr Handwerk lieben.",
      "Ob Familienessen, Geburtstag oder Firmenfeier — bei uns sitzt man zusammen, probiert sich durch und bleibt länger, als man geplant hat. Genau so soll es sein.",
    ],
    values: [
      { title: "Frische", desc: "Kurze Wege, tägliche Lieferung, offene Zubereitung — Qualität, die man sieht." },
      { title: "Handwerk", desc: "Vom Sushi-Messer bis zur Wok-Flamme: echtes Können statt Fließband." },
      { title: "Gastfreundschaft", desc: "Herzlicher Service für Familien, Gruppen und alle, die gutes Essen feiern." },
    ],
    quote: "Wir kochen nicht für ein Buffet. Wir kochen für Sie — es steht nur zufällig ein Buffet dazwischen.",
    quoteBy: "Familie Chen",
  },

  reservation: {
    eyebrow: "Reservierung",
    title: "Sichern Sie sich Ihren Tisch",
    sub: "Reservieren Sie in unter einer Minute — wir bestätigen Ihre Anfrage telefonisch oder per E-Mail.",
    success: "Vielen Dank! Ihre Reservierungsanfrage ist eingegangen. Wir melden uns in Kürze zur Bestätigung.",
    error: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
    phoneNote: "Lieber direkt sprechen? Rufen Sie uns an:",
  },

  cta: {
    script: "Wir freuen uns auf Sie",
    title: "Ihr Tisch wartet schon.",
    sub: "Reservieren Sie online oder rufen Sie uns an — für Abende, an denen niemand über das Essen diskutieren muss.",
    button: "Jetzt reservieren",
  },

  footer: {
    blurb: "All-you-can-eat mit Sushi-Bar, Teppanyaki-Grill und Wok-Station — frisch, vor Ihren Augen, in Wiener Neustadt.",
    legal: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
    note: "© {year} Chen's Cooking Wiener Neustadt. Alle Rechte vorbehalten.",
  },

  cookie: {
    text: "Diese Website verwendet nur technisch notwendige Cookies. Details finden Sie in der",
    linkLabel: "Datenschutzerklärung",
    accept: "Verstanden",
  },
} as const;

export type Site = typeof site;
