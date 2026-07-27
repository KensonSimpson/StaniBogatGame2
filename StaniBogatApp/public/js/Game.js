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
    wrongAnswerTimeout: null,
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
            cancelAllTimers();
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
// CANCEL ALL TIMERS
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
        let sound = document.getElementById(soundId);
        if (!sound) {
            // Fallback: create new Audio element
            sound = new Audio('/sounds/' + soundId + '.mp3');
            sound.volume = settings.sfxVolume;
        } else {
            sound.volume = settings.sfxVolume;
        }
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Audio play failed:", e));
        console.log(`Playing sound: ${soundId}`);
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
        cancelAllTimers();

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
            const answersContainer = document.getElementById('answersContainer');
            if (answersContainer) answersContainer.innerHTML = '';
        }, () => {
            loadQuestion();
        });
    }

    if (gameBack) {
        gameBack.addEventListener('click', () => {
            cancelAllTimers();
            stopUserThemeMusic();
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
                const answersContainer = document.getElementById('answersContainer');
                if (answersContainer) answersContainer.innerHTML = '';
            });
        });
    }

    if (tutorialButton) {
        tutorialButton.addEventListener('click', () => {
            performTransition(() => {
                startMenu.style.display = 'none';
                if (tutorialScreen) tutorialScreen.style.display = 'flex';
                stopRetroMusic();
            });
        });
    }
    if (spinningWheelButton) {
        spinningWheelButton.addEventListener('click', () => {
            performTransition(() => {
                startMenu.style.display = 'none';
                if (wheelScreen) wheelScreen.style.display = 'flex';
                playRetroMusic();
            });
        });
    }
    if (backButton) {
        backButton.addEventListener('click', () => {
            performTransition(() => {
                if (tutorialScreen) tutorialScreen.style.display = 'none';
                startMenu.style.display = 'flex';
            });
        });
    }
    if (backFromWheel) {
        backFromWheel.addEventListener('click', () => {
            performTransition(() => {
                if (wheelScreen) wheelScreen.style.display = 'none';
                startMenu.style.display = 'flex';
                resetSpinningWheel();
                stopRetroMusic();
            });
        });
    }
}

// ============================================
// SPINNING WHEEL
// ============================================
let customWheelConfig = null;

function loadCustomWheelConfig() {
    try {
        const saved = localStorage.getItem('staniBogatCustomWheel');
        if (saved) customWheelConfig = JSON.parse(saved);
    } catch(e) { console.error("Failed to load custom wheel config", e); }
}

function saveCustomWheelConfig(config) {
    try {
        localStorage.setItem('staniBogatCustomWheel', JSON.stringify(config));
        customWheelConfig = config;
    } catch(e) { console.error("Failed to save custom wheel config", e); }
}

function resetToOriginalWheel() {
    localStorage.removeItem('staniBogatCustomWheel');
    customWheelConfig = null;
    createWheelNumbers();
    const resetBtn = document.getElementById('resetWheelButton');
    if (resetBtn) resetBtn.style.display = 'none';
}

function initializeSpinningWheel() {
    const spinButton = document.getElementById('spinButton');
    const spinAgain = document.getElementById('spinAgainButton');
    const resultModal = document.getElementById('resultModal');
    const customizeBtn = document.getElementById('customizeWheelButton');
    const resetBtn = document.getElementById('resetWheelButton');
    const configModal = document.getElementById('wheelConfigModal');
    const saveConfigBtn = document.getElementById('saveWheelConfig');
    const cancelConfigBtn = document.getElementById('cancelWheelConfig');

    loadCustomWheelConfig();
    createWheelNumbers();

    if (customWheelConfig) {
        if (resetBtn) resetBtn.style.display = 'inline-block';
    } else {
        if (resetBtn) resetBtn.style.display = 'none';
    }

    if (spinButton) {
        spinButton.addEventListener('click', () => { if (!gameState.isSpinning) spinWheel(); });
    }
    if (spinAgain) {
        spinAgain.addEventListener('click', () => {
            if (resultModal) resultModal.style.display = 'none';
            if (spinButton) spinButton.disabled = false;
            gameState.isSpinning = false;
        });
    }

    if (customizeBtn) {
        customizeBtn.addEventListener('click', () => {
            const segmentCountInput = document.getElementById('segmentCount');
            const namesTextarea = document.getElementById('segmentNames');
            const colorsInput = document.getElementById('segmentColors');
            const durationInput = document.getElementById('spinDurationSec');

            if (customWheelConfig) {
                segmentCountInput.value = customWheelConfig.segmentCount || 6;
                namesTextarea.value = (customWheelConfig.texts || []).join(', ');
                colorsInput.value = (customWheelConfig.colors || []).join(', ');
                durationInput.value = (customWheelConfig.spinDurationMs / 1000) || 4;
            } else {
                segmentCountInput.value = 6;
                namesTextarea.value = '';
                colorsInput.value = '';
                durationInput.value = 4;
            }
            configModal.style.display = 'flex';
        });
    }

    if (saveConfigBtn) {
        saveConfigBtn.addEventListener('click', () => {
            let segmentCount = parseInt(document.getElementById('segmentCount').value, 10);
            if (isNaN(segmentCount) || segmentCount < 1) segmentCount = 1;
            if (segmentCount > 100) segmentCount = 100;

            let namesRaw = document.getElementById('segmentNames').value;
            let texts = namesRaw ? namesRaw.split(',').map(s => s.trim()) : [];
            if (texts.length !== segmentCount) {
                texts = [];
                for (let i = 1; i <= segmentCount; i++) texts.push(`Сегмент ${i}`);
            }

            let colorsRaw = document.getElementById('segmentColors').value;
            let colors = colorsRaw ? colorsRaw.split(',').map(s => s.trim()) : [];
            if (colors.length !== segmentCount) {
                colors = [];
                for (let i = 0; i < segmentCount; i++) {
                    const hue = (i * 360 / segmentCount) % 360;
                    colors.push(`hsl(${hue}, 70%, 60%)`);
                }
            }

            let durationSec = parseFloat(document.getElementById('spinDurationSec').value);
            if (isNaN(durationSec)) durationSec = 4;
            if (durationSec < 0.5) durationSec = 0.5;
            if (durationSec > 100) durationSec = 100;
            const spinDurationMs = durationSec * 1000;

            const newConfig = {
                segmentCount: segmentCount,
                texts: texts,
                colors: colors,
                spinDurationMs: spinDurationMs,
                minRotations: 3,
                maxRotations: 7,
                easing: "cubic-bezier(0.2, 0.8, 0.3, 1)"
            };
            saveCustomWheelConfig(newConfig);
            createWheelNumbers();
            configModal.style.display = 'none';
            if (resetBtn) resetBtn.style.display = 'inline-block';
        });
    }

    if (cancelConfigBtn) {
        cancelConfigBtn.addEventListener('click', () => {
            configModal.style.display = 'none';
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            resetToOriginalWheel();
            configModal.style.display = 'none';
        });
    }

    if (configModal) {
        configModal.addEventListener('click', (e) => {
            if (e.target === configModal) configModal.style.display = 'none';
        });
    }
}

function createWheelNumbers() {
    const wheel = document.getElementById('wheel');
    if (!wheel) return;

    let segmentCount = 23;
    let texts = null;
    let colors = null;

    if (customWheelConfig && customWheelConfig.segmentCount) {
        segmentCount = customWheelConfig.segmentCount;
        texts = customWheelConfig.texts;
        colors = customWheelConfig.colors;
    } else {
        texts = CLASSMATE_NAMES.slice(0, 23);
        const defaultColors = ["#FF6B6B", "#4F90FF", "#4CAF50", "#FFD700"];
        colors = [];
        for (let i = 0; i < segmentCount; i++) {
            colors.push(defaultColors[i % defaultColors.length]);
        }
    }

    const segmentAngle = 360 / segmentCount;
    const existingNumbers = wheel.querySelectorAll('.segment-number');
    existingNumbers.forEach(n => n.remove());

    let gradient = "conic-gradient(";
    for (let i = 0; i < segmentCount; i++) {
        const start = i * segmentAngle;
        const end = (i + 1) * segmentAngle;
        gradient += `${colors[i]} ${start}deg ${end}deg`;
        if (i < segmentCount - 1) gradient += ", ";
    }
    gradient += ")";
    wheel.style.background = gradient;

    const radius = 150;
    for (let i = 0; i < segmentCount; i++) {
        const div = document.createElement('div');
        div.className = 'segment-number';
        div.textContent = texts[i] || `#${i+1}`;
        const angle = (i * segmentAngle) + (segmentAngle / 2);
        const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
        const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
        div.style.position = 'absolute';
        div.style.left = `calc(50% + ${x}px)`;
        div.style.top = `calc(50% + ${y}px)`;
        div.style.transform = 'translate(-50%, -50%)';
        div.style.color = 'white';
        div.style.fontWeight = 'bold';
        div.style.fontSize = '16px';
        div.style.textShadow = '1px 1px 2px rgba(0,0,0,0.8)';
        div.style.zIndex = '2';
        wheel.appendChild(div);
    }
}

function spinWheel() {
    if (gameState.isSpinning) return;
    gameState.isSpinning = true;
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spinButton');
    const resultModal = document.getElementById('resultModal');
    const selectedName = document.getElementById('selectedName');
    const pointer = document.querySelector('.wheel-pointer');
    if (spinButton) spinButton.disabled = true;
    if (pointer) pointer.classList.add('spinning');

    let segmentCount = 23;
    let texts = null;
    let minRot = 3;
    let maxRot = 7;
    let duration = 4000;
    let easing = "cubic-bezier(0.2, 0.8, 0.3, 1)";

    if (customWheelConfig && customWheelConfig.segmentCount) {
        segmentCount = customWheelConfig.segmentCount;
        texts = customWheelConfig.texts;
        minRot = customWheelConfig.minRotations || 3;
        maxRot = customWheelConfig.maxRotations || 7;
        duration = customWheelConfig.spinDurationMs || 4000;
        easing = customWheelConfig.easing || "cubic-bezier(0.2, 0.8, 0.3, 1)";
    } else {
        texts = CLASSMATE_NAMES;
        segmentCount = 23;
    }

    let targetSegment;
    if (wheel) {
        wheel.style.transition = 'none';
        wheel.style.transform = 'rotate(0deg)';
        void wheel.offsetWidth;
        wheel.style.transition = `transform ${duration}ms ${easing}`;

        const fullRotations = minRot + Math.floor(Math.random() * (maxRot - minRot + 1));
        const segmentAngle = 360 / segmentCount;
        targetSegment = Math.floor(Math.random() * segmentCount);
        const segmentOffset = segmentAngle / 2;
        const targetRotation = (targetSegment * segmentAngle) + segmentOffset;
        const totalRotation = (fullRotations * 360) + targetRotation;
        wheel.style.transform = `rotate(${-totalRotation}deg)`;
    }

    setTimeout(() => {
        if (pointer) pointer.classList.remove('spinning');
        let winner;
        if (texts && texts[targetSegment]) {
            winner = texts[targetSegment];
        } else {
            winner = `Сегмент ${targetSegment + 1}`;
        }
        if (selectedName) selectedName.textContent = winner;
        if (resultModal) resultModal.style.display = 'flex';
    }, duration);
}

function resetSpinningWheel() {
    const wheel = document.getElementById('wheel');
    const resultModal = document.getElementById('resultModal');
    const spinButton = document.getElementById('spinButton');
    const pointer = document.querySelector('.wheel-pointer');
    if (wheel) { wheel.style.transition = 'none'; wheel.style.transform = 'rotate(0deg)'; }
    if (resultModal) resultModal.style.display = 'none';
    if (spinButton) spinButton.disabled = false;
    gameState.isSpinning = false;
    if (pointer) pointer.classList.remove('spinning');
    if (wheel) { void wheel.offsetWidth; wheel.style.transition = `transform ${customWheelConfig?.spinDurationMs || 4000}ms ${customWheelConfig?.easing || "cubic-bezier(0.2,0.8,0.3,1)"}`; }
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
    const skip = document.getElementById('skipHint');
    if (skip) skip.style.display = 'block';
    function reveal() {
        if (idx < btns.length) {
            btns[idx].style.opacity = '1';
            btns[idx].style.transform = 'translateY(0)';
            btns[idx].disabled = false;
            idx++;
            gameState.answerRevealTimeout = setTimeout(reveal, GAME_CONFIG.answerRevealDelay);
        } else {
            gameState.isRevealingAnswers = false;
            if (skip) skip.style.display = 'none';
        }
    }
    gameState.answerRevealTimeout = setTimeout(reveal, GAME_CONFIG.answerRevealDelay);
}

function skipAnswerReveal() {
    if (!gameState.isRevealingAnswers) return;
    if (gameState.answerRevealTimeout) clearTimeout(gameState.answerRevealTimeout);
    const btns = document.querySelectorAll('.answer-btn');
    const skip = document.getElementById('skipHint');
    btns.forEach(btn => {
        if (btn.style.opacity === '0' || btn.disabled) {
            btn.style.transition = 'all 0.3s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
            btn.disabled = false;
        }
    });
    gameState.isRevealingAnswers = false;
    if (skip) skip.style.display = 'none';
}

function reloadQuestionForLanguage() {
    if (currentThemeQuestions) loadThemeQuestions(currentTheme);
    const qArray = currentThemeQuestions || TRANSLATIONS[currentLanguage].questions;
    const q = qArray[gameState.currentQuestion];
    if (q) {
        document.getElementById('questionText').textContent = q.question;
        const answersContainer = document.getElementById('answersContainer');
        const answerBtns = answersContainer.querySelectorAll('.answer-btn');
        q.answers.forEach((ans, idx) => {
            if (answerBtns[idx]) answerBtns[idx].textContent = `${String.fromCharCode(65 + idx)}) ${ans}`;
        });
        updateLevelIndicator();
    }
}

function updateLevelIndicator() {
    const levelEl = document.getElementById('currentLevel');
    const prizeEl = document.getElementById('currentPrize');
    const t = TRANSLATIONS[currentLanguage];
    const config = THEME_CONFIG[currentTheme] || {};
    if (levelEl) levelEl.textContent = gameState.currentQuestion + 1;
    if (prizeEl) {
        if (config.showPrizes !== false && t?.prizes) {
            const prize = t.prizes[gameState.currentQuestion] || TRANSLATIONS.bg.prizes[gameState.currentQuestion] || `${(gameState.currentQuestion + 1) * 100} BGN`;
            prizeEl.textContent = prize;
        } else {
            prizeEl.textContent = '';
        }
    }
    const indicator = document.querySelector('.level-indicator');
    if (indicator && t && t.levelIndicator) {
        const total = currentTotalQuestions;
        const prizeText = config.showPrizes !== false ? t.levelIndicator.replace('{level}', gameState.currentQuestion + 1).replace('{prize}', prizeEl?.textContent || '') : `Въпрос: ${gameState.currentQuestion + 1}/${total}`;
        indicator.innerHTML = prizeText;
    }
}

// ============================================
// JOKERS
// ============================================
function useFiftyFifty() {
    if (gameState.usedJokers.fiftyFifty) return;
    playSound('joker5050Sound');
    gameState.usedJokers.fiftyFifty = true;
    document.getElementById('joker5050').disabled = true;
    document.getElementById('joker5050').classList.add('used');
    let q;
    if (currentThemeQuestions) q = currentThemeQuestions[gameState.currentQuestion];
    else q = TRANSLATIONS[currentLanguage]?.questions[gameState.currentQuestion];
    if (!q) return;
    const btns = document.querySelectorAll('.answer-btn');
    let wrong = [];
    btns.forEach((btn, idx) => { if (idx !== q.correct) wrong.push(btn); });
    wrong.sort(() => Math.random() - 0.5);
    wrong.slice(0, 2).forEach(btn => { btn.textContent = ''; btn.disabled = true; });
}
function useAudience() {
    if (gameState.usedJokers.audience) return;
    gameState.usedJokers.audience = true;
    document.getElementById('jokerAudience').disabled = true;
    document.getElementById('jokerAudience').classList.add('used');
    showAudienceJokerModal();
}
function showAudienceJokerModal() {
    const modal = document.getElementById('audienceJokerModal');
    if (modal) modal.style.display = 'flex';
}
function closeAudienceModal() {
    const modal = document.getElementById('audienceJokerModal');
    if (modal) modal.style.display = 'none';
}
function usePhone() {
    if (gameState.usedJokers.phone) return;
    gameState.usedJokers.phone = true;
    document.getElementById('jokerPhone').disabled = true;
    document.getElementById('jokerPhone').classList.add('used');
    showPhoneJokerModal();
}
function showPhoneJokerModal() {
    const modal = document.getElementById('phoneJokerModal');
    const modalContent = modal.querySelector('.phone-modal-content');
    modalContent.innerHTML = `<h2>📞 Помощ от приятел</h2><div id="phoneTimer" class="phone-timer">${GAME_CONFIG.countdownDuration}</div><p>Приятелят ви мисли...</p><button id="closePhoneModal" class="close-phone-modal">Затвори</button>`;
    modal.style.display = 'block';
    document.getElementById('closePhoneModal').onclick = closePhoneModal;
    startSeamlessTickSound();
    startPhoneCountdown();
}
function startSeamlessTickSound() {
    const t1 = document.getElementById('friendJokerTimeTick1');
    const t2 = document.getElementById('friendJokerTimeTick2');
    t1.currentTime = 0; t2.currentTime = 0; t1.pause(); t2.pause();
    const dur = 1000;
    t1.play().catch(e => console.log("Tick sound play failed:", e));
    gameState.currentTickSound = 1;
    gameState.tickInterval = setInterval(() => {
        if (gameState.currentTickSound === 1) {
            t2.currentTime = 0; t2.play().catch(e => console.log("Tick sound 2 play failed:", e));
            gameState.currentTickSound = 2;
        } else {
            t1.currentTime = 0; t1.play().catch(e => console.log("Tick sound 1 play failed:", e));
            gameState.currentTickSound = 1;
        }
    }, dur - 100);
}
function stopSeamlessTickSound() {
    if (gameState.tickInterval) { clearInterval(gameState.tickInterval); gameState.tickInterval = null; }
    const t1 = document.getElementById('friendJokerTimeTick1');
    const t2 = document.getElementById('friendJokerTimeTick2');
    t1.pause(); t2.pause(); t1.currentTime = 0; t2.currentTime = 0;
}
function startPhoneCountdown() {
    const timer = document.getElementById('phoneTimer');
    let time = GAME_CONFIG.countdownDuration;
    timer.textContent = time;
    const count = setInterval(() => {
        time--;
        timer.textContent = time;
        if (time <= 0) { clearInterval(count); stopSeamlessTickSound(); closePhoneModal(); }
    }, 1000);
    const modal = document.getElementById('phoneJokerModal');
    modal.dataset.countdown = count;
}
function closePhoneModal() {
    const modal = document.getElementById('phoneJokerModal');
    if (modal) {
        modal.style.display = 'none';
        stopSeamlessTickSound();
        if (modal.dataset.countdown) { clearInterval(parseInt(modal.dataset.countdown)); delete modal.dataset.countdown; }
    }
}

// ============================================
// ANSWER CHECKING
// ============================================
function checkAnswer(selected, correct) {
    console.log("Answer clicked - selected:", selected, "correct:", correct);
    playSound('answerChosenSound');
    const btns = document.querySelectorAll('.answer-btn');
    btns.forEach(b => { b.disabled = true; b.style.cursor = 'not-allowed'; });
    const selectedBtn = btns[selected];
    const correctBtn = btns[correct];
    selectedBtn.style.background = 'linear-gradient(135deg, #ffed4e, #ffd700)';
    selectedBtn.style.color = '#000066';
    selectedBtn.style.border = '3px solid #cc9900';

    clearTimeout(gameState.wrongAnswerTimeout);

    setTimeout(() => {
        if (selected === correct) {
            let sound;
            const config = THEME_CONFIG[currentTheme] || {};
            if (config.milestones && config.milestones.includes(gameState.currentQuestion)) {
                sound = 'correctAnswer3';
            } else if (gameState.currentQuestion === 4 || gameState.currentQuestion === 9) {
                sound = 'correctAnswer3';
            } else if (gameState.currentQuestion < 5) {
                sound = 'correctAnswerSound';
            } else {
                sound = 'correctAnswer2';
            }

            if (currentTheme === 'Minecraft') {
                setTimeout(() => {
                    selectedBtn.style.background = 'linear-gradient(135deg, #00ff30, #00cc00)';
                    selectedBtn.style.color = '#000066';
                    selectedBtn.style.border = '3px solid #00aa00';
                    playSound(sound);
                    setTimeout(() => {
                        const t = TRANSLATIONS[currentLanguage];
                        const prize = (config.showPrizes !== false) ? (t?.prizes?.[gameState.currentQuestion] || `${(gameState.currentQuestion + 1) * 100} BGN`) : '';
                        alert(`✅ Правилен отговор!${prize ? ' Спечелихте ' + prize + '!' : ''}`);
                        gameState.currentQuestion++;
                        if (gameState.currentQuestion < currentTotalQuestions) {
                            playSound('moveForwardSound');
                            setTimeout(() => loadQuestion(), 1000);
                        } else {
                            alert('🎉 ЧЕСТИТО! Спечелихте!');
                            gameState.currentQuestion = 0;
                            resetGame();
                        }
                    }, 3000);
                }, 750);
            } else {
                selectedBtn.style.background = 'linear-gradient(135deg, #00ff30, #00cc00)';
                selectedBtn.style.color = '#000066';
                selectedBtn.style.border = '3px solid #00aa00';
                playSound(sound);
                setTimeout(() => {
                    const t = TRANSLATIONS[currentLanguage];
                    const prize = (config.showPrizes !== false) ? (t?.prizes?.[gameState.currentQuestion] || `${(gameState.currentQuestion + 1) * 100} BGN`) : '';
                    alert(`✅ Правилен отговор!${prize ? ' Спечелихте ' + prize + '!' : ''}`);
                    gameState.currentQuestion++;
                    if (gameState.currentQuestion < currentTotalQuestions) {
                        playSound('moveForwardSound');
                        setTimeout(() => loadQuestion(), 1000);
                    } else {
                        alert('🎉 ЧЕСТИТО! Спечелихте!');
                        gameState.currentQuestion = 0;
                        resetGame();
                    }
                }, 3000);
            }
        } else {
            if (correctBtn) {
                correctBtn.style.background = 'linear-gradient(135deg, #00ff30, #00cc00)';
                correctBtn.style.color = '#000066';
                correctBtn.style.border = '3px solid #00aa00';
            }
            playSound('wrongAnswerSound');
            if (currentTheme === 'Minecraft') {
                gameState.wrongAnswerTimeout = setTimeout(() => {
                    showMinecraftDeathScreen();
                }, 500);
            } else {
                gameState.wrongAnswerTimeout = setTimeout(() => {
                    const config = THEME_CONFIG[currentTheme] || {};
                    const t = TRANSLATIONS[currentLanguage];
                    let prize = 'нищо';
                    if (config.showPrizes !== false && gameState.currentQuestion > 0) {
                        prize = t?.prizes?.[gameState.currentQuestion - 1] || `${gameState.currentQuestion * 100} BGN`;
                    } else if (gameState.currentQuestion > 0) {
                        prize = 'нищо (няма парична награда)';
                    }
                    alert(`❌ Грешен отговор! Играта свърши. Спечелихте: ${prize}`);
                    gameState.currentQuestion = 0;
                    resetGame();
                }, 3000);
            }
        }
    }, 2500);
}

function resetGame() {
    gameState.usedJokers = { fiftyFifty: false, audience: false, phone: false };
    document.querySelectorAll('.joker-btn').forEach(btn => { btn.disabled = false; btn.classList.remove('used'); });
    stopUserThemeMusic();
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
// CUSTOM THEME EDITOR
// ============================================
let editorQuestionCount = 0;

function initEditor(questions = null) {
    const container = document.getElementById('questionsContainer');
    if (!container) return;
    container.innerHTML = '';
    if (questions && questions.length > 0) {
        questions.forEach((q, idx) => {
            addQuestionBlock(idx, q.question, q.answers, q.correct);
        });
    } else {
        addQuestionBlock(0, '', ['', '', '', ''], 0);
    }
    document.getElementById('themeNameInput').value = '';
}

function addQuestionBlock(id, question, answers, correct) {
    const container = document.getElementById('questionsContainer');
    if (!container) return;
    const block = document.createElement('div');
    block.className = 'question-block';
    block.dataset.id = id;
    block.innerHTML = `
        <button class="remove-question-btn" onclick="this.parentElement.remove()">✖</button>
        <h4>Въпрос #${id + 1}</h4>
        <input type="text" class="question-input" placeholder="Текст на въпроса" value="${escapeHtml(question)}" />
        <div class="answers">
            <label>A: <input type="text" class="answer-input" value="${escapeHtml(answers[0] || '')}" /></label>
            <label>B: <input type="text" class="answer-input" value="${escapeHtml(answers[1] || '')}" /></label>
            <label>C: <input type="text" class="answer-input" value="${escapeHtml(answers[2] || '')}" /></label>
            <label>D: <input type="text" class="answer-input" value="${escapeHtml(answers[3] || '')}" /></label>
        </div>
        <label>Верен отговор:
            <select class="correct-select">
                <option value="0" ${correct === 0 ? 'selected' : ''}>A</option>
                <option value="1" ${correct === 1 ? 'selected' : ''}>B</option>
                <option value="2" ${correct === 2 ? 'selected' : ''}>C</option>
                <option value="3" ${correct === 3 ? 'selected' : ''}>D</option>
            </select>
        </label>
    `;
    container.appendChild(block);
}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

async function saveEditorTheme() {
    const nameInput = document.getElementById('themeNameInput');
    if (!nameInput || nameInput.value.trim() === '') {
        alert('Моля, въведете име на темата.');
        return;
    }
    const themeName = nameInput.value.trim();

    const musicInput = document.getElementById('themeMusicInput');
    const musicUrl = musicInput ? musicInput.value.trim() : '';

    const blocks = document.querySelectorAll('.question-block');
    const questionsData = [];
    blocks.forEach(block => {
        const questionText = block.querySelector('.question-input').value.trim();
        const answerInputs = block.querySelectorAll('.answer-input');
        const correctSelect = block.querySelector('.correct-select');
        if (questionText === '' || answerInputs[0].value.trim() === '' || answerInputs[1].value.trim() === '' ||
            answerInputs[2].value.trim() === '' || answerInputs[3].value.trim() === '') {
            return;
        }
        questionsData.push({
            question: questionText,
            answers: [
                answerInputs[0].value.trim(),
                answerInputs[1].value.trim(),
                answerInputs[2].value.trim(),
                answerInputs[3].value.trim()
            ],
            correct: parseInt(correctSelect.value)
        });
    });
    if (questionsData.length === 0) {
        alert('Трябва да има поне един пълен въпрос.');
        return;
    }

    const payload = {
        name: themeName,
        questionsData: questionsData,
        category: 'user',
        musicUrl: musicUrl
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
            document.getElementById('questionsContainer').innerHTML = '';
            nameInput.value = '';
            if (musicInput) musicInput.value = '';
            initEditor();
        } else {
            alert('❌ Грешка при запазване: ' + (result.error || 'неизвестна'));
        }
    } catch (err) {
        alert('❌ Неуспешна връзка с API: ' + err.message);
    }
}

// ============================================
// BROWSE UPLOADED THEMES
// ============================================
async function fetchAndDisplayThemes(searchTerm = '') {
    const container = document.getElementById('themeListContainer');
    if (!container) return;
    container.innerHTML = '<p>Зареждане...</p>';

    try {
        const response = await fetch('https://stanibogat-api.nataliya-atanasova.workers.dev/themes');
        const themes = await response.json();
        const filtered = themes.filter(t => {
            const lowerSearch = searchTerm.toLowerCase();
            return t.id.toString().includes(lowerSearch) || t.name.toLowerCase().includes(lowerSearch);
        });

        if (filtered.length === 0) {
            container.innerHTML = '<p>Няма намерени теми.</p>';
            return;
        }

        container.innerHTML = '';
        filtered.forEach(theme => {
            const card = document.createElement('div');
            card.className = 'theme-card';
            card.innerHTML = `
                <h4>${escapeHtml(theme.name)} <small>(ID: ${theme.id})</small></h4>
                <p>Категория: ${escapeHtml(theme.category)} | Въпроси: ${JSON.parse(theme.questionsData).length}</p>
                <button class="spin-button" onclick="loadUserTheme(${theme.id})">▶ Играй</button>
            `;
            container.appendChild(card);
        });
    } catch (err) {
        container.innerHTML = '<p>Грешка при зареждане на темите.</p>';
        console.error(err);
    }
}

async function loadUserTheme(themeId) {
    const response = await fetch('https://stanibogat-api.nataliya-atanasova.workers.dev/themes');
    const themes = await response.json();
    const theme = themes.find(t => t.id === themeId);
    if (!theme) {
        alert('Темата не е намерена.');
        return;
    }
    const questions = JSON.parse(theme.questionsData);
    if (!Array.isArray(questions) || questions.length === 0) {
        alert('Темата не съдържа валидни въпроси.');
        return;
    }

    currentTheme = theme.name;
    currentThemeQuestions = questions;
    currentTotalQuestions = questions.length;
    gameState.currentQuestion = 0;
    gameState.usedJokers = { fiftyFifty: false, audience: false, phone: false };
    document.querySelectorAll('.joker-btn').forEach(b => { b.disabled = false; b.classList.remove('used'); });
    cancelAllTimers();

    document.getElementById('browseThemesScreen').style.display = 'none';

    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = 'block';
    gameContainer.style.opacity = '1';
    const moneyTree = document.getElementById('moneyTree');
    if (moneyTree) { moneyTree.style.display = 'block'; generateMoneyTree(currentTheme); }
    const levelIndicator = document.querySelector('.level-indicator');
    if (levelIndicator) levelIndicator.style.display = 'block';
    const backButtonContainer = document.querySelector('.game-back-button-container');
    if (backButtonContainer) backButtonContainer.style.display = 'block';
    const gameBack = document.getElementById('gameBackButton');
    if (gameBack) gameBack.style.display = 'block';
    const moneyTreeToggle = document.getElementById('moneyTreeToggle');
    if (moneyTreeToggle) { moneyTreeToggle.style.display = 'block'; moneyTreeToggle.style.opacity = '1'; }
    gameContainer.classList.remove('narrow');
    moneyTreeToggle.innerHTML = '💰';
    gameState.isMoneyTreeVisible = false;
    setTimeout(() => updateGameContainerResponsiveness(), 100);
    stopRetroMusic();
    setThemeBackground(null);
    stopThemeMusic();
    removeMinecraftTheme();

    stopUserThemeMusic();
    if (theme.musicUrl) {
        userThemeAudio = new Audio(theme.musicUrl);
        userThemeAudio.loop = true;
        userThemeAudio.volume = settings.musicVolume;
        userThemeAudio.play().catch(e => console.warn('User theme music failed to play:', e));
    }

    const answersContainer = document.getElementById('answersContainer');
    if (answersContainer) answersContainer.innerHTML = '';
    loadQuestion();
}

let userThemeAudio = null;

function stopUserThemeMusic() {
    if (userThemeAudio) {
        userThemeAudio.pause();
        userThemeAudio.remove();
        userThemeAudio = null;
    }
}

// ============================================
// GLOBAL ACTIVE USERS COUNTER (corrected)
// ============================================
let activeUsersCounter = null;
let activeUsersInterval = null;
let heartbeatInterval = null;
let clientId = null;

function initActiveUsersCounter() {
  // Generate a unique client ID for this tab (persists in sessionStorage for the tab)
  if (!clientId) {
    clientId = sessionStorage.getItem('activeUserClientId');
    if (!clientId) {
      clientId = 'tab-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 5);
      sessionStorage.setItem('activeUserClientId', clientId);
    }
  }

  // Create counter UI element (only visible on start menu)
  const counterDiv = document.createElement('div');
  counterDiv.id = 'activeUsersCounter';
  counterDiv.style.cssText = `
    position: fixed;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #ffd700, #ff8c00);
    color: #000;
    padding: 6px 20px;
    border-radius: 30px;
    border: 2px solid #fff;
    font-weight: bold;
    font-size: 16px;
    z-index: 5000;
    pointer-events: none;
    font-family: 'Tahoma', sans-serif;
    box-shadow: 0 4px 15px rgba(255,215,0,0.6);
    display: none; /* hidden by default */
    white-space: nowrap;
  `;
  counterDiv.innerHTML = '👥 <span id="userCountValue">?</span>';
  document.body.appendChild(counterDiv);

  activeUsersCounter = counterDiv;

  // Start heartbeat (send every 5 seconds)
  startHeartbeat();

  // Start counter updates (every 1 second)
  updateActiveUsers();
  activeUsersInterval = setInterval(updateActiveUsers, 1000);

  // Show counter only on start menu
  showCounterOnStartMenu();

  // Send a final heartbeat when the tab is closed (best effort)
  window.addEventListener('beforeunload', () => {
    sendHeartbeat(); // try one last time
  });
}

function startHeartbeat() {
  if (heartbeatInterval) clearInterval(heartbeatInterval);
  // Send heartbeat immediately
  sendHeartbeat();
  // Then every 5 seconds
  heartbeatInterval = setInterval(sendHeartbeat, 5000);
}

async function sendHeartbeat() {
  try {
    await fetch('https://stanibogat-api.nataliya-atanasova.workers.dev/heartbeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId: clientId })
    });
  } catch (e) {
    // silently ignore
  }
}

async function updateActiveUsers() {
  try {
    const resp = await fetch('https://stanibogat-api.nataliya-atanasova.workers.dev/active-users');
    const data = await resp.json();
    if (data.count !== undefined && activeUsersCounter) {
      document.getElementById('userCountValue').textContent = data.count;
    }
  } catch (e) {
    console.warn('Failed to fetch active users count:', e);
  }
}

function showCounterOnStartMenu() {
  const startMenu = document.getElementById('startMenu');
  const observer = new MutationObserver(() => {
    if (startMenu.style.display === 'flex' || startMenu.style.display === '') {
      activeUsersCounter.style.display = 'block';
    } else {
      activeUsersCounter.style.display = 'none';
    }
  });
  observer.observe(startMenu, { attributes: true, attributeFilter: ['style'] });
  // Initial check
  if (startMenu.style.display === 'flex' || startMenu.style.display === '') {
    activeUsersCounter.style.display = 'block';
  }
}

// ============================================
// MULTIPLAYER MODULE (STAR TOPOLOGY – 30 PLAYERS)
// ============================================
const MAX_PLAYERS = 30;
let mpClientId = '';
let mpRoomCode = '';
let mpPlayerName = '';
let isHost = false;
let mpGameStarted = false;
let mpCurrentQuestion = 0;
let mpQuestions = [];
let mpScores = {};
let mpPlayers = [];
let mpAnswers = {};
let mpDataChannels = {};
let mpPeerConnections = {};
let mpDataChannelOpen = false;
let mpQuestionTimer = null;
let selectedQuestions = null;
let selectedThemeKey = null;
let signalingPollInterval = null;
let signalingSince = 0;
let processedJoinClients = new Set();

// --- Създаване на екрана на стаята (динамично) ---
let roomScreen = document.getElementById('mpRoomScreen');
if (!roomScreen) {
    roomScreen = document.createElement('div');
    roomScreen.id = 'mpRoomScreen';
    roomScreen.className = 'multiplayer-room-screen';
    roomScreen.innerHTML = `
        <div class="room-content">
            <h2>Стая</h2>
            <p>Код: <span class="room-code" id="displayRoomCode">------</span></p>
            <input type="text" id="mpNameInput" class="room-name-input" placeholder="Вашето име..." maxlength="20" autocomplete="off" />
            <button id="mpConfirmNameBtn" class="start-room-btn" style="display:inline-block;" onclick="confirmNameAndConnect()">Потвърди името</button>
            <p class="player-count" id="playerCountDisplay">Играчи: 0 / ${MAX_PLAYERS}</p>
            <div class="player-list" id="playerList"></div>
            <p id="connectionStatus" style="color:#ccc; margin:10px 0; display:none;">Очакване на играчи...</p>
            <div id="themeBrowserArea" style="display:none;">
                <p style="color:gold; margin-bottom:8px;">Изберете тема:</p>
                <div class="theme-browser-inline" id="themeBrowserInline"></div>
            </div>
            <button id="startMpGameBtn" class="start-room-btn" disabled>Старт</button>
            <button id="leaveRoomBtn" class="leave-room-btn">Излез</button>
        </div>
    `;
    document.body.appendChild(roomScreen);
}

// --- Получаваме референции към елементите след създаването ---
const displayRoomCode = document.getElementById('displayRoomCode');
const mpNameInput = document.getElementById('mpNameInput');
const mpConfirmNameBtn = document.getElementById('mpConfirmNameBtn');
const playerCountDisplay = document.getElementById('playerCountDisplay');
const playerListEl = document.getElementById('playerList');
const themeBrowserArea = document.getElementById('themeBrowserArea');
const themeBrowserInline = document.getElementById('themeBrowserInline');
const startMpGameBtn = document.getElementById('startMpGameBtn');
const leaveRoomBtn = document.getElementById('leaveRoomBtn');
const connectionStatus = document.getElementById('connectionStatus');

if (!displayRoomCode || !mpNameInput || !mpConfirmNameBtn || !playerCountDisplay ||
    !playerListEl || !themeBrowserArea || !themeBrowserInline || !startMpGameBtn || !leaveRoomBtn || !connectionStatus) {
    console.warn('Some multiplayer elements are still missing. Check the IDs.');
}

// --- Функции ---
function createMultiplayerRoom() {
    mpClientId = 'host-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2,5);
    mpRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    displayRoomCode.textContent = mpRoomCode;
    isHost = true;
    signalingSince = 0;
    processedJoinClients.clear();
    mpPlayers = [{ id: mpClientId, name: 'Хост', isHost: true }];
    resetUIForRole();
    document.getElementById('multiplayerMenuScreen').style.display = 'none';
    roomScreen.style.display = 'flex';
    startSignalingPolling();
    updatePlayerListUI();
    mpNameInput.style.display = 'inline-block';
    mpConfirmNameBtn.style.display = 'inline-block';
    mpNameInput.value = '';
    startMpGameBtn.style.display = 'none';
    startMpGameBtn.disabled = true;
    themeBrowserArea.style.display = 'none';
    connectionStatus.style.display = 'block';
    connectionStatus.textContent = 'Очакване на играчи...';
}

function joinMultiplayerRoom(code) {
    mpClientId = 'joiner-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2,5);
    mpRoomCode = code.toUpperCase();
    displayRoomCode.textContent = mpRoomCode;
    isHost = false;
    signalingSince = 0;
    processedJoinClients.clear();
    mpPlayers = [{ id: mpClientId, name: 'Аз', isHost: false }];
    resetUIForRole();
    document.getElementById('joinRoomScreen').style.display = 'none';
    roomScreen.style.display = 'flex';
    startSignalingPolling();
    updatePlayerListUI();
    mpNameInput.style.display = 'inline-block';
    mpConfirmNameBtn.style.display = 'inline-block';
    mpNameInput.value = '';
}

function resetUIForRole() {
    mpGameStarted = false;
    mpDataChannelOpen = false;
    for (let id in mpPeerConnections) {
        mpPeerConnections[id].close();
    }
    mpPeerConnections = {};
    mpDataChannels = {};
    if (signalingPollInterval) clearInterval(signalingPollInterval);
    clearTimeout(mpQuestionTimer);
    startMpGameBtn.style.display = 'none';
    startMpGameBtn.disabled = true;
    themeBrowserArea.style.display = 'none';
    mpNameInput.style.display = 'inline-block';
    mpConfirmNameBtn.style.display = 'inline-block';
    mpNameInput.value = '';
}

function confirmNameAndConnect() {
    mpPlayerName = mpNameInput.value.trim() || 'Играч-' + Date.now().toString(36).substring(0,4);
    if (mpPlayerName.length > 20) mpPlayerName = mpPlayerName.substring(0, 20);
    mpNameInput.style.display = 'none';
    mpConfirmNameBtn.style.display = 'none';
    const me = mpPlayers.find(p => p.id === mpClientId);
    if (me) {
        me.name = mpPlayerName;
    } else {
        mpPlayers.push({ id: mpClientId, name: mpPlayerName, isHost: isHost });
    }
    updatePlayerListUI();
    if (isHost) {
        themeBrowserArea.style.display = 'block';
        populateThemeBrowser();
        startMpGameBtn.style.display = 'inline-block';
        startMpGameBtn.disabled = true;
        updateStartButtonState();
    }
    if (!isHost) {
        sendSignalingMessage({ type: 'JOIN', clientId: mpClientId, name: mpPlayerName });
    }
}

function startSignalingPolling() {
    if (signalingPollInterval) clearInterval(signalingPollInterval);
    signalingSince = 0;
    signalingPollInterval = setInterval(pollSignaling, 500);
}

async function pollSignaling() {
    try {
        const url = `https://stanibogat-api.nataliya-atanasova.workers.dev/signal?room=${mpRoomCode}&since=${signalingSince}`;
        const resp = await fetch(url);
        const messages = await resp.json();

        for (const msg of messages) {
            if (msg.client === mpClientId) continue;
            const data = JSON.parse(msg.message);
            if (data.type === 'JOIN') {
                if (isHost) {
                    if (!processedJoinClients.has(data.clientId)) {
                        processedJoinClients.add(data.clientId);
                        handleJoinerJoin(data.clientId, data.name);
                    } else {
                        console.warn('Duplicate JOIN from', data.clientId, 'ignored');
                    }
                }
            } else if (data.type === 'SIGNAL') {
                const targetClient = data.targetClient || msg.client;
                if (data.sdp) {
                    await handleRemoteSDP(targetClient, data.sdp);
                } else if (data.candidate) {
                    await handleRemoteICE(targetClient, data.candidate);
                }
            }
            signalingSince = Math.max(signalingSince, msg.timestamp);
        }
    } catch (e) {
        console.error('❌ POLL ERROR:', e);
    }
}

async function sendSignalingMessage(message) {
    try {
        await fetch(
            `https://stanibogat-api.nataliya-atanasova.workers.dev/signal?room=${mpRoomCode}&client=${mpClientId}`,
            { method: 'POST', body: JSON.stringify(message), headers: { 'Content-Type': 'application/json' } }
        );
    } catch (e) {
        console.error('❌ SEND SIGNAL ERROR:', e);
    }
}

function handleJoinerJoin(clientId, name) {
    if (mpPlayers.find(p => p.id === clientId)) return;
    console.log(`👋 New player: ${name} (${clientId})`);
    mpPlayers.push({ id: clientId, name: name, isHost: false });
    updatePlayerListUI();
    broadcastToAll({ type: 'PLAYER_LIST', players: mpPlayers });
    updateStartButtonState();
    createPeerConnectionForClient(clientId);
}

function createPeerConnectionForClient(clientId) {
    if (mpPeerConnections[clientId]) {
        console.warn('Already have a connection for this client');
        return;
    }
    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    mpPeerConnections[clientId] = pc;

    const channel = pc.createDataChannel('game');
    setupDataChannel(clientId, channel);
    mpDataChannels[clientId] = channel;

    pc.onicecandidate = (event) => {
        if (event.candidate) {
            sendSignalingMessage({ type: 'SIGNAL', targetClient: clientId, candidate: event.candidate });
        }
    };

    pc.createOffer().then(offer => {
        return pc.setLocalDescription(offer);
    }).then(() => {
        sendSignalingMessage({ type: 'SIGNAL', targetClient: clientId, sdp: pc.localDescription });
    }).catch(err => {
        console.error('Error creating offer:', err);
    });
}

async function handleRemoteSDP(clientId, sdp) {
    const pc = mpPeerConnections[clientId];
    if (!pc) {
        if (isHost) {
            console.warn('Received SDP from client without a connection (host ignores)');
            return;
        } else {
            const newPc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
            mpPeerConnections[clientId] = newPc;
            newPc.ondatachannel = (event) => {
                const channel = event.channel;
                setupDataChannel(clientId, channel);
                mpDataChannels[clientId] = channel;
            };
            newPc.onicecandidate = (event) => {
                if (event.candidate) {
                    sendSignalingMessage({ type: 'SIGNAL', targetClient: clientId, candidate: event.candidate });
                }
            };
            await newPc.setRemoteDescription(new RTCSessionDescription(sdp));
            const answer = await newPc.createAnswer();
            await newPc.setLocalDescription(answer);
            sendSignalingMessage({ type: 'SIGNAL', targetClient: clientId, sdp: newPc.localDescription });
        }
    } else {
        if (pc.signalingState === 'have-local-offer') {
            await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        } else {
            console.warn(`SDP ignored, signaling state: ${pc.signalingState}`);
        }
    }
}

const pendingCandidates = {};

async function handleRemoteICE(clientId, candidate) {
    const pc = mpPeerConnections[clientId];
    if (!pc) return;
    if (pc.remoteDescription) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
    } else {
        if (!pendingCandidates[clientId]) pendingCandidates[clientId] = [];
        pendingCandidates[clientId].push(candidate);
        console.log(`Queued ICE candidate for ${clientId}`);
    }
}

function setupDataChannel(clientId, channel) {
    channel.onopen = () => {
        console.log(`🟢 Data channel opened for ${clientId}`);
        mpDataChannelOpen = true;
        connectionStatus.style.display = 'none';
        if (pendingCandidates[clientId]) {
            const pc = mpPeerConnections[clientId];
            pendingCandidates[clientId].forEach(c => {
                if (pc.remoteDescription) {
                    pc.addIceCandidate(new RTCIceCandidate(c)).catch(e => console.error('Failed to add queued ICE:', e));
                }
            });
            delete pendingCandidates[clientId];
        }
        if (isHost) {
            // Send current player list to the newly connected client
            channel.send(JSON.stringify({ type: 'PLAYER_LIST', players: mpPlayers }));
            console.log(`Host sent PLAYER_LIST to ${clientId}:`, mpPlayers);
        }
        // Send own join notification
        channel.send(JSON.stringify({ type: 'PLAYER_JOIN', id: mpClientId, name: mpPlayerName, isHost: isHost }));
        updateStartButtonState();
    };

    channel.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.log(`📩 Received message from ${clientId}:`, msg);
        switch (msg.type) {
            case 'PLAYER_JOIN':
                if (!mpPlayers.find(p => p.id === msg.id)) {
                    mpPlayers.push({ id: msg.id, name: msg.name, isHost: msg.isHost || false });
                    updatePlayerListUI();
                    if (isHost) {
                        broadcastToAll({ type: 'PLAYER_LIST', players: mpPlayers });
                        updateStartButtonState();
                    }
                }
                break;
            case 'PLAYER_LIST':
                mpPlayers = msg.players;
                updatePlayerListUI();
                console.log(`Player list updated for ${mpClientId}:`, mpPlayers);
                break;
            case 'START_GAME':
                beginMpGame(msg.questions, msg.themeKey);
                break;
            case 'QUESTION':
                displayMpQuestion(msg);
                break;
            case 'ANSWER':
                if (isHost) {
                    handleMpAnswer(msg.playerId, msg.answerIndex);
                }
                break;
            case 'ROUND_RESULT':
                processMpRoundResult(msg);
                break;
            case 'GAME_ENDED':
                endMpGame(msg.scores);
                break;
        }
    };

    channel.onclose = () => {
        console.log(`🔴 Data channel closed for ${clientId}`);
        const idx = mpPlayers.findIndex(p => p.id === clientId);
        if (idx !== -1) {
            mpPlayers.splice(idx, 1);
            updatePlayerListUI();
            if (isHost) {
                broadcastToAll({ type: 'PLAYER_LIST', players: mpPlayers });
                updateStartButtonState();
            }
        }
        delete mpDataChannels[clientId];
        delete mpPeerConnections[clientId];
        if (Object.keys(mpDataChannels).length === 0) {
            mpDataChannelOpen = false;
        }
    };
}

function broadcastToAll(message) {
    for (let id in mpDataChannels) {
        if (mpDataChannels[id].readyState === 'open') {
            mpDataChannels[id].send(JSON.stringify(message));
        }
    }
    console.log(`Broadcasted to all open channels:`, message);
}

function updatePlayerListUI() {
    if (!playerListEl) return;
    playerListEl.innerHTML = mpPlayers.map(p => {
        const card = document.createElement('div');
        card.className = 'player-card' + (p.isHost ? ' host-card' : '');
        card.innerHTML = `${p.isHost ? '👑' : ''} ${p.name}`;
        return card.outerHTML;
    }).join('');
    playerCountDisplay.textContent = `Играчи: ${mpPlayers.length} / ${MAX_PLAYERS}`;
    console.log('UI Updated, players:', mpPlayers);
}

function updateStartButtonState() {
    if (!isHost || !startMpGameBtn) return;
    const hasOtherPlayers = mpPlayers.length > 1;
    const hasTheme = selectedQuestions && selectedQuestions.length > 0;
    startMpGameBtn.disabled = !(hasOtherPlayers && hasTheme);
    console.log('Start button disabled:', startMpGameBtn.disabled);
}

async function populateThemeBrowser() {
    if (!themeBrowserInline) return;
    themeBrowserInline.innerHTML = '';

    const builtInContainer = document.createElement('div');
    builtInContainer.style.cssText = 'width:100%; margin-bottom:10px;';
    const builtInLabel = document.createElement('div');
    builtInLabel.textContent = '— Вградени теми —';
    builtInLabel.style.cssText = 'color:gold; font-weight:bold; margin:5px 0; width:100%; text-align:center;';
    builtInContainer.appendChild(builtInLabel);

    for (const themeKey in QUESTIONS_DATA) {
        const chip = document.createElement('div');
        chip.className = 'theme-chip';
        chip.textContent = themeKey;
        chip.addEventListener('click', () => {
            document.querySelectorAll('.theme-chip').forEach(c => c.style.borderColor = '');
            chip.style.borderColor = 'lime';
            selectedThemeKey = themeKey;
            selectedQuestions = QUESTIONS_DATA[themeKey]['bg'] || QUESTIONS_DATA[themeKey][Object.keys(QUESTIONS_DATA[themeKey])[0]];
            updateStartButtonState();
        });
        builtInContainer.appendChild(chip);
    }
    themeBrowserInline.appendChild(builtInContainer);

    const customContainer = document.createElement('div');
    customContainer.style.cssText = 'width:100%;';
    const customLabel = document.createElement('div');
    customLabel.textContent = '— Потребителски теми —';
    customLabel.style.cssText = 'color:gold; font-weight:bold; margin:5px 0; width:100%; text-align:center;';
    customContainer.appendChild(customLabel);

    try {
        const response = await fetch('https://stanibogat-api.nataliya-atanasova.workers.dev/themes');
        const themes = await response.json();
        themes.forEach(theme => {
            const chip = document.createElement('div');
            chip.className = 'theme-chip';
            chip.textContent = theme.name + ' (ID:' + theme.id + ')';
            chip.addEventListener('click', () => {
                document.querySelectorAll('.theme-chip').forEach(c => c.style.borderColor = '');
                chip.style.borderColor = 'lime';
                selectedThemeKey = 'custom_' + theme.id;
                selectedQuestions = JSON.parse(theme.questionsData);
                updateStartButtonState();
            });
            customContainer.appendChild(chip);
        });
    } catch (e) {
        console.warn('Failed to load custom themes:', e);
        const errMsg = document.createElement('div');
        errMsg.textContent = 'Грешка при зареждане на потребителски теми.';
        errMsg.style.cssText = 'color:#ff6b6b; font-size:12px;';
        customContainer.appendChild(errMsg);
    }
    themeBrowserInline.appendChild(customContainer);
}

if (startMpGameBtn) {
    startMpGameBtn.addEventListener('click', () => {
        if (!isHost || mpGameStarted) return;
        if (Object.keys(mpDataChannels).length === 0) {
            alert('Няма свързани играчи.');
            return;
        }
        if (!selectedQuestions || selectedQuestions.length === 0) {
            alert('Моля, изберете тема.');
            return;
        }
        broadcastToAll({ type: 'START_GAME', questions: selectedQuestions, themeKey: selectedThemeKey });
        beginMpGame(selectedQuestions, selectedThemeKey);
    });
}

function beginMpGame(questions, themeKey) {
    mpGameStarted = true;
    mpQuestions = questions;
    mpCurrentQuestion = 0;
    mpScores = {};
    mpPlayers.forEach(p => mpScores[p.id] = 0);
    themeBrowserArea.style.display = 'none';
    startMpGameBtn.style.display = 'none';
    roomScreen.style.display = 'none';

    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = 'block';
    gameContainer.style.opacity = '1';
    currentTheme = themeKey;
    currentThemeQuestions = questions;
    currentTotalQuestions = questions.length;
    const moneyTree = document.getElementById('moneyTree');
    if (moneyTree) { moneyTree.style.display = 'block'; generateMoneyTree(themeKey); }
    const moneyTreeToggle = document.getElementById('moneyTreeToggle');
    if (moneyTreeToggle) { moneyTreeToggle.style.display = 'block'; moneyTreeToggle.style.opacity = '1'; }
    const levelIndicator = document.querySelector('.level-indicator');
    if (levelIndicator) levelIndicator.style.display = 'block';
    const backButtonContainer = document.querySelector('.game-back-button-container');
    if (backButtonContainer) backButtonContainer.style.display = 'block';
    const gameBack = document.getElementById('gameBackButton');
    if (gameBack) gameBack.style.display = 'block';
    
    gameContainer.classList.remove('narrow');
    moneyTreeToggle.innerHTML = '💰';
    gameState.isMoneyTreeVisible = false;
    setTimeout(() => updateGameContainerResponsiveness(), 100);
    stopRetroMusic();
    setThemeBackground(themeKey);
    playThemeMusic(themeKey);
    if (themeKey === 'Minecraft') {
        applyMinecraftTheme();
    } else {
        removeMinecraftTheme();
    }

    updateLevelIndicator();
    const answersContainer = document.getElementById('answersContainer');
    if (answersContainer) answersContainer.innerHTML = '';
    sendNextMpQuestion();
}

function sendNextMpQuestion() {
    clearTimeout(mpQuestionTimer);
    if (mpCurrentQuestion >= mpQuestions.length) {
        broadcastToAll({ type: 'GAME_ENDED', scores: mpScores });
        endMpGame(mpScores);
        return;
    }
    const q = mpQuestions[mpCurrentQuestion];
    broadcastToAll({ type: 'QUESTION', question: q.question, answers: q.answers, correct: q.correct, timeLimit: 15 });
    mpAnswers = {};
    displayMpQuestion({ question: q.question, answers: q.answers });
    mpQuestionTimer = setTimeout(() => {
        mpCurrentQuestion++;
        sendNextMpQuestion();
    }, 15000);
}

function displayMpQuestion(data) {
    document.getElementById('questionText').textContent = data.question;
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    data.answers.forEach((ans, idx) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = `${String.fromCharCode(65 + idx)}) ${ans}`;
        btn.onclick = () => {
            if (isHost) {
                handleMpAnswer(mpClientId, idx);
            } else {
                broadcastToAll({ type: 'ANSWER', playerId: mpClientId, answerIndex: idx });
            }
            btn.disabled = true;
        };
        answersContainer.appendChild(btn);
    });
}

function handleMpAnswer(playerId, answerIndex) {
    if (!isHost) return;
    mpAnswers[playerId] = answerIndex;
    const answeredPlayers = Object.keys(mpAnswers).filter(id => mpPlayers.find(p => p.id === id));
    if (answeredPlayers.length >= mpPlayers.length) {
        finishMpQuestion();
    }
}

function finishMpQuestion() {
    clearTimeout(mpQuestionTimer);
    const q = mpQuestions[mpCurrentQuestion];
    const correct = q.correct;
    const results = mpPlayers.map(p => ({
        name: p.name,
        answer: mpAnswers[p.id],
        correct: mpAnswers[p.id] === correct
    }));
    results.forEach(r => {
        if (r.correct) {
            const player = mpPlayers.find(p => p.name === r.name);
            if (player) mpScores[player.id] = (mpScores[player.id] || 0) + 1;
        }
    });
    broadcastToAll({ type: 'ROUND_RESULT', correct, results, scores: mpScores });
    mpCurrentQuestion++;
    sendNextMpQuestion();
}

function processMpRoundResult(data) {
    const btns = document.querySelectorAll('.answer-btn');
    const correctBtn = btns[data.correct];
    const playerResult = data.results.find(r => r.name === mpPlayerName);
    let selectedIdx = playerResult ? playerResult.answer : -1;
    const selectedBtn = (selectedIdx >= 0 && selectedIdx < btns.length) ? btns[selectedIdx] : null;

    btns.forEach(b => b.disabled = true);

    if (selectedBtn) {
        selectedBtn.style.background = 'linear-gradient(135deg, #ffed4e, #ffd700)';
        selectedBtn.style.color = '#000066';
        selectedBtn.style.border = '3px solid #cc9900';
    }

    clearTimeout(gameState.wrongAnswerTimeout);
    gameState.wrongAnswerTimeout = setTimeout(() => {
        if (playerResult && playerResult.correct) {
            if (correctBtn) {
                correctBtn.style.background = 'linear-gradient(135deg, #00ff30, #00cc00)';
                correctBtn.style.color = '#000066';
                correctBtn.style.border = '3px solid #00aa00';
            }
            let sound = 'correctAnswerSound';
            if (gameState.currentQuestion < 5) sound = 'correctAnswerSound';
            else if (gameState.currentQuestion < 10) sound = 'correctAnswer2';
            else sound = 'correctAnswer3';
            playSound(sound);
            setTimeout(() => {
                alert(`✅ Правилен отговор!`);
            }, 3000);
        } else {
            if (correctBtn) {
                correctBtn.style.background = 'linear-gradient(135deg, #00ff30, #00cc00)';
                correctBtn.style.color = '#000066';
                correctBtn.style.border = '3px solid #00aa00';
            }
            playSound('wrongAnswerSound');
            setTimeout(() => {
                alert(`❌ Грешен отговор!`);
            }, 3000);
        }
    }, 2500);
}

function endMpGame(scores) {
    clearTimeout(mpQuestionTimer);
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const winner = sorted[0];
    alert(`🏆 Победител: ${mpPlayers.find(p => p.id === winner[0])?.name || 'Unknown'} с ${winner[1]} точки!`);
    mpGameStarted = false;
    roomScreen.style.display = 'none';
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('multiplayerMenuScreen').style.display = 'flex';
    for (let id in mpPeerConnections) {
        mpPeerConnections[id].close();
    }
    mpPeerConnections = {};
    mpDataChannels = {};
    if (signalingPollInterval) clearInterval(signalingPollInterval);
    mpPlayers = [];
    mpAnswers = {};
    mpDataChannelOpen = false;
}

if (leaveRoomBtn) {
    leaveRoomBtn.addEventListener('click', () => {
        for (let id in mpPeerConnections) {
            mpPeerConnections[id].close();
        }
        mpPeerConnections = {};
        mpDataChannels = {};
        if (signalingPollInterval) clearInterval(signalingPollInterval);
        clearTimeout(mpQuestionTimer);
        mpPlayers = [];
        mpAnswers = {};
        mpGameStarted = false;
        mpDataChannelOpen = false;
        roomScreen.style.display = 'none';
        document.getElementById('multiplayerMenuScreen').style.display = 'flex';
    });
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
        const closeAudience = document.getElementById('closeAudienceModal');
        if (closeAudience) closeAudience.onclick = closeAudienceModal;
        const closePhone = document.getElementById('closePhoneModal');
        if (closePhone) closePhone.onclick = closePhoneModal;
        const audienceModal = document.getElementById('audienceJokerModal');
        if (audienceModal) audienceModal.onclick = e => { if (e.target === audienceModal) closeAudienceModal(); };
        const phoneModal = document.getElementById('phoneJokerModal');
        if (phoneModal) phoneModal.onclick = e => { if (e.target === phoneModal) closePhoneModal(); };
        document.addEventListener('click', e => {
            if (!e.target.classList.contains('answer-btn') && !e.target.classList.contains('joker-btn')) skipAnswerReveal();
        });
        document.addEventListener('keydown', e => {
            if (e.code === 'Space' && gameState.isRevealingAnswers) { e.preventDefault(); skipAnswerReveal(); }
            if (e.code === 'Escape') { closePhoneModal(); closeAudienceModal(); }
        });
        window.addEventListener('resize', updateGameContainerResponsiveness);

        const saveBtn = document.getElementById('saveCloudBtn');
        if (saveBtn) saveBtn.addEventListener('click', saveCurrentThemeToCloud);

        // ===== Custom Editor & Browse buttons =====
        const openEditorButton = document.getElementById('openEditorButton');
        const openBrowseButton = document.getElementById('openBrowseButton');
        const backFromEditorBtn = document.getElementById('backFromEditorBtn');
        const backFromBrowseBtn = document.getElementById('backFromBrowseBtn');
        const saveThemeBtn = document.getElementById('saveThemeBtn');
        const addQuestionBtn = document.getElementById('addQuestionBtn');
        const customEditorScreen = document.getElementById('customEditorScreen');
        const browseThemesScreen = document.getElementById('browseThemesScreen');
        const startMenu = document.getElementById('startMenu');

        if (openEditorButton && openBrowseButton && customEditorScreen && browseThemesScreen) {
            openEditorButton.addEventListener('click', () => {
                performTransition(() => {
                    startMenu.style.display = 'none';
                    customEditorScreen.style.display = 'flex';
                    initEditor();
                });
            });

            openBrowseButton.addEventListener('click', () => {
                performTransition(() => {
                    startMenu.style.display = 'none';
                    browseThemesScreen.style.display = 'flex';
                    fetchAndDisplayThemes('');
                });
            });

            backFromEditorBtn.addEventListener('click', () => {
                performTransition(() => {
                    customEditorScreen.style.display = 'none';
                    startMenu.style.display = 'flex';
                });
            });

            backFromBrowseBtn.addEventListener('click', () => {
                performTransition(() => {
                    browseThemesScreen.style.display = 'none';
                    startMenu.style.display = 'flex';
                });
            });

            saveThemeBtn.addEventListener('click', saveEditorTheme);

            addQuestionBtn.addEventListener('click', () => {
                addQuestionBlock(0, '', ['', '', '', ''], 0);
            });
        }

        const searchInput = document.getElementById('themeSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                fetchAndDisplayThemes(e.target.value);
            });
        }

        // ===== MULTIPLAYER BUTTONS =====
        const multiplayerButton = document.getElementById('multiplayerButton');
        const createRoomButton = document.getElementById('createRoomButton');
        const joinRoomButton = document.getElementById('joinRoomButton');
        const backFromMultiMenuButton = document.getElementById('backFromMultiMenuButton');
        const confirmJoinButton = document.getElementById('confirmJoinButton');
        const backFromJoinButton = document.getElementById('backFromJoinButton');
        const multiplayerMenuScreen = document.getElementById('multiplayerMenuScreen');
        const joinRoomScreen = document.getElementById('joinRoomScreen');

        if (multiplayerButton && multiplayerMenuScreen) {
            multiplayerButton.addEventListener('click', () => {
                performTransition(() => {
                    startMenu.style.display = 'none';
                    multiplayerMenuScreen.style.display = 'flex';
                });
            });

            createRoomButton.addEventListener('click', () => {
                performTransition(() => {
                    multiplayerMenuScreen.style.display = 'none';
                    createMultiplayerRoom();
                });
            });

            joinRoomButton.addEventListener('click', () => {
                performTransition(() => {
                    multiplayerMenuScreen.style.display = 'none';
                    joinRoomScreen.style.display = 'flex';
                });
            });

            backFromMultiMenuButton.addEventListener('click', () => {
                performTransition(() => {
                    multiplayerMenuScreen.style.display = 'none';
                    startMenu.style.display = 'flex';
                });
            });

            confirmJoinButton.addEventListener('click', () => {
                const code = document.getElementById('roomCodeInput').value.trim();
                if (code) {
                    performTransition(() => {
                        joinMultiplayerRoom(code);
                    });
                }
            });

            backFromJoinButton.addEventListener('click', () => {
                performTransition(() => {
                    joinRoomScreen.style.display = 'none';
                    multiplayerMenuScreen.style.display = 'flex';
                });
            });
        }

        // Initialize global active users counter
        initActiveUsersCounter();

        console.log("=== GAME INITIALIZATION COMPLETE ===");
    } catch (err) {
        console.error("CRITICAL ERROR during initialization:", err);
        alert("Възникна грешка при инициализация.");
    }
});
