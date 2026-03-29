/**
 * Grid responsive de estaciones renderizada con map().
 *
 * Cumple los requisitos de la prueba:
 * - Renderizar estaciones con map()
 * - Usar useState (controlado desde el padre) para la selección
 *
 * Muestra las cards en una grilla que se adapta al ancho disponible.
 *
 * @param stations - Array de ContentItem a renderizar
 * @param onSelectStation - Callback cuando se hace clic en una card (abre modal)
 * @param onToggleStatus - Callback cuando se cambia el estado de una estación
 */
import type { ContentItem } from '../types/index.ts'
import { StationCard } from './StationCard.tsx'
import './StationList.css'

interface StationListProps {
  stations: ContentItem[]
  onSelectStation: (stationId: string) => void
  onToggleStatus: (stationId: string) => void
}

export function StationList({
  stations,
  onSelectStation,
  onToggleStatus,
}: StationListProps) {
  return (
    <section className="station-list" aria-label="Lista de estaciones">
      <ul className="station-list__grid" role="list">
        {stations.map((station) => (
          <li key={station.stationId}>
            <StationCard
              station={station}
              onSelect={onSelectStation}
              onToggleStatus={onToggleStatus}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
