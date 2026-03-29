/**
 * Hook que gestiona el fetching y cache de la lista de estaciones.
 *
 * Usa React Query (useQuery) para obtener las estaciones desde
 * la capa de servicios. Configura staleTime y gcTime para que
 * los datos se mantengan en cache y no se refetchen innecesariamente
 * mientras se consideran frescos (requisito Plus de la prueba).
 *
 * @returns Objeto con la lista de estaciones y estados de la query
 * @returns .stations - Array de ContentItem (undefined durante loading)
 * @returns .isLoading - true mientras la primera carga está en curso
 * @returns .isError - true si la query falló
 * @returns .error - Objeto de error si isError es true
 *
 * @example
 * const { stations, isLoading, isError } = useStations()
 */
import { useQuery } from '@tanstack/react-query'
import { getStations } from '../services/index.ts'

/** Datos frescos por 30 segundos, evita refetches innecesarios */
const STALE_TIME = 30 * 1000

/** Cache sobrevive 5 minutos después de desmontar el componente */
const GC_TIME = 5 * 60 * 1000

export function useStations() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['stations'],
    queryFn: getStations,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  })

  return {
    stations: data,
    isLoading,
    isError,
    error,
  }
}
