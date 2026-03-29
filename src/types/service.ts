/**
 * Representa un servicio ofrecido en las estaciones Terpel.
 *
 * Los datos crudos de la API presentan inconsistencias:
 * - El campo identificador alterna entre `idServicio` e `idServicios`
 * - El nombre usa `nombreServ` en español
 * - Todos los registros comparten `id: 1` (error en la fuente)
 *
 * Esta interfaz representa el formato normalizado con campos
 * consistentes en inglés y con ids únicos corregidos.
 *
 * @see serviceMapper — Mapper que transforma los datos crudos a este formato
 */
export interface Service {
  /** Identificador único interno (corregido: 1, 2, 3, 4 en vez de todos 1) */
  id: number
  /** Código del servicio normalizado (ej: "s1", "s2") */
  serviceId: string
  /** Nombre legible del servicio (ej: "Baño", "Cajeros", "Soat", "Tienda") */
  name: string
}
