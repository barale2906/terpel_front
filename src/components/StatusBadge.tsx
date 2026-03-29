/**
 * Badge visual que indica el estado de publicación de una estación.
 *
 * Muestra "Publicada" en verde o "Borrador" en gris con un dot
 * indicador de color. Usado como componente aislado cuando se
 * necesita el badge fuera del contexto de StationCard.
 *
 * @param status - Estado de la estación: 'published' o 'draft'
 */
import './StatusBadge.css'

interface StatusBadgeProps {
  status: 'draft' | 'published'
}

const STATUS_LABELS: Record<string, string> = {
  published: 'Publicada',
  draft: 'Borrador',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`status-badge status-badge--${status}`}
      role="status"
      aria-label={`Estado: ${STATUS_LABELS[status]}`}
    >
      <span className="status-badge__dot" aria-hidden="true" />
      {STATUS_LABELS[status]}
    </span>
  )
}
