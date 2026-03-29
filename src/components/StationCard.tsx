/**
 * Card individual de una estación de servicio.
 *
 * Muestra los datos de un ContentItem: nombre, código de estación,
 * estado de publicación y fecha de actualización. Permite abrir
 * los servicios de la estación (modal) y cambiar su estado activa/inactiva.
 *
 * El botón de toggle es un icono en la esquina superior derecha:
 * - Estación activa (published): ✕ rojo para desactivar
 * - Estación inactiva (draft): ✓ verde para activar
 *
 * @param station - Datos de la estación como ContentItem
 * @param onSelect - Callback al hacer clic en la card (recibe stationId, abre modal)
 * @param onToggleStatus - Callback al hacer clic en el toggle de estado (recibe stationId)
 */
import type { ContentItem } from '../types/index.ts'
import './StationCard.css'

interface StationCardProps {
  station: ContentItem
  onSelect: (stationId: string) => void
  onToggleStatus: (stationId: string) => void
}

/**
 * Formatea la fecha de actualización a un texto relativo legible.
 *
 * @param isoDate - Fecha en formato ISO 8601
 * @returns Texto como "Hace X minutos", "Hace X horas", etc.
 */
function formatRelativeTime(isoDate: string): string {
  const now = Date.now()
  const date = new Date(isoDate).getTime()
  const diffMs = now - date
  const diffMin = Math.floor(diffMs / 60000)

  if (diffMin < 1) return 'Hace un momento'
  if (diffMin < 60) return `Hace ${diffMin} min`

  const diffHours = Math.floor(diffMin / 60)
  if (diffHours < 24) return `Hace ${diffHours}h`

  const diffDays = Math.floor(diffHours / 24)
  return `Hace ${diffDays}d`
}

export function StationCard({ station, onSelect, onToggleStatus }: StationCardProps) {
  const statusLabel = station.status === 'published' ? 'Activa' : 'Inactiva'
  const isPublished = station.status === 'published'

  return (
    <div className="station-card">
      <button
        className={`station-card__toggle-icon ${isPublished ? 'station-card__toggle-icon--close' : 'station-card__toggle-icon--check'}`}
        onClick={(e) => {
          e.stopPropagation()
          onToggleStatus(station.stationId)
        }}
        aria-label={`Cambiar estado de ${station.name}`}
        type="button"
      >
        {isPublished ? (
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <button
        className="station-card__body"
        onClick={() => onSelect(station.stationId)}
        aria-label={`Ver servicios de ${station.name}`}
        type="button"
      >
        <div className="station-card__header">
          <h3 className="station-card__name">{station.name}</h3>
          <span className="station-card__id">{station.stationId}</span>
        </div>

        <div className="station-card__meta">
          <span
            className={`station-card__status station-card__status--${station.status}`}
            role="status"
            aria-label={`Estado: ${statusLabel}`}
          >
            <span
              className="station-card__status-dot"
              aria-hidden="true"
            />
            {statusLabel}
          </span>
          <span className="station-card__time">
            {formatRelativeTime(station.updatedAt)}
          </span>
        </div>
      </button>
    </div>
  )
}
