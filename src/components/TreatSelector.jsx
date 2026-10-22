import { TREATS } from '../catAssets.js'

export default function TreatSelector({ onFeed, disabled, activeId }) {
  return (
    <div className="treat-grid">
      {TREATS.map((treat) => (
        <button
          key={treat.id}
          type="button"
          className={`treat-card ${activeId === treat.id ? 'is-selected' : ''}`}
          onClick={() => onFeed(treat.id)}
          disabled={disabled}
          aria-label={`Feed ${treat.label}`}
        >
          <span className="treat-thumb">
            <img src={treat.src} alt="" draggable="false" />
          </span>
          <span className="outfit-label">{treat.label}</span>
        </button>
      ))}
      <p className="treat-hint">{disabled ? 'Nom nom nom...' : 'Tap a treat to feed your kitty ♡'}</p>
    </div>
  )
}
