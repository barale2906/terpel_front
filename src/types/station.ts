/**
 * Representa una estación de servicio Terpel con datos normalizados.
 *
 * Los datos crudos de la API pueden traer campos con errores de sintaxis
 * (coma en vez de dos puntos en `stationId`). Esta interfaz representa
 * el formato limpio después de pasar por el mapper correspondiente.
 *
 * @see stationMapper — Mapper que transforma los datos crudos a este formato
 */
export interface Station {
  /** Identificador único interno de la estación */
  id: number
  /** Nombre descriptivo de la estación (ej: "Estación Prueba 1") */
  name: string
  /** Código único de estación usado para relaciones (ej: "001", "002") */
  stationId: string
}
