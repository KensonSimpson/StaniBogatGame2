// wwwroot/js/translations.js
// Full translations for "Стани Богат" (original bg) and six additional languages.
// - Preserves keys, placeholders (e.g. {level}, {prize}) and emojis
// - "лв" in prizes converted to "BGN" for all languages per requirement

const TRANSLATIONS = {
    bg: {
        // UI Elements
        startButton: "ЗАПОЧНИ ИГРА",
        tutorialButton: "КАК СЕ ИГРАЕ",
        spinningWheelButton: "КОЛЕЛО НА КЪСМЕТА",
        gameTitle: "🎮 СТАНИ БОГАТ 🎮",
        levelIndicator: "Въпрос: {level}/15 | Печалба: {prize}",
        moneyTreeToggle: "💰",
        gameBackButton: "← Назад към началния екран",

        // Settings
        settingsTitle: "⚙️ Настройки",
        sfxVolume: "🔊 Звукови ефекти",
        sfxVolumeLabel: "Сила на звуците:",
        musicVolume: "🎵 Музика",
        musicVolumeLabel: "Сила на музиката:",
        toggleStartMusic: "🎵 Включи музика в началния екран",
        toggleWheelMusic: "🎵 Включи музика в колелото",
        closeSettings: "Затвори",
        resetSettings: "Възстанови настройки по подразбиране",
        languageSettings: "🌍 Език / Language",

        // Tutorial
        tutorialTitle: "📚 Как се играе Стани Богат",
        goalTitle: "🎯 Цел на играта",
        goalText: "Отговорете правилно на 15 последователни въпроса и спечелете до 100,000 BGN! Всеки въпрос е по-труден от предишния, но и наградата е по-голяма.",
        howToTitle: "❓ Как се играе",
        howTo1: "Прочетете внимателно въпроса",
        howTo2: "Изберете един от 4-те възможни отговора",
        howTo3: "Имате 3 помощни жокера, които можете да използвате",
        howTo4: "Ако отговорите правилно, продължавате към следващото ниво",
        howTo5: "Ако сгрешите, играта приключва и запазвате последната гарантирана сума",

        // Jokers
        joker5050: "50:50",
        jokerAudience: "👥 Публика",
        jokerPhone: "📞 Телефон",
        audienceModalTitle: "Джокер: Помощ от публиката",
        audienceVoteText: "Гласувайте СЕГА!",

        // Wheel
        wheelTitle: "🎡 Колело на късмета",
        wheelText: "Завърти колелото, за да избереш участник!",
        spinButton: "ЗАВЪРТИ",
        spinAgainButton: "Завърти отново",
        selectedParticipant: "🎉 Избран участник:",

        // Questions
        questions: [
            {
                question: "Коя от следните бройни системи е непозиционна?",
                answers: ["Двоична", "Десетична", "Римска", "Осмична"],
                correct: 2
            },
            {
                question: "Кое твърдение се отнася за позиционната бройна система?",
                answers: [
                    "Тя се използва за превеждане на езици",
                    "Зависи позицията на символите и цифрите в числото",
                    "Не може да се преобразува в други бройни системи",
                    "Няма значение къде се намира мястото на цифрата/символа в числото"
                ],
                correct: 1
            },
            {
                question: "Кой програмен език може да се използва за работа с бройни системи?",
                answers: ["Python", "HTML", "CSS", "BOOTSTRAP"],
                correct: 0
            },
            {
                question: "Кое твърдение е вярно за побитовите операции?",
                answers: [
                    "Те са много сложни за разбиране и само експертите могат да разполагат с тях",
                    "Те са остарели и са безсмислени в днешно време",
                    "Те са операции, които работят с отделните битове на данните",
                    "Те са наименование за абстрактни типове данни(АТД)"
                ],
                correct: 2
            },
            {
                question: "Колко вида позиционни бройни системи има?",
                answers: ["5", "4", "6", "7"],
                correct: 1
            },
            {
                question: "Коя бройна система е най-удобна за използване от хората?",
                answers: ["Двоичната", "Шестнадесетичната", "Човешката", "Десетичната"],
                correct: 3
            },
            {
                question: "101101(2)+10001(2) е равно на:",
                answers: ["111110(2)", "111102(2)", "1001101(2)", "10101(2)"],
                correct: 0
            },
            {
                question: "Числото 1000011(2) в двоична БС как би изглеждало в шестнадесетична?",
                answers: ["A5", "43", "45", "67"],
                correct: 1
            },
            {
                question: "Коя от стойностите НЕ може да съществува в шестнадесетичната бройна система?",
                answers: ["55899330(16)", "DEF426788(16)", "BCDABDDFC(16)", "556GCEA8(16)"],
                correct: 3
            },
            {
                question: 'Клод Шанън "ражда" двоичната система в компютрите. Кога се случва това събитие?',
                answers: [
                    "На 4 Април 1936г.",
                    "На 10 август 1937г.",
                    "На септември 11 2001г.",
                    "На 12 май 1941г."
                ],
                correct: 1
            },
            {
                question: "557622(8)-36625(8) e равно на:",
                answers: ["520 997(8)", "519 767(8)", "520 775(8)", "2A1FF(16)"],
                correct: 2
            },
            {
                question: "Кое твърдение е вярно?",
                answers: [
                    "Побитовите операции работят с осмична БС",
                    "Извадка е подмножество от генералната съвкупност",
                    "Непозиционната БС е лесна за представяне на големи числа",
                    "Основната цел на БС е да усложнява пресмятането на числата"
                ],
                correct: 1
            },
            {
                question: "Кой ред е възможен при шестнадесетична БС?",
                answers: ["55FFECAA355B", "311!BVV6-%45", "463DE3E2H9", "FGGE4V46N7I"],
                correct: 0
            },
            {
                question: "Кое твърдение се отнася за осмичната БС?",
                answers: [
                    "Използва се за машинен код",
                    "Единствената БС, използваща се в международни стандарти",
                    "По-компактна е от двоичната БС",
                    "Тя е най-разпространена за дебугване на паметта"
                ],
                correct: 2
            },
            {
                question: "Частното на AA7DDC89(16):FC6FD5(16) е:",
                answers: ["4BB(16)", "79(16)", "AC(16)", "3D0(16)"],
                correct: 2
            }
        ],

        // Prize Levels (converted to BGN code as requested)
        prizes: [
            "100 BGN", "200 BGN", "300 BGN", "400 BGN", "500 BGN",
            "1,000 BGN", "1,500 BGN", "2,000 BGN", "3,000 BGN", "5,000 BGN",
            "10,000 BGN", "20,000 BGN", "30,000 BGN", "50,000 BGN", "100,000 BGN"
        ]
    },

    en: {
        // UI Elements
        startButton: "START GAME",
        tutorialButton: "HOW TO PLAY",
        spinningWheelButton: "WHEEL OF FORTUNE",
        gameTitle: "🎮 BECOME RICH 🎮",
        levelIndicator: "Question: {level}/15 | Prize: {prize}",
        moneyTreeToggle: "💰",
        gameBackButton: "← Back to Start Screen",

        // Settings
        settingsTitle: "⚙️ Settings",
        sfxVolume: "🔊 Sound Effects",
        sfxVolumeLabel: "Sound Volume:",
        musicVolume: "🎵 Music",
        musicVolumeLabel: "Music Volume:",
        toggleStartMusic: "🎵 Play music on start screen",
        toggleWheelMusic: "🎵 Play music on the wheel",
        closeSettings: "Close",
        resetSettings: "Reset to Default",
        languageSettings: "🌍 Language",

        // Tutorial
        tutorialTitle: "📚 How to play Become Rich",
        goalTitle: "🎯 Game Goal",
        goalText: "Answer 15 consecutive questions correctly and win up to 100,000 BGN! Each question is harder than the previous one, but the prize is larger.",
        howToTitle: "❓ How to play",
        howTo1: "Read the question carefully",
        howTo2: "Choose one of the 4 possible answers",
        howTo3: "You have 3 jokers (lifelines) you can use",
        howTo4: "If you answer correctly, you move to the next level",
        howTo5: "If you answer incorrectly, the game ends and you keep the last guaranteed amount",

        // Jokers
        joker5050: "50:50",
        jokerAudience: "👥 Audience",
        jokerPhone: "📞 Phone",
        audienceModalTitle: "Joker: Audience Help",
        audienceVoteText: "Vote NOW!",

        // Wheel
        wheelTitle: "🎡 Wheel of Fortune",
        wheelText: "Spin the wheel to pick a participant!",
        spinButton: "SPIN",
        spinAgainButton: "Spin again",
        selectedParticipant: "🎉 Selected participant:",

        // Questions
        questions: [
            {
                question: "Which of the following number systems is non-positional?",
                answers: ["Binary", "Decimal", "Roman", "Octal"],
                correct: 2
            },
            {
                question: "Which statement applies to a positional number system?",
                answers: [
                    "It is used for translating languages",
                    "It depends on the position of symbols and digits in the number",
                    "It cannot be converted to other number systems",
                    "It doesn't matter where a digit/symbol is located in the number"
                ],
                correct: 1
            },
            {
                question: "Which programming language can be used to work with number systems?",
                answers: ["Python", "HTML", "CSS", "BOOTSTRAP"],
                correct: 0
            },
            {
                question: "Which statement is true about bitwise operations?",
                answers: [
                    "They are very complex to understand and only experts can handle them",
                    "They are obsolete and meaningless nowadays",
                    "They are operations that work on the individual bits of data",
                    "They are a name for abstract data types (ADT)"
                ],
                correct: 2
            },
            {
                question: "How many types of positional number systems are there?",
                answers: ["5", "4", "6", "7"],
                correct: 1
            },
            {
                question: "Which number system is most convenient for human use?",
                answers: ["Binary", "Hexadecimal", "Human", "Decimal"],
                correct: 3
            },
            {
                question: "101101(2)+10001(2) is equal to:",
                answers: ["111110(2)", "111102(2)", "1001101(2)", "10101(2)"],
                correct: 0
            },
            {
                question: "How would the number 1000011(2) in binary look in hexadecimal?",
                answers: ["A5", "43", "45", "67"],
                correct: 1
            },
            {
                question: "Which of the following values CANNOT exist in the hexadecimal number system?",
                answers: ["55899330(16)", "DEF426788(16)", "BCDABDDFC(16)", "556GCEA8(16)"],
                correct: 3
            },
            {
                question: 'Claude Shannon "gave birth" to binary use in computers. When did this event occur?',
                answers: [
                    "April 4, 1936",
                    "August 10, 1937",
                    "September 11, 2001",
                    "May 12, 1941"
                ],
                correct: 1
            },
            {
                question: "557622(8)-36625(8) is equal to:",
                answers: ["520 997(8)", "519 767(8)", "520 775(8)", "2A1FF(16)"],
                correct: 2
            },
            {
                question: "Which statement is true?",
                answers: [
                    "Bitwise operations work with octal number system",
                    "A sample is a subset of the general population",
                    "Non-positional systems are easy to represent very large numbers",
                    "The main purpose of number systems is to complicate number calculation"
                ],
                correct: 1
            },
            {
                question: "Which string is possible in the hexadecimal number system?",
                answers: ["55FFECAA355B", "311!BVV6-%45", "463DE3E2H9", "FGGE4V46N7I"],
                correct: 0
            },
            {
                question: "Which statement applies to the octal number system?",
                answers: [
                    "It is used for machine code",
                    "The only number system used in international standards",
                    "It is more compact than the binary system",
                    "It is the most common for debugging memory"
                ],
                correct: 2
            },
            {
                question: "The quotient of AA7DDC89(16) : FC6FD5(16) is:",
                answers: ["4BB(16)", "79(16)", "AC(16)", "3D0(16)"],
                correct: 2
            }
        ],

        // Prizes
        prizes: [
            "100 BGN", "200 BGN", "300 BGN", "400 BGN", "500 BGN",
            "1,000 BGN", "1,500 BGN", "2,000 BGN", "3,000 BGN", "5,000 BGN",
            "10,000 BGN", "20,000 BGN", "30,000 BGN", "50,000 BGN", "100,000 BGN"
        ]
    },

    es: {
        // UI Elements
        startButton: "INICIAR JUEGO",
        tutorialButton: "CÓMO JUGAR",
        spinningWheelButton: "RUEDA DE LA SUERTE",
        gameTitle: "🎮 HAZTE RICO 🎮",
        levelIndicator: "Pregunta: {level}/15 | Premio: {prize}",
        moneyTreeToggle: "💰",
        gameBackButton: "← Volver a la pantalla inicial",

        // Settings
        settingsTitle: "⚙️ Ajustes",
        sfxVolume: "🔊 Efectos de sonido",
        sfxVolumeLabel: "Volumen de efectos:",
        musicVolume: "🎵 Música",
        musicVolumeLabel: "Volumen de música:",
        toggleStartMusic: "🎵 Reproducir música en la pantalla inicial",
        toggleWheelMusic: "🎵 Reproducir música en la rueda",
        closeSettings: "Cerrar",
        resetSettings: "Restablecer por defecto",
        languageSettings: "🌍 Idioma",

        // Tutorial
        tutorialTitle: "📚 Cómo jugar Hazte Rico",
        goalTitle: "🎯 Objetivo del juego",
        goalText: "Responde correctamente 15 preguntas consecutivas y gana hasta 100,000 BGN. ¡Cada pregunta es más difícil que la anterior, pero el premio es mayor!",
        howToTitle: "❓ Cómo jugar",
        howTo1: "Lee la pregunta con atención",
        howTo2: "Elige una de las 4 respuestas posibles",
        howTo3: "Tienes 3 comodines que puedes usar",
        howTo4: "Si respondes correctamente, avanzas al siguiente nivel",
        howTo5: "Si fallas, el juego termina y conservas la última cantidad garantizada",

        // Jokers
        joker5050: "50:50",
        jokerAudience: "👥 Público",
        jokerPhone: "📞 Teléfono",
        audienceModalTitle: "Comodín: Ayuda del público",
        audienceVoteText: "¡Vota AHORA!",

        // Wheel
        wheelTitle: "🎡 Rueda de la suerte",
        wheelText: "¡Gira la rueda para elegir un participante!",
        spinButton: "GIRAR",
        spinAgainButton: "Girar de nuevo",
        selectedParticipant: "🎉 Participante seleccionado:",

        // Questions
        questions: [
            {
                question: "¿Cuál de los siguientes sistemas de numeración es no-posicional?",
                answers: ["Binario", "Decimal", "Romano", "Octal"],
                correct: 2
            },
            {
                question: "¿Qué afirmación se aplica al sistema de numeración posicional?",
                answers: [
                    "Se utiliza para traducir idiomas",
                    "Depende de la posición de los símbolos y dígitos en el número",
                    "No puede convertirse a otros sistemas de numeración",
                    "No importa dónde esté ubicado el dígito/símbolo en el número"
                ],
                correct: 1
            },
            {
                question: "¿Qué lenguaje de programación puede usarse para trabajar con sistemas numéricos?",
                answers: ["Python", "HTML", "CSS", "BOOTSTRAP"],
                correct: 0
            },
            {
                question: "¿Qué afirmación es verdadera sobre las operaciones a nivel de bit?",
                answers: [
                    "Son muy complejas de entender y solo los expertos pueden manejarlas",
                    "Están obsoletas y no tienen sentido hoy en día",
                    "Son operaciones que trabajan con los bits individuales de los datos",
                    "Son un nombre para tipos de datos abstractos (TDA)"
                ],
                correct: 2
            },
            {
                question: "¿Cuántos tipos de sistemas de numeración posicional existen?",
                answers: ["5", "4", "6", "7"],
                correct: 1
            },
            {
                question: "¿Qué sistema numérico es más cómodo para el uso humano?",
                answers: ["Binario", "Hexadecimal", "Humano", "Decimal"],
                correct: 3
            },
            {
                question: "101101(2)+10001(2) es igual a:",
                answers: ["111110(2)", "111102(2)", "1001101(2)", "10101(2)"],
                correct: 0
            },
            {
                question: "¿Cómo se vería el número 1000011(2) en binario en hexadecimal?",
                answers: ["A5", "43", "45", "67"],
                correct: 1
            },
            {
                question: "¿Cuál de los siguientes valores NO puede existir en el sistema hexadecimal?",
                answers: ["55899330(16)", "DEF426788(16)", "BCDABDDFC(16)", "556GCEA8(16)"],
                correct: 3
            },
            {
                question: 'Claude Shannon "dio origen" al uso binario en las computadoras. ¿Cuándo ocurrió ese evento?',
                answers: [
                    "4 de abril de 1936",
                    "10 de agosto de 1937",
                    "11 de septiembre de 2001",
                    "12 de mayo de 1941"
                ],
                correct: 1
            },
            {
                question: "557622(8)-36625(8) es igual a:",
                answers: ["520 997(8)", "519 767(8)", "520 775(8)", "2A1FF(16)"],
                correct: 2
            },
            {
                question: "¿Qué afirmación es verdadera?",
                answers: [
                    "Las operaciones a nivel de bit funcionan con el sistema octal",
                    "Una muestra es un subconjunto de la población general",
                    "Los sistemas no-posicionales son fáciles para representar números muy grandes",
                    "El objetivo principal de los sistemas numéricos es complicar los cálculos"
                ],
                correct: 1
            },
            {
                question: "¿Qué cadena es posible en el sistema hexadecimal?",
                answers: ["55FFECAA355B", "311!BVV6-%45", "463DE3E2H9", "FGGE4V46N7I"],
                correct: 0
            },
            {
                question: "¿Qué afirmación se aplica al sistema octal?",
                answers: [
                    "Se usa para código máquina",
                    "El único sistema usado en estándares internacionales",
                    "Es más compacto que el sistema binario",
                    "Es el más común para depurar la memoria"
                ],
                correct: 2
            },
            {
                question: "El cociente de AA7DDC89(16) : FC6FD5(16) es:",
                answers: ["4BB(16)", "79(16)", "AC(16)", "3D0(16)"],
                correct: 2
            }
        ],

        // Prizes
        prizes: [
            "100 BGN", "200 BGN", "300 BGN", "400 BGN", "500 BGN",
            "1,000 BGN", "1,500 BGN", "2,000 BGN", "3,000 BGN", "5,000 BGN",
            "10,000 BGN", "20,000 BGN", "30,000 BGN", "50,000 BGN", "100,000 BGN"
        ]
    },

    de: {
        // UI Elements
        startButton: "SPIEL STARTEN",
        tutorialButton: "WIE MAN SPIELT",
        spinningWheelButton: "GLÜCKSRAD",
        gameTitle: "🎮 WERDE REICH 🎮",
        levelIndicator: "Frage: {level}/15 | Preis: {prize}",
        moneyTreeToggle: "💰",
        gameBackButton: "← Zurück zum Startbildschirm",

        // Settings
        settingsTitle: "⚙️ Einstellungen",
        sfxVolume: "🔊 Soundeffekte",
        sfxVolumeLabel: "Lautstärke der Effekte:",
        musicVolume: "🎵 Musik",
        musicVolumeLabel: "Musiklautstärke:",
        toggleStartMusic: "🎵 Musik im Startbildschirm abspielen",
        toggleWheelMusic: "🎵 Musik im Rad abspielen",
        closeSettings: "Schließen",
        resetSettings: "Auf Standard zurücksetzen",
        languageSettings: "🌍 Sprache",

        // Tutorial
        tutorialTitle: "📚 Wie man Wer Wird Reich spielt",
        goalTitle: "🎯 Ziel des Spiels",
        goalText: "Beantworte 15 aufeinanderfolgende Fragen richtig und gewinne bis zu 100.000 BGN! Jede Frage ist schwerer als die vorherige, aber der Gewinn ist größer.",
        howToTitle: "❓ Wie man spielt",
        howTo1: "Lies die Frage sorgfältig",
        howTo2: "Wähle eine der 4 möglichen Antworten",
        howTo3: "Du hast 3 Joker (Hilfen), die du verwenden kannst",
        howTo4: "Wenn du richtig antwortest, gehst du zur nächsten Stufe",
        howTo5: "Wenn du falsch antwortest, endet das Spiel und du behältst den letzten garantierten Betrag",

        // Jokers
        joker5050: "50:50",
        jokerAudience: "👥 Publikum",
        jokerPhone: "📞 Telefon",
        audienceModalTitle: "Joker: Hilfe vom Publikum",
        audienceVoteText: "Jetzt abstimmen!",

        // Wheel
        wheelTitle: "🎡 Glücksrad",
        wheelText: "Dreh das Rad, um einen Teilnehmer auszuwählen!",
        spinButton: "DREHEN",
        spinAgainButton: "Erneut drehen",
        selectedParticipant: "🎉 Ausgewählter Teilnehmer:",

        // Questions
        questions: [
            {
                question: "Welches der folgenden Zahlensysteme ist nicht-positionell (nicht-stellig)?",
                answers: ["Binär", "Dezimal", "Römisch", "Oktal"],
                correct: 2
            },
            {
                question: "Welche Aussage trifft auf ein Positionszahlensystem zu?",
                answers: [
                    "Es wird zum Übersetzen von Sprachen verwendet",
                    "Es hängt von der Stellung der Symbole und Ziffern in der Zahl ab",
                    "Es kann nicht in andere Zahlensysteme konvertiert werden",
                    "Es spielt keine Rolle, wo sich die Stelle der Ziffer/des Symbols befindet"
                ],
                correct: 1
            },
            {
                question: "Welche Programmiersprache kann verwendet werden, um mit Zahlensystemen zu arbeiten?",
                answers: ["Python", "HTML", "CSS", "BOOTSTRAP"],
                correct: 0
            },
            {
                question: "Welche Aussage trifft auf bitweise Operationen zu?",
                answers: [
                    "Sie sind sehr komplex zu verstehen und nur Experten können sie beherrschen",
                    "Sie sind veraltet und heutzutage sinnlos",
                    "Sie sind Operationen, die auf den einzelnen Bits der Daten arbeiten",
                    "Sie sind Bezeichnungen für abstrakte Datentypen (ADT)"
                ],
                correct: 2
            },
            {
                question: "Wie viele Arten von positionalen Zahlensystemen gibt es?",
                answers: ["5", "4", "6", "7"],
                correct: 1
            },
            {
                question: "Welches Zahlensystem ist für Menschen am bequemsten zu verwenden?",
                answers: ["Binär", "Hexadezimal", "Menschlich", "Dezimal"],
                correct: 3
            },
            {
                question: "101101(2)+10001(2) ist gleich:",
                answers: ["111110(2)", "111102(2)", "1001101(2)", "10101(2)"],
                correct: 0
            },
            {
                question: "Wie würde die Zahl 1000011(2) im Hexadezimalsystem aussehen?",
                answers: ["A5", "43", "45", "67"],
                correct: 1
            },
            {
                question: "Welcher der folgenden Werte kann im hexadezimalen Zahlensystem NICHT existieren?",
                answers: ["55899330(16)", "DEF426788(16)", "BCDABDDFC(16)", "556GCEA8(16)"],
                correct: 3
            },
            {
                question: 'Claude Shannon "begründete" die Nutzung des Binärsystems in Computern. Wann geschah dieses Ereignis?',
                answers: [
                    "4. April 1936",
                    "10. August 1937",
                    "11. September 2001",
                    "12. Mai 1941"
                ],
                correct: 1
            },
            {
                question: "557622(8)-36625(8) ist gleich:",
                answers: ["520 997(8)", "519 767(8)", "520 775(8)", "2A1FF(16)"],
                correct: 2
            },
            {
                question: "Welche Aussage ist wahr?",
                answers: [
                    "Bitweise Operationen arbeiten mit dem oktalen Zahlensystem",
                    "Eine Stichprobe ist eine Teilmenge der Grundgesamtheit",
                    "Nicht-positionale Zahlensysteme sind leicht darstellbar für sehr große Zahlen",
                    "Das Hauptziel von Zahlensystemen ist es, die Berechnung von Zahlen zu verkomplizieren"
                ],
                correct: 1
            },
            {
                question: "Welche Zeichenfolge ist im hexadezimalen Zahlensystem möglich?",
                answers: ["55FFECAA355B", "311!BVV6-%45", "463DE3E2H9", "FGGE4V46N7I"],
                correct: 0
            },
            {
                question: "Welche Aussage trifft auf das oktale Zahlensystem zu?",
                answers: [
                    "Es wird für Maschinencode verwendet",
                    "Das einzige Zahlensystem, das in internationalen Standards verwendet wird",
                    "Es ist kompakter als das binäre System",
                    "Es ist am weitesten verbreitet zum Debuggen von Speicher"
                ],
                correct: 2
            },
            {
                question: "Der Quotient von AA7DDC89(16) : FC6FD5(16) ist:",
                answers: ["4BB(16)", "79(16)", "AC(16)", "3D0(16)"],
                correct: 2
            }
        ],

        // Prizes
        prizes: [
            "100 BGN", "200 BGN", "300 BGN", "400 BGN", "500 BGN",
            "1,000 BGN", "1,500 BGN", "2,000 BGN", "3,000 BGN", "5,000 BGN",
            "10,000 BGN", "20,000 BGN", "30,000 BGN", "50,000 BGN", "100,000 BGN"
        ]
    },

    zh: {
        // UI Elements (Simplified Chinese)
        startButton: "开始游戏",
        tutorialButton: "如何游玩",
        spinningWheelButton: "幸运转盘",
        gameTitle: "🎮 成为富翁 🎮",
        levelIndicator: "题目: {level}/15 | 奖金: {prize}",
        moneyTreeToggle: "💰",
        gameBackButton: "← 返回起始画面",

        // Settings
        settingsTitle: "⚙️ 设置",
        sfxVolume: "🔊 音效",
        sfxVolumeLabel: "音效音量：",
        musicVolume: "🎵 音乐",
        musicVolumeLabel: "音乐音量：",
        toggleStartMusic: "🎵 启动画面播放音乐",
        toggleWheelMusic: "🎵 转盘播放音乐",
        closeSettings: "关闭",
        resetSettings: "恢复默认设置",
        languageSettings: "🌍 语言",

        // Tutorial
        tutorialTitle: "📚 如何游玩 成为富翁",
        goalTitle: "🎯 游戏目标",
        goalText: "连续正确回答15道题，赢取高达100,000 BGN！每题比上一题更难，但奖金也更高。",
        howToTitle: "❓ 如何游玩",
        howTo1: "认真阅读题目",
        howTo2: "从4个选项中选择一个",
        howTo3: "你有3个帮助道具可供使用",
        howTo4: "回答正确则进入下一关",
        howTo5: "回答错误则游戏结束，保留最后的保证金额",

        // Jokers
        joker5050: "50:50",
        jokerAudience: "👥 观众",
        jokerPhone: "📞 电话",
        audienceModalTitle: "道具：观众帮助",
        audienceVoteText: "现在投票！",

        // Wheel
        wheelTitle: "🎡 幸运转盘",
        wheelText: "转动转盘以选择参与者！",
        spinButton: "转动",
        spinAgainButton: "再次转动",
        selectedParticipant: "🎉 选中参与者：",

        // Questions
        questions: [
            {
                question: "以下哪个计数系统是非位置制的？",
                answers: ["二进制", "十进制", "罗马数字", "八进制"],
                correct: 2
            },
            {
                question: "以下哪项关于位置制计数系统是正确的？",
                answers: [
                    "它用于翻译语言",
                    "它依赖数字中符号和数字的位置",
                    "它不能转换为其他计数系统",
                    "数字/符号在数字中所在位置无关紧要"
                ],
                correct: 1
            },
            {
                question: "哪个编程语言可用于处理计数系统？",
                answers: ["Python", "HTML", "CSS", "BOOTSTRAP"],
                correct: 0
            },
            {
                question: "关于按位（位运算）操作，哪个说法是正确的？",
                answers: [
                    "它们非常难以理解，只有专家能掌握",
                    "它们已经过时，现今毫无意义",
                    "它们是对数据的单个位进行操作的运算",
                    "它们是抽象数据类型（ADT）的名称"
                ],
                correct: 2
            },
            {
                question: "位置制计数系统有多少种？",
                answers: ["5", "4", "6", "7"],
                correct: 1
            },
            {
                question: "哪个计数系统对人类使用最方便？",
                answers: ["二进制", "十六进制", "人类(的)", "十进制"],
                correct: 3
            },
            {
                question: "101101(2)+10001(2) 等于：",
                answers: ["111110(2)", "111102(2)", "1001101(2)", "10101(2)"],
                correct: 0
            },
            {
                question: "二进制数 1000011(2) 转换为十六进制是什么？",
                answers: ["A5", "43", "45", "67"],
                correct: 1
            },
            {
                question: "以下哪个值不能出现在十六进制数系统中？",
                answers: ["55899330(16)", "DEF426788(16)", "BCDABDDFC(16)", "556GCEA8(16)"],
                correct: 3
            },
            {
                question: '克劳德·香农（Claude Shannon）将二进制引入到计算机中。该事件发生于何时？',
                answers: [
                    "1936年4月4日",
                    "1937年8月10日",
                    "2001年9月11日",
                    "1941年5月12日"
                ],
                correct: 1
            },
            {
                question: "557622(8)-36625(8) 等于：",
                answers: ["520 997(8)", "519 767(8)", "520 775(8)", "2A1FF(16)"],
                correct: 2
            },
            {
                question: "哪个说法是正确的？",
                answers: [
                    "按位操作适用于八进制",
                    "样本是总体的一个子集",
                    "非位置制易于表示大数",
                    "计数系统的主要目的是使数字运算复杂化"
                ],
                correct: 1
            },
            {
                question: "以下哪一行在十六进制中是可能的？",
                answers: ["55FFECAA355B", "311!BVV6-%45", "463DE3E2H9", "FGGE4V46N7I"],
                correct: 0
            },
            {
                question: "以下哪项适用于八进制？",
                answers: [
                    "用于机器码",
                    "国际标准中唯一使用的计数系统",
                    "比二进制更紧凑",
                    "是调试内存时最常用的"
                ],
                correct: 2
            },
            {
                question: "AA7DDC89(16) ÷ FC6FD5(16) 的商是：",
                answers: ["4BB(16)", "79(16)", "AC(16)", "3D0(16)"],
                correct: 2
            }
        ],

        // Prizes
        prizes: [
            "100 BGN", "200 BGN", "300 BGN", "400 BGN", "500 BGN",
            "1,000 BGN", "1,500 BGN", "2,000 BGN", "3,000 BGN", "5,000 BGN",
            "10,000 BGN", "20,000 BGN", "30,000 BGN", "50,000 BGN", "100,000 BGN"
        ]
    },

    ru: {
        // UI Elements
        startButton: "НАЧАТЬ ИГРУ",
        tutorialButton: "КАК ИГРАТЬ",
        spinningWheelButton: "КОЛЕСО УДАЧИ",
        gameTitle: "🎮 СТАНЬ БОГАТЫМ 🎮",
        levelIndicator: "Вопрос: {level}/15 | Выигрыш: {prize}",
        moneyTreeToggle: "💰",
        gameBackButton: "← Вернуться на начальный экран",

        // Settings
        settingsTitle: "⚙️ Настройки",
        sfxVolume: "🔊 Звуковые эффекты",
        sfxVolumeLabel: "Громкость эффектов:",
        musicVolume: "🎵 Музыка",
        musicVolumeLabel: "Громкость музыки:",
        toggleStartMusic: "🎵 Включать музыку на стартовом экране",
        toggleWheelMusic: "🎵 Включать музыку на колесе",
        closeSettings: "Закрыть",
        resetSettings: "Сбросить настройки",
        languageSettings: "🌍 Язык",

        // Tutorial
        tutorialTitle: "📚 Как играть в Стать богатым",
        goalTitle: "🎯 Цель игры",
        goalText: "Ответьте правильно на 15 вопросов подряд и выиграйте до 100,000 BGN! Каждый вопрос сложнее предыдущего, но и награда больше.",
        howToTitle: "❓ Как играть",
        howTo1: "Внимательно прочитайте вопрос",
        howTo2: "Выберите один из 4 вариантов ответа",
        howTo3: "У вас есть 3 подсказки (джокера), которые можно использовать",
        howTo4: "Если ответ верный, переходите на следующий уровень",
        howTo5: "Если ошибётесь, игра заканчивается и вы сохраняете последнюю гарантированную сумму",

        // Jokers
        joker5050: "50:50",
        jokerAudience: "👥 Публика",
        jokerPhone: "📞 Звонок",
        audienceModalTitle: "Джокер: Помощь публики",
        audienceVoteText: "Голосуйте СЕЙЧАС!",

        // Wheel
        wheelTitle: "🎡 Колесо удачи",
        wheelText: "Крутаните колесо, чтобы выбрать участника!",
        spinButton: "КРУТИТЬ",
        spinAgainButton: "Крутить снова",
        selectedParticipant: "🎉 Выбранный участник:",

        // Questions
        questions: [
            {
                question: "Какой из следующих систем счисления является непозиционной?",
                answers: ["Двоичная", "Десятичная", "Римская", "Восьмеричная"],
                correct: 2
            },
            {
                question: "Какое утверждение относится к позиционной системе счисления?",
                answers: [
                    "Она используется для перевода языков",
                    "Зависит от позиции символов и цифр в числе",
                    "Нельзя преобразовать в другие системы счисления",
                    "Не важно, где находится цифра/символ в числе"
                ],
                correct: 1
            },
            {
                question: "Какой язык программирования можно использовать для работы с системами счисления?",
                answers: ["Python", "HTML", "CSS", "BOOTSTRAP"],
                correct: 0
            },
            {
                question: "Какое утверждение верно для побитовых операций?",
                answers: [
                    "Они очень сложны для понимания и только эксперты ими пользуются",
                    "Они устарели и бессмысленны в наше время",
                    "Это операции, работающие с отдельными битами данных",
                    "Это обозначение абстрактных типов данных (АТД)"
                ],
                correct: 2
            },
            {
                question: "Сколько видов позиционных систем счисления существует?",
                answers: ["5", "4", "6", "7"],
                correct: 1
            },
            {
                question: "Какая система счисления наиболее удобна для человека?",
                answers: ["Двоичная", "Шестнадцатеричная", "Человеческая", "Десятичная"],
                correct: 3
            },
            {
                question: "101101(2)+10001(2) равно:",
                answers: ["111110(2)", "111102(2)", "1001101(2)", "10101(2)"],
                correct: 0
            },
            {
                question: "Число 1000011(2) в двоичной системе как будет выглядеть в шестнадцатеричной?",
                answers: ["A5", "43", "45", "67"],
                correct: 1
            },
            {
                question: "Какое из значений НЕ может существовать в шестнадцатеричной системе?",
                answers: ["55899330(16)", "DEF426788(16)", "BCDABDDFC(16)", "556GCEA8(16)"],
                correct: 3
            },
            {
                question: 'Клод Шеннон "внёс" двоичную систему в компьютеры. Когда это произошло?',
                answers: [
                    "4 апреля 1936 г.",
                    "10 августа 1937 г.",
                    "11 сентября 2001 г.",
                    "12 мая 1941 г."
                ],
                correct: 1
            },
            {
                question: "557622(8)-36625(8) равно:",
                answers: ["520 997(8)", "519 767(8)", "520 775(8)", "2A1FF(16)"],
                correct: 2
            },
            {
                question: "Какое утверждение верно?",
                answers: [
                    "Побитовые операции работают с восьмеричной системой",
                    "Выборка — это подмножество генеральной совокупности",
                    "Непозиционная система легко представляет большие числа",
                    "Основная цель систем счисления — усложнить вычисления"
                ],
                correct: 1
            },
            {
                question: "Какая строка возможна в шестнадцатеричной системе?",
                answers: ["55FFECAA355B", "311!BVV6-%45", "463DE3E2H9", "FGGE4V46N7I"],
                correct: 0
            },
            {
                question: "Какое утверждение относится к восьмеричной системе?",
                answers: [
                    "Используется для машинного кода",
                    "Единственная система, используемая в международных стандартах",
                    "Более компактна, чем двоичная система",
                    "Наиболее распространена для отладки памяти"
                ],
                correct: 2
            },
            {
                question: "Частное AA7DDC89(16) : FC6FD5(16) равно:",
                answers: ["4BB(16)", "79(16)", "AC(16)", "3D0(16)"],
                correct: 2
            }
        ],

        // Prizes
        prizes: [
            "100 BGN", "200 BGN", "300 BGN", "400 BGN", "500 BGN",
            "1,000 BGN", "1,500 BGN", "2,000 BGN", "3,000 BGN", "5,000 BGN",
            "10,000 BGN", "20,000 BGN", "30,000 BGN", "50,000 BGN", "100,000 BGN"
        ]
    },

    pt: {
        // UI Elements (Portuguese)
        startButton: "INICIAR JOGO",
        tutorialButton: "COMO JOGAR",
        spinningWheelButton: "RODA DA SORTE",
        gameTitle: "🎮 FIQUE RICO 🎮",
        levelIndicator: "Pergunta: {level}/15 | Prémio: {prize}",
        moneyTreeToggle: "💰",
        gameBackButton: "← Voltar ao ecrã inicial",

        // Settings
        settingsTitle: "⚙️ Definições",
        sfxVolume: "🔊 Efeitos sonoros",
        sfxVolumeLabel: "Volume dos efeitos:",
        musicVolume: "🎵 Música",
        musicVolumeLabel: "Volume da música:",
        toggleStartMusic: "🎵 Reproduzir música no ecrã inicial",
        toggleWheelMusic: "🎵 Reproduzir música na roda",
        closeSettings: "Fechar",
        resetSettings: "Repor por defeito",
        languageSettings: "🌍 Idioma",

        // Tutorial
        tutorialTitle: "📚 Como jogar Fique Rico",
        goalTitle: "🎯 Objetivo do jogo",
        goalText: "Responda corretamente a 15 perguntas consecutivas e ganhe até 100,000 BGN! Cada pergunta é mais difícil que a anterior, mas o prémio é maior.",
        howToTitle: "❓ Como jogar",
        howTo1: "Leia a pergunta com atenção",
        howTo2: "Escolha uma das 4 respostas possíveis",
        howTo3: "Tem 3 'jokers' que pode usar",
        howTo4: "Se responder corretamente, avança para o próximo nível",
        howTo5: "Se errar, o jogo termina e mantém a última quantia garantida",

        // Jokers
        joker5050: "50:50",
        jokerAudience: "👥 Público",
        jokerPhone: "📞 Telefone",
        audienceModalTitle: "Joker: Ajuda do Público",
        audienceVoteText: "Vote AGORA!",

        // Wheel
        wheelTitle: "🎡 Roda da Sorte",
        wheelText: "Gire a roda para escolher um participante!",
        spinButton: "GIRAR",
        spinAgainButton: "Girar novamente",
        selectedParticipant: "🎉 Participante selecionado:",

        // Questions
        questions: [
            {
                question: "Qual dos seguintes sistemas numéricos é não-posicional?",
                answers: ["Binário", "Decimal", "Romano", "Octal"],
                correct: 2
            },
            {
                question: "Qual afirmação se aplica a um sistema numérico posicional?",
                answers: [
                    "É usado para traduzir línguas",
                    "Depende da posição dos símbolos e dígitos no número",
                    "Não pode ser convertido para outros sistemas numéricos",
                    "Não importa onde o dígito/símbolo esteja localizado no número"
                ],
                correct: 1
            },
            {
                question: "Que linguagem de programação pode ser usada para trabalhar com sistemas numéricos?",
                answers: ["Python", "HTML", "CSS", "BOOTSTRAP"],
                correct: 0
            },
            {
                question: "Qual afirmação é verdadeira sobre operações bit a bit?",
                answers: [
                    "São muito complexas de entender e apenas especialistas as dominam",
                    "São obsoletas e sem sentido hoje em dia",
                    "São operações que atuam sobre os bits individuais dos dados",
                    "São uma designação para tipos abstratos de dados (TAD)"
                ],
                correct: 2
            },
            {
                question: "Quantos tipos de sistemas numéricos posicionais existem?",
                answers: ["5", "4", "6", "7"],
                correct: 1
            },
            {
                question: "Qual sistema numérico é mais conveniente para uso humano?",
                answers: ["Binário", "Hexadecimal", "Humano", "Decimal"],
                correct: 3
            },
            {
                question: "101101(2)+10001(2) é igual a:",
                answers: ["111110(2)", "111102(2)", "1001101(2)", "10101(2)"],
                correct: 0
            },
            {
                question: "Como ficaria o número 1000011(2) em hexadecimal?",
                answers: ["A5", "43", "45", "67"],
                correct: 1
            },
            {
                question: "Qual dos valores a seguir NÃO pode existir no sistema hexadecimal?",
                answers: ["55899330(16)", "DEF426788(16)", "BCDABDDFC(16)", "556GCEA8(16)"],
                correct: 3
            },
            {
                question: 'Claude Shannon "introduziu" o binário nos computadores. Quando ocorreu esse evento?',
                answers: [
                    "4 de abril de 1936",
                    "10 de agosto de 1937",
                    "11 de setembro de 2001",
                    "12 de maio de 1941"
                ],
                correct: 1
            },
            {
                question: "557622(8)-36625(8) é igual a:",
                answers: ["520 997(8)", "519 767(8)", "520 775(8)", "2A1FF(16)"],
                correct: 2
            },
            {
                question: "Qual afirmação é verdadeira?",
                answers: [
                    "Operações bit a bit funcionam com sistema octal",
                    "Uma amostra é um subconjunto da população geral",
                    "Sistemas não-posicionais são fáceis para representar números muito grandes",
                    "O principal objetivo dos sistemas numéricos é complicar o cálculo"
                ],
                correct: 1
            },
            {
                question: "Qual sequência é possível no sistema hexadecimal?",
                answers: ["55FFECAA355B", "311!BVV6-%45", "463DE3E2H9", "FGGE4V46N7I"],
                correct: 0
            },
            {
                question: "Qual afirmação se aplica ao sistema octal?",
                answers: [
                    "Usado para código de máquina",
                    "O único sistema usado em padrões internacionais",
                    "É mais compacto que o sistema binário",
                    "É o mais comum para depuração de memória"
                ],
                correct: 2
            },
            {
                question: "O quociente de AA7DDC89(16) : FC6FD5(16) é:",
                answers: ["4BB(16)", "79(16)", "AC(16)", "3D0(16)"],
                correct: 2
            }
        ],

        // Prizes
        prizes: [
            "100 BGN", "200 BGN", "300 BGN", "400 BGN", "500 BGN",
            "1,000 BGN", "1,500 BGN", "2,000 BGN", "3,000 BGN", "5,000 BGN",
            "10,000 BGN", "20,000 BGN", "30,000 BGN", "50,000 BGN", "100,000 BGN"
        ]
    }
};

// Language configuration
const LANGUAGE_CONFIG = {
    current: 'bg',
    available: ['bg', 'en', 'es', 'de', 'zh', 'ru', 'pt'],
    flags: {
        'bg': '🇧🇬',
        'en': '🇺🇸',
        'es': '🇪🇸',
        'de': '🇩🇪',
        'zh': '🇨🇳',
        'ru': '🇷🇺',
        'pt': '🇵🇹'
    },
    names: {
        'bg': 'Български',
        'en': 'English',
        'es': 'Español',
        'de': 'Deutsch',
        'zh': '中文',
        'ru': 'Русский',
        'pt': 'Português'
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.TRANSLATIONS = TRANSLATIONS;
    window.LANGUAGE_CONFIG = LANGUAGE_CONFIG;
}