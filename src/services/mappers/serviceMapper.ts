/**
 * Mapper que normaliza los datos crudos de servicios.
 *
 * Los datos crudos presentan 3 inconsistencias que este mapper corrige:
 * 1. Todos los `id` son 1 → se reasignan ids únicos basados en el índice
 * 2. El identificador alterna entre `idServicio` e `idServicios` → se unifica a `serviceId`
 * 3. El nombre usa `nombreServ` → se normaliza a `name`
 *
 * @param rawServices - Array de objetos crudos con campos inconsistentes
 * @returns Array de Service normalizado con ids únicos y campos unificados
 *
 * @example
 * const normalized = mapServices(services)
 * // [{ id: 1, serviceId: "s1", name: "Baño" }, ...]
 */
import type { Service } from '../../types/index.ts'

interface RawService {
  id: number
  idServicio?: string
  idServicios?: string
  nombreServ: string
}

export function mapServices(rawServices: RawService[]): Service[] {
  return rawServices.map((raw, index) => ({
    id: index + 1,
    serviceId: raw.idServicio ?? raw.idServicios ?? '',
    name: raw.nombreServ,
  }))
}
