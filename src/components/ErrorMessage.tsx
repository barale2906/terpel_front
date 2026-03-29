/**
 * Componente de mensaje de error reutilizable.
 *
 * Muestra un mensaje de error con role="alert" para que
 * las tecnologías asistivas lo anuncien inmediatamente.
 *
 * @param message - Texto descriptivo del error
 */
import './ErrorMessage.css'

interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-message" role="alert">
      <p className="error-message__text">{message}</p>
    </div>
  )
}
