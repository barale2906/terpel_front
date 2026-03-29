/**
 * Menú flotante tipo rueda (FAB radial) en la esquina inferior derecha.
 *
 * Al hacer clic en el botón principal, se despliegan los ítems en
 * un arco radial hacia arriba. Cada ítem tiene un icono SVG y un
 * tooltip que aparece al hacer hover.
 *
 * @param items - Array de ítems del menú con id, label, icono y callback
 */
import { useState } from 'react'
import './FloatingMenu.css'

export interface FloatingMenuItem {
  id: string
  label: string
  icon: React.ReactNode
  onClick: () => void
}

interface FloatingMenuProps {
  items: FloatingMenuItem[]
}

export function FloatingMenu({ items }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)

  const handleItemClick = (item: FloatingMenuItem) => {
    item.onClick()
    setIsOpen(false)
  }

  /**
   * Calcula la posición radial de cada ítem.
   * Distribuye los ítems en un arco de 90° (de -135° a -45°) hacia arriba.
   */
  const getItemStyle = (index: number, total: number) => {
    const radius = 80
    const startAngle = -180
    const endAngle = -90
    const angleStep = total > 1 ? (endAngle - startAngle) / (total - 1) : 0
    const angle = startAngle + angleStep * index
    const rad = (angle * Math.PI) / 180

    const x = Math.cos(rad) * radius
    const y = Math.sin(rad) * radius

    return {
      transform: isOpen
        ? `translate(${x}px, ${y}px) scale(1)`
        : 'translate(0, 0) scale(0)',
      transitionDelay: isOpen ? `${index * 60}ms` : '0ms',
    }
  }

  return (
    <div className="floating-menu">
      {/* Overlay para cerrar al hacer clic fuera */}
      {isOpen && (
        <div
          className="floating-menu__overlay"
          onClick={() => setIsOpen(false)}
          role="presentation"
        />
      )}

      {/* Ítems radiales */}
      <div className="floating-menu__items">
        {items.map((item, index) => (
          <button
            key={item.id}
            className="floating-menu__item"
            style={getItemStyle(index, items.length)}
            onClick={() => handleItemClick(item)}
            aria-label={item.label}
            title={item.label}
            type="button"
          >
            {item.icon}
          </button>
        ))}
      </div>

      {/* Botón principal FAB */}
      <button
        className={`floating-menu__fab ${isOpen ? 'floating-menu__fab--open' : ''}`}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú de secciones'}
        aria-expanded={isOpen}
        type="button"
      >
        <svg viewBox="0 0 24 24" fill="none" className="floating-menu__fab-icon" aria-hidden="true">
          {isOpen ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          ) : (
            <>
              <line x1="5" y1="8" x2="19" y2="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="9" y1="16" x2="15" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>
    </div>
  )
}
