/**
 * Test del componente StationCard (requisito: test de componente con render + interacción).
 *
 * Verifica que el componente:
 * - Renderiza el nombre y stationId de la estación
 * - Muestra el estado (draft/published) visualmente
 * - Al hacer clic en el botón toggle, invoca el callback onToggleStatus
 * - Al hacer clic en la card, invoca el callback onSelect (abre modal)
 * - Tiene los aria-label necesarios para accesibilidad
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StationCard } from '../components/StationCard.tsx'
import type { ContentItem } from '../types/index.ts'

const mockStation: ContentItem = {
  id: 1,
  name: 'Estación Prueba 1',
  stationId: '001',
  status: 'published',
  updatedAt: '2026-03-28T10:00:00Z',
}

const mockDraftStation: ContentItem = {
  id: 2,
  name: 'Estación Prueba 2',
  stationId: '002',
  status: 'draft',
  updatedAt: '2026-03-28T10:00:00Z',
}

describe('StationCard', () => {
  /*
   * Qué se busca: Verificar que el componente StationCard renderiza
   *               correctamente el nombre de la estación recibida por props.
   * Resultado esperado: El texto 'Estación Prueba 1' aparece en el DOM
   *                     después del render.
   */
  it('renderiza el nombre de la estación', () => {
    render(
      <StationCard
        station={mockStation}
        onSelect={vi.fn()}
        onToggleStatus={vi.fn()}
      />,
    )

    expect(screen.getByText('Estación Prueba 1')).toBeInTheDocument()
  })

  /*
   * Qué se busca: Verificar que el componente StationCard muestra el
   *               identificador de estación (stationId) de forma visible
   *               para que el usuario pueda identificar la estación.
   * Resultado esperado: El texto '001' aparece en el DOM después del render.
   */
  it('renderiza el stationId de la estación', () => {
    render(
      <StationCard
        station={mockStation}
        onSelect={vi.fn()}
        onToggleStatus={vi.fn()}
      />,
    )

    expect(screen.getByText('001')).toBeInTheDocument()
  })

  /*
   * Qué se busca: Verificar que cuando la estación tiene status 'published',
   *               el componente lo traduce visualmente al texto 'Activa'
   *               para el usuario final.
   * Resultado esperado: El texto 'Activa' aparece en el DOM al renderizar
   *                     una estación con status 'published'.
   */
  it('muestra el estado published como Activa', () => {
    render(
      <StationCard
        station={mockStation}
        onSelect={vi.fn()}
        onToggleStatus={vi.fn()}
      />,
    )

    expect(screen.getByText('Activa')).toBeInTheDocument()
  })

  /*
   * Qué se busca: Verificar que cuando la estación tiene status 'draft',
   *               el componente lo traduce visualmente al texto 'Inactiva'
   *               para el usuario final.
   * Resultado esperado: El texto 'Inactiva' aparece en el DOM al renderizar
   *                     una estación con status 'draft'.
   */
  it('muestra el estado draft como Inactiva', () => {
    render(
      <StationCard
        station={mockDraftStation}
        onSelect={vi.fn()}
        onToggleStatus={vi.fn()}
      />,
    )

    expect(screen.getByText('Inactiva')).toBeInTheDocument()
  })

  /*
   * Qué se busca: Verificar que al hacer clic en el botón de toggle de
   *               estado, el componente invoca el callback onToggleStatus
   *               pasándole el stationId de la estación correspondiente.
   * Resultado esperado: El callback handleToggle se llama exactamente una
   *                     vez con el argumento '001' (el stationId del mock).
   */
  it('invoca onToggleStatus al hacer clic en el botón de toggle', async () => {
    const user = userEvent.setup()
    const handleToggle = vi.fn()

    render(
      <StationCard
        station={mockStation}
        onSelect={vi.fn()}
        onToggleStatus={handleToggle}
      />,
    )

    const toggleButton = screen.getByRole('button', { name: /cambiar estado/i })
    await user.click(toggleButton)

    expect(handleToggle).toHaveBeenCalledOnce()
    expect(handleToggle).toHaveBeenCalledWith('001')
  })

  /*
   * Qué se busca: Verificar que al hacer clic sobre la card completa, el
   *               componente invoca el callback onSelect pasándole el
   *               stationId, lo que permite abrir el modal de servicios.
   * Resultado esperado: El callback handleSelect se llama exactamente una
   *                     vez con el argumento '001' (el stationId del mock).
   */
  it('invoca onSelect al hacer clic en la card', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()

    render(
      <StationCard
        station={mockStation}
        onSelect={handleSelect}
        onToggleStatus={vi.fn()}
      />,
    )

    const card = screen.getByRole('button', { name: /ver servicios de estación prueba 1/i })
    await user.click(card)

    expect(handleSelect).toHaveBeenCalledOnce()
    expect(handleSelect).toHaveBeenCalledWith('001')
  })

  /*
   * Qué se busca: Verificar que el botón de toggle de estado tiene un
   *               aria-label descriptivo para lectores de pantalla,
   *               cumpliendo con los estándares de accesibilidad (a11y).
   * Resultado esperado: Existe un botón en el DOM con un aria-label que
   *                     contiene el texto 'cambiar estado'.
   */
  it('tiene aria-label descriptivo en el botón de toggle', () => {
    render(
      <StationCard
        station={mockStation}
        onSelect={vi.fn()}
        onToggleStatus={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: /cambiar estado/i })).toBeInTheDocument()
  })

  /*
   * Qué se busca: Verificar que el botón principal de la card tiene un
   *               aria-label descriptivo para lectores de pantalla,
   *               cumpliendo con los estándares de accesibilidad (a11y).
   * Resultado esperado: Existe un botón en el DOM con un aria-label que
   *                     contiene el texto 'ver servicios'.
   */
  it('tiene aria-label descriptivo en el botón de la card', () => {
    render(
      <StationCard
        station={mockStation}
        onSelect={vi.fn()}
        onToggleStatus={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: /ver servicios/i })).toBeInTheDocument()
  })
})
