/**
 * Datos mock que simulan la respuesta de una API real.
 *
 * Estos datos provienen directamente del enunciado de la prueba técnica.
 * Los errores de sintaxis (coma en vez de dos puntos) fueron corregidos
 * para que el código compile, pero las **inconsistencias de campos se
 * preservan intencionalmente** para simular un contrato de API inestable:
 *
 * - `stations`: campo `stationId` tenía coma en vez de dos puntos
 * - `rel_stations_services`: mezcla `stationId` con `idEstacion`,
 *   y `idServicio` con `idServicios`
 * - `services`: todos los `id` son 1 (deberían ser únicos),
 *   y mezcla `idServicio` con `idServicios`
 *
 * Los mappers en `services/mappers/` normalizan estos datos; `stationDataSource.ts`
 * es la única puerta hacia el dominio (consumida por `stationService.ts`).
 */

/**
 * Estaciones de servicio.
 * Error original corregido: `stationId, "001"` → `stationId: "001"`
 */
export const stations = [
  { id: 1, name: 'Estación Prueba 1', stationId: '001' },
  { id: 2, name: 'Estación Prueba 2', stationId: '002' },
  { id: 3, name: 'Estación Prueba 3', stationId: '003' },
  { id: 4, name: 'Estación Prueba 4', stationId: '004' },
]

/**
 * Relación estaciones ↔ servicios.
 * Inconsistencias preservadas:
 * - `stationId` vs `idEstacion` (inglés/español)
 * - `idServicio` vs `idServicios` (singular/plural)
 */
export const rel_stations_services = [
  { id: 1, stationId: '001', idServicio: 's1' },
  { id: 2, stationId: '001', idServicios: 's2' },
  { id: 3, stationId: '002', idServicios: 's1' },
  { id: 4, stationId: '003', idServicio: 's3' },
  { id: 5, idEstacion: '003', idServicios: 's1' },
  { id: 6, idEstacion: '004', idServicios: 's4' },
]

/**
 * Catálogo de servicios disponibles.
 * Inconsistencias preservadas:
 * - Todos los `id` son 1 (deberían ser únicos)
 * - `idServicio` vs `idServicios` (singular/plural)
 */
export const services = [
  { id: 1, idServicio: 's1', nombreServ: 'Baño' },
  { id: 1, idServicios: 's2', nombreServ: 'Cajeros' },
  { id: 1, idServicio: 's3', nombreServ: 'Soat' },
  { id: 1, idServicios: 's4', nombreServ: 'Tienda' },
]
