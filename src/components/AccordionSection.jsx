import { useId } from 'react'
import { ChevronIcon } from '../Icons.jsx'

export default function AccordionSection({ title, icon, isOpen, onToggle, children }) {
  const uid = useId()
  const panelId = `${uid}-panel`
  const buttonId = `${uid}-button`

  return (
    <section className={`accordion ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        id={buttonId}
        className="accordion-trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="accordion-icon">{icon}</span>
        <span className="accordion-title">{title}</span>
        <span className="accordion-chevron">
          <ChevronIcon />
        </span>
      </button>
      <div className="accordion-panel" id={panelId} role="region" aria-labelledby={buttonId}>
        <div className="accordion-panel-inner">
          <div className="accordion-content">{children}</div>
        </div>
      </div>
    </section>
  )
}
