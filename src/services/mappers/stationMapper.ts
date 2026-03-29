/**
 * Mapper que normaliza los datos crudos de estaciones.
 *
 * Los datos crudos de la prueba tenían un error de sintaxis
 * (coma en vez de dos puntos en `stationId`), corregido en mockData.
 * Este mapper toma los datos ya parseables y los transforma
 * al formato `Station` definido en types/.
 *
 * @param rawStations - Array de objetos crudos con campos id, name, stationId
 * @returns Array de Station normalizado
 *
 * @example
 * const normalized = mapStations(stations)
 * // [{ id: 1, name: "Estación Prueba 1", stationId: "001" }, ...]
 */
import type { Station } from '../../types/index.ts'

export function mapStations(
  rawStations: Array<{ id: number; name: string; stationId: string }>,
): Station[] {
  return rawStations.map((raw) => ({
    id: raw.id,
    name: raw.name,
    stationId: raw.stationId,
  }))
}
