/* ============================================================
   Die Ritter von Frohburg 2 – Der Zauberkaffee
   Spieldaten: Intro, Orte, Kapitel, Gegenstände, Finale

   WICHTIG FÜR DEN OWNER:
   Die Finalkoordinaten sind Platzhalter. Die sechs Ziffern stehen
   unten in GAME.final.digits. Sobald die echten Ziffern feststehen,
   einfach dort eintragen und GAME.final.placeholder auf false setzen.
   ============================================================ */

const GAME = {
  title: "Die Ritter von Frohburg 2",
  subtitle: "Der Zauberkaffee",
  version: 2,

  /* ------------------------------------------------------------
     Intro
     ------------------------------------------------------------ */
  intro: [
    {
      kicker: "Frohburg, kurz nach dem Ritterschlag",
      title: "Ein Morgen wie aus dem Bilderbuch",
      text:
        "Die Sonne scheint, die Vögel zwitschern, und auf dem Markt riecht es nach frischem Brot. " +
        "Nur eines fehlt an diesem Morgen: das fröhliche Klappern der Kaffeetassen.",
      image: "assets/img/king.jpg",
      alt: "Der König hält seine Kaffeetasse"
    },
    {
      kicker: "Im Schloss",
      title: "Der König und sein Zauberkaffee",
      text:
        "Jeden Morgen lässt sich der König seinen berühmten Zauberkaffee brauen. Eine Prise Sternenstaub, " +
        "drei Löffel Sternenbohnen und viel Liebe – dieser Kaffee hält ganz Frohburg wach, " +
        "fröhlich und ein bisschen verrückt.",
      image: "assets/img/coffee.jpg",
      alt: "Eine Tasse Zauberkaffee zwischen Kaffeebohnen"
    },
    {
      kicker: "Doch dann ...",
      title: "Der Kaffee schmeckt nach Spülwasser",
      text:
        "Der König nimmt einen großen Schluck. Seine Augen werden groß. Dann fallen sie zu. " +
        "„Der Zauber ist weg“, murmelt er. „Die letzte Sternenbohne ist verschwunden.“",
      image: "assets/img/roaster.jpg",
      alt: "Karl der Kaffeehändler an seiner Röstmaschine"
    },
    {
      kicker: "Überall in der Stadt",
      title: "Frohburg schläft ein",
      text:
        "Der Markt gähnt. Die Wachen schnarchen. Der Barde nickt auf seiner Laute ein. " +
        "Sogar die Sirene im Schlossteich blubbert nur noch müde vor sich hin.",
      image: "assets/img/siren.jpg",
      alt: "Die Sirene im Schlossteich"
    },
    {
      kicker: "Nur einer ist noch munter",
      title: "Der frischgebackene Ritter",
      text:
        "Du hast gerade erst deinen Ritterschlag gefeiert – und jetzt liegt die ganze Stadt im Tiefschlaf. " +
        "Zeit, dein Schwert zu schnappen und die letzte Sternenbohne zu finden.",
      image: "assets/img/hero.jpg",
      alt: "Der junge Ritter mit seinem Schwert"
    },
    {
      type: "title",
      kicker: "Die Ritter von Frohburg 2",
      title: "Der Zauberkaffee",
      text:
        "Ein Indoor-Abenteuer durch Frohburg. Löse zehn Aufgaben, sammle zehn Zutaten " +
        "und wecke die Stadt mit dem besten Kaffee, den sie je geschmeckt hat.",
      image: "assets/img/map.jpg",
      alt: "Eine alte Karte auf einem Tisch im Wald"
    }
  ],

  /* ------------------------------------------------------------
     Gegenstände
     ------------------------------------------------------------ */
  items: {
    rezept1: {
      name: "Rezeptseite 1",
      icon: "scroll",
      desc: "Drei Löffel Sternenbohnen. Der erste Schritt zum Zauberkaffee."
    },
    muehle: {
      name: "Kaffeemühle",
      icon: "coffee",
      desc: "Karls alte Handmühle. Sie mahlt die Bohnen besonders fein."
    },
    siegel: {
      name: "Zunftsiegel",
      icon: "seal",
      desc: "Das Siegel der alten Kaffeezunft. Es öffnet so manche Tür."
    },
    bestiarium: {
      name: "Drachenseite",
      icon: "book",
      desc: "Eine Seite aus dem Bestiarium: Der Kaffeedrache liebt warme Bohnen."
    },
    schluessel: {
      name: "Wachschlüssel",
      icon: "key",
      desc: "Ein alter Schlüssel der Stadtwache. Er passt zum Schlossgarten."
    },
    kanne: {
      name: "Königliche Kanne",
      icon: "cauldron",
      desc: "Die Kanne des Königs. Darin schmeckt jeder Kaffee nach Abenteuer."
    },
    goldbohne: {
      name: "Goldene Bohne",
      icon: "coffee",
      desc: "Eine Bohne, die im Sonnenlicht glitzert. Sie duftet nach Karamell."
    },
    lilie: {
      name: "Wasserlilie",
      icon: "leaf",
      desc: "Eine Lilie aus dem Schlossteich. Die Sirene hat sie dir geschenkt."
    },
    glocke: {
      name: "Glockenklang",
      icon: "bell",
      desc: "Der letzte Ton der Kirchenglocke. Er vertreibt den letzten Schlaf."
    },
    honig: {
      name: "Kaffeeblütenhonig",
      icon: "honey",
      desc: "Goldener Honig aus dem Wirtshauskeller. Er macht den Zauberkaffee samtig."
    }
  },

  /* ------------------------------------------------------------
     Orte & Kapitel
     ------------------------------------------------------------ */
  locations: [
    {
      id: "postmeilensaeule",
      name: "Postmeilensäule",
      short: "Die schlafende Säule",
      x: 500,
      y: 120,
      icon: "column",
      chapter: 1,
      requires: [],
      character: {
        name: "Bard",
        role: "Stadtbarde",
        img: "assets/img/bard.jpg"
      },
      teaser:
        "Der Barde nickt auf seiner Laute. Auf seinem alten Pergament steht die erste Zutat.",
      story: [
        "Die Postmeilensäule steht noch immer an der alten Straße – nur lehnt jetzt ein schlafender Barde daran. Seine Laute seufzt im Schlaf.",
        "„Hmm? Ein wacher Ritter!“ Der Barde reibt sich die Augen. „Der Zauberkaffee ist alle. Ohne ihn schläft Frohburg ein. Karl kennt das Rezept, aber die erste Zutat steht auf diesem alten Pergament.“",
        "Der Barde zieht ein vergilbtes Pergament aus seinem Umhang. Darauf ist ein Bild gezeichnet, dessen Farben fast verblasst sind – nur die Zahlen am Rand sind noch deutlich zu lesen.",
        "„Mal das Bild nach“, sagt der Barde und drückt dir einen Kohlestift in die Hand. „Dann siehst du, was hineingehört.“"
      ],
      puzzle: {
        type: "nonogram",
        title: "Das Bild auf dem Pergament",
        prompt:
          "Male die Felder nach den Zahlen aus. Wenn das Bild vollständig ist, erkennst du die erste Zutat.",
        colors: [
          { key: "G", name: "Gold", css: "gold" },
          { key: "B", name: "Braun", css: "brown" }
        ],
        solution: [
          "....G.....",
          "...GGG....",
          "...GGG....",
          "GGGGGGGGGG",
          ".GGGBBGGG.",
          "..GGBBGG..",
          "...GGGG...",
          "..GG..GG..",
          ".GG....GG.",
          "G........G"
        ],
        note:
          "Die Zahlen sagen, wie viele zusammenhängende Felder einer Farbe in der Reihe liegen. Gleichfarbige Blöcke brauchen mindestens ein leeres Feld dazwischen – verschiedene Farben dürfen direkt aneinanderstoßen. Mit „Frei (×)“ kannst du dir Felder markieren, die leer bleiben. Prüfen kostet eine Prüfung: Du hast fünf. Sind sie verbraucht, wird das Pergament geleert und du beginnst von vorn.",
        hint:
          "Der Umriss ist ein Stern: oben eine Spitze, breite Arme und zwei Beine. In der Mitte sitzt ein brauner Kern.",
        success:
          "Das Bild leuchtet golden auf: eine Sternenbohne! Der Barde grinst: „Drei Löffel davon – das ist der erste Schluck.“"
      },
      reward: {
        item: "rezept1",
        title: "Rezeptseite 1",
        text:
          "Drei Löffel Sternenbohnen. Der Barde summt: „Auf zum Markt, zu Karl!“",
        unlock: "markt"
      }
    },

    {
      id: "markt",
      name: "Markt",
      short: "Die schiefe Waage",
      x: 520,
      y: 330,
      icon: "market",
      chapter: 2,
      requires: ["postmeilensaeule"],
      coordSlot: 0,
      character: {
        name: "Karl",
        role: "Kaffeehändler",
        img: "assets/img/roaster.jpg"
      },
      teaser:
        "Karls Kaffeebude ist verrammelt. Die Waage steht schief und schnarcht im Wind.",
      story: [
        "Der Marktplatz ist wie leergefegt. Nur Karls Kaffeebude steht noch da – verrammelt, mit einem Schild: „Wegen Schlaf geschlossen.“",
        "Dahinter liegt Karl auf einem Sack Sternenbohnen und schnarcht. Der Dieb von damals sitzt daneben und hält eine schiefe Waage fest. „Ich wollte doch nur den Kaffee aufwecken“, murmelt er im Schlaf.",
        "Auf der Theke klebt ein Zettel: „Drei Säcke, genau ein Pfund. Dann springt die Luke auf.“"
      ],
      puzzle: {
        type: "sacks",
        title: "Drei Säcke, ein Pfund",
        prompt:
          "Wähle drei Säcke, die zusammen genau 1000 Gramm wiegen. Die Waage zeigt dir die Summe.",
        sacks: [620, 480, 350, 300, 220, 180],
        target: 1000,
        note:
          "Karls Notiz: „Ein Pfund, sonst springt die Luke nicht auf. Der schwerste Sack ist zu schwer, der leichteste zu leicht.“",
        hint:
          "480 + 300 + 220 = 1000. Der 620er und der 350er bleiben draußen.",
        success:
          "Die Waage steht waagerecht. Klick! Die Luke springt auf und Karls alte Kaffeemühle purzelt heraus."
      },
      reward: {
        item: "muehle",
        title: "Kaffeemühle",
        text:
          "Karls Handmühle. Sie dreht sich schnurrend – und mahlt die Bohnen so fein wie Sternenstaub.",
        digitText:
          "Im feuchten Kaffeesatz der Waage steht eine kleine, deutliche 1."
      }
    },

    {
      id: "rathaus",
      name: "Rathaus",
      short: "Das Zunftsiegel",
      x: 630,
      y: 355,
      icon: "townhall",
      chapter: 3,
      requires: ["markt"],
      coordSlot: 1,
      character: {
        name: "Das Rathaus",
        role: "Ort der alten Akten",
        img: "assets/img/townhall.jpg"
      },
      teaser:
        "Im Rathaus schläft der Stadtschreiber auf einem Stapel alter Kaffeezunft-Akten.",
      story: [
        "Im Rathaus riecht es nach Staub, Tinte und kaltem Kaffee. Der Stadtschreiber liegt mit dem Gesicht auf einem Vertrag und schnarcht im Takt der Standuhr.",
        "In der Schublade steckt die alte Zunftakte. Doch das Siegel fehlt. „Ohne Siegel kein Geheimnis“, murmelt er im Schlaf.",
        "Auf dem Aktendeckel sind drei leere Siegelringe eingeritzt. Darunter steht ein Reim."
      ],
      puzzle: {
        type: "seal",
        title: "Die drei Siegelringe",
        prompt:
          "Drehe die drei Ringe auf die Zeichen, die der Reim beschreibt.",
        rings: [
          {
            label: "Wappentier",
            options: ["Löwe", "Kanne", "Schlüssel", "Blatt"]
          },
          {
            label: "In der Mitte",
            options: ["Kanne", "Stern", "Schlüssel", "Blatt"]
          },
          {
            label: "Grundfarbe",
            options: ["Gold", "Rot", "Braun", "Blau"]
          }
        ],
        answers: ["Löwe", "Stern", "Braun"],
        note:
          "Der Reim: „Das Wappentier trägt eine Mähne. Es hält keinen Schlüssel, sondern einen Stern. Und der Grund ist so dunkel wie der Kaffee des Königs.“",
        hint: "Das Wappentier ist der Löwe, in der Mitte steht ein Stern, der Grund ist braun.",
        success:
          "Die drei Ringe rasten ein. Das Zunftsiegel glüht golden auf – und die Akte klappt auf."
      },
      reward: {
        item: "siegel",
        title: "Zunftsiegel",
        text:
          "Das Siegel der alten Kaffeezunft. Es ist warm wie eine frisch gebrühte Tasse.",
        digitText:
          "Unter dem Siegelabdruck prangt eine 2, so rund wie eine Kaffeebohne."
      }
    },

    {
      id: "bibliothek",
      name: "Bibliothek",
      short: "Das Drachenbestiarium",
      x: 430,
      y: 465,
      icon: "book",
      chapter: 4,
      requires: ["rathaus"],
      coordSlot: 2,
      character: {
        name: "Die Bibliothekarin",
        role: "Hüterin der alten Bücher",
        img: "assets/img/librarian.jpg"
      },
      teaser:
        "Ein zerrissenes Buchcover wartet auf geschickte Hände. Die Runen darauf verraten den Namen des Drachen.",
      story: [
        "Die Bibliothek ist still. Zu still. Die Bibliothekarin sitzt hinter ihrem Schreibtisch, die Brille verrutscht, und schläft auf einem aufgeschlagenen Buch.",
        "Auf dem Schreibtisch liegt ein schweres Bestiarium. Sein lederner Einband ist in zwölf Stücke zerfallen, die über die ganze Platte verstreut sind.",
        "„Setz das Cover zusammen“, murmelt sie im Schlaf. „Dann zeigen dir die Runen den Namen des Drachen.“"
      ],
      puzzle: {
        type: "jigsaw",
        title: "Das zerrissene Cover",
        prompt:
          "Das Cover des Bestiariums ist in zwölf Stücke zerfallen. Tausche die Teile, bis das Bild wieder vollständig ist – dann erscheinen die Runen des Drachen.",
        cols: 4,
        rows: 3,
        sequence: ["f", "r", "i", "d", "o"],
        key: [
          { glyph: "f", letter: "F" },
          { glyph: "r", letter: "R" },
          { glyph: "i", letter: "I" },
          { glyph: "d", letter: "D" },
          { glyph: "o", letter: "O" }
        ],
        answer: "frido",
        answerLabel: "Name des Drachen",
        note:
          "Tippe zwei Teile an, um sie zu tauschen. Die Runen erscheinen erst, wenn das Bild vollständig ist – den Schlüssel findest du dann unter dem Cover.",
        hint: "Die Runen auf dem fertigen Cover ergeben F-R-I-D-O. Der Drache heißt Frido.",
        success:
          "Das Cover ist vollständig. Die fünf Runen leuchten golden auf: F-R-I-D-O. „Frido!“ Kaum hast du den Namen ausgesprochen, blättert das Bestiarium von selbst auf die richtige Seite."
      },
      reward: {
        item: "bestiarium",
        title: "Drachenseite",
        text:
          "Auf der Seite steht: „Frido liebt warme Bohnen und alles, was glitzert. Er versteckt sich hinter der Stadt.“",
        digitText:
          "In der Ecke der Buchseite ist eine 3 eingedruckt, halb verdeckt vom Drachenflügel."
      }
    },

    {
      id: "appellplatz",
      name: "Appellplatz",
      short: "Der alte Schlag",
      x: 760,
      y: 185,
      icon: "sword",
      chapter: 5,
      requires: ["bibliothek"],
      coordSlot: 3,
      character: {
        name: "Die Stadtwache",
        role: "Hüter des Schlossgartens",
        img: "assets/img/sword.jpg"
      },
      teaser:
        "Die Wachen schnarchen im Takt. Nur wer den alten Schlag trifft, bekommt den Schlüssel.",
      story: [
        "Auf dem Appellplatz schnarchen drei Wachen um die Wette. Ihre Helme sitzen schief, die Speere lehnen an der Wand.",
        "Eine von ihnen hält einen Schlüssel umklammert. Daneben steht in den Sand gekritzelt: „Nur wer den alten Schlag kennt, darf in den Garten.“",
        "Über dem Platz baumelt ein alter Übungskolben. Er schwingt hin und her. Dreimal muss der Schlag sitzen."
      ],
      puzzle: {
        type: "timing",
        title: "Der alte Schlag",
        prompt:
          "Triff dreimal das grüne Feld. Der Zeiger wird mit jedem Treffer ein bisschen schneller.",
        hits: 3,
        hint:
          "Schlag zu, wenn der Zeiger mitten im grünen Feld ist. Am Rand ist er kurz langsamer.",
        success:
          "Drei saubere Treffer! Die Wache dreht sich im Schlaf um und lässt den Schlüssel fallen."
      },
      reward: {
        item: "schluessel",
        title: "Wachschlüssel",
        text:
          "Ein alter Schlüssel mit einem kleinen Löwenkopf. Er passt zum Tor des Schlossgartens.",
        digitText:
          "In den Schlüsselbart ist eine 4 geritzt – vier Kerben, vier Zähne."
      }
    },

    {
      id: "schloss",
      name: "Schloss",
      short: "Die königliche Kaffeemaschine",
      x: 330,
      y: 535,
      icon: "castle",
      chapter: 6,
      requires: ["appellplatz"],
      coordSlot: 4,
      character: {
        name: "König",
        role: "Herr von Frohburg",
        img: "assets/img/king.jpg"
      },
      teaser:
        "Der König schläft auf seinem Thron. Seine Kanne ist leer und die Kaffeemaschine steht still.",
      story: [
        "Im Schloss ist es warm und gemütlich. Der König liegt auf seinem Thron, die Krone sitzt schief, und in seiner Hand steht eine leere Tasse.",
        "Neben ihm schnurrt die königliche Kaffeemaschine. Doch alle Rädchen stehen still. Ohne die richtige Mischung gibt sie keinen Tropfen her.",
        "Auf dem Boden liegt ein Zettel in königlicher Handschrift."
      ],
      puzzle: {
        type: "dials",
        title: "Die königliche Kaffeemaschine",
        prompt:
          "Stelle Mahlgrad, Temperatur, Löffel und Zutat richtig ein, dann brüht die Maschine.",
        settings: [
          {
            key: "mahlgrad",
            label: "Mahlgrad",
            options: ["grob", "mittel", "fein"],
            answer: "mittel"
          },
          {
            key: "temperatur",
            label: "Temperatur",
            options: ["60 °C", "80 °C", "95 °C"],
            answer: "80 °C"
          },
          {
            key: "loeffel",
            label: "Löffel",
            options: ["2", "3", "4", "5"],
            answer: "3"
          },
          {
            key: "zutat",
            label: "Zutat",
            options: ["Zimt", "Sternenstaub", "Salz"],
            answer: "Sternenstaub"
          }
        ],
        note:
          "Königliche Notiz: „Weder lauwarm noch kochend – die goldene Mitte. Fein gemahlen wird sie bitter, grob bleibt sie sandig. Drei Löffel, wie auf Rezeptseite eins. Und nur Sternenstaub gehört hinein.“",
        hint:
          "Mittel, 80 °C, 3 Löffel und Sternenstaub. Die goldene Mitte ist bei jeder Zutat richtig.",
        success:
          "Die Maschine rattert, zischt und duftet. Ein kleiner Strahl Zauberkaffee landet in der königlichen Kanne."
      },
      reward: {
        item: "kanne",
        title: "Königliche Kanne",
        text:
          "Die Kanne des Königs. Darin schmeckt jeder Kaffee nach Abenteuer – und ein bisschen nach Karamell.",
        digitText:
          "Auf dem Kannenboden schimmert eine 5, wie Milchschaum im Kaffee."
      }
    },

    {
      id: "park",
      name: "Park",
      short: "Der verwilderte Schlossgarten",
      x: 240,
      y: 420,
      icon: "tree",
      chapter: 7,
      requires: ["schloss"],
      character: {
        name: "Königin",
        role: "Die müde Gärtnerin",
        img: "assets/img/queen.jpg"
      },
      teaser:
        "Im Schlossgarten wuchern die Hecken. Die Königin sucht darin nach der goldenen Bohne.",
      story: [
        "Der Schlossgarten ist über Nacht zugewachsen. Die Hecken haben sich zu einem Labyrinth verheddert, und irgendwo darin glitzert etwas Goldenes.",
        "Die Königin sitzt auf einer Bank und gähnt. „Wenn du die goldene Bohne findest, darfst du sie behalten. Aber beeil dich, bevor die Hecken einschlafen.“",
        "Der Weg führt vom Gartentor bis zur alten Sonnenuhr. Immer der Nase nach – und den Hecken aus dem Weg."
      ],
      puzzle: {
        type: "maze",
        title: "Das Heckenlabyrinth",
        prompt:
          "Finde den Weg vom Gartentor zur goldenen Bohne. Nutze die Pfeile oder tippe auf ein freies Feld.",
        grid: [
          "#########",
          "#S..#...#",
          "#.#.#.#.#",
          "#.#...#.#",
          "#.#####.#",
          "#.......#",
          "#.#####.#",
          "#.....#G#",
          "#########"
        ],
        start: [1, 1],
        goal: [7, 7],
        hint:
          "Erst nach rechts bis zur Wand, dann hinunter, dann immer dem freien Weg nach rechts und unten folgen.",
        success:
          "Die letzte Hecke raschelt – und da liegt sie: die goldene Bohne, warm und glitzernd wie ein kleiner Sonnenuntergang."
      },
      reward: {
        item: "goldbohne",
        title: "Goldene Bohne",
        text:
          "Eine Bohne, die im Sonnenlicht glitzert. Sie duftet nach Karamell und ein bisschen nach Abenteuer."
      }
    },

    {
      id: "see",
      name: "See",
      short: "Das Lied der Sirene",
      x: 390,
      y: 620,
      icon: "wave",
      chapter: 8,
      requires: ["park"],
      coordSlot: 5,
      character: {
        name: "Sirene",
        role: "Hüterin des Schlossteichs",
        img: "assets/img/siren.jpg"
      },
      teaser:
        "Die Sirene im Schlossteich gähnt. Sie hat gesehen, wohin der kleine Drache geflogen ist.",
      story: [
        "Am Schlossteich blubbert es müde. Die Sirene liegt mit dem Kinn auf dem Wasser und gähnt in einer kleinen Melodie.",
        "„Der kleine Drache? Ja, den habe ich gesehen. Frido hat etwas Glitzerndes durch die Luft getragen. Wenn du meine Melodie nachspielst, zeige ich dir den Weg.“",
        "Vier Lilienblätter liegen im Wasser. Jedes klingt anders."
      ],
      puzzle: {
        type: "melody",
        title: "Das Lied der Sirene",
        prompt:
          "Höre der Sirene zu und spiele ihre fünf Töne in der richtigen Reihenfolge nach.",
        pads: [
          { label: "Blubb", freq: 392, color: "teal" },
          { label: "Plitsch", freq: 494, color: "blue" },
          { label: "Pling", freq: 587, color: "lilac" },
          { label: "Plong", freq: 698, color: "green" }
        ],
        sequence: [2, 0, 3, 1, 2],
        hint:
          "Die Melodie beginnt und endet auf der dritten Lilie: Pling – Blubb – Plong – Plitsch – Pling.",
        success:
          "Die Sirene klatscht ins Wasser. „Genau so!“ Sie zeigt zum Schlossteich hinaus, wo eine kleine Rauchwolke über den Bäumen steht."
      },
      reward: {
        item: "lilie",
        title: "Wasserlilie",
        text:
          "Eine Lilie aus dem Schlossteich. Sie duftet nach Regen und klingt noch ein bisschen nach der Melodie.",
        digitText:
          "Auf dem Lilienblatt liegt eine 6, glänzend wie ein Wassertropfen."
      }
    },

    {
      id: "kirche",
      name: "Kirche",
      short: "Die fünf Glocken",
      x: 565,
      y: 560,
      icon: "church",
      chapter: 9,
      requires: ["see"],
      character: {
        name: "Die Kirche",
        role: "St. Michaelis",
        img: "assets/img/church.jpg"
      },
      teaser:
        "Die Kirchenglocken schlafen. Ein letzter Glockenklang könnte die Stadt wecken.",
      story: [
        "Die Kirche St. Michaelis ist still. Die Glocken hängen schwer in ihren Stühlen und träumen von großen Festtagen.",
        "Im Kirchenschiff liegt ein alter Zettel: „Erst wenn die Glocken wieder singen, findet der Kaffee seinen letzten Klang.“",
        "Fünf Glocken, fünf Namen, eine Reihenfolge. Der Küster hat sie aufgeschrieben, bevor er einschlief."
      ],
      puzzle: {
        type: "bells",
        title: "Die fünf Glocken",
        prompt:
          "Läute die Glocken in der richtigen Reihenfolge. Tippe sie nacheinander an.",
        bells: [
          { id: "michael", name: "Michael", freq: 262 },
          { id: "anna", name: "Anna", freq: 294 },
          { id: "katharina", name: "Katharina", freq: 330 },
          { id: "bartholomaeus", name: "Bartholomäus", freq: 349 },
          { id: "urban", name: "Urban", freq: 392 }
        ],
        clues: [
          "Die Michaelglocke läutet zuerst.",
          "Die Anna folgt ihr auf dem Fuße – direkt danach.",
          "Die Urban schläft am längsten und läutet zuletzt.",
          "Die Katharina läutet, bevor die Bartholomäus erklingt."
        ],
        solution: ["michael", "anna", "katharina", "bartholomaeus", "urban"],
        hint:
          "Michael, Anna, Katharina, Bartholomäus, Urban. Urban läutet zuletzt, Katharina vor Bartholomäus.",
        success:
          "Fünf Glocken singen. Der letzte Ton bleibt in der Luft hängen, gleitet durch das Kirchenschiff und setzt sich summend in deine Tasche."
      },
      reward: {
        item: "glocke",
        title: "Glockenklang",
        text:
          "Der letzte Ton der Kirchenglocke. Er ist unsichtbar, aber er klingelt leise in deiner Tasche."
      }
    },

    {
      id: "wirtshaus",
      name: "Wirtshaus",
      short: "Die letzte Süße",
      x: 660,
      y: 262,
      icon: "tavern",
      chapter: 10,
      requires: ["kirche"],
      character: {
        name: "Wirtin Rosalinde",
        role: "Herrin vom Schläfrigen Kater",
        img: "assets/img/wirtshaus.svg"
      },
      teaser:
        "Aus dem Keller des Wirtshauses klingt hungriges Quieken. Dort unten wartet die letzte Zutat.",
      story: [
        "Im „Schläfrigen Kater“ sind alle Tische leer – bis auf einen. Wirtin Rosalinde poliert zum hundertsten Mal denselben Krug und seufzt.",
        "„Der Zauberkaffee? Ja, Karl hat mir sein letztes Glas Kaffeeblütenhonig gebracht. Aber die Ratten haben es in den Keller geschleppt. Seitdem tanzen sie unten auf den Fässern.“",
        "Rosalinde drückt dir eine Laterne in die eine und einen Trank in die andere Hand. „Der Keller ist alt, dunkel und voller quiekender Biester. Aber du bist doch ein Ritter, oder?“",
        "Unten knarrt die Treppe. In der Dunkelheit blitzen kleine Augen. Und auf dem größten Fass sitzt ein Rattenkönig mit einem Löffel in der Pfote."
      ],
      puzzle: {
        type: "battle",
        title: "Die Ratten im Keller",
        prompt:
          "Stelle dich den Ratten. Dein Schwert trifft einen Gegner, der Funkenzauber alle auf einmal. Mit einem Trank heilst du dich, und Fliehen bringt dich zurück nach oben.",
        hint:
          "Kümmere dich zuerst um die beiden kleinen Kellerratten. Gegen den Rattenkönig hilft der Funkenzauber, und wenn dein Leben knapp wird, nimm einen Trank.",
        hero: {
          name: "Ritter",
          maxHp: 72,
          maxMp: 12,
          potions: 3,
          attack: [16, 22],
          spellCost: 6,
          spell: [11, 16],
          potionHeal: 28
        },
        enemies: [
          { id: "rat1", name: "Ratte Ratz", kind: "rat", hp: 20, damage: [3, 5] },
          { id: "rat2", name: "Ratte Quiek", kind: "rat", hp: 20, damage: [3, 5] },
          { id: "king", name: "Rattenkönig", kind: "king", hp: 48, damage: [5, 8] }
        ],
        success:
          "Der Rattenkönig lässt den Löffel fallen, quiekt empört und verschwindet mit seinen Ratten in einem Mauseloch. Auf dem Fass steht ein Glas goldener Kaffeeblütenhonig."
      },
      reward: {
        item: "honig",
        title: "Kaffeeblütenhonig",
        text:
          "Ein Glas goldener Honig aus dem Wirtshauskeller. Karl wird strahlen – und der Zauberkaffee wird herrlich samtig."
      }
    },

    {
      id: "drachennest",
      name: "Drachennest",
      short: "Das Kaffeefest",
      x: 790,
      y: 520,
      icon: "dragon",
      chapter: 11,
      requires: ["wirtshaus"],
      isFinal: true,
      character: {
        name: "Frido",
        role: "Der Kaffeedrache",
        img: "assets/img/coffee.jpg"
      },
      teaser:
        "Hinter der Stadt steigt Kaffeeduft aus einer Höhle. Dort wartet der kleine Drache.",
      story: [
        "Hinter der Stadt, wo die Wege breiter werden und die Luft nach Kaffee riecht, liegt eine kleine Höhle.",
        "Drinnen hat sich Frido aus Kaffeebohnen, goldenen Federn und lauter glitzernden Dingen ein gemütliches Nest gebaut. In seiner Pfote: die letzte Sternenbohne.",
        "„Oh“, sagt der kleine Drache. „Ich wollte doch nur einen Schluck Zauberkaffee. Aber ich habe vergessen, wie das geht. Könnt ihr mir helfen?“"
      ]
    }
  ],

  /* ------------------------------------------------------------
     Finale
     ------------------------------------------------------------ */
  final: {
    title: "Der Zauberkaffee ist gerettet!",
    brewTitle: "Der Zauberkaffee wartet",
    text:
      "Frido schnuppert. Der Kaffee blubbert. Die Stadt wacht auf. Und im Kaffeesatz stehen sechs geheimnisvolle Zahlen.",
    ingredients: [
      "rezept1",
      "muehle",
      "siegel",
      "bestiarium",
      "schluessel",
      "kanne",
      "goldbohne",
      "lilie",
      "glocke",
      "honig"
    ],
    /* Die sechs Ziffern der Finalkoordinaten.
       PLATZHALTER: Hier später die echten Ziffern eintragen.
       Reihenfolge: Nord-Ziffern 1-3, dann Ost-Ziffern 1-3. */
    digits: ["1", "2", "3", "4", "5", "6"],
    placeholder: true,
    coordsTemplate: "N 51° 03.{0}{1}{2}   E 012° 33.{3}{4}{5}",
    required: [
      "postmeilensaeule",
      "markt",
      "rathaus",
      "bibliothek",
      "appellplatz",
      "schloss",
      "park",
      "see",
      "kirche",
      "wirtshaus"
    ]
  }
};
