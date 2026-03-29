/**
 * Tests de los mappers de normalización de datos.
 *
 * Estos tests verifican que los mappers transforman correctamente
 * los datos crudos con inconsistencias de la API al formato limpio
 * definido en src/types/. Se escriben ANTES de implementar los
 * mappers (TDD: RED → GREEN → REFACTOR).
 */
import { stations, services, rel_stations_services } from '../services/data/mockData.ts'
import { mapStations } from '../services/mappers/stationMapper.ts'
import { mapServices } from '../services/mappers/serviceMapper.ts'
import { mapStationServices } from '../services/mappers/stationServiceMapper.ts'
import type { Station, Service, StationService } from '../types/index.ts'

describe('stationMapper', () => {
  /*
   * Qué se busca: Verificar que mapStations transforma el array crudo de
   *               estaciones (con campos inconsistentes de la API) en un
   *               array de objetos Station con la estructura normalizada.
   * Resultado esperado: Se retorna un array de 4 elementos, donde el primero
   *                     y el último tienen los campos id, name y stationId
   *                     con los valores correctos.
   */
  it('transforma los datos crudos en un array de Station normalizado', () => {
    const result: Station[] = mapStations(stations)

    expect(result).toHaveLength(4)
    expect(result[0]).toEqual({
      id: 1,
      name: 'Estación Prueba 1',
      stationId: '001',
    })
    expect(result[3]).toEqual({
      id: 4,
      name: 'Estación Prueba 4',
      stationId: '004',
    })
  })

  /*
   * Qué se busca: Verificar que todas las estaciones mapeadas contienen
   *               exactamente las propiedades definidas en el tipo Station,
   *               sin campos faltantes ni nombres crudos de la API.
   * Resultado esperado: Cada elemento del array resultante posee las
   *                     propiedades id, name y stationId.
   */
  it('cada estación tiene los campos id, name y stationId', () => {
    const result = mapStations(stations)

    result.forEach((station) => {
      expect(station).toHaveProperty('id')
      expect(station).toHaveProperty('name')
      expect(station).toHaveProperty('stationId')
    })
  })
})

describe('serviceMapper', () => {
  /*
   * Qué se busca: Verificar que mapServices transforma el array crudo de
   *               servicios en un array de objetos Service con la cantidad
   *               correcta de elementos.
   * Resultado esperado: Se retorna un array con exactamente 4 servicios
   *                     normalizados.
   */
  it('transforma los datos crudos en un array de Service normalizado', () => {
    const result: Service[] = mapServices(services)

    expect(result).toHaveLength(4)
  })

  /*
   * Qué se busca: Verificar que el mapper asigna identificadores únicos a
   *               cada servicio, dado que los datos crudos de la API traen
   *               todos los registros con id: 1 (dato duplicado/erróneo).
   * Resultado esperado: Los 4 servicios resultantes tienen ids distintos
   *                     entre sí (el Set resultante tiene tamaño 4).
   */
  it('genera ids únicos (los datos crudos tienen todos id: 1)', () => {
    const result = mapServices(services)
    const ids = result.map((s) => s.id)
    const uniqueIds = new Set(ids)

    expect(uniqueIds.size).toBe(4)
  })

  /*
   * Qué se busca: Verificar que el mapper unifica los campos inconsistentes
   *               idServicio e idServicios (que varían entre registros de la
   *               API) en un único campo normalizado serviceId.
   * Resultado esperado: Cada servicio tiene su serviceId correcto: 's1',
   *                     's2', 's3' y 's4' respectivamente.
   */
  it('unifica idServicio e idServicios al campo serviceId', () => {
    const result = mapServices(services)

    expect(result[0].serviceId).toBe('s1')
    expect(result[1].serviceId).toBe('s2')
    expect(result[2].serviceId).toBe('s3')
    expect(result[3].serviceId).toBe('s4')
  })

  /*
   * Qué se busca: Verificar que el mapper renombra el campo crudo
   *               nombreServ al campo normalizado name definido en el
   *               tipo Service.
   * Resultado esperado: Cada servicio tiene el nombre legible correcto:
   *                     'Baño', 'Cajeros', 'Soat' y 'Tienda'.
   */
  it('transforma nombreServ a name', () => {
    const result = mapServices(services)

    expect(result[0].name).toBe('Baño')
    expect(result[1].name).toBe('Cajeros')
    expect(result[2].name).toBe('Soat')
    expect(result[3].name).toBe('Tienda')
  })
})

describe('stationServiceMapper', () => {
  /*
   * Qué se busca: Verificar que mapStationServices transforma el array crudo
   *               de relaciones estación-servicio en un array de objetos
   *               StationService con la cantidad correcta de elementos.
   * Resultado esperado: Se retorna un array con exactamente 6 relaciones
   *                     normalizadas.
   */
  it('transforma los datos crudos en un array de StationService normalizado', () => {
    const result: StationService[] = mapStationServices(rel_stations_services)

    expect(result).toHaveLength(6)
  })

  /*
   * Qué se busca: Verificar que el mapper unifica los campos inconsistentes
   *               stationId e idEstacion (que varían entre registros de la
   *               API) en un único campo normalizado stationId.
   * Resultado esperado: Las relaciones en las posiciones 0, 4 y 5 tienen
   *                     los stationId correctos: '001', '003' y '004'.
   */
  it('unifica stationId e idEstacion al campo stationId', () => {
    const result = mapStationServices(rel_stations_services)

    expect(result[0].stationId).toBe('001')
    expect(result[4].stationId).toBe('003')
    expect(result[5].stationId).toBe('004')
  })

  /*
   * Qué se busca: Verificar que el mapper unifica los campos inconsistentes
   *               idServicio e idServicios (que varían entre registros de la
   *               API) en un único campo normalizado serviceId.
   * Resultado esperado: Las relaciones en las posiciones 0, 1, 4 y 5 tienen
   *                     los serviceId correctos: 's1', 's2', 's1' y 's4'.
   */
  it('unifica idServicio e idServicios al campo serviceId', () => {
    const result = mapStationServices(rel_stations_services)

    expect(result[0].serviceId).toBe('s1')
    expect(result[1].serviceId).toBe('s2')
    expect(result[4].serviceId).toBe('s1')
    expect(result[5].serviceId).toBe('s4')
  })

  /*
   * Qué se busca: Verificar que todas las relaciones mapeadas contienen
   *               exactamente las propiedades definidas en el tipo
   *               StationService, sin campos faltantes ni nombres crudos.
   * Resultado esperado: Cada elemento del array resultante posee las
   *                     propiedades id, stationId y serviceId.
   */
  it('cada relación tiene los campos id, stationId y serviceId', () => {
    const result = mapStationServices(rel_stations_services)

    result.forEach((rel) => {
      expect(rel).toHaveProperty('id')
      expect(rel).toHaveProperty('stationId')
      expect(rel).toHaveProperty('serviceId')
    })
  })
})
