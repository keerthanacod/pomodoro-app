import { OUTFITS, CAT_EXPRESSIONS, MAX_SPRITE_H } from '../catAssets.js'
import { HeartIcon, PawIcon, FishDoodle } from '../Icons.jsx'
import './CatPet.css'

// Picks the right artwork. The classic cat hood has drawn expressions on the character
// sheet; the other outfits keep their art and react with motion instead.
function pickSprite(outfit, mood) {
  if (outfit.id === 'cat' && mood !== 'idle') {
    const expr = CAT_EXPRESSIONS[mood]
    if (expr) return { ...expr, alt: `Kitten in the cat hood looking ${mood === 'eating' ? 'happy while eating' : mood}` }
  }
  return { src: outfit.src, h: outfit.h, alt: `Kitten wearing the ${outfit.label} outfit` }
}

const HEART_SPOTS = [
  { left: '18%', delay: '0s' },
  { left: '34%', delay: '0.12s' },
  { left: '52%', delay: '0.05s' },
  { left: '68%', delay: '0.2s' },
  { left: '80%', delay: '0.1s' },
  { left: '44%', delay: '0.28s' },
]

export default function CatPet({ outfitId, mood, food, message, heartBurst }) {
  const outfit = OUTFITS.find((o) => o.id === outfitId) ?? OUTFITS[0]
  const sprite = pickSprite(outfit, mood)
  const heightPct = (sprite.h / MAX_SPRITE_H) * 100

  return (
    <div className="cat-area">
      <HeartIcon className="deco deco-heart d1" size={22} />
      <HeartIcon className="deco deco-heart d2" size={18} />
      <HeartIcon className="deco deco-heart d3" size={20} />
      <HeartIcon className="deco deco-heart d4" size={16} />
      <PawIcon className="deco deco-paw d5" size={20} />
      <PawIcon className="deco deco-paw d6" size={16} />
      <FishDoodle className="deco deco-fish" />

      <div className="cat-stage">
        <div className="cat-shadow" aria-hidden="true" />
        <div className={`cat-float mood-${mood}`}>
          <img
            key={outfit.id}
            className={`cat-sprite swap ${mood === 'blink' && outfit.id !== 'cat' ? 'soft-blink' : ''}`}
            src={sprite.src}
            alt={sprite.alt}
            style={{ height: `${heightPct}%` }}
            draggable="false"
          />
        </div>

        {mood === 'eating' && food && (
          <img key={food.id} className="cat-food" src={food.src} alt={`${food.label} treat`} draggable="false" />
        )}

        {heartBurst > 0 && (
          <div className="heart-burst" key={heartBurst} aria-hidden="true">
            {HEART_SPOTS.map((spot, i) => (
              <HeartIcon key={i} className="float-heart" size={20} filled style={{ left: spot.left, animationDelay: spot.delay }} />
            ))}
          </div>
        )}
      </div>

      <p className="cat-message" aria-live="polite">
        {message}
      </p>
    </div>
  )
}
