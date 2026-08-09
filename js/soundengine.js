// ==================== SOUND ENGINE ====================
class SoundEngine {
    constructor() {
        this.sounds = {};
        this.music = null;
        this.audioCtx = null;
        this.masterGain = null;

        // Persistent Single Source of Truth from localStorage
        const savedMute = localStorage.getItem('almagen_muted');
        this.isMuted = savedMute === 'true';
        this.isMusicMuted = this.isMuted;

        this.volume = 0.6;
        this.musicVolume = 0.3;

        this.initAudioContext();
        this.loadSounds();

        window.sound = this;
        window.musicEngine = this;
        window.soundEngine = this;
    }

    initAudioContext() {
        if (this.audioCtx) return this.audioCtx;
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.audioCtx = new AudioCtx();
                this.masterGain = this.audioCtx.createGain();
                this.masterGain.connect(this.audioCtx.destination);
                this.updateMasterVolume();
            }
        } catch (e) {
            console.warn('AudioContext not supported', e);
        }
        return this.audioCtx;
    }

    updateMasterVolume() {
        if (!this.masterGain || !this.audioCtx) return;
        const targetVol = this.isMuted ? 0 : this.volume * 0.5;
        this.masterGain.gain.setValueAtTime(targetVol, this.audioCtx.currentTime);
        if (this.isMuted && this.audioCtx.state === 'running') {
            this.audioCtx.suspend();
        } else if (!this.isMuted && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    }

    loadSounds() {
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

        this.music = this.createBackgroundMusic();
    }

    createClickSound() {
        return () => {
            if (this.isMuted) return;
            const ctx = this.initAudioContext();
            if (!ctx || this.isMuted) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(this.masterGain || ctx.destination);
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
            const ctx = this.initAudioContext();
            if (!ctx || this.isMuted) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(this.masterGain || ctx.destination);
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
            const ctx = this.initAudioContext();
            if (!ctx || this.isMuted) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(this.masterGain || ctx.destination);
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
            const ctx = this.initAudioContext();
            if (!ctx || this.isMuted) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(this.masterGain || ctx.destination);
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
            const ctx = this.initAudioContext();
            if (!ctx || this.isMuted) return;
            const notes = [523, 659, 784];
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(this.masterGain || ctx.destination);
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
            const ctx = this.initAudioContext();
            if (!ctx || this.isMuted) return;
            const notes = [523, 587, 659, 784, 880];
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(this.masterGain || ctx.destination);
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
            const ctx = this.initAudioContext();
            if (!ctx || this.isMuted) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(this.masterGain || ctx.destination);
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
            const ctx = this.initAudioContext();
            if (!ctx || this.isMuted) return;
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
            gain.connect(this.masterGain || ctx.destination);
            gain.gain.setValueAtTime(this.volume * 0.4, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
            source.start(ctx.currentTime);
            source.stop(ctx.currentTime + 0.3);
        };
    }

    createCoinSound() {
        return () => {
            if (this.isMuted) return;
            const ctx = this.initAudioContext();
            if (!ctx || this.isMuted) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(this.masterGain || ctx.destination);
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
            const ctx = this.initAudioContext();
            if (!ctx || this.isMuted) return;
            const notes = [440, 554, 659, 880];
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(this.masterGain || ctx.destination);
                osc.frequency.value = freq;
                osc.type = 'triangle';
                const startTime = ctx.currentTime + i * 0.08;
                gain.gain.setValueAtTime(this.volume * 0.3, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
                osc.start(startTime);
                osc.stop(startTime + 0.15);
            });
        };
    }

    createBackgroundMusic() {
        let isPlaying = false;
        let intervalId = null;

        const playNote = (freq, duration, time, vol) => {
            if (this.isMuted || !this.audioCtx) return;
            try {
                const osc = this.audioCtx.createOscillator();
                const gain = this.audioCtx.createGain();
                osc.connect(gain);
                gain.connect(this.masterGain || this.audioCtx.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.setValueAtTime(vol * 0.15, time);
                gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
                osc.start(time);
                osc.stop(time + duration);
            } catch (_) {}
        };

        const musicLoop = () => {
            if (this.isMuted || this.isMusicMuted || !this.audioCtx || this.audioCtx.state !== 'running') return;
            const startTime = this.audioCtx.currentTime;

            const melody = [
                [523, 0.2], [587, 0.2], [659, 0.2], [784, 0.4],
                [659, 0.2], [587, 0.2], [523, 0.4],
                [784, 0.2], [880, 0.2], [784, 0.2], [659, 0.4],
                [587, 0.2], [659, 0.2], [784, 0.4]
            ];

            melody.forEach(([freq, duration], i) => {
                if (!this.isMuted) playNote(freq, duration, startTime + i * 0.25, this.musicVolume);
            });

            const bassNotes = [262, 262, 330, 330, 392, 392, 330];
            bassNotes.forEach((freq, i) => {
                if (!this.isMuted) playNote(freq, 0.4, startTime + i * 0.5, this.musicVolume * 0.5);
            });
        };

        return {
            start: () => {
                if (this.isMuted || this.isMusicMuted || isPlaying) return;
                this.initAudioContext();
                if (!this.audioCtx || this.isMuted) return;
                
                isPlaying = true;
                musicLoop();
                intervalId = setInterval(() => {
                    if (this.isMuted) {
                        this.music.stop();
                    } else {
                        musicLoop();
                    }
                }, 4000);
            },
            stop: () => {
                isPlaying = false;
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            },
            toggle: () => {
                this.toggleMute();
            }
        };
    }

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

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.isMusicMuted = this.isMuted;
        localStorage.setItem('almagen_muted', this.isMuted ? 'true' : 'false');

        if (this.isMuted && this.music && typeof this.music.stop === 'function') {
            this.music.stop();
        } else if (!this.isMuted && this.music && typeof this.music.start === 'function') {
            this.music.start();
        }

        this.updateMasterVolume();
        this.syncUiButtons();
        window.dispatchEvent(new CustomEvent('soundmutechanged', { detail: { isMuted: this.isMuted } }));
        return this.isMuted;
    }

    toggleMusic() {
        return this.toggleMute();
    }

    toggle() {
        return this.toggleMute();
    }

    syncUiButtons() {
        const icon = this.isMuted ? '🔇' : '🔊';
        document.querySelectorAll('#soundToggle, #muteBtn, #muteBtnMobile, .sound-btn, .sound-btn-mobile').forEach(btn => {
            if (btn) btn.textContent = icon;
        });
    }

    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
        this.musicVolume = this.volume * 0.5;
        this.updateMasterVolume();
    }
}

// Global Singleton Instance
const musicEngine = new SoundEngine();

function playSound(soundName) {
    musicEngine.play(soundName);
}

function toggleMute() {
    return musicEngine.toggleMute();
}

function toggleMusic() {
    return musicEngine.toggleMusic();
}

document.addEventListener('DOMContentLoaded', () => {
    musicEngine.syncUiButtons();

    if (!musicEngine.isMuted) {
        const startMusic = () => {
            if (!musicEngine.isMuted && musicEngine.music) {
                musicEngine.music.start();
            }
            document.removeEventListener('click', startMusic);
            document.removeEventListener('touchstart', startMusic);
        };
        document.addEventListener('click', startMusic, { once: true });
        document.addEventListener('touchstart', startMusic, { once: true });
    }

    // Attach click listeners to sound buttons
    document.querySelectorAll('#soundToggle, #muteBtn, #muteBtnMobile, .sound-btn, .sound-btn-mobile').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMute();
        };
    });
});

window.playSound = playSound;
window.toggleMute = toggleMute;
window.toggleMusic = toggleMusic;
window.musicEngine = musicEngine;
