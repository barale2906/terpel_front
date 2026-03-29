/**
 * Mapper que normaliza la relación estaciones ↔ servicios.
 *
 * Los datos crudos presentan 2 inconsistencias que este mapper corrige:
 * 1. El campo de estación alterna entre `stationId` e `idEstacion` → se unifica a `stationId`
 * 2. El campo de servicio alterna entre `idServicio` e `idServicios` → se unifica a `serviceId`
 *
 * Esto simula un escenario real donde distintos endpoints o versiones
 * de la API usan nombres diferentes para el mismo dato.
 *
 * @param rawRelations - Array de objetos crudos con campos inconsistentes
 * @returns Array de StationService normalizado
 *
 * @example
 * const normalized = mapStationServices(rel_stations_services)
 * // [{ id: 1, stationId: "001", serviceId: "s1" }, ...]
 */
import type { StationService } from '../../types/index.ts'

interface RawStationService {
  id: number
  stationId?: string
  idEstacion?: string
  idServicio?: string
  idServicios?: string
}

export function mapStationServices(rawRelations: RawStationService[]): StationService[] {
  return rawRelations.map((raw) => ({
    id: raw.id,
    stationId: raw.stationId ?? raw.idEstacion ?? '',
    serviceId: raw.idServicio ?? raw.idServicios ?? '',
  }))
}
