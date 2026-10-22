import bunny from './assets/cat/bunny.png'
import penguin from './assets/cat/penguin.png'
import bear from './assets/cat/bear.png'
import chick from './assets/cat/chick.png'
import cat from './assets/cat/cat.png'
import strawberry from './assets/cat/strawberry.png'
import panda from './assets/cat/panda.png'
import shiba from './assets/cat/shiba.png'
import idle from './assets/cat/idle.png'
import blink from './assets/cat/blink.png'
import happy from './assets/cat/happy.png'
import eating from './assets/cat/eating.png'

import fish from './assets/food/fish.png'
import dango from './assets/food/dango.png'
import milk from './assets/food/milk.png'
import tuna from './assets/food/tuna.png'
import snack from './assets/food/snack.png'
import treats from './assets/food/treats.png'

// `h` is the image's pixel height, so every sprite keeps the same scale in the stage.
// Order matches the character sheet.
export const OUTFITS = [
  { id: 'bunny', label: 'Bunny', src: bunny, h: 380 },
  { id: 'penguin', label: 'Penguin', src: penguin, h: 380 },
  { id: 'bear', label: 'Bear', src: bear, h: 382 },
  { id: 'chick', label: 'Chick', src: chick, h: 392 },
  { id: 'cat', label: 'Cat', src: cat, h: 400 },
  { id: 'strawberry', label: 'Strawberry', src: strawberry, h: 402 },
  { id: 'panda', label: 'Panda', src: panda, h: 396 },
  { id: 'shiba', label: 'Shiba', src: shiba, h: 406 },
]

// Face expressions drawn on the sheet for the classic cat hood.
export const CAT_EXPRESSIONS = {
  idle: { src: idle, h: 370 },
  blink: { src: blink, h: 370 },
  happy: { src: happy, h: 386 },
  eating: { src: eating, h: 384 },
}

export const MAX_SPRITE_H = 406

export const TREATS = [
  { id: 'fish', label: 'Fish', src: fish },
  { id: 'dango', label: 'Dango', src: dango },
  { id: 'milk', label: 'Milk', src: milk },
  { id: 'tuna', label: 'Tuna', src: tuna },
  { id: 'snack', label: 'Snacks', src: snack },
  { id: 'treats', label: 'Treats', src: treats },
]
