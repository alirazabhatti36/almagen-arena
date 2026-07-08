// ==================== AlMaGen Sound Engine ====================
// No external files needed! Uses Web Audio API
// Just include this file and call sound.playCoin(), sound.playCrash(), etc.

class SoundEngine {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.volume = 0.3;
        
        // Load saved preferences
        const savedSound = localStorage.getItem('almagen_sound');
        this.enabled = savedSound !== 'off';
        this.volume = parseFloat(localStorage.getItem('almagen_volume') || '0.3');
    }

    init() {
        if (!this.audioContext) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch(e) {
                console.log('Web Audio API not supported');
                this.enabled = false;
            }
        }
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    // ==================== SOUND GENERATORS ====================

    // Coin collect - cheerful "ding!"
    playCoin() {
        if (!this.enabled) return;
        this.init();
        const ctx = this.audioContext;
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
        gain.gain.setValueAtTime(this.volume * 0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
    }

    // Score point
    playScore() {
        if (!this.enabled) return;
        this.init();
        const ctx = this.audioContext;
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);
        gain.gain.setValueAtTime(this.volume * 0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
    }

    // Crash / Hit
    playCrash() {
        if (!this.enabled) return;
        this.init();
        const ctx = this.audioContext;
        if (!ctx) return;
        const now = ctx.currentTime;
        const bufferSize = Math.floor(ctx.sampleRate * 0.25);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.04));
        }
        const source = ctx.createBufferSource();
        const gain = ctx.createGain();
        source.buffer = buffer;
        gain.gain.setValueAtTime(this.volume * 0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        source.connect(gain);
        gain.connect(ctx.destination);
        source.start(now);
    }

    // Jump / Bounce
    playJump() {
        if (!this.enabled) return;
        this.init();
        const ctx = this.audioContext;
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.15);
        gain.gain.setValueAtTime(this.volume * 0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
    }

    // Shoot / Fire
    playShoot() {
        if (!this.enabled) return;
        this.init();
        const ctx = this.audioContext;
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);
        gain.gain.setValueAtTime(this.volume * 0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
    }

    // Win / Level Complete - triumphant!
    playWin() {
        if (!this.enabled) return;
        this.init();
        const ctx = this.audioContext;
        if (!ctx) return;
        const now = ctx.currentTime;
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.12);
            gain.gain.setValueAtTime(0, now + i * 0.12);
            gain.gain.linearRampToValueAtTime(this.volume * 0.45, now + i * 0.12 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.12);
            osc.stop(now + i * 0.12 + 0.25);
        });
    }

    // Lose / Game Over
    playLose() {
        if (!this.enabled) return;
        this.init();
        const ctx = this.audioContext;
        if (!ctx) return;
        const now = ctx.currentTime;
        const notes = [400, 350, 300, 200];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + i * 0.18);
            gain.gain.setValueAtTime(this.volume * 0.35, now + i * 0.18);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.18 + 0.22);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.18);
            osc.stop(now + i * 0.18 + 0.22);
        });
    }

    // Dice roll
    playDice() {
        if (!this.enabled) return;
        this.init();
        const ctx = this.audioContext;
        if (!ctx) return;
        const now = ctx.currentTime;
        for (let i = 0; i < 6; i++) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(80 + Math.random() * 200, now + i * 0.025);
            gain.gain.setValueAtTime(this.volume * 0.12, now + i * 0.025);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.025 + 0.04);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.025);
            osc.stop(now + i * 0.025 + 0.04);
        }
    }

    // Card flip
    playFlip() {
        if (!this.enabled) return;
        this.init();
        const ctx = this.audioContext;
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
        gain.gain.setValueAtTime(this.volume * 0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
    }

    // Click / Tap
    playClick() {
        if (!this.enabled) return;
        this.init();
        const ctx = this.audioContext;
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, now);
        gain.gain.setValueAtTime(this.volume * 0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
    }

    // Power up
    playPowerUp() {
        if (!this.enabled) return;
        this.init();
        const ctx = this.audioContext;
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(2000, now + 0.3);
        gain.gain.setValueAtTime(this.volume * 0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
    }

    // Toggle sound
    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('almagen_sound', this.enabled ? 'on' : 'off');
        return this.enabled;
    }

    // Set volume
    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
        localStorage.setItem('almagen_volume', this.volume);
    }
}

// Create global instance
const sound = new SoundEngine();