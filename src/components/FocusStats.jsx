import { ClockIcon, StarIcon, HeartIcon } from '../Icons.jsx'

function formatFocusTime(totalSeconds) {
  if (totalSeconds < 60) return `${totalSeconds} sec`
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return s === 0 ? `${m} min` : `${m} min ${s} sec`
}

export default function FocusStats({ focusSeconds, sessions }) {
  return (
    <div className="stats">
      <div className="stats-row">
        <div className="stat">
          <span className="stat-label">
            <ClockIcon size={20} /> Focus Time
          </span>
          <span className="stat-value">{formatFocusTime(focusSeconds)}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-label">
            <StarIcon size={20} /> Sessions Completed
          </span>
          <span className="stat-value">{sessions}</span>
        </div>
      </div>
      <p className="stats-note">
        <HeartIcon size={13} /> Keep going, one little session at a time! <HeartIcon size={13} />
      </p>
    </div>
  )
}
