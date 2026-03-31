/**
 * Capa de servicios — Acceso a datos de estaciones.
 *
 * Funciones async que simulan llamadas a una API REST real.
 * Internamente consumen los datos mock y los normalizan con
 * los mappers antes de retornarlos. El delay simula latencia
 * de red para que React Query muestre estados de loading reales.
 *
 * Estas funciones son consumidas por los hooks de React Query
 * en la capa hooks/.
 */
import {
  getNormalizedStationServices,
  getNormalizedServices,
  getNormalizedStations,
} from './stationDataSource.ts'
import type { ContentItem, Service } from '../types/index.ts'

/** Latencia simulada en milisegundos para imitar llamadas de red */
const SIMULATED_DELAY = 400

/**
 * Estado local mutable que simula la persistencia en base de datos.
 * Almacena el status (draft/published) de cada estación por stationId.
 * Se inicializa con todas las estaciones en "published".
 */
const stationStatuses: Record<string, 'draft' | 'published'> = {}

/**
 * Utilidad interna que retorna una Promise que se resuelve
 * después del delay simulado, imitando latencia de red.
 *
 * @param data - Dato a retornar después del delay
 * @returns Promise que se resuelve con el dato proporcionado
 */
function simulateDelay<T>(data: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), SIMULATED_DELAY))
}

/**
 * Obtiene la lista de estaciones como ContentItem.
 *
 * Consume los datos crudos del mock, los normaliza con stationMapper,
 * y los transforma al formato ContentItem que necesita la vista,
 * incluyendo el status (draft/published) y la fecha de actualización.
 *
 * @returns Lista de ContentItem con datos de estaciones y estado de publicación
 *
 * @example
 * const items = await getStations()
 * // [{ id: 1, name: "Estación Prueba 1", stationId: "001", status: "published", updatedAt: "..." }]
 */
export async function getStations(): Promise<ContentItem[]> {
  const normalized = getNormalizedStations()

  const items: ContentItem[] = normalized.map((station) => ({
    id: station.id,
    name: station.name,
    stationId: station.stationId,
    status: stationStatuses[station.stationId] ?? 'published',
    updatedAt: new Date().toISOString(),
  }))

  return simulateDelay(items)
}

/**
 * Obtiene los servicios disponibles en una estación específica.
 *
 * Cruza la tabla de relaciones (rel_stations_services) con el catálogo
 * de servicios (services) para encontrar qué servicios ofrece la estación.
 * Ambas fuentes se normalizan con sus respectivos mappers.
 *
 * @param stationId - Código de la estación a consultar (ej: "001")
 * @returns Lista de Service disponibles en la estación
 *
 * @example
 * const services = await getServicesByStationId("001")
 * // [{ id: 1, serviceId: "s1", name: "Baño" }, { id: 2, serviceId: "s2", name: "Cajeros" }]
 */
export async function getServicesByStationId(stationId: string): Promise<Service[]> {
  const normalizedRelations = getNormalizedStationServices()
  const normalizedServices = getNormalizedServices()

  const serviceIds = normalizedRelations
    .filter((rel) => rel.stationId === stationId)
    .map((rel) => rel.serviceId)

  const result = normalizedServices.filter((svc) => serviceIds.includes(svc.serviceId))

  return simulateDelay(result)
}

/**
 * Cambia el estado de una estación entre activa (published) e inactiva (draft).
 *
 * Simula una mutación en base de datos alternando el campo status.
 * Si la estación está en "published", pasa a "draft" y viceversa.
 * Este cambio persiste en memoria durante la sesión.
 *
 * @param stationId - Código de la estación a modificar (ej: "001")
 * @returns El ContentItem actualizado con el nuevo estado
 *
 * @example
 * const updated = await toggleStationStatus("001")
 * // { id: 1, name: "Estación Prueba 1", stationId: "001", status: "draft", updatedAt: "..." }
 */
export async function toggleStationStatus(stationId: string): Promise<ContentItem> {
  const currentStatus = stationStatuses[stationId] ?? 'published'
  const newStatus = currentStatus === 'published' ? 'draft' : 'published'
  stationStatuses[stationId] = newStatus

  const normalized = getNormalizedStations()
  const station = normalized.find((s) => s.stationId === stationId)

  if (!station) {
    throw new Error(`Estación con stationId "${stationId}" no encontrada`)
  }

  const updated: ContentItem = {
    id: station.id,
    name: station.name,
    stationId: station.stationId,
    status: newStatus,
    updatedAt: new Date().toISOString(),
  }

  return simulateDelay(updated)
}
