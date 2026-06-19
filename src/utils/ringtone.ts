class RingtoneGenerator {
  private audioCtx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private activeTimeout: any = null;

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      this.audioCtx = new AudioContextClass();
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      
      // Standard Indian/US ringback frequencies: 440 Hz + 480 Hz
      this.osc1 = this.audioCtx.createOscillator();
      this.osc2 = this.audioCtx.createOscillator();
      this.gainNode = this.audioCtx.createGain();

      this.osc1.frequency.value = 440;
      this.osc2.frequency.value = 480;

      // Adjust gain/volume so it is pleasant
      this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0.12, this.audioCtx.currentTime + 0.1);
      
      this.osc1.connect(this.gainNode);
      this.osc2.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      this.osc1.start();
      this.osc2.start();

      // Automatically taper off after 1.7 seconds to prepare for the paywall
      this.gainNode.gain.setValueAtTime(0.12, this.audioCtx.currentTime + 1.5);
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1.7);
      
      this.activeTimeout = setTimeout(() => {
        this.stop();
      }, 1800);
    } catch (e) {
      console.error('Failed to play ringtone via Web Audio API', e);
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.activeTimeout) {
      clearTimeout(this.activeTimeout);
      this.activeTimeout = null;
    }
    
    try {
      if (this.osc1) {
        this.osc1.stop();
        this.osc1.disconnect();
        this.osc1 = null;
      }
      if (this.osc2) {
        this.osc2.stop();
        this.osc2.disconnect();
        this.osc2 = null;
      }
      if (this.gainNode) {
        this.gainNode.disconnect();
        this.gainNode = null;
      }
      if (this.audioCtx) {
        this.audioCtx.close();
        this.audioCtx = null;
      }
    } catch (e) {
      // Ignore errors if context is already closed or modified
    }
  }
}

export const ringtone = new RingtoneGenerator();
