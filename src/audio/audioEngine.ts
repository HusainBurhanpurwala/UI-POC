/**
 * Procedural Web Audio Engine for "To Be Continued"
 * Features:
 * - Ambient warm drone (calming, low resonant sine waves with soft harmonic overtone)
 * - Physiological Two-Stage (Lub-Dub) Heartbeat Synthesizer
 * - Shared pulse event listener for visual lockstep synchronization
 * - Tactile interaction sounds (paper rustle, soft wooden click)
 * - Zero external mp3 dependencies
 */

type PulseCallback = (phase: 'lub' | 'dub') => void;

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private heartbeatGain: GainNode | null = null;
  private isMuted: boolean = true;
  private isHeartbeatActive: boolean = false;
  private heartbeatIntervalId: number | null = null;
  private pulseListeners: Set<PulseCallback> = new Set();
  private bpm: number = 66; // Gentle resting heart rate

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.6, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Ambient gain channel
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      // Heartbeat gain channel
      this.heartbeatGain = this.ctx.createGain();
      this.heartbeatGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.heartbeatGain.connect(this.masterGain);

      this.startAmbientDrone();
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Generates a warm, ethereal cinematic room tone
   */
  private startAmbientDrone() {
    if (!this.ctx || !this.ambientGain) return;

    // Fundamental warm drone at 108Hz (A2 harmonic) and 162Hz (E3 fifth)
    const freqs = [108, 162, 216];
    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Very soft gain
      gain.gain.setValueAtTime(0.03 / (idx + 1), this.ctx.currentTime);

      // Subtle LFO modulation for breathing texture
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.1 + idx * 0.05, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();

      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start();
    });
  }

  /**
   * Synthesize a single thud for the heartbeat
   */
  private playThump(freq: number, duration: number, volume: number) {
    if (!this.ctx || !this.heartbeatGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Frequency sweeps downward rapidly to simulate muscle contraction
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(32, this.ctx.currentTime + duration);

    // Exponential volume decay
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.heartbeatGain);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  /**
   * Starts the synchronized lub-dub heartbeat cycle
   */
  public startHeartbeat() {
    this.initContext();
    if (this.isHeartbeatActive) return;
    this.isHeartbeatActive = true;

    const intervalMs = (60 / this.bpm) * 1000; // ~909ms

    const executeBeat = () => {
      if (!this.isHeartbeatActive) return;

      // 1. "Lub" (S1 - low resonant impact)
      this.playThump(68, 0.16, 0.45);
      this.notifyPulse('lub');

      // 2. "Dub" (S2 - slightly higher, shorter closure ~150ms later)
      setTimeout(() => {
        if (!this.isHeartbeatActive) return;
        this.playThump(84, 0.14, 0.38);
        this.notifyPulse('dub');
      }, 150);
    };

    executeBeat();
    this.heartbeatIntervalId = window.setInterval(executeBeat, intervalMs);
  }

  public stopHeartbeat() {
    this.isHeartbeatActive = false;
    if (this.heartbeatIntervalId !== null) {
      clearInterval(this.heartbeatIntervalId);
      this.heartbeatIntervalId = null;
    }
  }

  /**
   * Tactile paper fold sound effect
   */
  public playPaperSound() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.12);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  /**
   * Subtle click / chime for tactile button or door
   */
  public playGentleClick() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(540, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(270, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;

    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.6;
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.3);
    }
    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public subscribePulse(callback: PulseCallback): () => void {
    this.pulseListeners.add(callback);
    return () => {
      this.pulseListeners.delete(callback);
    };
  }

  private notifyPulse(phase: 'lub' | 'dub') {
    this.pulseListeners.forEach((cb) => {
      try {
        cb(phase);
      } catch {
        // fail-safe
      }
    });
  }
}

export const soundEngine = new AudioEngine();
