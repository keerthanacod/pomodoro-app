import { useEffect, useState } from "react";
import "./CatPet.css";

const costumes = [
  { name: "Classic", emoji: "🐱" },
  { name: "Bunny", emoji: "🐰" },
  { name: "Penguin", emoji: "🐧" },
  { name: "Bear", emoji: "🐻" },
  { name: "Chick", emoji: "🐥" },
  { name: "Strawberry", emoji: "🍓" },
  { name: "Panda", emoji: "🐼" },
  { name: "Shiba", emoji: "🦊" },
];

export default function CatPet() {
  const [costume, setCostume] = useState("Classic");
  const [eating, setEating] = useState(false);
  const [message, setMessage] = useState("Let's study together! ♡");
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!eating) return;

    const timeout = setTimeout(() => {
      setEating(false);
      setMessage("Yummy! Thank you! ♡");
    }, 1400);

    return () => clearTimeout(timeout);
  }, [eating]);

  function feedCat(food) {
    if (eating) return;
    setEating(true);
    setMessage(`Nom nom... ${food} ♡`);
  }

  return (
    <section className="kitty-pet">
      <div className={`kitty-stage ${eating ? "is-eating" : ""}`}>
        <div className="kitty-costume" aria-label={`${costume} costume`}>
          {costume !== "Classic" && (
            <span className={`costume-${costume.toLowerCase()}`}>
              {costumes.find((item) => item.name === costume)?.emoji}
            </span>
          )}
        </div>

        <svg
          className={`kitty-art ${blink ? "is-blinking" : ""}`}
          viewBox="0 0 240 230"
          role="img"
          aria-label="Your fluffy cream and grey kitty"
        >
          <defs>
            <linearGradient id="kittyFur" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fffaf3" />
              <stop offset="100%" stopColor="#e8ddd2" />
            </linearGradient>
            <linearGradient id="kittyPatch" x1="0" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#c5b7a9" />
              <stop offset="100%" stopColor="#8f8177" />
            </linearGradient>
          </defs>

          <ellipse cx="120" cy="216" rx="66" ry="8" fill="#edc9dc" opacity=".5" />

          {/* Tail */}
          <path
            d="M158 178 Q211 195 201 145 Q197 128 184 140"
            fill="none"
            stroke="#b4a79a"
            strokeWidth="23"
            strokeLinecap="round"
          />
          <path
            d="M158 178 Q211 195 201 145"
            fill="none"
            stroke="#ded2c5"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Body */}
          <ellipse cx="120" cy="174" rx="60" ry="48" fill="url(#kittyFur)" stroke="#b8a496" strokeWidth="2" />
          <ellipse cx="120" cy="183" rx="33" ry="31" fill="#fffaf5" />

          {/* Ears */}
          <path d="M63 81 Q49 26 83 45 L109 70 Z" fill="url(#kittyFur)" stroke="#b8a496" strokeWidth="2.5" />
          <path d="M131 70 L157 44 Q191 25 177 81 Z" fill="url(#kittyFur)" stroke="#b8a496" strokeWidth="2.5" />
          <path d="M68 67 Q65 46 82 56 L95 70 Z" fill="#efb5bc" />
          <path d="M146 69 L162 54 Q178 47 171 70 Z" fill="#efb5bc" />

          {/* Head */}
          <path
            d="M53 105 Q49 55 91 58 Q120 43 149 59 Q192 54 190 108 Q194 151 161 166 Q120 184 79 164 Q48 147 53 105 Z"
            fill="url(#kittyFur)"
            stroke="#b8a496"
            strokeWidth="2.5"
          />

          {/* Grey tabby patches */}
          <path d="M66 94 Q78 70 101 72 L92 98 L78 109 Z" fill="url(#kittyPatch)" opacity=".9" />
          <path d="M80 71 L93 60 L107 80 L97 91 Z" fill="#b8aa9b" />
          <path d="M174 91 Q162 70 143 73 L150 97 L166 108 Z" fill="url(#kittyPatch)" opacity=".9" />
          <path d="M160 70 L148 61 L136 79 L146 91 Z" fill="#b8aa9b" />

          {/* Eyes */}
          <g className="kitty-eyes">
            {blink ? (
              <>
                <path d="M82 117 Q91 109 100 117" fill="none" stroke="#62514b" strokeWidth="4" strokeLinecap="round" />
                <path d="M140 117 Q149 109 158 117" fill="none" stroke="#62514b" strokeWidth="4" strokeLinecap="round" />
              </>
            ) : (
              <>
                <ellipse cx="91" cy="116" rx="12" ry="15" fill="#617c8b" />
                <ellipse cx="149" cy="116" rx="12" ry="15" fill="#617c8b" />
                <ellipse cx="93" cy="116" rx="7" ry="10" fill="#263c48" />
                <ellipse cx="151" cy="116" rx="7" ry="10" fill="#263c48" />
                <circle cx="95" cy="110" r="4" fill="white" />
                <circle cx="153" cy="110" r="4" fill="white" />
              </>
            )}
          </g>

          {/* Cheeks and nose */}
          <ellipse cx="72" cy="135" rx="13" ry="7" fill="#f3b2bc" opacity=".7" />
          <ellipse cx="168" cy="135" rx="13" ry="7" fill="#f3b2bc" opacity=".7" />
          <path d="M114 137 Q120 132 126 137 L120 143 Z" fill="#df91a7" />

          {/* Mouth changes while eating */}
          {eating ? (
            <ellipse cx="120" cy="151" rx="10" ry="12" fill="#bd627c" stroke="#885067" strokeWidth="1.5" />
          ) : (
            <path
              d="M120 143 Q114 151 108 146 M120 143 Q126 151 132 146"
              fill="none"
              stroke="#885067"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}

          {/* Paws */}
          <ellipse cx="88" cy="203" rx="23" ry="15" fill="#fff9f3" stroke="#b8a496" strokeWidth="1.5" />
          <ellipse cx="152" cy="203" rx="23" ry="15" fill="#fff9f3" stroke="#b8a496" strokeWidth="1.5" />
          <g fill="#efb1c0">
            <circle cx="80" cy="201" r="4" />
            <circle cx="89" cy="198" r="4" />
            <circle cx="97" cy="202" r="4" />
            <ellipse cx="88" cy="207" rx="6" ry="4" />
            <circle cx="144" cy="201" r="4" />
            <circle cx="153" cy="198" r="4" />
            <circle cx="161" cy="202" r="4" />
            <ellipse cx="152" cy="207" rx="6" ry="4" />
          </g>
        </svg>

        {eating && <span className="kitty-food-pop">♡ 🍡 ♡</span>}
      </div>

      <p className="kitty-message" aria-live="polite">{message}</p>

      {eating && <div className="kitty-nom">nom nom nom...</div>}

      <div className="kitty-costume-list">
        {costumes.map((item) => (
          <button
            type="button"
            key={item.name}
            className={`kitty-costume-button ${costume === item.name ? "active" : ""}`}
            onClick={() => {
              setCostume(item.name);
              setMessage(`${item.name} look! So cute! ♡`);
            }}
            aria-pressed={costume === item.name}
          >
            <span>{item.emoji}</span>
            {item.name}
          </button>
        ))}
      </div>

      <div className="kitty-feed-demo">
        <button type="button" onClick={() => feedCat("fish")} disabled={eating}>🐟 Fish</button>
        <button type="button" onClick={() => feedCat("dango")} disabled={eating}>🍡 Dango</button>
        <button type="button" onClick={() => feedCat("milk")} disabled={eating}>🥛 Milk</button>
      </div>
    </section>
  );
}