// Force load indication
(function() {
    var banner = document.createElement('div');
    banner.style.cssText = 'background:lime; color:black; padding:5px; text-align:center; position:fixed; bottom:0; left:0; width:100%; z-index:9999; font-size:12px;';
    banner.innerText = '✓ questions-data.js loaded (10 themes)';
    document.body.appendChild(banner);
})();

const QUESTIONS_DATA = {
    "Стани Богат": {
        "bg": [
            { question: "Коя от следните бройни системи е непозиционна?", answers: ["Двоична", "Десетична", "Римска", "Осмична"], correct: 2 },
            { question: "Кое твърдение се отнася за позиционната бройна система?", answers: ["Тя се използва за превеждане на езици", "Зависи позицията на символите и цифрите в числото", "Не може да се преобразува в други бройни системи", "Няма значение къде се намира мястото на цифрата/символа в числото"], correct: 1 },
            { question: "Кой програмен език може да се използва за работа с бройни системи?", answers: ["Python", "HTML", "CSS", "BOOTSTRAP"], correct: 0 },
            { question: "Кое твърдение е вярно за побитовите операции?", answers: ["Те са много сложни за разбиране и само експертите могат да разполагат с тях", "Те са остарели и са безсмислени в днешно време", "Те са операции, които работят с отделните битове на данните", "Те са наименование за абстрактни типове данни(АТД)"], correct: 2 },
            { question: "Колко вида позиционни бройни системи има?", answers: ["5", "4", "6", "7"], correct: 1 },
            { question: "Коя бройна система е най-удобна за използване от хората?", answers: ["Двоичната", "Шестнадесетичната", "Човешката", "Десетичната"], correct: 3 },
            { question: "101101(2)+10001(2) е равно на:", answers: ["111110(2)", "111102(2)", "1001101(2)", "10101(2)"], correct: 0 },
            { question: "Числото 1000011(2) в двоична БС как би изглеждало в шестнадесетична?", answers: ["A5", "43", "45", "67"], correct: 1 },
            { question: "Коя от стойностите НЕ може да съществува в шестнадесетичната бройна система?", answers: ["55899330(16)", "DEF426788(16)", "BCDABDDFC(16)", "556GCEA8(16)"], correct: 3 },
            { question: 'Клод Шанън "ражда" двоичната система в компютрите. Кога се случва това събитие?', answers: ["На 4 Април 1936г.", "На 10 август 1937г.", "На септември 11 2001г.", "На 12 май 1941г."], correct: 1 },
            { question: "557622(8)-36625(8) e равно на:", answers: ["520 997(8)", "519 767(8)", "520 775(8)", "2A1FF(16)"], correct: 2 },
            { question: "Кое твърдение е вярно?", answers: ["Побитовите операции работят с осмична БС", "Извадка е подмножество от генералната съвкупност", "Непозиционната БС е лесна за представяне на големи числа", "Основната цел на БС е да усложнява пресмятането на числата"], correct: 1 },
            { question: "Кой ред е възможен при шестнадесетична БС?", answers: ["55FFECAA355B", "311!BVV6-%45", "463DE3E2H9", "FGGE4V46N7I"], correct: 0 },
            { question: "Кое твърдение се отнася за осмичната БС?", answers: ["Използва се за машинен код", "Единствената БС, използваща се в международни стандарти", "По-компактна е от двоичната БС", "Тя е най-разпространена за дебугване на паметта"], correct: 2 },
            { question: "Частното на AA7DDC89(16):FC6FD5(16) е:", answers: ["4BB(16)", "79(16)", "AC(16)", "3D0(16)"], correct: 2 }
        ]
    },
    "Руски език": {
        "bg": [
            { question: "Как се казва 'здравей' на руски?", answers: ["Привет", "Здравствуйте", "Добрый день", "Спасибо"], correct: 0 },
            { question: "Как се казва 'благодаря' на руски?", answers: ["Пожалуйста", "Спасибо", "Извините", "Здравствуйте"], correct: 1 },
            { question: "Как се превежда 'училище' на руски?", answers: ["Школа", "Университет", "Институт", "Колледж"], correct: 0 },
            { question: "Какво означава 'дружба'?", answers: ["Приятелство", "Вражда", "Любов", "Семейство"], correct: 0 },
            { question: "Как се казва 'книга' на руски?", answers: ["Тетрадь", "Книга", "Журнал", "Газета"], correct: 1 },
            { question: "Как се казва 'вода' на руски?", answers: ["Огонь", "Воздух", "Вода", "Земля"], correct: 2 },
            { question: "Коя е руската дума за 'добър ден'?", answers: ["Доброе утро", "Добрый день", "Добрый вечер", "Спокойной ночи"], correct: 1 },
            { question: "Как се казва 'момче' на руски?", answers: ["Девочка", "Мальчик", "Мужчина", "Парень"], correct: 1 },
            { question: "Как се казва 'момиче' на руски?", answers: ["Девочка", "Женщина", "Девушка", "Девочка"], correct: 0 },
            { question: "Коя е руската дума за 'учител'?", answers: ["Ученик", "Учитель", "Студент", "Преподаватель"], correct: 1 },
            { question: "Как се казва 'къща' на руски?", answers: ["Дом", "Квартира", "Здание", "Строение"], correct: 0 },
            { question: "Как се казва 'кола' на руски?", answers: ["Автобус", "Машина", "Поезд", "Самолёт"], correct: 1 },
            { question: "Коя е руската дума за 'храна'?", answers: ["Еда", "Пища", "Кушать", "Есть"], correct: 0 },
            { question: "Как се казва 'любов' на руски?", answers: ["Дружба", "Любовь", "Счастье", "Радость"], correct: 1 },
            { question: "Как се казва 'добро утро' на руски?", answers: ["Добрый день", "Доброе утро", "Добрый вечер", "Спокойной ночи"], correct: 1 }
        ]
    },
    "Математика": {
        "bg": [
            { question: "Колко е 15 × 4?", answers: ["45", "60", "75", "80"], correct: 1 },
            { question: "Колко е 144 ÷ 12?", answers: ["10", "11", "12", "13"], correct: 2 },
            { question: "Колко е 7² + 3²?", answers: ["49", "58", "63", "70"], correct: 1 },
            { question: "Какъв е корен квадратен от 169?", answers: ["11", "12", "13", "14"], correct: 2 },
            { question: "Колко процента е 25 от 200?", answers: ["10%", "12.5%", "15%", "20%"], correct: 1 },
            { question: "Решете уравнението: 3x + 5 = 20", answers: ["3", "5", "7", "10"], correct: 1 },
            { question: "Колко е обиколката на кръг с радиус 7 см? (π ≈ 3.14)", answers: ["21.98 см", "43.96 см", "49 см", "153.86 см"], correct: 1 },
            { question: "Колко е лицето на правоъгълник със страни 8 м и 5 м?", answers: ["13 м²", "26 м²", "40 м²", "80 м²"], correct: 2 },
            { question: "Коя дроб е равна на 0.75?", answers: ["1/4", "2/3", "3/4", "4/5"], correct: 2 },
            { question: "Колко е 5! (факториел)?", answers: ["60", "100", "120", "150"], correct: 2 },
            { question: "Сборът на ъглите в триъгълник е:", answers: ["90°", "180°", "270°", "360°"], correct: 1 },
            { question: "Колко е 2³ × 2⁴?", answers: ["2⁷", "2¹²", "4⁷", "8⁷"], correct: 0 },
            { question: "Колко е медианата на числата 5, 8, 12, 15, 20?", answers: ["8", "12", "15", "20"], correct: 1 },
            { question: "Колко е 0.2 × 0.3?", answers: ["0.06", "0.6", "0.006", "6"], correct: 0 },
            { question: "Ако a = 4 и b = 3, колко е a² + b²?", answers: ["7", "12", "25", "49"], correct: 2 }
        ]
    },
    "Общи знания": {
        "bg": [
            { question: "Коя е най-високата планина в света?", answers: ["Килиманджаро", "Еверест", "Монблан", "Елбрус"], correct: 1 },
            { question: "Кой е авторът на 'Война и мир'?", answers: ["Фьодор Достоевски", "Антон Чехов", "Лев Толстой", "Иван Тургенев"], correct: 2 },
            { question: "Коя е столицата на Япония?", answers: ["Пекин", "Сеул", "Токио", "Банкок"], correct: 2 },
            { question: "Колко континента има на Земята?", answers: ["5", "6", "7", "8"], correct: 2 },
            { question: "Кой е открил пеницилина?", answers: ["Луи Пастьор", "Александър Флеминг", "Грегор Мендел", "Мария Кюри"], correct: 1 },
            { question: "Коя е най-голямата пустиня в света?", answers: ["Гоби", "Сахара", "Атакама", "Антарктида"], correct: 1 },
            { question: "Кой е нарисувал 'Мона Лиза'?", answers: ["Винсент ван Гог", "Пабло Пикасо", "Леонардо да Винчи", "Микеланджело"], correct: 2 },
            { question: "Коя държава е известна с пирамидите?", answers: ["Мексико", "Египет", "Перу", "Индия"], correct: 1 },
            { question: "Колко секунди има в един час?", answers: ["3600", "360", "60", "6000"], correct: 0 },
            { question: "Кой е най-малкият океан?", answers: ["Индийски", "Атлантически", "Северен ледовит", "Тихи"], correct: 2 },
            { question: "Кой е измислил електрическата крушка?", answers: ["Никола Тесла", "Алберт Айнщайн", "Томас Едисон", "Джеймс Уат"], correct: 2 },
            { question: "Коя е националната валута на Великобритания?", answers: ["Евро", "Долар", "Лира", "Франк"], correct: 2 },
            { question: "Кой е най-бързият сухоземен животно?", answers: ["Лъв", "Гепард", "Леопард", "Кон"], correct: 1 },
            { question: "Коя е най-дългата река в света?", answers: ["Амазонка", "Нил", "Яндзъ", "Мисисипи"], correct: 1 },
            { question: "Кой е основателят на Facebook?", answers: ["Илон Мъск", "Бил Гейтс", "Марк Зукърбърг", "Джеф Безос"], correct: 2 }
        ]
    },
    "Minecraft": {
        "bg": [
            { question: "Какво е Minecraft?", answers: ["Ястие", "Игра с пистолети", "Игра с блокове", "Вид програма за дизайни"], correct: 2 },
            { question: "Какво е първото нещо, което играчът прави, след като направи нов свят за оцеляване?", answers: ["Убива дракона", "Прави портал за Nether-а", "Прави ритуали", "Чупи и събира дърво"], correct: 3 },
            { question: "Какво е нужно, за да направиш дървен меч в занаятийската маса (Crafting Table-а)?", answers: ["2 дървени дъски и 1 пръчка", "3 дървени дъски, 2 пръчки", "Ритуал за създаване на дървен меч", "64 диаманта"], correct: 0 },
            { question: "Кое от следните сгради не съществува в Minecraft?", answers: ["Храм в пустинята", "Болница", "Храм в джунглата", "Село"], correct: 1 },
            { question: "Какво пуска зомбито, когато го убиеш?", answers: ["Диаманти", "Кръв", "Гнила плът", "100 лева"], correct: 2 },
            { question: "Кога е създадена Minecraft?", answers: ["На 14 май 2008г.", "През Откриването на Америка", "На 17 май 2009г.", "На 1 януари 2007г."], correct: 2 },
            { question: "Във версията 1.14 са добавени нашественици и са подобрени селата. Кога е излязла версията?", answers: ["През Първата Световна Война", "На 1 април 2017г.", "На 10 декември 2019г.", "На 23 април 2019г."], correct: 3 },
            { question: "Как се постига постижението „Enchanter”?", answers: ["Като се направи маса за омагьосване", "Като се омагьса броня или предмет за първи път", "Като се орочасаш за първи път", "Когато се украси масата за омагьосване"], correct: 1 },
            { question: "Нощ е, не си спал от 3 дни, има фантоми, обаче не те нападат. Защо не те нападат?", answers: ["Защото вали", "Защото си брониран", "Защото имаш котки с теб", "Защото си съживил железен голем"], correct: 2 },
            { question: "Как се казва този моб на изображението", answers: ["Илюзионист", "Грабител", "Опустошител", "Бранител"], correct: 0 },
            { question: "Как се наричал селянинът във бета версията 1.9 (Minecraft Beta 1.9 Prerelease), преди официалната версия 1.0?", answers: ["PRE-VILLAGER", "TESTIFICATE", "HUMAN", "ENTITY_PERSON"], correct: 1 },
            { question: "Колко щети ще направите, ако скочите от 100 блока и използвате боздуган, за да ударите моб/играч?", answers: ["186 сърца", "46,5 сърца", "93 сърца", "60 сърца"], correct: 2 },
            { question: "В Minecraft съществуват отвари, които не дават никакви ефекти или бонуси. Колко най-много е имало по едно време?", answers: ["45", "30", "64", "32"], correct: 3 },
            { question: "Колко е максималното ниво на очарование (enchantment)?", answers: ["30", "40", "50", "60"], correct: 0 },
            { question: "Какво се случва, когато убиеш Ender Dragon?", answers: ["Спечеляваш играта", "Отваря се портал към End City", "Получаваш елитра", "Всичко изброено"], correct: 3 }
        ]
    },
    "Super Mario": {
        "bg": [
            { question: "Как се казва главният герой в Super Mario?", answers: ["Луиджи", "Марио", "Йоши", "Боузер"], correct: 1 },
            { question: "Как се казва братът на Марио?", answers: ["Варио", "Луиджи", "Валуиджи", "Туарио"], correct: 1 },
            { question: "Кой е основният враг на Марио?", answers: ["Купа Боузер", "Вълк", "Крал Бобомб", "Трубач"], correct: 0 },
            { question: "Какво дава на Марио способността да лети?", answers: ["Супер гъба", "Огнено цвете", "Звезда", "Перо"], correct: 3 },
            { question: "Как се казва принцесата, която Боузер често отвлича?", answers: ["Розалина", "Дейзи", "Пийч", "Полина"], correct: 2 },
            { question: "Какъв ефект има Super Star?", answers: ["Увеличава размера", "Дава неуязвимост", "Хвърля огнени топки", "Удължава времето"], correct: 1 },
            { question: "Кой е динозавърът, който помага на Марио?", answers: ["Спайк", "Йоши", "Купа", "Туарио"], correct: 1 },
            { question: "В коя игра за пръв път се появява Йоши?", answers: ["Super Mario World", "Super Mario 64", "Super Mario Bros", "Super Mario Sunshine"], correct: 0 },
            { question: "Как се казва зъл двойник на Марио?", answers: ["Варио", "Валуиджи", "Шадоу Марио", "Метал Марио"], correct: 0 },
            { question: "Какво се случва, когато Марио вземе Fire Flower?", answers: ["Лети", "Плува по-бързо", "Хвърля огнени топки", "Става неуязвим"], correct: 2 },
            { question: "Коя е най-известната песен от Super Mario Bros?", answers: ["Underground", "Underwater", "Overworld", "Castle"], correct: 2 },
            { question: "Какъв вид същество е Goomba?", answers: ["Гъба", "Костенурка", "Растение", "Призрак"], correct: 0 },
            { question: "Как се казва стадионът за бой с босове в Super Mario 64?", answers: ["Peach's Castle", "Bob-omb Battlefield", "Bowser's Castle", "Dark World"], correct: 0 },
            { question: "Каква е целта на Марио в повечето игри?", answers: ["Да събере монети", "Да спаси принцеса Пийч", "Да победи Боузер", "Да завърши нивата"], correct: 1 },
            { question: "Коя игра въвежда FLUDD (водно оръжие)?", answers: ["Super Mario Sunshine", "Super Mario Galaxy", "Super Mario Odyssey", "Super Mario 64"], correct: 0 }
        ]
    },
    "Movies": {
        "bg": [
            { question: "Кой режисира филма 'Inception'?", answers: ["James Cameron", "Christopher Nolan", "Steven Spielberg", "Quentin Tarantino"], correct: 1 },
            { question: "Кой актьор играе Железния човек?", answers: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Scarlett Johansson"], correct: 1 },
            { question: "Коя е най-печелившата филмова поредица?", answers: ["Star Wars", "Harry Potter", "Marvel Cinematic Universe", "James Bond"], correct: 2 },
            { question: "Кой филм печели Оскар за най-добър филм през 2020?", answers: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"], correct: 2 },
            { question: "Кой играе ролята на Джак Спароу?", answers: ["Johnny Depp", "Orlando Bloom", "Keira Knightley", "Geoffrey Rush"], correct: 0 },
            { question: "В кой филм се появява фразата 'You can't handle the truth!'?", answers: ["A Few Good Men", "The Shawshank Redemption", "Forrest Gump", "Good Will Hunting"], correct: 0 },
            { question: "Кой е режисьорът на 'Pulp Fiction'?", answers: ["Martin Scorsese", "Quentin Tarantino", "David Fincher", "Ridley Scott"], correct: 1 },
            { question: "Коя актриса печели Оскар за 'La La Land'?", answers: ["Emma Stone", "Natalie Portman", "Meryl Streep", "Jennifer Lawrence"], correct: 0 },
            { question: "Кой филм е базиран на романа на Стивън Кинг 'The Shining'?", answers: ["The Shining", "It", "Carrie", "Misery"], correct: 0 },
            { question: "Кой режисира 'Titanic'?", answers: ["James Cameron", "Peter Jackson", "Michael Bay", "Ridley Scott"], correct: 0 },
            { question: "Кой актьор играе Нео в 'The Matrix'?", answers: ["Keanu Reeves", "Laurence Fishburne", "Hugo Weaving", "Carrie-Anne Moss"], correct: 0 },
            { question: "Кой филм печели най-много Оскари?", answers: ["Ben-Hur", "Titanic", "The Lord of the Rings: The Return of the King", "All three"], correct: 3 },
            { question: "Кой е главният герой в 'Gladiator'?", answers: ["Maximus", "Commodus", "Marcus Aurelius", "Proximo"], correct: 0 },
            { question: "Кой режисира 'Schindler's List'?", answers: ["Steven Spielberg", "Martin Scorsese", "Roman Polanski", "Francis Ford Coppola"], correct: 0 },
            { question: "Кой филм съдържа песента 'My Heart Will Go On'?", answers: ["Titanic", "The Bodyguard", "Ghost", "Armageddon"], correct: 0 }
        ]
    },
    "Geometry Dash": {
        "bg": [
            { question: "Кой е създателят на Geometry Dash?", answers: ["RobTop Games", "Vexatious", "Riot Games", "Mojang"], correct: 0 },
            { question: "Коя е първата официална нива в Geometry Dash?", answers: ["Stereo Madness", "Back on Track", "Polargeist", "Dry Out"], correct: 0 },
            { question: "Какво се случва, когато събереш всички монети в ниво?", answers: ["Отключваш секретен спрайт", "Получаваш награда", "Отключваш демон ниво", "Нищо"], correct: 0 },
            { question: "Коя е най-трудната демон нива в Geometry Dash според сообществото?", answers: ["Bloodbath", "Sonic Wave", "Tartarus", "Slaughterhouse"], correct: 3 },
            { question: "Как се казва режимът, в който играеш нива, създадени от играчи?", answers: ["Online Levels", "Daily Levels", "Map Packs", "Gauntlets"], correct: 0 },
            { question: "Колко монети са необходими за отключване на Store?", answers: ["10", "20", "50", "100"], correct: 1 },
            { question: "Кой е най-бързият геймплей режим?", answers: ["Cube", "Ship", "Ball", "Wave"], correct: 3 },
            { question: "Коя е първата демон нива в Geometry Dash?", answers: ["Clubstep", "ToE 2", "Deadlocked", "Electrodynamix"], correct: 0 },
            { question: "Какво е името на втората нива в Geometry Dash?", answers: ["Back on Track", "Polargeist", "Dry Out", "Base After Base"], correct: 0 },
            { question: "Кой е най-дългият спрайт в играта?", answers: ["Cube", "Ship", "Robot", "Spider"], correct: 2 },
            { question: "Как се казва секретният спрайт, отключващ се с 5 монети?", answers: ["Shiny", "Dark", "Glow", "Meltdown"], correct: 3 },
            { question: "Коя е най-кратката демон нива?", answers: ["The Nightmare", "The Lightning Road", "Xstep v2", "Problematic"], correct: 1 },
            { question: "Какво прави collectible item 'User Coins'?", answers: ["Отключва спрайтове", "Увеличава рейтинг", "Дава достъп до секретни нива", "Само за показ"], correct: 0 },
            { question: "Кой е най-високият рейтинг на ниво?", answers: ["Hard", "Harder", "Insane", "Demon"], correct: 3 },
            { question: "Коя е най-популярната създадена нива от общността?", answers: ["Bloodbath", "Sonic Wave", "Cataclysm", "Nine Circles"], correct: 0 }
        ]
    },
    "Holidays": {
        "bg": [
            { question: "Кога се празнува Коледа?", answers: ["25 декември", "1 януари", "24 декември", "7 януари"], correct: 0 },
            { question: "Коя е традиционната украса за Хелоуин?", answers: ["Тиква", "Елха", "Великденски яйца", "Латински знамена"], correct: 0 },
            { question: "Коя е най-популярната традиция за Нова година?", answers: ["Фойерверки", "Даване на подаръци", "Коледуване", "Боядисване на яйца"], correct: 0 },
            { question: "Кога е Великден?", answers: ["Неделя след първото пролетно пълнолуние", "25 декември", "1 май", "14 февруари"], correct: 0 },
            { question: "Коя е традиционната храна за Деня на благодарността?", answers: ["Печена пуйка", "Пица", "Хамбургер", "Спагети"], correct: 0 },
            { question: "Кога е Свети Валентин?", answers: ["14 февруари", "1 април", "8 март", "25 декември"], correct: 0 },
            { question: "Коя е традиционната игра за Хелоуин?", answers: ["Trick-or-treat", "Egg hunting", "Caroling", "Fireworks"], correct: 0 },
            { question: "Кога се празнува Денят на независимостта на САЩ?", answers: ["4 юли", "1 юли", "14 юли", "2 юли"], correct: 0 },
            { question: "Коя е традиционната украса за Коледа?", answers: ["Елха", "Тиква", "Великденски яйца", "Цветя"], correct: 0 },
            { question: "Коя е традиционната напитка за Деня на Свети Патрик?", answers: ["Бира", "Уиски", "Вода", "Сок"], correct: 0 },
            { question: "Кога се празнува Международният ден на жената?", answers: ["8 март", "1 март", "8 април", "1 април"], correct: 0 },
            { question: "Коя е традицията за Деня на бащата?", answers: ["Подаряване на подаръци на бащата", "Печене на пуйка", "Търсене на яйца", "Пускане на фойерверки"], correct: 0 },
            { question: "Кога е Денят на Земята?", answers: ["22 април", "1 април", "22 март", "1 март"], correct: 0 },
            { question: "Коя е традиционната игра за Великден?", answers: ["Търсене на яйца", "Trick-or-treat", "Коледуване", "Пускане на хвърчила"], correct: 0 },
            { question: "Кога се празнува Денят на труда в САЩ?", answers: ["Първи понеделник на септември", "1 май", "4 юли", "2 септември"], correct: 0 }
        ]
    },
    "Databases": {
        "bg": [
            { question: "Какво означава SQL?", answers: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"], correct: 0 },
            { question: "Коя команда се използва за извличане на данни от база данни?", answers: ["SELECT", "INSERT", "UPDATE", "DELETE"], correct: 0 },
            { question: "Какво е първичен ключ?", answers: ["Уникален идентификатор на запис", "Ключ за сортиране", "Индекс", "Външен ключ"], correct: 0 },
            { question: "Коя команда се използва за добавяне на нов запис?", answers: ["INSERT INTO", "ADD", "CREATE", "UPDATE"], correct: 0 },
            { question: "Какво е външен ключ?", answers: ["Поле, което препраща към първичен ключ в друга таблица", "Уникален идентификатор", "Индекс", "Ключ за сортиране"], correct: 0 },
            { question: "Коя команда се използва за изтриване на таблица?", answers: ["DROP TABLE", "DELETE TABLE", "REMOVE TABLE", "TRUNCATE TABLE"], correct: 0 },
            { question: "Какво означава нормализация?", answers: ["Процес на организиране на данни за намаляване на излишъка", "Сортиране на данни", "Компресиране на данни", "Шифроване на данни"], correct: 0 },
            { question: "Коя функция се използва за преброяване на редове?", answers: ["COUNT()", "SUM()", "AVG()", "MAX()"], correct: 0 },
            { question: "Какво е индекс в база данни?", answers: ["Структура, която ускорява търсенето", "Вид ключ", "Тип данни", "Ограничение"], correct: 0 },
            { question: "Коя клауза се използва за филтриране на резултати?", answers: ["WHERE", "HAVING", "FILTER", "CONDITION"], correct: 0 },
            { question: "Какво означава ACID?", answers: ["Atomicity, Consistency, Isolation, Durability", "Atomic, Consistent, Isolated, Durable", "Access, Control, Integrity, Data", "Auto, Commit, Isolated, Data"], correct: 0 },
            { question: "Коя команда се използва за създаване на нова таблица?", answers: ["CREATE TABLE", "NEW TABLE", "MAKE TABLE", "DEFINE TABLE"], correct: 0 },
            { question: "Какво е транзакция?", answers: ["Поредица от операции, които се изпълняват като едно цяло", "Заявка", "Съхранение", "Индекс"], correct: 0 },
            { question: "Коя команда се използва за промяна на структура на таблица?", answers: ["ALTER TABLE", "MODIFY TABLE", "CHANGE TABLE", "UPDATE TABLE"], correct: 0 },
            { question: "Какво означава NoSQL?", answers: ["Non-relational database", "Not only SQL", "New SQL", "Non-Standard Query Language"], correct: 0 }
        ]
    }
};

const PRIZES = [
    "100 BGN", "200 BGN", "300 BGN", "400 BGN", "500 BGN",
    "1,000 BGN", "1,500 BGN", "2,000 BGN", "3,000 BGN", "5,000 BGN",
    "10,000 BGN", "20,000 BGN", "30,000 BGN", "50,000 BGN", "100,000 BGN"
];

function openQuestionEditor() {
    const editor = `
    <div class="question-editor">
        <h3>Добави въпрос</h3>
        <select id="themeSelect">
            <option value="Стани Богат">Стани Богат</option>
            <option value="Руски език">Руски език</option>
            <option value="Математика">Математика</option>
            <option value="Общи знания">Общи знания</option>
            <option value="Minecraft">Minecraft</option>
            <option value="Super Mario">Super Mario</option>
            <option value="Movies">Movies</option>
            <option value="Geometry Dash">Geometry Dash</option>
            <option value="Holidays">Holidays</option>
            <option value="Databases">Databases</option>
        </select>
        <textarea id="questionText" placeholder="Въпрос..."></textarea>
        <input type="text" id="answer1" placeholder="Отговор 1">
        <input type="text" id="answer2" placeholder="Отговор 2">
        <input type="text" id="answer3" placeholder="Отговор 3">
        <input type="text" id="answer4" placeholder="Отговор 4">
        <select id="correctAnswer">
            <option value="0">Отговор 1</option>
            <option value="1">Отговор 2</option>
            <option value="2">Отговор 3</option>
            <option value="3">Отговор 4</option>
        </select>
        <button onclick="saveQuestion()">Запази</button>
    </div>
    `;
    // You can implement saveQuestion() to store new questions
}
