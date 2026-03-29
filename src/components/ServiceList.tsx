/**
 * Grid de iconos de servicios para una estación.
 *
 * Consume el hook useStationServices para obtener los servicios
 * de la estación proporcionada. Muestra estados de loading, error
 * y caso vacío (sin servicios).
 *
 * Se renderiza dentro de un Modal cuando el usuario selecciona una estación.
 *
 * @param stationId - Código de la estación (null si ninguna)
 * @param stationName - Nombre de la estación para accesibilidad
 */
import { useStationServices } from '../hooks/index.ts'
import { ServiceIcon } from './ServiceIcon.tsx'
import { LoadingSpinner } from './LoadingSpinner.tsx'
import { ErrorMessage } from './ErrorMessage.tsx'
import './ServiceList.css'

interface ServiceListProps {
  stationId: string | null
  stationName: string | null
}

export function ServiceList({ stationId, stationName }: ServiceListProps) {
  const { services, isLoading, isError } = useStationServices(stationId)

  if (!stationId) return null

  if (isLoading) {
    return <LoadingSpinner message="Cargando servicios..." />
  }

  if (isError) {
    return <ErrorMessage message="Error al cargar los servicios de esta estación." />
  }

  return (
    <section className="service-list" aria-label={`Servicios de ${stationName}`}>
      {services && services.length > 0 ? (
        <ul className="service-list__grid" role="list">
          {services.map((service) => (
            <li key={service.serviceId}>
              <ServiceIcon serviceId={service.serviceId} name={service.name} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="service-list__empty-msg">
          Esta estación no tiene servicios registrados.
        </p>
      )}
    </section>
  )
}
