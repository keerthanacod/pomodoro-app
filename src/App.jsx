
import { useEffect, useRef, useState } from "react";

const TIMER_MODES = {
  focus: 10,
  shortBreak: 5,
  longBreak: 8,
};

function App() {
  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES.focus);
  const [isRunning, setIsRunning] = useState(false);

  const countdownSound = useRef(null);
  const catSound = useRef(null);
  const countdownStarted = useRef(false);

  // Cute pop sound for button clicks
  const playPop = () => {
    const audio = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
    );
    audio.volume = 0.35;
    audio.play().catch(() => {});
  };

  // Countdown and cat audio
  if (countdownSound.current === null) {
    countdownSound.current = new Audio(
      "/sounds/pomodoro_5_second_beeps.mp3"
    );
  }

  if (catSound.current === null) {
    catSound.current = new Audio(
      "/sounds/pomodoro_cat_meow_loop.mp3"
    );
    catSound.current.loop = true;
  }

  // Stop countdown and cat sounds
  const stopSounds = () => {
    [countdownSound.current, catSound.current].forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });

    countdownStarted.current = false;
  };

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((previousTime) => {
        // Start countdown beeps during the final 5 seconds
        if (previousTime === 5 && !countdownStarted.current) {
          countdownStarted.current = true;
          countdownSound.current.currentTime = 0;
          countdownSound.current.play().catch(() => {});
        }

        if (previousTime <= 1) {
          clearInterval(interval);
          setIsRunning(false);

          countdownSound.current.pause();
          countdownSound.current.currentTime = 0;

          // Play looping cat meows when the timer ends
          catSound.current.currentTime = 0;
          catSound.current.play().catch(() => {});

          if (mode === "focus") {
            setMode("shortBreak");
            countdownStarted.current = false;
            return TIMER_MODES.shortBreak;
          }

          countdownStarted.current = false;
          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  // Change timer mode
  const handleModeChange = (newMode) => {
    stopSounds();
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(TIMER_MODES[newMode]);
  };

  // Reset timer
  const handleReset = () => {
    stopSounds();
    setIsRunning(false);
    setTimeLeft(TIMER_MODES[mode]);
  };

  // Toggle timer
  const handleStartPause = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Pomodoro</h1>
        <p>Focus. Work. Repeat.</p>
      </header>

      <main className="main-content">
        <section className="timer-card">
          <div className="mode-buttons">
            <button
              className={mode === "focus" ? "active" : ""}
              onClick={() => {
                playPop();
                handleModeChange("focus");
              }}
            >
              Focus
            </button>

            <button
              className={mode === "shortBreak" ? "active" : ""}
              onClick={() => {
                playPop();
                handleModeChange("shortBreak");
              }}
            >
              Short Break
            </button>

            <button
              className={mode === "longBreak" ? "active" : ""}
              onClick={() => {
                playPop();
                handleModeChange("longBreak");
              }}
            >
              Long Break
            </button>
          </div>

          <div className="timer">
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>

          <p className="session-label">
            {mode === "focus"
              ? "FOCUS SESSION"
              : mode === "shortBreak"
              ? "SHORT BREAK"
              : "LONG BREAK"}
          </p>

          <div className="timer-controls">
            <button
              className="start-button"
              onClick={() => {
                playPop();
                handleStartPause();
              }}
            >
              {isRunning ? "Pause" : "Start"}
            </button>

            <button
              className="stop-sound-button"
              onClick={() => {
                playPop();
                stopSounds();
              }}
            >
              ■ Stop Sound
            </button>
          </div>

          <button
            className="reset-button"
            onClick={() => {
              playPop();
              handleReset();
            }}
          >
            Reset
          </button>
        </section>

        <section className="side-card">
          <h2>Today's Focus</h2>

          <div className="stat">
            <span>Focus Time</span>
            <strong>0 min</strong>
          </div>

          <div className="stat">
            <span>Sessions</span>
            <strong>0</strong>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

