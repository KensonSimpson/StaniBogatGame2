// ============================================
// GAME CONFIGURATION
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

// ============================================
// THEME BACKGROUNDS & MUSIC
// ============================================
const DEFAULT_BACKGROUND = '/images/StaniBogatBackground.jpg';
const THEME_BACKGROUNDS = {
    "Minecraft": '/images/StaniBogatMinecraftWallpaper1.jpg'
};

let currentThemeMusic = null;

function setThemeBackground(themeKey) {
    const body = document.body;
    let bgImage = DEFAULT_BACKGROUND;
    if (themeKey && THEME_BACKGROUNDS[themeKey]) {
        bgImage = THEME_BACKGROUNDS[themeKey];
    }
    body.style.backgroundImage = `url('${bgImage}')`;
}

function resetToDefaultBackground() {
    document.body.style.backgroundImage = `url('${DEFAULT_BACKGROUND}')`;
}

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
        } else {
            console.error("minecraftMusic element not found!");
        }
    }
}

function playMinecraftClick() {
    if (currentTheme !== 'Minecraft') return;
    
    // Try using the dedicated audio element first
    const clickSound = document.getElementById('minecraftClickSound');
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.volume = settings.sfxVolume;
        clickSound.play().catch(e => {
            console.log("Dedicated click sound failed, using fallback", e);
            // Fallback: create a new Audio object
            const fallback = new Audio('/sounds/MinecraftClick.mp3');
            fallback.volume = settings.sfxVolume;
            fallback.play().catch(err => console.log("Fallback click sound also failed", err));
        });
    } else {
        // No element, create directly
        const fallback = new Audio('/sounds/MinecraftClick.mp3');
        fallback.volume = settings.sfxVolume;
        fallback.play().catch(err => console.log("Click sound failed", err));
    }
}

function minecraftClickHandler(e) {
    if (currentTheme === 'Minecraft') {
        const btn = e.target.closest('.answer-btn, .joker-btn');
        if (btn) {
            playMinecraftClick();
        }
    }
}

function attachMinecraftClickSound() {
    const gameContainer = document.getElementById('gameContainer');
    if (!gameContainer) return;
    gameContainer.removeEventListener('click', minecraftClickHandler);
    gameContainer.addEventListener('click', minecraftClickHandler);
}

function applyMinecraftTheme() {
    const gameContainer = document.getElementById('gameContainer');
    const gameTitle = document.querySelector('#gameContainer h1');
    if (gameContainer) {
        gameContainer.classList.add('minecraft-theme');
        attachMinecraftClickSound();
    }
    if (gameTitle) {
        gameTitle.textContent = 'MINECRAFT';
    }
}

function removeMinecraftTheme() {
    const gameContainer = document.getElementById('gameContainer');
    const gameTitle = document.querySelector('#gameContainer h1');
    if (gameContainer) {
        gameContainer.classList.remove('minecraft-theme');
        gameContainer.removeEventListener('click', minecraftClickHandler);
    }
    if (gameTitle) {
        gameTitle.textContent = '🎮 СТАНИ БОГАТ 🎮';
    }
}

// ============================================
// INTRO VIDEO (optional)
// ============================================
function playIntroVideo() {
    const videoContainer = document.getElementById('introVideo');
    const videoPlayer = document.getElementById('introVideoPlayer');
    const skipButton = document.getElementById('skipIntro');
    if (!videoContainer || !videoPlayer) {
        console.log("Video elements not found, skipping intro");
        return;
    }
    console.log("Playing intro video...");
    videoContainer.style.display = 'flex';
    if (skipButton) {
        skipButton.addEventListener('click', function () {
            console.log("Video skipped");
            videoContainer.style.display = 'none';
            videoPlayer.pause();
        });
    }
    videoPlayer.addEventListener('ended', function () {
        console.log("Video ended");
        videoContainer.style.display = 'none';
    });
    videoPlayer.play().catch(error => {
        console.log("Video autoplay prevented:", error);
        if (skipButton) {
            skipButton.textContent = "► Пусни видеото";
            skipButton.style.background = "rgba(255, 215, 0, 0.8)";
        }
    });
    videoContainer.addEventListener('click', function (event) {
        if (event.target === videoContainer || event.target === videoPlayer) {
            videoContainer.style.display = 'none';
            videoPlayer.pause();
        }
    });
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
    moneyItems.forEach((item, index) => {
        item.classList.remove('current', 'won');
        const questionNumber = 15 - index;
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
// LANGUAGE SYSTEM (with theme support)
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
    console.log("Changing language to:", lang);
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
// SETTINGS (full original)
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
    closeSettings.addEventListener('click', () => settingsModal.style.display = 'none');
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
    const sounds = ['moveForwardSound', 'answerChosenSound', 'joker5050Sound', 'correctAnswerSound', 'correctAnswer2', 'correctAnswer3', 'wrongAnswerSound', 'friendJokerTimeTick1', 'friendJokerTimeTick2'];
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
// MONEY TREE
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
// START MENU & THEME SELECTION (UPDATED)
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
    const themeScreen = document.getElementById('themeSelectionScreen');
    const backFromTheme = document.getElementById('backFromThemeButton');
    const themeButtonsContainer = document.querySelector('.theme-buttons-container');

    // Populate theme buttons from QUESTIONS_DATA
    if (themeButtonsContainer && typeof QUESTIONS_DATA !== 'undefined') {
        themeButtonsContainer.innerHTML = '';
        for (const themeKey in QUESTIONS_DATA) {
            const button = document.createElement('button');
            button.className = 'theme-btn';
            button.setAttribute('data-theme', themeKey);
            button.textContent = themeKey;
            themeButtonsContainer.appendChild(button);
        }
    } else {
        console.error("QUESTIONS_DATA not loaded or theme container missing");
    }

    // Start button -> show theme selection
    if (startButton) {
        startButton.addEventListener('click', () => {
            console.log("Start button clicked!");
            performTransition(() => {
                startMenu.style.display = 'none';
                themeScreen.style.display = 'flex';
            });
        });
    } else {
        console.error("CRITICAL: Start button not found!");
    }

    // Theme button handlers
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const themeKey = btn.getAttribute('data-theme');
            if (!loadThemeQuestions(themeKey)) {
                alert("Темата няма въпроси. Опитайте друга.");
                return;
            }
            gameState.currentQuestion = 0;
            gameState.usedJokers = { fiftyFifty: false, audience: false, phone: false };
            document.querySelectorAll('.joker-btn').forEach(b => { b.disabled = false; b.classList.remove('used'); });
            performTransition(() => {
                themeScreen.style.display = 'none';
                gameContainer.style.display = 'block';
                gameContainer.style.opacity = '1';
                if (moneyTree) moneyTree.style.display = 'block';
                if (levelIndicator) levelIndicator.style.display = 'block';
                if (backButtonContainer) backButtonContainer.style.display = 'block';
                if (gameBack) gameBack.style.display = 'block';
                if (moneyTreeToggle) { moneyTreeToggle.style.display = 'block'; moneyTreeToggle.style.opacity = '1'; }
                if (moneyTree) { moneyTree.classList.remove('visible'); moneyTree.style.opacity = '1'; }
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
            }, () => {
                loadQuestion();
            });
        });
    });

    // Back from theme screen
    if (backFromTheme) {
        backFromTheme.addEventListener('click', () => {
            performTransition(() => {
                themeScreen.style.display = 'none';
                startMenu.style.display = 'flex';
                resetToDefaultBackground();
                stopThemeMusic();
            });
        });
    }

    // Game Back Button
    if (gameBack) {
        gameBack.addEventListener('click', () => {
            console.log("Game back button clicked");
            performTransition(() => {
                gameContainer.style.display = 'none';
                if (moneyTree) moneyTree.style.display = 'none';
                if (levelIndicator) levelIndicator.style.display = 'none';
                if (backButtonContainer) backButtonContainer.style.display = 'none';
                gameBack.style.display = 'none';
                if (moneyTreeToggle) moneyTreeToggle.style.display = 'none';
                startMenu.style.display = 'flex';
                gameState.currentQuestion = 0;
                gameState.usedJokers = { fiftyFifty: false, audience: false, phone: false };
                document.querySelectorAll('.joker-btn').forEach(b => { b.disabled = false; b.classList.remove('used'); });
                currentTheme = null;
                currentThemeQuestions = null;
                resetToDefaultBackground();
                stopThemeMusic();
                removeMinecraftTheme();
            });
        });
    }

    // Tutorial button
    if (tutorialButton) {
        tutorialButton.addEventListener('click', () => {
            performTransition(() => {
                startMenu.style.display = 'none';
                if (tutorialScreen) tutorialScreen.style.display = 'flex';
                stopRetroMusic();
            });
        });
    } else {
        console.error("Tutorial button not found!");
    }

    // Spinning Wheel button
    if (spinningWheelButton) {
        spinningWheelButton.addEventListener('click', () => {
            performTransition(() => {
                startMenu.style.display = 'none';
                if (wheelScreen) wheelScreen.style.display = 'flex';
                playRetroMusic();
            });
        });
    } else {
        console.error("Spinning Wheel button not found!");
    }

    // Back button from tutorial
    if (backButton) {
        backButton.addEventListener('click', () => {
            performTransition(() => {
                if (tutorialScreen) tutorialScreen.style.display = 'none';
                startMenu.style.display = 'flex';
            });
        });
    }

    // Back button from spinning wheel
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
// SPINNING WHEEL (with custom support)
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
// GAME QUESTIONS (theme‑aware)
// ============================================
function loadQuestion() {
    let qArray = currentThemeQuestions ? currentThemeQuestions : (TRANSLATIONS[currentLanguage]?.questions);
    if (!qArray) { console.error("No questions available"); return; }
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
    if (gameState.answerRevealTimeout) clearTimeout(gameState.answerRevealTimeout);
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
    if (levelEl && prizeEl && t && t.prizes) {
        const prize = t.prizes[gameState.currentQuestion] || TRANSLATIONS.bg.prizes[gameState.currentQuestion] || `${(gameState.currentQuestion + 1) * 100} BGN`;
        prizeEl.textContent = prize;
        const indicator = document.querySelector('.level-indicator');
        if (indicator && t.levelIndicator) {
            indicator.innerHTML = t.levelIndicator.replace('{level}', gameState.currentQuestion + 1).replace('{prize}', prize);
        }
    }
}

// ============================================
// JOKERS (with theme support in 50:50)
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
// ANSWER CHECKING (original)
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
    setTimeout(() => {
        if (selected === correct) {
            let sound;
            if (gameState.currentQuestion === 4 || gameState.currentQuestion === 9) sound = 'correctAnswer3';
            else if (gameState.currentQuestion < 5) sound = 'correctAnswerSound';
            else sound = 'correctAnswer2';
            selectedBtn.style.background = 'linear-gradient(135deg, #00ff30, #00cc00)';
            selectedBtn.style.color = '#000066';
            selectedBtn.style.border = '3px solid #00aa00';
            playSound(sound);
            setTimeout(() => {
                const t = TRANSLATIONS[currentLanguage];
                const prize = t?.prizes?.[gameState.currentQuestion] || `${(gameState.currentQuestion + 1) * 100} BGN`;
                alert(`✅ Правилен отговор! Спечелихте ${prize}!`);
                gameState.currentQuestion++;
                if (gameState.currentQuestion < 15) {
                    playSound('moveForwardSound');
                    setTimeout(() => loadQuestion(), 1000);
                } else {
                    alert('🎉 ЧЕСТИТО! Спечелихте 100,000 BGN!');
                    gameState.currentQuestion = 0;
                    resetGame();
                }
            }, 3000);
        } else {
            if (correctBtn) {
                correctBtn.style.background = 'linear-gradient(135deg, #00ff30, #00cc00)';
                correctBtn.style.color = '#000066';
                correctBtn.style.border = '3px solid #00aa00';
            }
            playSound('wrongAnswerSound');
            setTimeout(() => {
                const t = TRANSLATIONS[currentLanguage];
                const prize = gameState.currentQuestion > 0 ? (t?.prizes?.[gameState.currentQuestion - 1] || `${gameState.currentQuestion * 100} BGN`) : 'нищо';
                alert(`❌ Грешен отговор! Играта свърши. Спечелихте: ${prize}`);
                gameState.currentQuestion = 0;
                resetGame();
            }, 3000);
        }
    }, 2500);
}
function resetGame() {
    gameState.usedJokers = { fiftyFifty: false, audience: false, phone: false };
    document.querySelectorAll('.joker-btn').forEach(btn => { btn.disabled = false; btn.classList.remove('used'); });
    setTimeout(loadQuestion, 1000);
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    console.log("=== GAME INITIALIZATION STARTED ===");
    // playIntroVideo(); // uncomment if you have intro video

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
        console.log("=== GAME INITIALIZATION COMPLETE ===");
    } catch (err) {
        console.error("CRITICAL ERROR during initialization:", err);
        alert("Възникна грешка при инициализация.");
    }
});
