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

    // ==================== MUTE CONTROLS ====================
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.music.stop();
        } else if (!this.isMusicMuted) {
            this.music.start();
        }
        return this.isMuted;
    }

    toggleMusic() {
        this.isMusicMuted = !this.isMusicMuted;
        if (this.isMusicMuted) {
            this.music.stop();
        } else {
            this.music.start();
        }
        return this.isMusicMuted;
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
    const btn = document.getElementById('muteBtn');
    if (btn) {
        btn.textContent = muted ? '🔇' : '🔊';
    }
    localStorage.setItem('almagen_muted', muted ? 'true' : 'false');
}

function toggleMusic() {
    const muted = musicEngine.toggleMusic();
    const btn = document.getElementById('musicBtn');
    if (btn) {
        btn.textContent = muted ? '🎵❌' : '🎵';
    }
    localStorage.setItem('almagen_music_muted', muted ? 'true' : 'false');
}

// ==================== AUTO-START MUSIC ====================
document.addEventListener('DOMContentLoaded', () => {
    // Check mute state from localStorage
    const isMuted = localStorage.getItem('almagen_muted') === 'true';
    const isMusicMuted = localStorage.getItem('almagen_music_muted') === 'true';
    
    if (isMuted) {
        musicEngine.isMuted = true;
        musicEngine.isMusicMuted = true;
    } else if (!isMusicMuted) {
        // Start music after user interaction
        const startMusic = () => {
            musicEngine.music.start();
            document.removeEventListener('click', startMusic);
            document.removeEventListener('touchstart', startMusic);
        };
        document.addEventListener('click', startMusic);
        document.addEventListener('touchstart', startMusic);
    }

    // Add mute buttons to navigation
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
        const muteBtn = document.createElement('button');
        muteBtn.id = 'muteBtn';
        muteBtn.className = 'sound-btn';
        muteBtn.textContent = isMuted ? '🔇' : '🔊';
        muteBtn.title = 'Toggle Sound Effects';
        muteBtn.style.cssText = 'background:none;border:none;font-size:1.2rem;cursor:pointer;padding:0 8px;';
        muteBtn.onclick = toggleMute;
        navActions.appendChild(muteBtn);

        const musicBtn = document.createElement('button');
        musicBtn.id = 'musicBtn';
        musicBtn.className = 'sound-btn';
        musicBtn.textContent = isMusicMuted ? '🎵❌' : '🎵';
        musicBtn.title = 'Toggle Background Music';
        musicBtn.style.cssText = 'background:none;border:none;font-size:1.2rem;cursor:pointer;padding:0 8px;';
        musicBtn.onclick = toggleMusic;
        navActions.appendChild(musicBtn);
    }
});

// ==================== EXPOSE FUNCTIONS GLOBALLY ====================
window.playSound = playSound;
window.toggleMute = toggleMute;
window.toggleMusic = toggleMusic;
window.musicEngine = musicEngine;