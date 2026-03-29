/**
 * Hook que gestiona el fetching de servicios para una estación específica.
 *
 * Usa React Query con query condicional: solo ejecuta la petición
 * cuando hay un stationId válido (enabled: !!stationId). Esto evita
 * requests innecesarios cuando el usuario aún no seleccionó una estación.
 *
 * La queryKey incluye el stationId, por lo que React Query automáticamente
 * refetcha cuando el usuario selecciona otra estación. Esto resuelve
 * el bug del useEffect con dependencias vacías (Sección 3 de la prueba).
 *
 * @param stationId - Código de la estación seleccionada (null si ninguna)
 * @returns Objeto con los servicios de la estación y estados de la query
 * @returns .services - Array de Service (undefined durante loading o sin selección)
 * @returns .isLoading - true mientras la carga está en curso
 * @returns .isError - true si la query falló
 *
 * @example
 * const { services, isLoading } = useStationServices("001")
 */
import { useQuery } from '@tanstack/react-query'
import { getServicesByStationId } from '../services/index.ts'

/** Servicios frescos por 30 segundos */
const STALE_TIME = 30 * 1000

/** Cache de servicios sobrevive 5 minutos */
const GC_TIME = 5 * 60 * 1000

export function useStationServices(stationId: string | null) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['services', stationId],
    queryFn: () => getServicesByStationId(stationId!),
    enabled: !!stationId,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  })

  return {
    services: data,
    isLoading,
    isError,
  }
}
