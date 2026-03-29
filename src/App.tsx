/**
 * Componente raíz de la aplicación.
 *
 * Gestiona el enrutamiento interno con useState (sin react-router)
 * y envuelve todo con QueryClientProvider de React Query.
 *
 * Vistas disponibles:
 * - 'stations' → Panel principal de estaciones (por defecto)
 * - 'problems' → Sección 2: Problemas y Trabajo en equipo
 * - 'bugs'     → Sección 3: Lógica en solución de bugs
 * - 'deliverables' → Sección 4: Entregables finales
 *
 * El FloatingMenu se renderiza a nivel de App para estar
 * disponible en todas las vistas, excepto cuando ya estamos
 * en una de las secciones (para evitar redundancia).
 */
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StationsPage } from './pages/StationsPage.tsx'
import { ProblemsPage } from './pages/ProblemsPage.tsx'
import { BugsPage } from './pages/BugsPage.tsx'
import { DeliverablesPage } from './pages/DeliverablesPage.tsx'
import { FloatingMenu, type FloatingMenuItem } from './components/FloatingMenu.tsx'

type AppView = 'stations' | 'problems' | 'bugs' | 'deliverables'

/**
 * Instancia única del QueryClient con configuración de cache.
 * staleTime y gcTime se definen aquí como defaults globales.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      gcTime: 5 * 60 * 1000,
    },
  },
})

function App() {
  const [currentView, setCurrentView] = useState<AppView>('stations')

  /** Volver al panel principal */
  const goHome = () => setCurrentView('stations')

  /** Ítems del menú flotante para las secciones de la prueba */
  const menuItems: FloatingMenuItem[] = [
    {
      id: 'problems',
      label: 'Sección 2: Problemas y Trabajo en equipo',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      onClick: () => setCurrentView('problems'),
    },
    {
      id: 'bugs',
      label: 'Sección 3: Lógica en solución de bugs',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 2l1.88 1.88M14.12 3.88L16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 20c-3.3 0-6-2.7-6-6v-3a6 6 0 0 1 12 0v3c0 3.3-2.7 6-6 6z" stroke="currentColor" strokeWidth="2" />
          <path d="M6 13H2M22 13h-4M6 17H3M21 17h-3M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      onClick: () => setCurrentView('bugs'),
    },
    {
      id: 'deliverables',
      label: 'Sección 4: Entregables finales',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <line x1="9" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="9" y1="17" x2="15" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      onClick: () => setCurrentView('deliverables'),
    },
  ]

  return (
    <QueryClientProvider client={queryClient}>
      {currentView === 'stations' && <StationsPage />}
      {currentView === 'problems' && <ProblemsPage onBack={goHome} />}
      {currentView === 'bugs' && <BugsPage onBack={goHome} />}
      {currentView === 'deliverables' && <DeliverablesPage onBack={goHome} />}

      <FloatingMenu items={menuItems} />
    </QueryClientProvider>
  )
}

export default App
