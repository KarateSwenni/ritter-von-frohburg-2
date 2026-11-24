# Die Ritter von Frohburg 2 – Der Zauberkaffee

Ein statisches Indoor-Browser-Abenteuer für Frohburg. Der König hat seinen Zauberkaffee
verloren, ganz Frohburg schläft ein – und nur der frischgebackene Ritter kann die letzte
Sternenbohne finden.

**Umfang:** Intro, interaktive Stadtkarte, zehn Kapitel – neun Rätsel und ein Kellerkampf im
Wirtshaus –, Inventar, Questbuch, Hinweise, Kaffeesatz-Ziffern und ein Kaffee-Braufinale mit
Koordinatenausgabe.

**Rätselprinzip:** Alle Rätsel sind direkt im Browser lösbar. Kapitel 1 ist ein farbiges
Nonogramm und kommt ganz ohne Wissen über die Orte vor Ort aus; am Ende zeigt das Bild die
Sternenbohne. Kapitel 2 ist ein Kreuzworträtsel mit verqueren Märchen-Beschreibungen. Kapitel 10
ist ein rundenbasierter Kampf im Stil klassischer Final-Fantasy-Spiele:
Angriff, Zauber, Trank und Flucht stehen zur Wahl, bis die Ratten im Wirtshauskeller besiegt sind.

**Technik:** reines HTML, CSS und JavaScript. Kein Build, kein Server, keine Abhängigkeiten
außer Google Fonts (mit Internetverbindung) und optionaler Web-Audio-Unterstützung.

**Online spielen:** <https://karateswenni.github.io/ritter-von-frohburg-2/>

---

## Schnellstart

1. Ordner `DRVF2` herunterladen bzw. auf den Rechner kopieren.
2. `index.html` doppelklicken.

Das Spiel läuft direkt aus dem Dateisystem (`file://`). Der Spielstand wird im
`localStorage` des Browsers gespeichert. Für Safari auf dem iPhone oder wenn
`localStorage` bei `file://` blockiert ist, den Ordner über einen einfachen Webserver
ausliefern (siehe unten).

### Auf Webspace veröffentlichen

Den **kompletten Inhalt** dieses Ordners (nicht den Ordner selbst) in das gewünschte
Webverzeichnis hochladen, sodass `index.html` direkt im Zielordner liegt:

```
/ (Webroot oder Unterordner)
├── index.html
├── css/style.css
├── js/data.js
├── js/map.js
├── js/app.js
├── assets/img/…
└── README.md
```

Es sind keine PHP-, Node- oder Datenbank-Komponenten nötig. `README.md` und der Ordner
`Die Ritter von Frohburg/` (Original-Assets aus Teil 1) müssen nicht mit hochgeladen werden.

### Lokal mit Server testen (optional)

Falls ein Browser `file://` einschränkt, genügt ein beliebiger statischer Server, z. B.
in PowerShell:

```powershell
# Einmalig, falls Python vorhanden ist:
python -m http.server 8000
```

Danach `http://localhost:8000/` öffnen. Jeder andere Static-Server funktioniert genauso.

---

## Finalkoordinaten einsetzen (wichtig)

Die Finalkoordinaten sind aktuell **Platzhalter**. Sie werden an genau einer Stelle
gepflegt: `js/data.js`, Objekt `GAME.final`.

```js
final: {
  digits: ["1", "2", "3", "4", "5", "6"],
  placeholder: true,
  coordsTemplate: "N 51° 03.{0}{1}{2}   E 012° 33.{3}{4}{5}",
  …
}
```

- `digits` enthält die sechs Ziffern in dieser Reihenfolge:
  Nord-Ziffer 1, 2, 3, dann Ost-Ziffer 1, 2, 3.
- `placeholder: false` setzen, sobald die echten Ziffern eingetragen sind. Dann verschwindet
  das „Platzhalter“-Abzeichen, und es erscheint der Hinweis, die Koordinaten zu notieren.
- Jede Ziffer ist ein einzelnes Zeichen (`0`–`9`). Die Koordinaten werden aus
  `coordsTemplate` zusammengesetzt; `{0}` bis `{5}` werden durch die Ziffern ersetzt.
  Das Format kann dort auch komplett geändert werden.

**Beispiel:** `digits: ["3", "7", "3", "4", "1", "6"]` ergibt
`N 51° 03.373   E 012° 33.416`.

Die Ziffern werden im Spiel an sechs Kapitel gebunden (siehe Tabelle unten). Kapitel 1, 7, 9
und 10 vergeben keine Ziffer.

---

## Rätsel-Lösungen (Spoiler)

| # | Ort | Rätsel | Lösung |
|---|-----|--------|--------|
| 1 | Postmeilensäule | Farbiges Nonogramm | Bild der **Sternenbohne** malen (10×10, Gold/Braun) |
| 2 | Markt | Kreuzworträtsel (Märchen, 15 Begriffe) | **KÖNIGDROSSELBART · RUMPELSTILZCHEN · HANSIMGLÜCK · HÄNSELUNDGRETEL · ASCHENPUTTEL · SCHNEEWITTCHEN · FROSCHKÖNIG · FRAUHOLLE · ROTKÄPPCHEN · GÄNSEMAGD · GOLDENEGANS · DORNRÖSCHEN · STERNTALER · RAPUNZEL · ZWERGNASE** |
| 3 | Rathaus | Brief (Akrostichon) | **KAFFEE** (Anfangsbuchstaben der sechs Zeilen) |
| 4 | Bibliothek | Cover-Puzzle | Zwölf Teile zum Bestiarium-Cover zusammensetzen; die Runen darauf mit dem Schlüssel übersetzen → **FRIDO** |
| 5 | Appellplatz | Zeiger-Timing | **3 Treffer** im grünen Feld |
| 6 | Schloss | Kaffeemaschine | **mittel / 80 °C / 3 / Sternenstaub** |
| 7 | Park | Heckenlabyrinth | Vom Start oben links zum Ziel unten rechts, u. a. **→ → ↓ ↓ → → ↑ ↑ → → ↓ ↓ ↓ ↓ ↓ ↓** |
| 8 | See | Sirenenmelodie | **Pling – Blubb – Plong – Plitsch – Pling** (Pads 2, 0, 3, 1, 2) |
| 9 | Kirche | Glockenreihenfolge | **Michael, Anna, Katharina, Bartholomäus, Urban** |
| 10 | Wirtshaus | Kellerkampf | **Ratte Ratz und Ratte Quiek** besiegen, dann den **Rattenkönig** (48 HP); Zauber trifft alle, Trank heilt 28 HP |

Lösungsbild des Nonogramms aus Kapitel 1 (`G` = Gold, `B` = Braun, `.` = leer):

```
....G.....
...GGG....
...GGG....
GGGGGGGGGG
.GGGBBGGG.
..GGBBGG..
...GGGG...
..GG..GG..
.GG....GG.
G........G
```

### Kaffeesatz-Ziffern

| Kapitel | Ort | Ziffern-Slot |
|---------|-----|--------------|
| 2 | Markt | Nord 1 (`digits[0]`) |
| 3 | Rathaus | Nord 2 (`digits[1]`) |
| 4 | Bibliothek | Nord 3 (`digits[2]`) |
| 5 | Appellplatz | Ost 1 (`digits[3]`) |
| 6 | Schloss | Ost 2 (`digits[4]`) |
| 8 | See | Ost 3 (`digits[5]`) |

Die Ziffern erscheinen nach dem Lösen im Belohnungstext, in der Seitenleiste, im Questbuch
und im Finale. Das Braufinale benötigt alle zehn Zutaten aus allen zehn Kapiteln; die letzte
Zutat ist der Kaffeeblütenhonig aus dem Wirtshauskeller.

---

## Debug- und Test-URLs

Die Parameter lassen sich beliebig kombinieren, z. B.
`index.html?chapter=7&fresh=1`.

| Parameter | Wirkung |
|-----------|---------|
| `?fresh=1` | Spielstand löschen und frisch starten |
| `?skipIntro=1` | Intro überspringen |
| `?chapter=1` … `?chapter=10` | Kapitel direkt öffnen (11 = Drachennest) |
| `?preview=2` | Kapitel als Vorschau öffnen, auch wenn es verschlossen ist |
| `?all=1` | Alle Kapitel gelöst, alle Zutaten und Ziffern gesetzt |
| `?questbook=1` | Questbuch direkt öffnen |
| `?final=1` | Finale mit Brauauswahl öffnen |
| `?final=done` | Finale direkt mit Ergebnis und Koordinaten öffnen |
| `?debug=1` | Debug-Linkliste im Fußbereich einblenden |

`?all=1` und `?final=…` verändern den gespeicherten Spielstand. Für einen sauberen Test
danach `?fresh=1` aufrufen oder im Spiel „Neu starten“ wählen.

Der Spielstand liegt unter dem Schlüssel `drvf2-zauberkaffee-v5`; „Neu starten“ löscht ihn.

---

## Aufbau

```
index.html            App-Shell: Intro, Karte, Seitenleiste, Modals
css/style.css         komplettes Design inkl. Responsive-Regeln
js/data.js            Story, Orte, Rätsel, Belohnungen, Finale inkl. Ziffern
js/map.js             SVG-Karte, Icons, Marker-Zustände, Auto-Zentrierung
js/app.js             Spielzustand, Rätsel-Logik, Inventar, Finale, Events
assets/img/           Grafiken (überwiegend aus Teil 1, teils als JPEG optimiert)
Die Ritter von Frohburg/   Original-Assets und XML aus Teil 1 (nicht zum Deploy nötig)
```

### Responsive Verhalten

- Ab 1120 px: Karte und Seitenleiste nebeneinander, darunter gestapelt.
- Unter 780 px: Karte wird horizontal wischbar und zentriert automatisch den aktuellen Ort.
- Unter 560 px: kompakte Kopfzeile, größere Touch-Ziele, einspaltige Kapitel-Modals und
  eine verkleinerte, aber vollständig bedienbare Kampfansicht.

Getestet mit Microsoft Edge (Desktop und emuliertes 390 × 844-Smartphone). Moderne
Versionen von Chrome, Edge, Firefox und Safari werden unterstützt; JavaScript muss aktiv sein.

---

## Hinweise für den Betrieb

- **Antworten im Quelltext:** Die Rätselantworten stehen in `js/data.js` und sind damit
  technisch einsehbar. Für eine Schnitzeljagd/Cache-Box ist das üblich und unkritisch.
- **Kein Tracking:** Es werden keine Daten an einen Server gesendet. Google Fonts werden
  extern geladen; wer das vermeiden möchte, kann die Schriften lokal hosten und den
  `<link>` in `index.html` ersetzen.
- **Bilder:** Ein Teil der Illustrationen stammt aus dem ersten Teil bzw. aus
  KI-generiertem Freepik-Material und trägt teilweise noch schwache Wasserzeichen.
  Bei Bedarf durch eigene Artwork ersetzen – Dateinamen in `js/data.js` anpassen.
- **Audio:** Töne werden zur Laufzeit per Web Audio API erzeugt; es gibt keine Audiodateien.
  Ohne Audio-Ausgabe funktioniert das Spiel vollständig.

## Bildnachweis

- Grafiken und Geschichte: „Die Ritter von Frohburg“ (Teil 1), Projektmaterial des Owners.
- Illustrationen: KI-generiert (Freepik), teils mit sichtbarem Wasserzeichen.
- Schriften: Cinzel, MedievalSharp, Patrick Hand über Google Fonts (SIL Open Font License).
