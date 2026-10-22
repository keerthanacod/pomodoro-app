# Pomodoro ♡ Kitty Study Timer

React + Vite Pomodoro timer with a watercolor virtual kitten, 8 outfits, treats and daily focus stats.

## Run it

```bash
npm install
npm run dev      # open the http://localhost:5173 link it prints
npm run build    # production build into /dist
npm run lint
```

## Test durations (kept as requested)
`src/constants.js` → Focus 10s, Short Break 5s, Long Break 8s. Change them there when you're ready.

## Putting it into your existing VS Code project
Copy these into your project (merge, don't delete your other files):

- `src/` (App.jsx, App.css, index.css, main.jsx, constants.js, catAssets.js, sounds.js, Icons.jsx, `components/`, `assets/`)
- `public/sounds/fallback_*.mp3` and `public/favicon.svg`
- **Keep your own `package.json`** – the app only uses `react` and `react-dom`, no new dependencies.
- **Keep your two existing sounds** in `public/sounds/`: `pomodoro_5_second_beeps.mp3` and `pomodoro_cat_meow_loop.mp3`. The app uses them first. If either file is missing, it automatically uses the bundled `fallback_*.mp3` files (cut from your uploaded countdown + meow clip).
- The old `CatPet.jsx` / `CatPet.css` in `src/` are replaced by `src/components/CatPet.*` – delete the old ones.

## Your font
No font is hard-coded. Open `src/index.css` and replace the `--app-font` value with the `font-family` from your old index.css. Everything inherits it.

## Where things are
- `src/sounds.js` – pop (generated, no file), countdown beeps, looping meow, Stop Sound
- `src/assets/cat`, `src/assets/food` – transparent PNGs cut from your character sheet
- `src/catAssets.js` – outfit / expression / treat lists
