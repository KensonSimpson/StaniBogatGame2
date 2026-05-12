// ============================================
// THEME CATEGORIES
// ============================================
const THEME_CATEGORIES = {
    "Minecraft": "games",
    "Super Mario": "games",
    "Geometry Dash": "games",
    "Baldi's Basics": "games",
    "Шах": "boardgames",
    "Математика": "education",
    "БЕЛ": "education",
    "Руски език": "education",
    "Databases": "it",
    "Стани Богат": "education",
    "Общи знания": "general",
    "Movies": "general",
    "Holidays": "holidays",
    "Спорт": "sports",
    "Листовки": "special"
};

const CATEGORY_NAMES = {
    "games": "Игри",
    "education": "Образование",
    "general": "Общи",
    "sports": "Спорт",
    "special": "Специални",
    "boardgames": "Настолни игри",
    "it": "ИТ",
    "holidays": "Празници"
};

// ============================================
// THEME CONFIG (overrides per theme)
// ============================================
const THEME_CONFIG = {
    "Листовки": {
        totalQuestions: 45,
        showPrizes: false,
        milestones: [9, 19, 29, 39],
        moneyTreeLabel: (index) => (index + 1) + "."
    }
};

// ============================================
// GAME CONFIGURATION (base)
// ============================================
const GAME_CONFIG = {
    totalQuestions: 15,
    answerRevealDelay: 3000,
    countdownDuration: 30,
    spinningWheel: {
        minRotations: 3,
        maxRotations: 7,
        segmentCount: 23
    }
};

const CLASSMATE_NAMES = [
    "1. Алекс", "2. Александър", "4. Божидар", "5. Валентин", "6. Валентина",
    "7. Валери", "8. Велизар", "9. Виктор", "10. Владимир", "11. Владислав",
    "12. Георги", "13. Георги", "14. Георги", "15. Даниел", "17. Димитър",
    "18. Калоян", "19. Константин", "20. Кристиан", "21. Мартин", "22. Микел",
    "23. Симеон", "24. Синан", "25. Теодор"
];

// ============================================
// GAME STATE
// ============================================
let gameState = {
    currentQuestion: 0,
    usedJokers: { fiftyFifty: false, audience: false, phone: false },
    isRevealingAnswers: false,
    isSpinning: false,
    isMoneyTreeVisible: false,
    answerRevealTimeout: null,
    wrongAnswerTimeout: null,          // NEW: track the wrong‑answer timer
    tickInterval: null,
    currentTickSound: 1
};

let settings = {
    sfxVolume: 1.0,
    musicVolume: 1.0,
    startMusicEnabled: false,
    wheelMusicEnabled: true
};

let currentLanguage = 'bg';
let currentTheme = null;
let currentThemeQuestions = null;
let currentTotalQuestions = 15;

// ============================================
// BACKGROUND WRAPPER
// ============================================
const bgWrapper = document.getElementById('backgroundWrapper');
const DEFAULT_BACKGROUND = '/images/StaniBogatBackground.jpg';
const THEME_BACKGROUNDS = {
    "Minecraft": '/images/StaniBogatMinecraftWallpaper1.jpg'
};

function setThemeBackground(themeKey) {
    if (!bgWrapper) return;
    bgWrapper.classList.remove('minecraft-bg');
    let bgImage = DEFAULT_BACKGROUND;
    if (themeKey && THEME_BACKGROUNDS[themeKey]) {
        bgImage = THEME_BACKGROUNDS[themeKey];
        if (themeKey === 'Minecraft') {
            bgWrapper.classList.add('minecraft-bg');
        }
    }
    bgWrapper.style.backgroundImage = `url('${bgImage}')`;
    document.body.style.backgroundImage = 'none';
}

function resetToDefaultBackground() {
    if (bgWrapper) {
        bgWrapper.classList.remove('minecraft-bg');
        bgWrapper.style.backgroundImage = `url('${DEFAULT_BACKGROUND}')`;
    }
    document.body.style.backgroundImage = 'none';
}

// ============================================
// THEME MUSIC
// ============================================
let currentThemeMusic = null;

function stopThemeMusic() {
    if (currentThemeMusic) {
        currentThemeMusic.pause();
        currentThemeMusic.currentTime = 0;
        currentThemeMusic = null;
    }
}

function playThemeMusic(themeKey) {
    stopThemeMusic();
    if (themeKey === 'Minecraft') {
        const music = document.getElementById('minecraftMusic');
        if (music) {
            music.volume = settings.musicVolume;
            music.loop = true;
            music.play().catch(e => console.log("Theme music play failed:", e));
            currentThemeMusic = music;
        }
    }
}

// ============================================
// MINECRAFT CLICK SOUND
// ============================================
function playMinecraftClick() {
    if (currentTheme !== 'Minecraft') return;
    const click = new Audio('/sounds/MinecraftClick.mp3');
    click.volume = Math.min(settings.sfxVolume * 1.8, 1.0);
    click.currentTime = 0.15;
    click.play().catch(e => console.log("Click sound failed:", e));
}

let globalClickHandler = null;

function attachMinecraftClickSound() {
    if (globalClickHandler) {
        document.removeEventListener('click', globalClickHandler);
    }
    globalClickHandler = function(e) {
        if (currentTheme === 'Minecraft') {
            const btn = e.target.closest('.answer-btn, .joker-btn, .money-tree-toggle, .settings-button, .game-back-button, #settingsButton, #moneyTreeToggle, #gameBackButton, .language-btn, .music-toggle-btn, .close-settings-btn, .reset-settings-btn, .volume-slider');
            if (btn) {
                playMinecraftClick();
            }
        }
    };
    document.addEventListener('click', globalClickHandler);
}

function removeMinecraftClickSound() {
    if (globalClickHandler) {
        document.removeEventListener('click', globalClickHandler);
        globalClickHandler = null;
    }
}

// ============================================
// MINECRAFT THEME
// ============================================
function applyMinecraftTheme() {
    const gameContainer = document.getElementById('gameContainer');
    const gameTitle = document.querySelector('#gameContainer h1');
    if (gameContainer) {
        gameContainer.classList.add('minecraft-theme');
        attachMinecraftClickSound();
    }
    if (gameTitle) {
        gameTitle.innerHTML = '';
        const img = document.createElement('img');
        img.src = '/images/MinecraftLogo.png';
        img.alt = 'Minecraft Logo';
        img.style.maxWidth = '600px';
        img.style.width = '90%';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.margin = '0 auto';
        img.onerror = function() {
            gameTitle.innerText = 'MINECRAFT';
            gameTitle.style.fontSize = '48px';
            gameTitle.style.lineHeight = 'normal';
            gameTitle.style.color = 'gold';
        };
        gameTitle.appendChild(img);
        gameTitle.style.fontSize = '';
        gameTitle.style.lineHeight = '';
        gameTitle.style.textAlign = 'center';
    }
}

function removeMinecraftTheme() {
    const gameContainer = document.getElementById('gameContainer');
    const gameTitle = document.querySelector('#gameContainer h1');
    if (gameContainer) {
        gameContainer.classList.remove('minecraft-theme');
        removeMinecraftClickSound();
    }
    if (gameTitle) {
        gameTitle.innerHTML = '🎮 СТАНИ БОГАТ 🎮';
        gameTitle.style.fontSize = '';
        gameTitle.style.lineHeight = '';
        gameTitle.style.textAlign = '';
    }
}

// ============================================
// MINECRAFT DEATH SCREEN
// ============================================
function applyDeathZoom() {
    const gameContainer = document.getElementById('gameContainer');
    const bgWrapper = document.getElementById('backgroundWrapper');
    if (gameContainer) gameContainer.classList.add('death-zoom');
    if (bgWrapper) {
        bgWrapper.classList.add('death-zoom');
        void bgWrapper.offsetWidth;
    }
}

function removeDeathZoom() {
    const gameContainer = document.getElementById('gameContainer');
    const bgWrapper = document.getElementById('backgroundWrapper');
    if (gameContainer) gameContainer.classList.remove('death-zoom');
    if (bgWrapper) bgWrapper.classList.remove('death-zoom');
}

function showMinecraftDeathScreen() {
    const deathScreen = document.getElementById('minecraftDeathScreen');
    if (!deathScreen) return;
    
    const damageSound = document.getElementById('minecraftDamageSound');
    if (damageSound) {
        damageSound.currentTime = 0;
        damageSound.volume = settings.sfxVolume;
        damageSound.play().catch(e => console.log("Damage sound failed:", e));
    }
    
    applyDeathZoom();
    deathScreen.style.display = 'flex';
    
    const respawnBtn = deathScreen.querySelector('.death-respawn');
    if (respawnBtn) {
        respawnBtn.onclick = () => {
            deathScreen.style.display = 'none';
            removeDeathZoom();
            gameState.currentQuestion = 0;
            gameState.usedJokers = { fiftyFifty: false, audience: false, phone: false };
            document.querySelectorAll('.joker-btn').forEach(b => { b.disabled = false; b.classList.remove('used'); });
            cancelAllTimers();   // NEW: clear all pending timers
            loadQuestion();
        };
    }
    
    const titleBtn = deathScreen.querySelector('.death-title-screen');
    if (titleBtn) {
        titleBtn.onclick = () => {
            deathScreen.style.display = 'none';
            removeDeathZoom();
            document.getElementById('gameBackButton').click();
        };
    }
}

// ============================================
// UTILITY: cancel all pending timers
// ============================================
function cancelAllTimers() {
    clearTimeout(gameState.answerRevealTimeout);
    clearTimeout(gameState.wrongAnswerTimeout);
    gameState.isRevealingAnswers = false;
    const skip = document.getElementById('skipHint');
    if (skip) skip.style.display = 'none';
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function performTransition(actionCallback, afterCallback) {
    const fadeOverlay = document.getElementById('fadeOverlay');
    fadeOverlay.classList.add('active');
    setTimeout(() => {
        if (actionCallback) actionCallback();
        setTimeout(() => {
            fadeOverlay.classList.remove('active');
            if (afterCallback) afterCallback();
        }, 500);
    }, 500);
}

function playSound(soundId) {
    try {
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.currentTime = 0;
            sound.volume = settings.sfxVolume;
            sound.play().catch(e => console.log("Audio play failed:", e));
        }
    } catch (error) {
        console.log("Sound error:", error);
    }
}

function updateMoneyTree() {
    const moneyItems = document.querySelectorAll('.money-item');
    const total = currentTotalQuestions;
    moneyItems.forEach((item, index) => {
        item.classList.remove('current', 'won');
        const questionNumber = total - index;
        if (questionNumber === gameState.currentQuestion + 1) {
            item.classList.add('current');
        } else if (questionNumber < gameState.currentQuestion + 1) {
            item.classList.add('won');
        }
    });
}

function updateGameContainerResponsiveness() {
    const gameContainer = document.getElementById('gameContainer');
    if (!gameContainer) return;
    if (gameState.isMoneyTreeVisible) {
        gameContainer.classList.add('narrow');
    } else {
        gameContainer.classList.remove('narrow');
    }
}

// ============================================
// DYNAMIC MONEY TREE GENERATION
// ============================================
function generateMoneyTree(themeKey) {
    const tree = document.getElementById('moneyTree');
    if (!tree) return;
    const config = THEME_CONFIG[themeKey] || {};
    const total = config.totalQuestions || GAME_CONFIG.totalQuestions;
    let html = '<div class="jokers">' +
        '<button class="joker-btn" id="joker5050" onclick="useFiftyFifty()"><span class="joker-text">50:50</span></button>' +
        '<button class="joker-btn" id="jokerAudience" onclick="useAudience()"><span class="joker-text">👥 Публика</span></button>' +
        '<button class="joker-btn" id="jokerPhone" onclick="usePhone()"><span class="joker-text">📞 Телефон</span></button>' +
        '</div>';
    for (let i = total; i >= 1; i--) {
        let text;
        if (config.showPrizes !== false) {
            const t = TRANSLATIONS[currentLanguage];
            const prize = t?.prizes?.[i-1] || `${i}00 BGN`;
            text = `${i}. ${prize}`;
        } else {
            text = config.moneyTreeLabel ? config.moneyTreeLabel(i-1) : `${i}.`;
        }
        html += `<div class="money-item">${text}</div>`;
    }
    tree.innerHTML = html;
}

// ============================================
// LANGUAGE SYSTEM
// ============================================
function initLanguageSystem() {
    const savedLang = localStorage.getItem('staniBogatLanguage');
    if (savedLang && LANGUAGE_CONFIG.available.includes(savedLang)) {
        currentLanguage = savedLang;
    }
    applyLanguage(currentLanguage);
    document.querySelectorAll('.language-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLanguage) {
            btn.classList.add('active');
        }
        btn.addEventListener('click', () => changeLanguage(btn.getAttribute('data-lang')));
    });
}

function changeLanguage(lang) {
    if (!LANGUAGE_CONFIG.available.includes(lang)) return;
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    currentLanguage = lang;
    localStorage.setItem('staniBogatLanguage', lang);
    applyLanguage(lang);
    if (currentTheme && document.getElementById('gameContainer').style.display === 'block') {
        loadThemeQuestions(currentTheme);
        reloadQuestionForLanguage();
    }
}

function applyLanguage(lang) {
    const t = TRANSLATIONS[lang];
    if (!t) return;
    updateElementText('startButton', t.startButton);
    updateElementText('tutorialButton', t.tutorialButton);
    updateElementText('spinningWheelButton', t.spinningWheelButton);
    updateElementText('settingsButton', '⚙️');
    updateElementText('settingsTitle', t.settingsTitle);
    updateElementText('sfxVolume', t.sfxVolume);
    updateElementText('sfxVolumeLabel', t.sfxVolumeLabel);
    updateElementText('musicVolume', t.musicVolume);
    updateElementText('musicVolumeLabel', t.musicVolumeLabel);
    updateElementText('toggleStartMusic', t.toggleStartMusic);
    updateElementText('toggleWheelMusic', t.toggleWheelMusic);
    updateElementText('closeSettings', t.closeSettings);
    updateElementText('resetSettings', t.resetSettings);
    updateElementText('languageSettings', t.languageSettings);
    const audienceTitle = document.querySelector('.audience-title');
    if (audienceTitle) audienceTitle.textContent = t.audienceModalTitle;
    const audienceVoteText = document.querySelector('.audience-vote-text');
    if (audienceVoteText) audienceVoteText.textContent = t.audienceVoteText;
    updateElementText('closePhoneModal', t.closeSettings || 'Close');
    const levelIndicator = document.querySelector('.level-indicator');
    if (levelIndicator && levelIndicator.style.display !== 'none') updateLevelIndicator();
}

function updateElementText(elementId, text) {
    const el = document.getElementById(elementId);
    if (el && text) el.textContent = text;
}

function loadThemeQuestions(themeKey) {
    if (!QUESTIONS_DATA || !QUESTIONS_DATA[themeKey]) {
        console.error("Theme not found:", themeKey);
        return false;
    }
    const theme = QUESTIONS_DATA[themeKey];
    let questions = theme[currentLanguage];
    if (!questions) questions = theme['bg'] || theme[Object.keys(theme)[0]];
    if (!questions) return false;
    currentThemeQuestions = questions;
    currentTheme = themeKey;
    return true;
}

// ============================================
// SETTINGS
// ============================================
function initializeSettings() {
    const settingsButton = document.getElementById('settingsButton');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettings = document.getElementById('closeSettings');
    const resetSettings = document.getElementById('resetSettings');
    const sfxVolumeSlider = document.getElementById('sfxVolume');
    const musicVolumeSlider = document.getElementById('musicVolume');
    const toggleStartMusic = document.getElementById('toggleStartMusic');
    const toggleWheelMusic = document.getElementById('toggleWheelMusic');
    loadSettings();

    settingsButton.addEventListener('click', () => { settingsModal.style.display = 'flex'; updateSettingsDisplay(); });
    closeSettings.addEventListener('click', () => {
        settingsModal.style.display = 'none';
        if (currentTheme === 'Minecraft') {
            attachMinecraftClickSound();
        }
    });
    settingsModal.addEventListener('click', (e) => { if (e.target === settingsModal) settingsModal.style.display = 'none'; });

    sfxVolumeSlider.addEventListener('input', function () {
        settings.sfxVolume = this.value / 100;
        document.getElementById('sfxVolumeValue').textContent = this.value + '%';
        updateAudioVolumes();
        saveSettings();
    });
    musicVolumeSlider.addEventListener('input', function () {
        settings.musicVolume = this.value / 100;
        document.getElementById('musicVolumeValue').textContent = this.value + '%';
        updateMusicVolume();
        saveSettings();
    });
    toggleStartMusic.addEventListener('click', function () {
        settings.startMusicEnabled = !settings.startMusicEnabled;
        updateMusicToggleButtons();
        settings.startMusicEnabled ? playStartMenuMusic() : stopStartMenuMusic();
        saveSettings();
    });
    toggleWheelMusic.addEventListener('click', function () {
        settings.wheelMusicEnabled = !settings.wheelMusicEnabled;
        updateMusicToggleButtons();
        saveSettings();
    });
    resetSettings.addEventListener('click', function () {
        if (confirm('Сигурни ли сте, че искате да възстановите настройките по подразбиране?')) {
            resetToDefaultSettings();
            updateSettingsDisplay();
            updateMusicToggleButtons();
            updateAudioVolumes();
            updateMusicVolume();
        }
    });
    updateSettingsDisplay();
    updateMusicToggleButtons();
}

function updateSettingsDisplay() {
    document.getElementById('sfxVolume').value = settings.sfxVolume * 100;
    document.getElementById('sfxVolumeValue').textContent = Math.round(settings.sfxVolume * 100) + '%';
    document.getElementById('musicVolume').value = settings.musicVolume * 100;
    document.getElementById('musicVolumeValue').textContent = Math.round(settings.musicVolume * 100) + '%';
}

function updateMusicToggleButtons() {
    const toggleStartMusic = document.getElementById('toggleStartMusic');
    const toggleWheelMusic = document.getElementById('toggleWheelMusic');
    if (toggleStartMusic) {
        if (settings.startMusicEnabled) toggleStartMusic.classList.add('active');
        else toggleStartMusic.classList.remove('active');
    }
    if (toggleWheelMusic) {
        if (settings.wheelMusicEnabled) toggleWheelMusic.classList.add('active');
        else toggleWheelMusic.classList.remove('active');
    }
}

function updateAudioVolumes() {
    const sounds = ['moveForwardSound', 'answerChosenSound', 'joker5050Sound', 'correctAnswerSound', 'correctAnswer2', 'correctAnswer3', 'wrongAnswerSound', 'friendJokerTimeTick1', 'friendJokerTimeTick2', 'minecraftDamageSound'];
    sounds.forEach(sid => { const s = document.getElementById(sid); if (s) s.volume = settings.sfxVolume; });
}

function updateMusicVolume() {
    const retro = document.getElementById('retroMusic');
    const start = document.getElementById('startMenuMusic');
    if (retro) retro.volume = settings.musicVolume;
    if (start) start.volume = settings.musicVolume;
    if (currentThemeMusic) currentThemeMusic.volume = settings.musicVolume;
}

function playStartMenuMusic() {
    if (!settings.startMusicEnabled) return;
    try {
        const startMusic = document.getElementById('startMenuMusic');
        if (startMusic) {
            startMusic.currentTime = 0;
            startMusic.loop = true;
            startMusic.volume = settings.musicVolume;
            startMusic.play().catch(e => console.log("Start menu music play failed:", e));
        }
    } catch (e) { console.log("Start menu music error:", e); }
}
function stopStartMenuMusic() {
    try { const startMusic = document.getElementById('startMenuMusic'); if (startMusic) { startMusic.pause(); startMusic.currentTime = 0; } } catch (e) { }
}
function playRetroMusic() {
    if (!settings.wheelMusicEnabled) return;
    try {
        const retro = document.getElementById('retroMusic');
        if (retro) { retro.currentTime = 0; retro.loop = true; retro.volume = settings.musicVolume; retro.play().catch(e => console.log("Retro music play failed:", e)); }
    } catch (e) { }
}
function stopRetroMusic() {
    try { const retro = document.getElementById('retroMusic'); if (retro) { retro.pause(); retro.currentTime = 0; } } catch (e) { }
}
function saveSettings() { try { localStorage.setItem('staniBogatSettings', JSON.stringify(settings)); } catch (e) { } }
function loadSettings() {
    try {
        const saved = localStorage.getItem('staniBogatSettings');
        if (saved) { const parsed = JSON.parse(saved); settings = { ...settings, ...parsed }; }
    } catch (e) { }
}
function resetToDefaultSettings() {
    settings = { sfxVolume: 1.0, musicVolume: 1.0, startMusicEnabled: false, wheelMusicEnabled: true };
    if (currentThemeMusic) currentThemeMusic.volume = settings.musicVolume;
}

// ============================================
// MONEY TREE TOGGLE
// ============================================
function initializeMoneyTreeToggle() {
    const toggle = document.getElementById('moneyTreeToggle');
    const moneyTree = document.getElementById('moneyTree');
    const gameContainer = document.getElementById('gameContainer');
    const gameBack = document.getElementById('gameBackButton');
    if (!toggle || !moneyTree || !gameContainer) return;
    moneyTree.classList.remove('visible');
    gameContainer.classList.remove('narrow');
    gameState.isMoneyTreeVisible = false;
    toggle.addEventListener('click', () => {
        gameState.isMoneyTreeVisible = !gameState.isMoneyTreeVisible;
        if (gameState.isMoneyTreeVisible) {
            moneyTree.classList.add('visible');
            gameContainer.classList.add('narrow');
            toggle.innerHTML = '❌';
        } else {
            moneyTree.classList.remove('visible');
            gameContainer.classList.remove('narrow');
            toggle.innerHTML = '💰';
        }
        void gameContainer.offsetWidth;
        void moneyTree.offsetWidth;
    });
    if (gameBack) {
        gameBack.addEventListener('click', () => {
            moneyTree.classList.remove('visible');
            gameContainer.classList.remove('narrow');
            toggle.innerHTML = '💰';
            gameState.isMoneyTreeVisible = false;
            updateGameContainerResponsiveness();
        });
    }
}

// ============================================
// START MENU & CATEGORY / THEME SELECTION
// ============================================
function initializeStartMenu() {
    const startButton = document.getElementById('startButton');
    const tutorialButton = document.getElementById('tutorialButton');
    const spinningWheelButton = document.getElementById('spinningWheelButton');
    const backButton = document.getElementById('backButton');
    const backFromWheel = document.getElementById('backFromWheelButton');
    const gameBack = document.getElementById('gameBackButton');
    const moneyTreeToggle = document.getElementById('moneyTreeToggle');
    const startMenu = document.getElementById('startMenu');
    const tutorialScreen = document.getElementById('tutorialScreen');
    const wheelScreen = document.getElementById('spinningWheelScreen');
    const gameContainer = document.getElementById('gameContainer');
    const moneyTree = document.getElementById('moneyTree');
    const levelIndicator = document.querySelector('.level-indicator');
    const backButtonContainer = document.querySelector('.game-back-button-container');
    const categoryScreen = document.getElementById('categorySelectionScreen');
    const backFromCategory = document.getElementById('backFromCategoryButton');
    const categoryButtonsContainer = document.querySelector('.category-buttons-container');
    const themeScreen = document.getElementById('themeSelectionScreen');
    const backFromTheme = document.getElementById('backFromThemeButton');
    const themeButtonsContainer = document.querySelector('.theme-buttons-container');
    const saveCloudBtn = document.getElementById('saveCloudBtn');

    if (categoryButtonsContainer && Object.keys(CATEGORY_NAMES).length > 0) {
        categoryButtonsContainer.innerHTML = '';
        for (const [catKey, catName] of Object.entries(CATEGORY_NAMES)) {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.setAttribute('data-category', catKey);
            btn.textContent = catName;
            categoryButtonsContainer.appendChild(btn);
        }
    }

    if (startButton) {
        startButton.addEventListener('click', () => {
            performTransition(() => {
                startMenu.style.display = 'none';
                categoryScreen.style.display = 'flex';
            });
        });
    } else {
        console.error("CRITICAL: Start button not found!");
    }

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const catKey = btn.getAttribute('data-category');
            performTransition(() => {
                categoryScreen.style.display = 'none';
                themeScreen.style.display = 'flex';
                if (themeButtonsContainer) {
                    themeButtonsContainer.innerHTML = '';
                    for (const themeKey in QUESTIONS_DATA) {
                        if (THEME_CATEGORIES[themeKey] === catKey) {
                            const tBtn = document.createElement('button');
                            tBtn.className = 'theme-btn';
                            tBtn.setAttribute('data-theme', themeKey);
                            tBtn.textContent = themeKey;
                            themeButtonsContainer.appendChild(tBtn);
                            tBtn.addEventListener('click', () => {
                                startGameWithTheme(themeKey);
                            });
                        }
                    }
                }
            });
        });
    });

    if (backFromCategory) {
        backFromCategory.addEventListener('click', () => {
            performTransition(() => {
                categoryScreen.style.display = 'none';
                startMenu.style.display = 'flex';
            });
        });
    }

    if (backFromTheme) {
        backFromTheme.addEventListener('click', () => {
            performTransition(() => {
                themeScreen.style.display = 'none';
                categoryScreen.style.display = 'flex';
            });
        });
    }

    function startGameWithTheme(themeKey) {
        if (!loadThemeQuestions(themeKey)) {
            alert("Темата няма въпроси. Опитайте друга.");
            return;
        }
        const config = THEME_CONFIG[themeKey] || {};
        currentTotalQuestions = config.totalQuestions || GAME_CONFIG.totalQuestions;
        gameState.currentQuestion = 0;
        gameState.usedJokers = { fiftyFifty: false, audience: false, phone: false };
        document.querySelectorAll('.joker-btn').forEach(b => { b.disabled = false; b.classList.remove('used'); });
        cancelAllTimers();   // cancel any leftover timers from previous game

        performTransition(() => {
            themeScreen.style.display = 'none';
            gameContainer.style.display = 'block';
            gameContainer.style.opacity = '1';
            if (moneyTree) { moneyTree.style.display = 'block'; generateMoneyTree(themeKey); }
            if (levelIndicator) levelIndicator.style.display = 'block';
            if (backButtonContainer) backButtonContainer.style.display = 'block';
            if (gameBack) gameBack.style.display = 'block';
            if (moneyTreeToggle) { moneyTreeToggle.style.display = 'block'; moneyTreeToggle.style.opacity = '1'; }
            if (moneyTree) { moneyTree.classList.remove('visible'); moneyTree.style.opacity = '1'; }
            gameContainer.classList.remove('narrow');
            moneyTreeToggle.innerHTML = '💰';
            gameState.isMoneyTreeVisible = false;
            if (saveCloudBtn) saveCloudBtn.style.display = 'inline-block';
            setTimeout(() => updateGameContainerResponsiveness(), 100);
            stopRetroMusic();
            setThemeBackground(themeKey);
            playThemeMusic(themeKey);
            if (themeKey === 'Minecraft') {
                applyMinecraftTheme();
            } else {
                removeMinecraftTheme();
            }
            // Explicitly clear answer container before loading new question
            const answersContainer = document.getElementById('answersContainer');
            if (answersContainer) answersContainer.innerHTML = '';
        }, () => {
            loadQuestion();
        });
    }

    if (gameBack) {
        gameBack.addEventListener('click', () => {
            console.log("Game back button clicked");
            cancelAllTimers();
            performTransition(() => {
                gameContainer.style.display = 'none';
                if (moneyTree) moneyTree.style.display = 'none';
                if (levelIndicator) levelIndicator.style.display = 'none';
                if (backButtonContainer) backButtonContainer.style.display = 'none';
                gameBack.style.display = 'none';
                if (moneyTreeToggle) moneyTreeToggle.style.display = 'none';
                if (saveCloudBtn) saveCloudBtn.style.display = 'none';
                categoryScreen.style.display = 'flex';
                gameState.currentQuestion = 0;
                gameState.usedJokers = { fiftyFifty: false, audience: false, phone: false };
                document.querySelectorAll('.joker-btn').forEach(b => { b.disabled = false; b.classList.remove('used'); });
                currentTheme = null;
                currentThemeQuestions = null;
                resetToDefaultBackground();
                stopThemeMusic();
                removeMinecraftTheme();
                removeDeathZoom();
                // Clear answers container
                const answersContainer = document.getElementById('answersContainer');
                if (answersContainer) answersContainer.innerHTML = '';
            });
        });
    }

    // ... (tutorial/wheel event handlers unchanged)
    if (tutorialButton) {
        tutorialButton.addEventListener('click', () => {
            performTransition(() => { startMenu.style.display = 'none'; if (tutorialScreen) tutorialScreen.style.display = 'flex'; stopRetroMusic(); });
        });
    }
    if (spinningWheelButton) {
        spinningWheelButton.addEventListener('click', () => {
            performTransition(() => { startMenu.style.display = 'none'; if (wheelScreen) wheelScreen.style.display = 'flex'; playRetroMusic(); });
        });
    }
    if (backButton) {
        backButton.addEventListener('click', () => {
            performTransition(() => { if (tutorialScreen) tutorialScreen.style.display = 'none'; startMenu.style.display = 'flex'; });
        });
    }
    if (backFromWheel) {
        backFromWheel.addEventListener('click', () => {
            performTransition(() => { if (wheelScreen) wheelScreen.style.display = 'none'; startMenu.style.display = 'flex'; resetSpinningWheel(); stopRetroMusic(); });
        });
    }
}

// ============================================
// SPINNING WHEEL (unchanged)
// ============================================
let customWheelConfig = null;

function loadCustomWheelConfig() { try { const saved = localStorage.getItem('staniBogatCustomWheel'); if (saved) customWheelConfig = JSON.parse(saved); } catch(e) { console.error("Failed to load custom wheel config", e); } }
function saveCustomWheelConfig(config) { try { localStorage.setItem('staniBogatCustomWheel', JSON.stringify(config)); customWheelConfig = config; } catch(e) { console.error("Failed to save custom wheel config", e); } }
function resetToOriginalWheel() { localStorage.removeItem('staniBogatCustomWheel'); customWheelConfig = null; createWheelNumbers(); const resetBtn = document.getElementById('resetWheelButton'); if (resetBtn) resetBtn.style.display = 'none'; }

function initializeSpinningWheel() {
    // ... (keep existing code)
}

function createWheelNumbers() {
    // ... (keep existing code)
}

function spinWheel() {
    // ... (keep existing code)
}

function resetSpinningWheel() {
    // ... (keep existing code)
}

// ============================================
// GAME QUESTIONS
// ============================================
function loadQuestion() {
    let qArray = currentThemeQuestions;
    if (!qArray) { console.error("No questions available"); return; }
    if (gameState.currentQuestion >= currentTotalQuestions) {
        alert('Честито, завършихте всички въпроси!');
        gameState.currentQuestion = 0;
        resetGame();
        return;
    }
    const q = qArray[gameState.currentQuestion];
    if (!q) { console.error("No question at index", gameState.currentQuestion); return; }
    document.getElementById('questionText').textContent = q.question;
    updateLevelIndicator();
    updateMoneyTree();
    const answersContainer = document.getElementById('answersContainer');
    if (!answersContainer) return;
    answersContainer.innerHTML = '';
    q.answers.forEach((ans, idx) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = `${String.fromCharCode(65 + idx)}) ${ans}`;
        btn.onclick = () => checkAnswer(idx, q.correct);
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        btn.style.transition = 'all 0.5s ease';
        btn.disabled = true;
        answersContainer.appendChild(btn);
    });
    gameState.isRevealingAnswers = false;
    cancelAllTimers();
    startAnswerReveal();
}

function startAnswerReveal() {
    gameState.isRevealingAnswers = true;
    const btns = document.querySelectorAll('.answer-btn');
    let idx = 0;
    if (gameState.answerRevealTimeout) clearTimeout(gameState.answerRevealTimeout);
    const skip = document.getElementById('skipHint'); if (skip) skip.style.display = 'block';
    function reveal() {
        if (idx < btns.length) {
            btns[idx].style.opacity = '1'; btns[idx].style.transform = 'translateY(0)'; btns[idx].disabled = false; idx++;
            gameState.answerRevealTimeout = setTimeout(reveal, GAME_CONFIG.answerRevealDelay);
        } else {
            gameState.isRevealingAnswers = false; if (skip) skip.style.display = 'none';
        }
    }
    gameState.answerRevealTimeout = setTimeout(reveal, GAME_CONFIG.answerRevealDelay);
}

function skipAnswerReveal() {
    if (!gameState.isRevealingAnswers) return;
    if (gameState.answerRevealTimeout) clearTimeout(gameState.answerRevealTimeout);
    const btns = document.querySelectorAll('.answer-btn'); const skip = document.getElementById('skipHint');
    btns.forEach(btn => { if (btn.style.opacity === '0' || btn.disabled) { btn.style.transition = 'all 0.3s ease'; btn.style.opacity = '1'; btn.style.transform = 'translateY(0)'; btn.disabled = false; } });
    gameState.isRevealingAnswers = false; if (skip) skip.style.display = 'none';
}

function reloadQuestionForLanguage() {
    if (currentThemeQuestions) loadThemeQuestions(currentTheme);
    const qArray = currentThemeQuestions || TRANSLATIONS[currentLanguage].questions;
    const q = qArray[gameState.currentQuestion];
    if (q) {
        document.getElementById('questionText').textContent = q.question;
        const answersContainer = document.getElementById('answersContainer'); const answerBtns = answersContainer.querySelectorAll('.answer-btn');
        q.answers.forEach((ans, idx) => { if (answerBtns[idx]) answerBtns[idx].textContent = `${String.fromCharCode(65 + idx)}) ${ans}`; });
        updateLevelIndicator();
    }
}

function updateLevelIndicator() {
    const levelEl = document.getElementById('currentLevel'); const prizeEl = document.getElementById('currentPrize');
    const t = TRANSLATIONS[currentLanguage]; const config = THEME_CONFIG[currentTheme] || {};
    if (levelEl) levelEl.textContent = gameState.currentQuestion + 1;
    if (prizeEl) {
        if (config.showPrizes !== false && t?.prizes) {
            const prize = t.prizes[gameState.currentQuestion] || TRANSLATIONS.bg.prizes[gameState.currentQuestion] || `${(gameState.currentQuestion + 1) * 100} BGN`;
            prizeEl.textContent = prize;
        } else { prizeEl.textContent = ''; }
    }
    const indicator = document.querySelector('.level-indicator');
    if (indicator && t.levelIndicator) {
        const total = currentTotalQuestions;
        const prizeText = config.showPrizes !== false ? t.levelIndicator.replace('{level}', gameState.currentQuestion + 1).replace('{prize}', prizeEl.textContent) : `Въпрос: ${gameState.currentQuestion + 1}/${total}`;
        indicator.innerHTML = prizeText;
    }
}

// ============================================
// JOKERS (unchanged)
// ============================================
function useFiftyFifty() { /* ... keep existing */ }
function useAudience() { /* ... */ }
function showAudienceJokerModal() { /* ... */ }
function closeAudienceModal() { /* ... */ }
function usePhone() { /* ... */ }
function showPhoneJokerModal() { /* ... */ }
function startSeamlessTickSound() { /* ... */ }
function stopSeamlessTickSound() { /* ... */ }
function startPhoneCountdown() { /* ... */ }
function closePhoneModal() { /* ... */ }

// ============================================
// ANSWER CHECKING (with milestone sounds, timer tracking)
// ============================================
function checkAnswer(selected, correct) {
    console.log("Answer clicked - selected:", selected, "correct:", correct);
    playSound('answerChosenSound');
    const btns = document.querySelectorAll('.answer-btn');
    btns.forEach(b => { b.disabled = true; b.style.cursor = 'not-allowed'; });
    const selectedBtn = btns[selected]; const correctBtn = btns[correct];
    selectedBtn.style.background = 'linear-gradient(135deg, #ffed4e, #ffd700)'; selectedBtn.style.color = '#000066'; selectedBtn.style.border = '3px solid #cc9900';

    // Cancel any previous wrong‑answer timer
    clearTimeout(gameState.wrongAnswerTimeout);

    setTimeout(() => {
        if (selected === correct) {
            let sound; const config = THEME_CONFIG[currentTheme] || {};
            if (config.milestones && config.milestones.includes(gameState.currentQuestion)) { sound = 'correctAnswer3'; }
            else if (gameState.currentQuestion === 4 || gameState.currentQuestion === 9) { sound = 'correctAnswer3'; }
            else if (gameState.currentQuestion < 5) { sound = 'correctAnswerSound'; }
            else { sound = 'correctAnswer2'; }

            if (currentTheme === 'Minecraft') {
                setTimeout(() => {
                    selectedBtn.style.background = 'linear-gradient(135deg, #00ff30, #00cc00)'; selectedBtn.style.color = '#000066'; selectedBtn.style.border = '3px solid #00aa00';
                    playSound(sound);
                    setTimeout(() => {
                        const t = TRANSLATIONS[currentLanguage]; const prize = (config.showPrizes !== false) ? (t?.prizes?.[gameState.currentQuestion] || `${(gameState.currentQuestion + 1) * 100} BGN`) : '';
                        alert(`✅ Правилен отговор!${prize ? ' Спечелихте ' + prize + '!' : ''}`);
                        gameState.currentQuestion++;
                        if (gameState.currentQuestion < currentTotalQuestions) { playSound('moveForwardSound'); setTimeout(() => loadQuestion(), 1000); }
                        else { alert('🎉 ЧЕСТИТО! Спечелихте!'); gameState.currentQuestion = 0; resetGame(); }
                    }, 3000);
                }, 750);
            } else {
                selectedBtn.style.background = 'linear-gradient(135deg, #00ff30, #00cc00)'; selectedBtn.style.color = '#000066'; selectedBtn.style.border = '3px solid #00aa00';
                playSound(sound);
                setTimeout(() => {
                    const t = TRANSLATIONS[currentLanguage]; const prize = (config.showPrizes !== false) ? (t?.prizes?.[gameState.currentQuestion] || `${(gameState.currentQuestion + 1) * 100} BGN`) : '';
                    alert(`✅ Правилен отговор!${prize ? ' Спечелихте ' + prize + '!' : ''}`);
                    gameState.currentQuestion++;
                    if (gameState.currentQuestion < currentTotalQuestions) { playSound('moveForwardSound'); setTimeout(() => loadQuestion(), 1000); }
                    else { alert('🎉 ЧЕСТИТО! Спечелихте!'); gameState.currentQuestion = 0; resetGame(); }
                }, 3000);
            }
        } else {
            if (correctBtn) { correctBtn.style.background = 'linear-gradient(135deg, #00ff30, #00cc00)'; correctBtn.style.color = '#000066'; correctBtn.style.border = '3px solid #00aa00'; }
            playSound('wrongAnswerSound');
            if (currentTheme === 'Minecraft') {
                gameState.wrongAnswerTimeout = setTimeout(() => { showMinecraftDeathScreen(); }, 500);
            } else {
                gameState.wrongAnswerTimeout = setTimeout(() => {
                    const config = THEME_CONFIG[currentTheme] || {}; const t = TRANSLATIONS[currentLanguage]; let prize = 'нищо';
                    if (config.showPrizes !== false && gameState.currentQuestion > 0) { prize = t?.prizes?.[gameState.currentQuestion - 1] || `${gameState.currentQuestion * 100} BGN`; }
                    else if (gameState.currentQuestion > 0) { prize = 'нищо (няма парична награда)'; }
                    alert(`❌ Грешен отговор! Играта свърши. Спечелихте: ${prize}`);
                    gameState.currentQuestion = 0; resetGame();
                }, 3000);
            }
        }
    }, 2500);
}

function resetGame() {
    gameState.usedJokers = { fiftyFifty: false, audience: false, phone: false };
    document.querySelectorAll('.joker-btn').forEach(btn => { btn.disabled = false; btn.classList.remove('used'); });
    cancelAllTimers();
    removeDeathZoom();
    setTimeout(loadQuestion, 1000);
}

// ============================================
// SAVE THEME TO CLOUD
// ============================================
async function saveCurrentThemeToCloud() {
    if (!currentThemeQuestions || !currentTheme) {
        alert('Няма заредена тема.');
        return;
    }
    const themeName = prompt('Въведете име на темата:', currentTheme + ' (потребителски)');
    if (!themeName) return;

    const payload = {
        name: themeName,
        questionsData: currentThemeQuestions,
        category: THEME_CATEGORIES[currentTheme] || 'user'
    };

    try {
        const response = await fetch('https://stanibogat-api.nataliya-atanasova.workers.dev/themes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (result.success) {
            alert(`✅ Темата е запазена с ID ${result.id}!`);
        } else {
            alert('❌ Грешка при запазване: ' + (result.error || 'неизвестна'));
        }
    } catch (err) {
        alert('❌ Неуспешна връзка с API: ' + err.message);
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    console.log("=== GAME INITIALIZATION STARTED ===");
    const startBtn = document.getElementById('startButton');
    const tutorialBtn = document.getElementById('tutorialButton');
    const wheelBtn = document.getElementById('spinningWheelButton');
    if (!startBtn || !tutorialBtn || !wheelBtn) {
        console.error("CRITICAL: Buttons missing!");
        alert("Грешка: Бутоните не са намерени.");
        return;
    }
    try {
        if (typeof TRANSLATIONS === 'undefined') alert("Грешка: Преводите не са заредени.");
        else initLanguageSystem();
        initializeSettings();
        initializeStartMenu();
        initializeMoneyTreeToggle();
        initializeSpinningWheel();
        playStartMenuMusic();
        const closeAudience = document.getElementById('closeAudienceModal'); if (closeAudience) closeAudience.onclick = closeAudienceModal;
        const closePhone = document.getElementById('closePhoneModal'); if (closePhone) closePhone.onclick = closePhoneModal;
        const audienceModal = document.getElementById('audienceJokerModal'); if (audienceModal) audienceModal.onclick = e => { if (e.target === audienceModal) closeAudienceModal(); };
        const phoneModal = document.getElementById('phoneJokerModal'); if (phoneModal) phoneModal.onclick = e => { if (e.target === phoneModal) closePhoneModal(); };
        document.addEventListener('click', e => { if (!e.target.classList.contains('answer-btn') && !e.target.classList.contains('joker-btn')) skipAnswerReveal(); });
        document.addEventListener('keydown', e => { if (e.code === 'Space' && gameState.isRevealingAnswers) { e.preventDefault(); skipAnswerReveal(); } if (e.code === 'Escape') { closePhoneModal(); closeAudienceModal(); } });
        window.addEventListener('resize', updateGameContainerResponsiveness);

        const saveBtn = document.getElementById('saveCloudBtn');
        if (saveBtn) saveBtn.addEventListener('click', saveCurrentThemeToCloud);

        console.log("=== GAME INITIALIZATION COMPLETE ===");
    } catch (err) {
        console.error("CRITICAL ERROR during initialization:", err);
        alert("Възникна грешка при инициализация.");
    }
});
