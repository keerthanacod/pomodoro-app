// Sound engine: one shared Audio object per sound, so nothing ever plays twice at once.
// Your existing files are used first; if one can't load, a bundled fallback is used instead.
const BASE = import.meta.env.BASE_URL

const SOURCES = {
  countdown: {
    primary: `${BASE}sounds/pomodoro_5_second_beeps.mp3`,
    fallback: `${BASE}sounds/fallback_countdown_beeps.mp3`,
    loop: false,
  },
  meow: {
    primary: `${BASE}sounds/pomodoro_cat_meow_loop.mp3`,
    fallback: `${BASE}sounds/fallback_cat_meow_loop.mp3`,
    loop: true,
  },
}

const audios = {}

function getAudio(key) {
  if (audios[key]) return audios[key]
  const cfg = SOURCES[key]
  const audio = new Audio(cfg.primary)
  audio.preload = 'auto'
  audio.loop = cfg.loop
  audio.addEventListener('error', () => {
    if (!audio.dataset.usedFallback) {
      audio.dataset.usedFallback = '1'
      audio.src = cfg.fallback
      audio.load()
    } else {
      audio.dataset.failed = '1'
    }
  })
  audios[key] = audio
  return audio
}

function safePlay(audio) {
  try {
    const p = audio.play()
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        // Autoplay blocked or file not ready: stay silent instead of crashing.
      })
    }
  } catch {
    // ignore
  }
}

function stopAudio(key) {
  const a = audios[key]
  if (!a) return
  a.pause()
  a.currentTime = 0
}

// ---- Pop sound (generated with Web Audio, so no file is needed) ----
let ctx = null
function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

export function playPop() {
  const c = getCtx()
  if (!c) return
  const t = c.currentTime
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(720, t)
  osc.frequency.exponentialRampToValueAtTime(240, t + 0.09)
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(0.22, t + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.11)
  osc.connect(gain).connect(c.destination)
  osc.start(t)
  osc.stop(t + 0.12)
}

// ---- Synth beeps, used only if the countdown mp3 can't be loaded at all ----
let synthNodes = []
function stopSynth() {
  synthNodes.forEach((o) => {
    try {
      o.stop()
    } catch {
      // already stopped
    }
  })
  synthNodes = []
}
function scheduleSynth(count) {
  const c = getCtx()
  if (!c) return
  stopSynth()
  for (let i = 0; i < count; i++) {
    const t = c.currentTime + i
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = 'triangle'
    osc.frequency.value = 880
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.18, t + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
    osc.connect(gain).connect(c.destination)
    osc.start(t)
    osc.stop(t + 0.2)
    synthNodes.push(osc)
  }
}

function countdownIsBroken() {
  const a = audios.countdown
  return !!a && a.dataset.failed === '1'
}

// ---- Public API ----
export function startCountdown() {
  const a = getAudio('countdown')
  a.currentTime = 0
  safePlay(a)
  if (countdownIsBroken()) scheduleSynth(5)
}

export function resumeCountdown(secondsLeft) {
  const a = getAudio('countdown')
  if (countdownIsBroken()) {
    scheduleSynth(secondsLeft)
    return
  }
  if (a.paused && !a.ended && a.currentTime > 0) safePlay(a)
}

export function pauseCountdown() {
  const a = audios.countdown
  if (a) a.pause()
  stopSynth()
}

export function stopCountdown() {
  stopAudio('countdown')
  stopSynth()
}

export function startMeow() {
  const a = getAudio('meow')
  a.currentTime = 0
  safePlay(a)
}

export function stopMeow() {
  stopAudio('meow')
}

export function stopAllSounds() {
  stopAudio('countdown')
  stopAudio('meow')
  stopSynth()
}

// Call once after the first click so the browser "unlocks" audio for later automatic playback.
export function primeAudio() {
  getCtx()
  getAudio('countdown')
  getAudio('meow')
}
