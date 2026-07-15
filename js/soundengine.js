// ==================== SOUND ENGINE ====================
class SoundEngine {
    constructor() {
        this.sounds = {};
        this.music = null;
        this.isMuted = false;
        this.isMusicMuted = false;
        this.volume = 0.6;
        this.musicVolume = 0.3;
        this.loadSounds();
        window.sound = this;
        window.musicEngine = this;
        window.soundEngine = this;
    }

    // ==================== LOAD SOUNDS ====================
    loadSounds() {
        // Sound effects (Web Audio API se generate karte hain)
        this.sounds = {
            click: this.createClickSound(),
            collect: this.createCollectSound(),
            hit: this.createHitSound(),
            gameOver: this.createGameOverSound(),
            levelUp: this.createLevelUpSound(),
            win: this.createWinSound(),
            jump: this.createJumpSound(),
            explosion: this.createExplosionSound(),
            coin: this.createCoinSound(),
            powerup: this.createPowerupSound()
        };

        // Background music (Web Audio API se generate)
        this.music = this.createBackgroundMusic();
    }

    // ==================== CREATE SOUNDS (Web Audio API) ====================
    createClickSound() {
        return () => {
            if (this.isMuted) return;
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 800;
            osc.type = 'sine';
            gain.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.1);
        };
    }

    createCollectSound() {
        return () => {
            if (this.isMuted) return;
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(500, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
            osc.type = 'sine';
            gain.gain.setValueAtTime(this.volume * 0.4, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.2);
        };
    }

    createHitSound() {
        return () => {
            if (this.isMuted) return;
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 200;
            osc.type = 'sawtooth';
            gain.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.3);
        };
    }

    createGameOverSound() {
        return () => {
            if (this.isMuted) return;
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5);
            osc.type = 'sawtooth';
            gain.gain.setValueAtTime(this.volume * 0.4, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.6);
        };
    }

    createLevelUpSound() {
        return () => {
            if (this.isMuted) return;
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const notes = [523, 659, 784];
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                const startTime = ctx.currentTime + i * 0.1;
                gain.gain.setValueAtTime(this.volume * 0.3, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);
                osc.start(startTime);
                osc.stop(startTime + 0.2);
            });
        };
    }

    createWinSound() {
        return () => {
            if (this.isMuted) return;
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const notes = [523, 587, 659, 784, 880];
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                const startTime = ctx.currentTime + i * 0.12;
                gain.gain.setValueAtTime(this.volume * 0.3, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);
                osc.start(startTime);
                osc.stop(startTime + 0.2);
            });
        };
    }

    createJumpSound() {
        return () => {
            if (this.isMuted) return;
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(300, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
            osc.type = 'sine';
            gain.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.15);
        };
    }

    createExplosionSound() {
        return () => {
            if (this.isMuted) return;
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const bufferSize = ctx.sampleRate * 0.3;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
            }
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            const gain = ctx.createGain();
            source.connect(gain);
            gain.connect(ctx.destination);
            gain.gain.setValueAtTime(this.volume * 0.4, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
            source.start(ctx.currentTime);
            source.stop(ctx.currentTime + 0.3);
        };
    }

    createCoinSound() {
        return () => {
            if (this.isMuted) return;
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
            osc.type = 'sine';
            gain.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.12);
        };
    }

    createPowerupSound() {
        return () => {
            if (this.isMuted) return;
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const notes = [523, 659, 784, 1047];
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                const startTime = ctx.currentTime + i * 0.08;
                gain.gain.setValueAtTime(this.volume * 0.3, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
                osc.start(startTime);
                osc.stop(startTime + 0.15);
            });
        };
    }

    // ==================== BACKGROUND MUSIC ====================
    createBackgroundMusic() {
        let isPlaying = false;
        let ctx = null;
        let gainNode = null;
        let intervalId = null;

        const playNote = (freq, duration, time, vol) => {
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(gainNode);
            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(vol * 0.2, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
            osc.start(time);
            osc.stop(time + duration);
        };

        const playChord = (notes, duration, time, vol) => {
            notes.forEach(freq => playNote(freq, duration, time, vol));
        };

        const musicLoop = () => {
            if (!ctx || !gainNode) return;
            const startTime = ctx.currentTime;
            
            // Simple melody (C major)
            const melody = [
                [523, 0.2], [587, 0.2], [659, 0.2], [784, 0.4],
                [659, 0.2], [587, 0.2], [523, 0.4],
                [784, 0.2], [880, 0.2], [784, 0.2], [659, 0.4],
                [587, 0.2], [659, 0.2], [784, 0.4]
            ];

            melody.forEach(([freq, duration], i) => {
                const time = startTime + i * 0.25;
                playNote(freq, duration, time, this.musicVolume);
            });

            // Bass notes
            const bassNotes = [262, 262, 330, 330, 392, 392, 330];
            bassNotes.forEach((freq, i) => {
                const time = startTime + i * 0.5;
                playNote(freq, 0.4, time, this.musicVolume * 0.5);
            });
        };

        return {
            start: () => {
                if (this.isMusicMuted || isPlaying) return;
                try {
                    ctx = new (window.AudioContext || window.webkitAudioContext)();
                    gainNode = ctx.createGain();
                    gainNode.connect(ctx.destination);
                    gainNode.gain.value = this.musicVolume * 0.3;
                    
                    isPlaying = true;
                    musicLoop();
                    intervalId = setInterval(musicLoop, 4000);
                } catch (e) {
                    console.log('Audio not supported');
                }
            },
            stop: () => {
                isPlaying = false;
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
                if (ctx) {
                    ctx.close();
                    ctx = null;
                    gainNode = null;
                }
            },
            toggle: () => {
                if (isPlaying) {
                    this.isMusicMuted = true;
                    musicEngine.music.stop();
                } else {
                    this.isMusicMuted = false;
                    musicEngine.music.start();
                }
            }
        };
    }

    // ==================== PLAY SOUNDS ====================
    play(soundName) {
        if (this.isMuted) return;
        const sound = this.sounds[soundName];
        if (sound) {
            try {
                sound();
            } catch (e) {
                console.log('Sound error:', e);
            }
        }
    }

    playClick() { this.play('click'); }
    playCollect() { this.play('collect'); }
    playScore() { this.play('collect'); }
    playCrash() { this.play('hit'); }
    playLose() { this.play('gameOver'); }
    playWin() { this.play('win'); }
    playJump() { this.play('jump'); }
    playExplosion() { this.play('explosion'); }
    playCoin() { this.play('coin'); }
    playPowerUp() { this.play('powerup'); }
    playDice() { this.play('levelUp'); }
    playShoot() { this.play('click'); }
    playFlip() { this.play('click'); }

    // ==================== MUTE CONTROLS ====================
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.syncUiButtons();
        return this.isMuted;
    }

    toggleMusic() {
        this.isMusicMuted = !this.isMusicMuted;
        if (this.isMusicMuted) {
            this.music.stop();
        } else {
            this.music.start();
        }
        this.syncUiButtons();
        return this.isMusicMuted;
    }

    toggle() {
        return this.toggleMute();
    }

    syncUiButtons() {
        const soundBtn = document.getElementById('soundToggle') || document.getElementById('muteBtn') || document.getElementById('muteBtnMobile');
        if (soundBtn) {
            soundBtn.textContent = this.isMuted ? '🔇' : '🔊';
        }
    }

    // ==================== VOLUME CONTROL ====================
    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
        this.musicVolume = this.volume * 0.5;
    }
}

// ==================== GLOBAL INSTANCE ====================
const musicEngine = new SoundEngine();

// ==================== GAME SOUND FUNCTIONS ====================
function playSound(soundName) {
    musicEngine.play(soundName);
}

function toggleMute() {
    const muted = musicEngine.toggleMute();
    if (document.getElementById('soundToggle')) {
        document.getElementById('soundToggle').textContent = muted ? '🔇' : '🔊';
    }
}

function toggleMusic() {
    const muted = musicEngine.toggleMusic();
}

// ==================== AUTO-START MUSIC ====================
document.addEventListener('DOMContentLoaded', () => {
    // Ensure manifest exists for installability on pages that don't include it.
    if (!document.querySelector('link[rel="manifest"]')) {
        const manifestLink = document.createElement('link');
        manifestLink.rel = 'manifest';
        manifestLink.href = location.pathname.includes('/games/') ? '../manifest.json' : 'manifest.json';
        document.head.appendChild(manifestLink);
    }

    if (!document.querySelector('meta[name="theme-color"]')) {
        const themeMeta = document.createElement('meta');
        themeMeta.name = 'theme-color';
        themeMeta.content = '#0a0a1a';
        document.head.appendChild(themeMeta);
    }

    // Add crawlable H1 + descriptive intro for game pages.
    if (window.location.pathname.includes('/games/') && !document.querySelector('.seo-intro')) {
        const titleText = document.title
            .replace(/\s*\|\s*AlMaGen-Arena\s*$/i, '')
            .replace(/\s*-\s*Play Free Online\s*$/i, '')
            .trim();
        const descMeta = document.querySelector('meta[name="description"]');
        const description = descMeta
            ? descMeta.getAttribute('content')
            : 'Play free online on AlMaGen-Arena with desktop keyboard controls or mobile touch navigation.';

        if (!document.getElementById('almagen-seo-intro-style')) {
            const seoStyle = document.createElement('style');
            seoStyle.id = 'almagen-seo-intro-style';
            seoStyle.textContent = `
                .seo-intro {
                    max-width: 820px;
                    margin: 0 16px 10px;
                    text-align: center;
                }
                .seo-intro h1 {
                    margin: 0 0 6px;
                    font-size: 1.1rem;
                    line-height: 1.3;
                    color: #ffffff;
                    font-weight: 700;
                }
                .seo-intro p {
                    margin: 0;
                    font-size: 0.78rem;
                    line-height: 1.55;
                    color: rgba(255,255,255,0.72);
                }
            `;
            document.head.appendChild(seoStyle);
        }

        const seoSection = document.createElement('section');
        seoSection.className = 'seo-intro';

        const h1 = document.createElement('h1');
        h1.textContent = titleText || 'Play Free Online Game';

        const intro = document.createElement('p');
        intro.textContent = `${description} Desktop players can use arrow keys or keyboard controls, while mobile, tablet, and iPhone users can use on-screen buttons and touch drag or swipe movement.`;

        seoSection.appendChild(h1);
        seoSection.appendChild(intro);

        const gameContainer = document.getElementById('gameContainer');
        if (gameContainer && gameContainer.parentNode) {
            gameContainer.parentNode.insertBefore(seoSection, gameContainer);
        }
    }

    // Register service worker globally (fallback when app-updater.js isn't loaded).
    if ('serviceWorker' in navigator) {
        const swPath = '/sw.js';
        navigator.serviceWorker.getRegistration(swPath).then((registration) => {
            if (!registration) {
                navigator.serviceWorker.register(swPath).catch(() => {});
            }
        }).catch(() => {});
    }

    // ==================== GLOBAL PWA INSTALL CTA ====================
    let deferredInstallPrompt = null;
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

    const styleId = 'almagen-install-style';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .almagen-install-cta {
                position: fixed;
                left: 50%;
                bottom: max(16px, env(safe-area-inset-bottom));
                transform: translateX(-50%);
                z-index: 9996;
                display: none;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                pointer-events: none;
            }
            .almagen-install-btn {
                pointer-events: auto;
                border: none;
                border-radius: 999px;
                padding: 12px 18px;
                font-family: 'Poppins', sans-serif;
                font-weight: 700;
                font-size: 0.9rem;
                color: #042018;
                background: linear-gradient(135deg, #00ff88, #7dffbf);
                box-shadow: 0 10px 28px rgba(0, 255, 136, 0.25);
                cursor: pointer;
                white-space: nowrap;
            }
            .almagen-install-hint {
                pointer-events: auto;
                color: rgba(255,255,255,0.9);
                background: rgba(0,0,0,0.45);
                border: 1px solid rgba(255,255,255,0.12);
                backdrop-filter: blur(10px);
                border-radius: 10px;
                padding: 7px 10px;
                font-size: 0.75rem;
                text-align: center;
                max-width: 92vw;
            }
            @media (max-width: 480px) {
                .almagen-install-btn {
                    width: calc(100vw - 24px);
                    max-width: 360px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    let installWrap = document.getElementById('almagenInstallCta');
    if (!installWrap) {
        installWrap = document.createElement('div');
        installWrap.id = 'almagenInstallCta';
        installWrap.className = 'almagen-install-cta';

        const installBtn = document.createElement('button');
        installBtn.className = 'almagen-install-btn';
        installBtn.id = 'almagenInstallBtn';
        installBtn.type = 'button';
        installBtn.textContent = '⬇ Install App';

        const installHint = document.createElement('div');
        installHint.className = 'almagen-install-hint';
        installHint.id = 'almagenInstallHint';
        installHint.textContent = 'On iPhone/iPad: Share > Add to Home Screen';

        installWrap.appendChild(installBtn);
        installWrap.appendChild(installHint);
        document.body.appendChild(installWrap);

        installBtn.addEventListener('click', async () => {
            if (deferredInstallPrompt) {
                deferredInstallPrompt.prompt();
                try {
                    await deferredInstallPrompt.userChoice;
                } catch (e) {
                    // Ignore user dismissal.
                }
                deferredInstallPrompt = null;
                updateInstallCta();
                return;
            }

            if (isIos) {
                alert('Install steps: tap Share and choose "Add to Home Screen".');
                return;
            }

            alert('Install option will appear after browser enables app install prompt. You can also use browser menu > Install App.');
        });
    }

    function updateInstallCta() {
        const installBtn = document.getElementById('almagenInstallBtn');
        const installHint = document.getElementById('almagenInstallHint');
        if (!installWrap || !installBtn || !installHint) return;

        if (isStandalone) {
            installWrap.style.display = 'none';
            return;
        }

        installBtn.style.display = 'inline-flex';
        installBtn.textContent = deferredInstallPrompt ? '⬇ Install App' : (isIos ? '📲 Add to Home Screen' : '⬇ Install App');
        installHint.style.display = isIos ? 'block' : 'none';
        installWrap.style.display = 'flex';
    }

    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredInstallPrompt = event;
        updateInstallCta();
    });

    window.addEventListener('appinstalled', () => {
        deferredInstallPrompt = null;
        updateInstallCta();
    });

    updateInstallCta();

    musicEngine.isMuted = false;
    musicEngine.isMusicMuted = false;

    if (!musicEngine.isMuted && !musicEngine.isMusicMuted) {
        const startMusic = () => {
            musicEngine.music.start();
            document.removeEventListener('click', startMusic);
            document.removeEventListener('touchstart', startMusic);
            musicEngine.syncUiButtons();
        };
        document.addEventListener('click', startMusic, { once: true });
        document.addEventListener('touchstart', startMusic, { once: true });
    }

    musicEngine.syncUiButtons();

    // Add mute buttons to navigation
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
        const muteBtn = document.createElement('button');
        muteBtn.id = 'muteBtn';
        muteBtn.className = 'sound-btn';
        muteBtn.textContent = '🔊';
        muteBtn.title = 'Toggle Sound Effects';
        muteBtn.style.cssText = 'background:none;border:none;font-size:1.2rem;cursor:pointer;padding:0 8px;';
        muteBtn.onclick = toggleMute;
        navActions.appendChild(muteBtn);

    }
});

// ==================== EXPOSE FUNCTIONS GLOBALLY ====================
window.playSound = playSound;
window.toggleMute = toggleMute;
window.toggleMusic = toggleMusic;
window.musicEngine = musicEngine;