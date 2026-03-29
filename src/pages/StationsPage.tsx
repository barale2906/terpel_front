/**
 * Página principal — "Contenido por Estación".
 *
 * Muestra un grid responsive con las estaciones. Al hacer clic en una
 * card se abre un modal con los servicios de esa estación.
 *
 * Usa useState para controlar la selección (requisito de la prueba)
 * y useStations/useToggleStationStatus para el estado del servidor.
 *
 * Flujo de datos:
 *   useStations() → StationList (grid) → StationCard (clic)
 *                                           ↓
 *   useState(selectedStationId) → Modal → ServiceList → useStationServices()
 */
import { useState } from 'react'
import { useStations } from '../hooks/index.ts'
import { useToggleStationStatus } from '../hooks/index.ts'
import { StationList } from '../components/StationList.tsx'
import { ServiceList } from '../components/ServiceList.tsx'
import { Modal } from '../components/Modal.tsx'
import { LoadingSpinner } from '../components/LoadingSpinner.tsx'
import { ErrorMessage } from '../components/ErrorMessage.tsx'
import './StationsPage.css'

export function StationsPage() {
  /** stationId de la estación seleccionada actualmente (requisito: useState) */
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null)

  const { stations, isLoading, isError } = useStations()
  const { toggleStatus, isPending } = useToggleStationStatus()

  /** Nombre de la estación seleccionada para mostrar en el modal */
  const selectedStation = stations?.find((s) => s.stationId === selectedStationId)
  const selectedStationName = selectedStation?.name ?? ''

  /** Cierra el modal reseteando la selección */
  const handleCloseModal = () => setSelectedStationId(null)

  if (isLoading) {
    return (
      <div className="stations-page stations-page--centered">
        <LoadingSpinner message="Cargando estaciones..." />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="stations-page stations-page--centered">
        <ErrorMessage message="No se pudieron cargar las estaciones. Intenta nuevamente." />
      </div>
    )
  }

  return (
    <div className="stations-page">
      <header className="stations-page__header">
        <h1 className="stations-page__title">Contenido por Estación</h1>
        {isPending && (
          <span className="stations-page__saving" role="status">
            Guardando...
          </span>
        )}
      </header>

      <main className="stations-page__content">
        {stations && (
          <StationList
            stations={stations}
            onSelectStation={setSelectedStationId}
            onToggleStatus={toggleStatus}
          />
        )}
      </main>

      <Modal
        isOpen={selectedStationId !== null && selectedStation?.status === 'published'}
        onClose={handleCloseModal}
        title={`Servicios — ${selectedStationName}`}
      >
        <ServiceList
          stationId={selectedStationId}
          stationName={selectedStationName}
        />
      </Modal>
    </div>
  )
}
