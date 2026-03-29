/**
 * Representa la relación entre una estación y un servicio.
 *
 * Los datos crudos de la API presentan dos tipos de inconsistencias:
 * - El campo de estación alterna entre `stationId` e `idEstacion`
 * - El campo de servicio alterna entre `idServicio` e `idServicios`
 *
 * Esta interfaz unifica ambos campos a nombres consistentes en inglés,
 * permitiendo que los componentes trabajen con un formato predecible
 * sin importar las variaciones de la fuente de datos.
 *
 * @see stationServiceMapper — Mapper que transforma los datos crudos a este formato
 */
export interface StationService {
  /** Identificador único de la relación */
  id: number
  /** Código de estación normalizado (unifica stationId/idEstacion → stationId) */
  stationId: string
  /** Código de servicio normalizado (unifica idServicio/idServicios → serviceId) */
  serviceId: string
}
