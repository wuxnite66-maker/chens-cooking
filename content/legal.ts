/**
 * Legal pages (Impressum + Datenschutz/DSGVO), bilingual (de / hu).
 *
 * Known data (address, phone, e-mail) is pulled from the site content.
 * Company-specific legal data that only the owner knows is marked with the
 * PLACEHOLDER token so it is easy to spot and fill in later.
 */
import type { Content } from "./site";

export const PLACEHOLDER_DE = "⟨ bitte ergänzen ⟩";
export const PLACEHOLDER_HU = "⟨ kérjük kitölteni ⟩";

/** Owner-provided legal data. */
export const LEGAL_COMPANY = "Chens Cooking";
export const LEGAL_EMAIL = "jinmarco17@gmail.com";

export type LegalRow = { label: string; value: string; isPlaceholder?: boolean };
export type LegalSection = { heading: string; body?: string; items?: string[] };
export type LegalDoc = {
  title: string;
  updated: string;
  intro?: string;
  rows?: LegalRow[];
  sections?: LegalSection[];
  disclaimer?: string;
};
export type LegalContent = {
  backLabel: string;
  homeLabel: string;
  impressum: LegalDoc;
  datenschutz: LegalDoc;
};

export function getLegal(locale: string, site: Content): LegalContent {
  const addr = `${site.contact.address.street}, ${site.contact.address.zip} ${site.contact.address.city}, ${site.contact.address.country}`;
  const isHu = locale === "hu";

  if (isHu) {
    return {
      backLabel: "Vissza a főoldalra",
      homeLabel: "Főoldal",
      impressum: {
        title: "Impresszum",
        updated: "Utolsó frissítés: 2026. július",
        intro: "A vállalkozásra vonatkozó, jogszabály szerinti adatok.",
        rows: [
          { label: "Cégnév / egyéni vállalkozó neve", value: LEGAL_COMPANY },
          { label: "Székhely / cím", value: addr },
          { label: "E-mail", value: LEGAL_EMAIL },
          { label: "Telefon", value: site.contact.phone },
        ],
        disclaimer:
          "Ezek az adatok legjobb tudásunk szerint kerültek megadásra, és nem minősülnek jogi tanácsadásnak. Közzététel előtt javasolt szakemberrel ellenőriztetni.",
      },
      datenschutz: {
        title: "Adatvédelmi tájékoztató (GDPR)",
        updated: "Utolsó frissítés: 2026. július",
        intro:
          "Ez a tájékoztató bemutatja, hogyan kezeljük a személyes adatokat ezen a weboldalon, az EU általános adatvédelmi rendelete (GDPR) szerint.",
        sections: [
          {
            heading: "1. Az adatkezelő",
            body: `Az adatkezelésért felelős: ${site.name}, ${addr}. E-mail: ${LEGAL_EMAIL}, telefon: ${site.contact.phone}. A konkrét cégadatok az impresszumban találhatók.`,
          },
          {
            heading: "2. Milyen adatokat gyűjtünk",
            items: [
              "Asztalfoglalás: név, e-mail cím, telefonszám, dátum és időpont, létszám, valamint az esetleges megjegyzés.",
              "Hírlevél-feliratkozás: e-mail cím és (opcionálisan) születésnap.",
              "Technikai naplóadatok, amelyeket a tárhelyszolgáltató automatikusan rögzít (pl. IP-cím, böngésző típusa).",
            ],
          },
          {
            heading: "3. Miért kezeljük az adatokat (cél és jogalap)",
            items: [
              "Asztalfoglalás feldolgozása és visszaigazolása (szerződés teljesítése, GDPR 6. cikk (1) b).",
              "Hírlevél küldése az Ön hozzájárulása alapján (GDPR 6. cikk (1) a); a hozzájárulás bármikor visszavonható.",
              "A weboldal biztonságos üzemeltetése (jogos érdek, GDPR 6. cikk (1) f).",
            ],
          },
          {
            heading: "4. Meddig tároljuk az adatokat",
            body:
              "A foglalási adatokat a foglalás lebonyolításához szükséges ideig, illetve a jogszabályi megőrzési kötelezettségek lejártáig tároljuk. A hírlevél-adatokat a hozzájárulás visszavonásáig kezeljük.",
          },
          {
            heading: "5. Adatfeldolgozók és külső szolgáltatások",
            items: [
              "E-mail-kézbesítés: Resend (a foglalási és hírlevél-értesítők küldéséhez).",
              "Naptárbejegyzés: Google Calendar (a foglalások rögzítéséhez).",
              "Térkép: a Google Maps beágyazott térkép a kapcsolat szakaszban. A térkép betöltésekor a Google adatokat kaphat.",
              "Tárhely: a weboldalt a Vercel szolgáltatja.",
            ],
          },
          {
            heading: "6. Az Ön jogai",
            items: [
              "Tájékoztatáshoz, helyesbítéshez és törléshez való jog.",
              "Az adatkezelés korlátozásához és az adathordozhatósághoz való jog.",
              "A hozzájárulás bármikori visszavonásának joga.",
              "Felügyeleti hatósághoz (NAIH) fordulás joga.",
            ],
          },
          {
            heading: "7. Kapcsolat adatvédelmi kérdésekben",
            body: `Adatvédelmi kérdésekkel forduljon hozzánk: ${LEGAL_EMAIL}.`,
          },
          {
            heading: "8. Sütik (cookie-k)",
            body:
              "A weboldal alapvetően csak a működéshez szükséges sütiket használ, amelyekhez nincs szükség külön hozzájárulásra. Amennyiben a jövőben analitikai, marketing- vagy közösségimédia-sütiket (pl. Google Analytics, Meta Pixel) vezetünk be, azok beállítása előtt hozzájárulást kérünk egy cookie-bannerrel.",
          },
        ],
        disclaimer:
          "Ez a szöveg minta jellegű, és nem minősül jogi tanácsadásnak. A tényleges adatkezeléshez igazítsa, és közzététel előtt ellenőriztesse szakemberrel.",
      },
    };
  }

  return {
    backLabel: "Zurück zur Startseite",
    homeLabel: "Startseite",
    impressum: {
      title: "Impressum",
      updated: "Stand: Juli 2026",
      intro: "Angaben zum Unternehmen gemäß den gesetzlichen Vorgaben.",
      rows: [
        { label: "Firmenname / Einzelunternehmer", value: LEGAL_COMPANY },
        { label: "Anschrift", value: addr },
        { label: "E-Mail-Adresse", value: LEGAL_EMAIL },
        { label: "Telefonnummer", value: site.contact.phone },
      ],
      disclaimer:
        "Diese Angaben werden nach bestem Wissen bereitgestellt und stellen keine Rechtsberatung dar. Bitte vor der Veröffentlichung fachlich prüfen lassen.",
    },
    datenschutz: {
      title: "Datenschutzerklärung (DSGVO)",
      updated: "Stand: Juli 2026",
      intro:
        "Diese Erklärung informiert darüber, wie personenbezogene Daten auf dieser Website verarbeitet werden – gemäß der Datenschutz-Grundverordnung (DSGVO).",
      sections: [
        {
          heading: "1. Verantwortlicher",
          body: `Verantwortlich für die Datenverarbeitung: ${site.name}, ${addr}. E-Mail: ${LEGAL_EMAIL}, Telefon: ${site.contact.phone}. Die vollständigen Unternehmensangaben finden Sie im Impressum.`,
        },
        {
          heading: "2. Welche Daten erhoben werden",
          items: [
            "Reservierungen: Name, E-Mail-Adresse, Telefonnummer, Datum und Uhrzeit, Personenzahl sowie eine optionale Nachricht.",
            "Newsletter-Anmeldung: E-Mail-Adresse und (optional) Geburtstag.",
            "Technische Server-Logs, die vom Hosting-Anbieter automatisch erfasst werden (z. B. IP-Adresse, Browsertyp).",
          ],
        },
        {
          heading: "3. Warum die Daten erhoben werden (Zweck & Rechtsgrundlage)",
          items: [
            "Bearbeitung und Bestätigung von Tischreservierungen (Vertragserfüllung, Art. 6 Abs. 1 lit. b DSGVO).",
            "Versand des Newsletters auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); die Einwilligung ist jederzeit widerrufbar.",
            "Sicherer Betrieb der Website (berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO).",
          ],
        },
        {
          heading: "4. Wie lange die Daten gespeichert werden",
          body:
            "Reservierungsdaten werden so lange gespeichert, wie es für die Abwicklung erforderlich ist bzw. bis gesetzliche Aufbewahrungsfristen ablaufen. Newsletter-Daten werden bis zum Widerruf der Einwilligung verarbeitet.",
        },
        {
          heading: "5. Auftragsverarbeiter & externe Dienste",
          items: [
            "E-Mail-Versand: Resend (Versand der Reservierungs- und Newsletter-Benachrichtigungen).",
            "Kalendereintrag: Google Calendar (zur Erfassung von Reservierungen).",
            "Karte: eingebettete Google-Maps-Karte im Kontaktbereich. Beim Laden der Karte können Daten an Google übertragen werden.",
            "Hosting: Die Website wird über Vercel bereitgestellt.",
          ],
        },
        {
          heading: "6. Welche Rechte Besucher haben",
          items: [
            "Recht auf Auskunft, Berichtigung und Löschung.",
            "Recht auf Einschränkung der Verarbeitung und auf Datenübertragbarkeit.",
            "Recht, eine erteilte Einwilligung jederzeit zu widerrufen.",
            "Beschwerderecht bei einer Aufsichtsbehörde.",
          ],
        },
        {
          heading: "7. Kontakt für Datenschutzanfragen",
          body: `Für Anfragen zum Datenschutz erreichen Sie uns unter: ${LEGAL_EMAIL}.`,
        },
        {
          heading: "8. Cookies",
          body:
            "Diese Website verwendet grundsätzlich nur technisch notwendige Cookies, für die keine Einwilligung erforderlich ist. Sollten künftig Analyse-, Marketing- oder Social-Media-Cookies (z. B. Google Analytics, Meta Pixel) eingesetzt werden, wird vor dem Setzen dieser Cookies über einen Cookie-Banner eine Einwilligung eingeholt.",
        },
      ],
      disclaimer:
        "Dieser Text ist eine Vorlage und stellt keine Rechtsberatung dar. Bitte an die tatsächliche Datenverarbeitung anpassen und vor der Veröffentlichung fachlich prüfen lassen.",
    },
  };
}
