// Sovereign Haptic Engine using native Web Audio API
export const playHaptic = (type: 'hover' | 'lock' | 'powerup' = 'hover') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContext) return
    
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    if (type === 'hover') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(60, ctx.currentTime) // Low sub rumble
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.05)
      gain.gain.setValueAtTime(0.015, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
      osc.start()
      osc.stop(ctx.currentTime + 0.05)
    } else if (type === 'lock') {
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(200, ctx.currentTime) // Crisp metallic click
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1)
      gain.gain.setValueAtTime(0.03, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
      osc.start()
      osc.stop(ctx.currentTime + 0.1)
    } else if (type === 'powerup') {
      osc.type = 'square'
      osc.frequency.setValueAtTime(100, ctx.currentTime) 
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.2)
      gain.gain.setValueAtTime(0.02, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
      osc.start()
      osc.stop(ctx.currentTime + 0.2)
    }
  } catch (e) {
    // Fail silently if browser blocks autoplay before interaction
  }
}
