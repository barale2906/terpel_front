/**
 * Test del hook useStations (requisito de la prueba: test de hook/service con mock API).
 *
 * Verifica que el hook:
 * - Retorna la lista de estaciones como ContentItem[]
 * - Maneja el estado de loading mientras la data se resuelve
 * - Maneja errores cuando el servicio falla
 *
 * Se mockea la función getStations del servicio con vi.mock()
 * para aislar el hook de la fuente de datos real.
 */
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useStations } from '../hooks/useStations.ts'
import type { ContentItem } from '../types/index.ts'

vi.mock('../services/stationService.ts')

import { getStations } from '../services/stationService.ts'

const mockGetStations = vi.mocked(getStations)

/**
 * Crea un wrapper con QueryClientProvider para tests de hooks
 * que dependen de React Query. Se desactivan retries para que
 * los tests de error fallen inmediatamente.
 */
function createQueryWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

const mockStations: ContentItem[] = [
  {
    id: 1,
    name: 'Estación Prueba 1',
    stationId: '001',
    status: 'published',
    updatedAt: '2026-03-28T10:00:00Z',
  },
  {
    id: 2,
    name: 'Estación Prueba 2',
    stationId: '002',
    status: 'draft',
    updatedAt: '2026-03-28T10:00:00Z',
  },
]

describe('useStations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  /*
   * Qué se busca: Verificar que el hook useStations retorna correctamente
   *               la lista de estaciones como ContentItem[] cuando la
   *               petición al servicio se resuelve exitosamente.
   * Resultado esperado: isLoading pasa a false, stations contiene el array
   *                     mockStations con las 2 estaciones de prueba, y
   *                     isError es false.
   */
  it('retorna la lista de estaciones cuando la query se resuelve', async () => {
    mockGetStations.mockResolvedValue(mockStations)

    const { result } = renderHook(() => useStations(), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.stations).toEqual(mockStations)
    expect(result.current.isError).toBe(false)
  })

  /*
   * Qué se busca: Verificar que el hook expone un estado de carga (loading)
   *               mientras la promesa del servicio aún no se ha resuelto,
   *               permitiendo a la UI mostrar un indicador de carga.
   * Resultado esperado: isLoading es true y stations es undefined mientras
   *                     la promesa permanece pendiente (sin resolver).
   */
  it('muestra estado de loading mientras la data se resuelve', () => {
    mockGetStations.mockReturnValue(new Promise(() => {}))

    const { result } = renderHook(() => useStations(), {
      wrapper: createQueryWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.stations).toBeUndefined()
  })

  /*
   * Qué se busca: Verificar que el hook maneja correctamente los errores
   *               de red o de servicio, exponiendo el estado de error para
   *               que la UI pueda mostrar un mensaje adecuado al usuario.
   * Resultado esperado: isError pasa a true y error está definido cuando
   *                     getStations rechaza la promesa con un Error.
   */
  it('maneja errores cuando el servicio falla', async () => {
    mockGetStations.mockRejectedValue(new Error('Error de red'))

    const { result } = renderHook(() => useStations(), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toBeDefined()
  })
})
