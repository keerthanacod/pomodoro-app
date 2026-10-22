import { OUTFITS } from '../catAssets.js'

export default function OutfitSelector({ selectedId, onSelect }) {
  return (
    <div className="outfit-grid" role="radiogroup" aria-label="Choose an outfit">
      {OUTFITS.map((outfit) => {
        const selected = outfit.id === selectedId
        return (
          <button
            key={outfit.id}
            type="button"
            role="radio"
            aria-checked={selected}
            className={`outfit-card ${selected ? 'is-selected' : ''}`}
            onClick={() => onSelect(outfit.id)}
          >
            <span className="outfit-thumb">
              <img src={outfit.src} alt={`Kitten wearing the ${outfit.label} outfit`} draggable="false" />
            </span>
            <span className="outfit-label">{outfit.label}</span>
          </button>
        )
      })}
    </div>
  )
}
