/**
 * Hook que gestiona la mutación del estado activa/inactiva de una estación.
 *
 * Usa React Query (useMutation) para cambiar el estado de una estación.
 * Al completar la mutación exitosamente, invalida la query de estaciones
 * para que la lista se refresque con el nuevo estado.
 *
 * Esto demuestra el patrón de invalidación de queries: en vez de
 * actualizar el estado local manualmente, se le dice a React Query
 * que los datos de estaciones ya no son válidos y debe refetchearlos.
 *
 * @returns Objeto con la función de mutación y estados
 * @returns .toggleStatus - Función que recibe stationId y muta el estado
 * @returns .isPending - true mientras la mutación está en curso
 *
 * @example
 * const { toggleStatus, isPending } = useToggleStationStatus()
 * toggleStatus("001") // Cambia published → draft o viceversa
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleStationStatus } from '../services/index.ts'

export function useToggleStationStatus() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: toggleStationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stations'] })
    },
  })

  return {
    toggleStatus: mutate,
    isPending,
  }
}
