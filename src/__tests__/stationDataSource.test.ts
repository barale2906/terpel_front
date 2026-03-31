/**
 * Contrato del agregador mock → dominio: `stationService` debe leer solo desde aquí.
 *
 * Valida coherencia básica del resultado normalizado; el detalle fino de los
 * mappers sigue en `mappers.test.ts`.
 */
import {
  getNormalizedServices,
  getNormalizedStationServices,
  getNormalizedStations,
} from '../services/stationDataSource.ts'

describe('stationDataSource', () => {
  it('expone estaciones con el shape esperado (stationId string)', () => {
    const rows = getNormalizedStations()
    expect(rows).toHaveLength(4)
    expect(rows.every((s) => typeof s.stationId === 'string' && s.stationId.length > 0)).toBe(true)
  })

  it('servicios normalizados tienen ids únicos pese al mock con id duplicado', () => {
    const services = getNormalizedServices()
    const ids = services.map((s) => s.id)
    expect(new Set(ids).size).toBe(services.length)
  })

  it('relaciones normalizadas enlazan stationId y serviceId sin huecos', () => {
    const rel = getNormalizedStationServices()
    expect(rel.length).toBeGreaterThan(0)
    rel.forEach((r) => {
      expect(r.stationId).toBeTruthy()
      expect(r.serviceId).toBeTruthy()
    })
  })
})
