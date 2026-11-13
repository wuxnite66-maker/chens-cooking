// =====================================================================
// UE06: Klassen vs. Interfaces
// Thema: Ein Auto mit Marke, Baujahr und Alter
// =====================================================================

// ---------------------------------------------------------------------
// Aufgabe 1: Untersuchung - Interface vs. Klasse
// ---------------------------------------------------------------------
//
// Marke und Baujahr:
//   - Geht bei Interface UND Klasse ganz einfach (marke: string, baujahr: number).
//
// Alter - es gibt 2 Moeglichkeiten:
//
//   a) Alter HINZUFUEGEN (als fixe Zahl, z.B. alter: 10)
//      - Geht bei Interface und Klasse.
//      - Problem: Die Zahl stimmt nur heute. Naechstes Jahr ist sie falsch,
//        weil sich die Zahl nicht von selbst aendert.
//      - Ausserdem kann man sich vertippen: baujahr 2015, alter 3 -> passt nicht zusammen.
//
//   b) Alter BERECHNEN (aktuelles Jahr - Baujahr)
//      - Klasse: Sehr einfach. Die Methode wird EINMAL in der Klasse geschrieben
//        und jedes Auto, das mit "new Auto(...)" erstellt wird, hat sie automatisch.
//      - Interface: Ein Interface ist nur ein "Bauplan" bzw. eine Beschreibung.
//        Es darf KEINEN Code enthalten, nur sagen, DASS es eine Methode gibt.
//        Darum muss man die Berechnung bei JEDEM Objekt selbst dazuschreiben
//        (oder eine extra Hilfsfunktion verwenden).
//
//   -> Beide Moeglichkeiten gehen also NICHT uneingeschraenkt:
//      Beim Interface ist das Berechnen umstaendlich (Code muss wiederholt werden),
//      beim fixen Alter wird der Wert mit der Zeit falsch.
// ---------------------------------------------------------------------


// Hilfsfunktion: liefert das aktuelle Jahr (vom heutigen Tag aus)
function aktuellesJahr(): number {
    const heute = new Date();
    return heute.getFullYear();
}


// ---------------------------------------------------------------------
// Aufgabe 2a: Interface IAuto
// ---------------------------------------------------------------------
// Das Interface beschreibt nur, WAS ein Auto haben muss.
// Es enthaelt keinen Code fuer die Berechnung.
interface IAuto {
    marke: string;
    baujahr: number;
    berechneAlter(): number;   // nur die "Ueberschrift" der Methode, kein Code
}


// ---------------------------------------------------------------------
// Aufgabe 2b: Klasse Auto
// ---------------------------------------------------------------------
// Zusatzaufgabe (Aufgabe 5): "implements IAuto" bedeutet:
// Die Klasse haelt sich an den Bauplan vom Interface.
// Fehlt z.B. berechneAlter(), meldet TypeScript sofort einen Fehler.
class Auto implements IAuto {
    marke: string;
    baujahr: number;

    // Der Konstruktor wird bei "new Auto(...)" aufgerufen
    constructor(marke: string, baujahr: number) {
        this.marke = marke;
        this.baujahr = baujahr;
    }

    // Die Berechnung steht nur EINMAL hier und gilt fuer alle Autos
    berechneAlter(): number {
        return aktuellesJahr() - this.baujahr;
    }

    // Kleine Ausgabe-Methode
    ausgeben(): void {
        console.log(`Marke: ${this.marke}, Baujahr: ${this.baujahr}, Alter: ${this.berechneAlter()} Jahre`);
    }
}


// ---------------------------------------------------------------------
// Aufgabe 3: Autos erstellen
// ---------------------------------------------------------------------

// --- 2 Autos mit dem Interface ---
// Achtung: Bei jedem Objekt muss man berechneAlter() NEU hinschreiben!
const interfaceAuto1: IAuto = {
    marke: "VW",
    baujahr: 2015,
    berechneAlter() {
        return aktuellesJahr() - this.baujahr;
    }
};

const interfaceAuto2: IAuto = {
    marke: "Opel",
    baujahr: 2008,
    berechneAlter() {
        return aktuellesJahr() - this.baujahr;
    }
};

// --- 2 Autos mit der Klasse ---
// Hier reicht eine Zeile pro Auto, die Berechnung kommt aus der Klasse.
const klassenAuto1 = new Auto("BMW", 2019);
const klassenAuto2 = new Auto("Audi", 2011);


// --- Ausgabe ---
console.log("===== Autos mit Interface =====");
console.log(`Marke: ${interfaceAuto1.marke}, Baujahr: ${interfaceAuto1.baujahr}, Alter: ${interfaceAuto1.berechneAlter()} Jahre`);
console.log(`Marke: ${interfaceAuto2.marke}, Baujahr: ${interfaceAuto2.baujahr}, Alter: ${interfaceAuto2.berechneAlter()} Jahre`);

console.log("");
console.log("===== Autos mit Klasse =====");
klassenAuto1.ausgeben();
klassenAuto2.ausgeben();


// ---------------------------------------------------------------------
// Aufgabe 4: Begruendung und meine Meinung
// ---------------------------------------------------------------------
//
// Warum ist die dynamische Berechnung besser?
//   - Das Alter wird jedes Mal neu mit dem heutigen Datum ausgerechnet.
//     Dadurch stimmt es IMMER, auch naechstes Jahr, ohne dass man etwas aendern muss.
//   - Ein fix eingetragenes Alter wird jedes Jahr falsch und muss
//     haendisch bei allen Autos geaendert werden.
//   - Man speichert keine doppelte Information (Baujahr UND Alter),
//     dadurch koennen die beiden Werte nicht mehr "nicht zusammenpassen".
//
// Mein Eindruck zu den beiden Loesungen:
//   - Interface: Gut, um festzulegen, wie ein Auto aussehen muss.
//     Aber die Alters-Berechnung muss bei jedem Objekt wiederholt werden.
//     Das ist viel Schreibarbeit und fehleranfaellig.
//   - Klasse: Die Berechnung steht nur einmal in der Klasse.
//     Neue Autos erstellt man ganz kurz mit "new Auto(...)".
//
// Ich bevorzuge die KLASSE, weil der Code kuerzer und uebersichtlicher ist
// und man Fehler nur an einer Stelle ausbessern muss.
// Am besten ist die Kombination (Zusatzaufgabe): Das Interface ist der Bauplan,
// und die Klasse setzt ihn mit "implements IAuto" um.
// ---------------------------------------------------------------------
