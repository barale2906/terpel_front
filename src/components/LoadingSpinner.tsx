/**
 * Indicador de carga reutilizable.
 *
 * Muestra un spinner animado con un mensaje descriptivo.
 * Usa aria-busy y role="status" para comunicar el estado
 * de carga a tecnologías asistivas.
 *
 * @param message - Texto descriptivo del loading (ej: "Cargando estaciones...")
 */
import './LoadingSpinner.css'

interface LoadingSpinnerProps {
  message?: string
}

export function LoadingSpinner({ message = 'Cargando...' }: LoadingSpinnerProps) {
  return (
    <div className="loading-spinner" role="status" aria-busy="true">
      <div className="loading-spinner__circle" aria-hidden="true" />
      <p className="loading-spinner__text">{message}</p>
    </div>
  )
}
