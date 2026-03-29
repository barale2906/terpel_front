/**
 * Entidad principal de la vista "Contenido por Estación".
 *
 * Combina los datos de una estación con metadatos de estado UI
 * requeridos por la prueba técnica. Cada ContentItem representa
 * una estación en el panel con su estado de publicación y fecha
 * de última actualización.
 *
 * Esta entidad es la que consume directamente la capa de componentes
 * para renderizar la lista de estaciones.
 */
export interface ContentItem {
  /** Identificador único interno de la estación */
  id: number
  /** Nombre descriptivo de la estación */
  name: string
  /** Código único de estación (ej: "001") */
  stationId: string
  /** Estado de publicación: draft (borrador) o published (publicada/activa) */
  status: 'draft' | 'published'
  /** Fecha ISO de la última actualización (ej: "2026-03-28T10:30:00Z") */
  updatedAt: string
}
