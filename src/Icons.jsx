// Small hand-made SVG icons used across the app.
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
}

export function PawIcon({ className = '', size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <ellipse cx="12" cy="15.6" rx="5.2" ry="4.3" />
      <ellipse cx="4.9" cy="11.2" rx="2.1" ry="2.8" />
      <ellipse cx="9.4" cy="6.4" rx="2.1" ry="3" />
      <ellipse cx="14.6" cy="6.4" rx="2.1" ry="3" />
      <ellipse cx="19.1" cy="11.2" rx="2.1" ry="2.8" />
    </svg>
  )
}

export function HeartIcon({ className = '', size = 16, filled = false, style }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M12 20.5C5 15.6 3 12.2 3 9a4.6 4.6 0 0 1 9-1.3A4.6 4.6 0 0 1 21 9c0 3.2-2 6.6-9 11.5z" />
    </svg>
  )
}

export function CupIcon({ size = 22 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M5 8h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z" />
      <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 4.5c0 1 .8 1 .8 2M12 4.5c0 1 .8 1 .8 2" />
    </svg>
  )
}

export function MoonIcon({ size = 22 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
    </svg>
  )
}

export function PlayIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M7 4.8v14.4a1 1 0 0 0 1.5.86l11.6-7.2a1 1 0 0 0 0-1.72L8.5 3.94A1 1 0 0 0 7 4.8z" />
    </svg>
  )
}

export function PauseIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <rect x="6" y="4.5" width="4.2" height="15" rx="1.4" />
      <rect x="13.8" y="4.5" width="4.2" height="15" rx="1.4" />
    </svg>
  )
}

export function StopIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <rect x="5" y="5" width="14" height="14" rx="3" />
    </svg>
  )
}

export function ResetIcon({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20 4v4.5h-4.5" />
    </svg>
  )
}

export function BowIcon({ size = 24 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M12 12 4.5 7.5c-1 2.2-1 6.8 0 9L12 12z" />
      <path d="M12 12l7.5-4.5c1 2.2 1 6.8 0 9L12 12z" />
      <circle cx="12" cy="12" r="1.6" />
      <path d="M10.5 13.5 8 20M13.5 13.5 16 20" />
    </svg>
  )
}

export function BowlIcon({ size = 24 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M3.5 11h17a8.5 8.5 0 0 1-17 0z" />
      <path d="M7 8.5c1-1.6 2.8-2.5 5-2.5s4 .9 5 2.5" />
      <path d="M10 15.5c1 .8 3 .8 4 0" />
    </svg>
  )
}

export function BarsIcon({ size = 24 }) {
  return (
    <svg {...base} width={size} height={size}>
      <rect x="4" y="12" width="3.6" height="8" rx="1.2" />
      <rect x="10.2" y="7" width="3.6" height="13" rx="1.2" />
      <rect x="16.4" y="4" width="3.6" height="16" rx="1.2" />
    </svg>
  )
}

export function ClockIcon({ size = 22 }) {
  return (
    <svg {...base} width={size} height={size}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

export function StarIcon({ size = 22 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="m12 3.8 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.6-5 2.6.9-5.6-4-4 5.6-.8z" />
    </svg>
  )
}

export function ChevronIcon({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function FishDoodle({ className = '' }) {
  return (
    <svg viewBox="0 0 64 40" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M6 20c8-12 24-14 36-4l14-8v24l-14-8C30 34 14 32 6 20z" />
      <circle cx="16" cy="18" r="1.4" fill="currentColor" />
      <path d="M26 14c2 4 2 8 0 12" />
    </svg>
  )
}

export function BowDoodle({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M32 30 10 18c-3 6-3 18 0 24l22-12z" />
      <path d="M32 30l22-12c3 6 3 18 0 24L32 30z" />
      <circle cx="32" cy="30" r="4" />
      <path d="M28 34 20 58M36 34l8 24" />
    </svg>
  )
}
