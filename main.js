/**
 * CYBER LOTTO 2026 - Main Logic & Audio System
 */

class MusicManager {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.bassLoop = null;
        this.padLoop = null;
    }

    init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }

    createOscillator(type, freq, gainValue) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        return { osc, gain };
    }

    startCyberAmbient() {
        this.init();
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        this.isPlaying = true;

        // Bass Pulse Function
        const playBass = () => {
            if (!this.isPlaying) return;
            const { osc, gain } = this.createOscillator('sawtooth', 55, 0.05); // A1
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, this.ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);
            
            osc.disconnect();
            osc.connect(filter);
            filter.connect(gain);

            gain.gain.setValueAtTime(0, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
            
            osc.start();
            osc.stop(this.ctx.currentTime + 0.6);
        };

        // Ambient Pad Function
        const playPad = (freq) => {
            if (!this.isPlaying) return;
            const { osc, gain } = this.createOscillator('triangle', freq, 0.02);
            gain.gain.setValueAtTime(0, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.02, this.ctx.currentTime + 2);
            gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 4);
            osc.start();
            osc.stop(this.ctx.currentTime + 4.1);
        };

        // Clear existing loops if any
        if (this.bassLoop) clearInterval(this.bassLoop);
        if (this.padLoop) clearInterval(this.padLoop);

        this.bassLoop = setInterval(() => playBass(), 500);
        this.padLoop = setInterval(() => {
            const freqs = [220, 277.18, 329.63, 415.30]; // A, C#, E, G#
            playPad(freqs[Math.floor(Math.random() * freqs.length)]);
        }, 4000);
    }

    stop() {
        this.isPlaying = false;
        if (this.ctx) {
            this.ctx.suspend();
        }
        if (this.bassLoop) clearInterval(this.bassLoop);
        if (this.padLoop) clearInterval(this.padLoop);
    }

    playSFX() {
        if (!this.ctx || !this.isPlaying) return;
        const { osc, gain } = this.createOscillator('square', 880, 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
    }
}

const music = new MusicManager();

const neonColors = [
    '#ff0055', '#00ff99', '#00ccff', '#ffcc00', '#ff6600',
    '#9900ff', '#ff00ff', '#00ffff', '#33ff00', '#ff3300'
];

export function toggleAudio() {
    const btn = document.getElementById('audioToggle');
    if (music.isPlaying) {
        music.stop();
        btn.classList.remove('active');
        btn.innerText = '🔈';
    } else {
        music.startCyberAmbient();
        btn.classList.add('active');
        btn.innerText = '🔊';
    }
}

export function generateLotto() {
    music.playSFX();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 

    for (let i = 0; i < 5; i++) {
        const numbers = [];
        while(numbers.length < 6) {
            const r = Math.floor(Math.random() * 45) + 1;
            if(numbers.indexOf(r) === -1) numbers.push(r);
        }
        
        numbers.sort((a, b) => a - b);

        const setDiv = document.createElement('div');
        setDiv.className = 'lotto-set';
        setDiv.style.animationDelay = `${i * 0.1}s`;

        numbers.forEach((num) => {
            const ball = document.createElement('div');
            ball.className = 'ball';
            ball.innerText = num;
            
            const colorIndex = (num + (i * 7)) % neonColors.length;
            const color = neonColors[colorIndex];
            
            ball.style.background = `radial-gradient(circle at 30% 30%, ${color}, #111)`;
            ball.style.border = `2px solid ${color}`;
            ball.style.boxShadow = `0 0 15px ${color}`;
            
            setDiv.appendChild(ball);
        });

        resultsDiv.appendChild(setDiv);
    }
}

// Attach to window for onclick handlers since we use type="module"
window.generateLotto = generateLotto;
window.toggleAudio = toggleAudio;
