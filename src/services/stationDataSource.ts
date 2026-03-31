/**
 * Única frontera entre el mock crudo (`mockData`) y el dominio normalizado.
 *
 * `stationService` y el resto de la app deben consumir solo estas funciones,
 * no importar arrays crudos directamente, para que la normalización no sea
 * opcional.
 */
import { rel_stations_services, services, stations } from './data/mockData.ts'
import { mapStationServices } from './mappers/stationServiceMapper.ts'
import { mapServices } from './mappers/serviceMapper.ts'
import { mapStations } from './mappers/stationMapper.ts'
import type { Service, Station, StationService } from '../types/index.ts'

export function getNormalizedStations(): Station[] {
  return mapStations(stations)
}

export function getNormalizedServices(): Service[] {
  return mapServices(services)
}

export function getNormalizedStationServices(): StationService[] {
  return mapStationServices(rel_stations_services)
}
