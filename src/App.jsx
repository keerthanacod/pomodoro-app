import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import CatPet from './components/CatPet.jsx'
import AccordionSection from './components/AccordionSection.jsx'
import OutfitSelector from './components/OutfitSelector.jsx'
import TreatSelector from './components/TreatSelector.jsx'
import FocusStats from './components/FocusStats.jsx'
import { TREATS, OUTFITS } from './catAssets.js'
import { TIMER_MODES, MODE_LABELS, STATS_KEY } from './constants.js'
import {
  playPop,
  primeAudio,
  startCountdown,
  resumeCountdown,
  pauseCountdown,
  startMeow,
  stopCountdown,
  stopMeow,
  stopAllSounds,
} from './sounds.js'
import {
  BowDoodle,
  BarsIcon,
  BowIcon,
  BowlIcon,
  CupIcon,
  HeartIcon,
  MoonIcon,
  PauseIcon,
  PawIcon,
  PlayIcon,
  ResetIcon,
  StopIcon,
} from './Icons.jsx'

const EATING_MS = 2600
const HAPPY_MS = 1500

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function loadStats() {
  const today = new Date().toDateString()
  try {
    const raw = JSON.parse(localStorage.getItem(STATS_KEY))
    if (raw && raw.date === today) {
      return {
        date: today,
        focusSeconds: Number(raw.focusSeconds) || 0,
        sessions: Number(raw.sessions) || 0,
      }
    }
  } catch {
    // no saved stats yet
  }
  return { date: today, focusSeconds: 0, sessions: 0 }
}

const MODE_BUTTONS = [
  { id: 'focus', label: 'Focus', icon: <PawIcon size={20} /> },
  { id: 'shortBreak', label: 'Short Break', icon: <CupIcon size={20} /> },
  { id: 'longBreak', label: 'Long Break', icon: <MoonIcon size={20} /> },
]

function App() {
  const [mode, setMode] = useState('focus')
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES.focus)
  const [running, setRunning] = useState(false)
  const [stats, setStats] = useState(loadStats)

  const [outfitId, setOutfitId] = useState('cat')
  const [feeding, setFeeding] = useState(null) // treat currently being eaten
  const [happy, setHappy] = useState(false)
  const [blinking, setBlinking] = useState(false)
  const [heartBurst, setHeartBurst] = useState(0)
  const [flash, setFlash] = useState(null) // short-lived cat message
  const [status, setStatus] = useState(null) // timer message that stays until the next action

  const [open, setOpen] = useState({ outfit: true, food: false, focus: true })

  const feedTimers = useRef([])
  const flashTimer = useRef(null)

  // ---------- Timer tick (one interval, cleaned up whenever it stops) ----------
  useEffect(() => {
    if (!running) return undefined
    const id = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1))
      if (mode === 'focus') {
        setStats((s) => ({ ...s, focusSeconds: s.focusSeconds + 1 }))
      }
    }, 1000)
    return () => clearInterval(id)
  }, [running, mode])

  // ---------- Timer finished ----------
  useEffect(() => {
    if (!running || timeLeft !== 0) return
    setRunning(false)
    stopCountdown()
    startMeow() // replaces the countdown beeps; loops until the user stops it
    if (mode === 'focus') {
      setStats((s) => ({ ...s, sessions: s.sessions + 1 }))
      setMode('shortBreak')
      setTimeLeft(TIMER_MODES.shortBreak)
      setStatus('Session complete! Time for a little break ♡')
      setHeartBurst((b) => b + 1)
    } else {
      setStatus('Break finished! Ready for another round? ♡')
    }
  }, [running, timeLeft, mode])

  // ---------- Final five-second beeps ----------
  useEffect(() => {
    if (!running) {
      pauseCountdown()
      return
    }
    if (timeLeft === 5) startCountdown()
    else if (timeLeft > 0 && timeLeft < 5) resumeCountdown(timeLeft)
  }, [running, timeLeft])

  // ---------- Save stats ----------
  useEffect(() => {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats))
    } catch {
      // storage unavailable: stats just won't persist
    }
  }, [stats])

  // ---------- Page title ----------
  useEffect(() => {
    document.title = `${formatTime(timeLeft)} · Pomodoro ♡`
  }, [timeLeft])

  // ---------- Pop sound on every button click ----------
  useEffect(() => {
    const onClick = (e) => {
      const btn = e.target.closest?.('button')
      if (!btn || btn.disabled || btn.dataset.nopop) return
      primeAudio()
      playPop()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // ---------- Occasional blink ----------
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined
    let off
    const id = setInterval(() => {
      setBlinking(true)
      off = setTimeout(() => setBlinking(false), 170)
    }, 4200)
    return () => {
      clearInterval(id)
      clearTimeout(off)
    }
  }, [])

  // ---------- Cleanup everything on unmount ----------
  useEffect(() => {
    const timers = feedTimers
    return () => {
      timers.current.forEach(clearTimeout)
      clearTimeout(flashTimer.current)
      stopAllSounds()
    }
  }, [])

  const showFlash = useCallback((text, ms) => {
    clearTimeout(flashTimer.current)
    setFlash(text)
    flashTimer.current = setTimeout(() => setFlash(null), ms)
  }, [])

  // ---------- Timer controls ----------
  const handleStartPause = () => {
    if (running) {
      setRunning(false)
      return
    }
    stopMeow()
    if (timeLeft === 0) setTimeLeft(TIMER_MODES[mode])
    setStatus(null)
    setRunning(true)
  }

  const handleReset = () => {
    setRunning(false)
    stopAllSounds()
    setTimeLeft(TIMER_MODES[mode])
    setStatus(null)
  }

  const handleMode = (nextMode) => {
    setRunning(false)
    stopAllSounds()
    setMode(nextMode)
    setTimeLeft(TIMER_MODES[nextMode])
    setStatus(null)
  }

  const handleStopSound = () => {
    stopAllSounds()
  }

  // ---------- Kitty interactions ----------
  const handleOutfit = (id) => {
    if (id === outfitId) return
    setOutfitId(id)
    const label = OUTFITS.find((o) => o.id === id)?.label ?? ''
    showFlash(`Ooh, a cute ${label.toLowerCase()} outfit! ♡`, 2200)
    setHeartBurst((b) => b + 1)
  }

  const handleFeed = (foodId) => {
    if (feeding) return // already eating
    const food = TREATS.find((t) => t.id === foodId)
    if (!food) return
    feedTimers.current.forEach(clearTimeout)
    setHappy(false)
    setFeeding(food)
    showFlash('Nom nom... yummy! ♡', EATING_MS + HAPPY_MS)
    feedTimers.current = [
      setTimeout(() => {
        setFeeding(null)
        setHappy(true)
        setHeartBurst((b) => b + 1)
      }, EATING_MS),
      setTimeout(() => setHappy(false), EATING_MS + HAPPY_MS),
    ]
  }

  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }))

  // ---------- Derived values ----------
  const mood = feeding ? 'eating' : happy ? 'happy' : blinking ? 'blink' : 'idle'

  let defaultMessage = "Let's study together! ♡"
  if (mode !== 'focus') defaultMessage = 'Break time! Stretch with me ♡'
  else if (running) defaultMessage = "You're doing great! ♡"
  const catMessage = flash ?? status ?? defaultMessage

  return (
    <main className="app">
      <div className="layout">
        {/* ---------------- Timer card ---------------- */}
        <section className="card timer-card" aria-label="Pomodoro timer">
          <HeartIcon className="card-deco top-heart" size={26} />
          <BowDoodle className="card-deco corner-bow" />
          <PawIcon className="card-deco corner-paw" size={22} />

          <header className="card-header">
            <PawIcon className="header-paw" size={42} />
            <div>
              <h1 className="title">Pomodoro ♡</h1>
              <p className="subtitle">Focus. Work. Repeat. ♡</p>
            </div>
          </header>

          <div className="mode-tabs" role="group" aria-label="Timer mode">
            {MODE_BUTTONS.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`mode-btn ${mode === m.id ? 'is-active' : ''}`}
                aria-pressed={mode === m.id}
                onClick={() => handleMode(m.id)}
              >
                {m.icon}
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          <CatPet outfitId={outfitId} mood={mood} food={feeding} message={catMessage} heartBurst={heartBurst} />

          <div className="timer-cloud">
            <PawIcon className="cloud-paw" size={26} />
            <div className="time" role="timer" aria-label={`${formatTime(timeLeft)} remaining`}>
              {formatTime(timeLeft)}
            </div>
            <PawIcon className="cloud-paw" size={26} />
          </div>
          <div className="mode-label">{MODE_LABELS[mode]}</div>

          <div className="controls">
            <button type="button" className="btn btn-primary" onClick={handleStartPause}>
              {running ? <PauseIcon /> : <PlayIcon />}
              <span>{running ? 'Pause' : 'Start'}</span>
            </button>
            <button type="button" className="btn btn-soft" onClick={handleStopSound} data-nopop="1">
              <StopIcon />
              <span>Stop Sound</span>
            </button>
            <button type="button" className="btn btn-soft btn-reset" onClick={handleReset}>
              <ResetIcon />
              <span>Reset</span>
            </button>
          </div>
        </section>

        {/* ---------------- Kitty Corner ---------------- */}
        <aside className="card sidebar" aria-label="Kitty Corner">
          <header className="sidebar-header">
            <PawIcon className="header-paw" size={36} />
            <div>
              <h2 className="title">Kitty Corner ♡</h2>
              <p className="subtitle">Take care of your study buddy!</p>
            </div>
          </header>

          <AccordionSection title="Outfit" icon={<BowIcon />} isOpen={open.outfit} onToggle={() => toggle('outfit')}>
            <OutfitSelector selectedId={outfitId} onSelect={handleOutfit} />
          </AccordionSection>

          <AccordionSection title="Food / Treats" icon={<BowlIcon />} isOpen={open.food} onToggle={() => toggle('food')}>
            <TreatSelector onFeed={handleFeed} disabled={!!feeding} activeId={feeding?.id} />
          </AccordionSection>

          <AccordionSection title="Today's Focus" icon={<BarsIcon />} isOpen={open.focus} onToggle={() => toggle('focus')}>
            <FocusStats focusSeconds={stats.focusSeconds} sessions={stats.sessions} />
          </AccordionSection>
        </aside>
      </div>
    </main>
  )
}

export default App
