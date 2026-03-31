import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { FloatingMenu, type FloatingMenuItem } from '../components/FloatingMenu.tsx'
import { ROUTES } from '../routes/paths.ts'
import '../pages/BackendPage.css'

/** Icono de Java (taza de café simplificada) para el botón de backend */
function JavaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 18c0 2 3 3 6 3s6-1 6-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 18v-4h12v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 14V9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 10h1a2 2 0 0 1 0 4h-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 5c0-1 .5-2 2-2s2 1 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 3V1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Icono de monitor/código para el botón de frontend */
function FrontendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 10l-2 2 2 2M16 10l2 2-2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 9l-2 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const isBackend = location.pathname.startsWith(ROUTES.backendHome)

  const goHome = () => navigate(ROUTES.home)

  const frontendMenuItems: FloatingMenuItem[] = [
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
      onClick: () => navigate(ROUTES.problems),
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
      onClick: () => navigate(ROUTES.bugs),
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
      onClick: () => navigate(ROUTES.deliverables),
    },
  ]

  const backendMenuItems: FloatingMenuItem[] = [
    {
      id: 'backend-problems',
      label: 'Sección 2: Problemas y Trabajo en equipo',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      onClick: () => navigate(ROUTES.backendProblems),
    },
    {
      id: 'backend-bugs',
      label: 'Sección 3: Lógica en solución de bugs',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 2l1.88 1.88M14.12 3.88L16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 20c-3.3 0-6-2.7-6-6v-3a6 6 0 0 1 12 0v3c0 3.3-2.7 6-6 6z" stroke="currentColor" strokeWidth="2" />
          <path d="M6 13H2M22 13h-4M6 17H3M21 17h-3M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      onClick: () => navigate(ROUTES.backendBugs),
    },
    {
      id: 'backend-deliverables',
      label: 'Sección 4: Entregables finales',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <line x1="9" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="9" y1="17" x2="15" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      onClick: () => navigate(ROUTES.backendDeliverables),
    },
  ]

  return (
    <>
      {!isBackend ? (
        <button
          className="backend-toggle-btn backend-toggle-btn--to-backend"
          onClick={() => navigate(ROUTES.backendHome)}
          type="button"
          aria-label="Ir a la prueba backend"
        >
          <JavaIcon className="backend-toggle-btn__icon" />
          Prueba Backend
        </button>
      ) : (
        <button
          className="backend-toggle-btn backend-toggle-btn--to-frontend"
          onClick={goHome}
          type="button"
          aria-label="Volver a la prueba frontend"
        >
          <FrontendIcon className="backend-toggle-btn__icon" />
          Prueba Frontend
        </button>
      )}
      <Outlet />
      <FloatingMenu items={isBackend ? backendMenuItems : frontendMenuItems} />
    </>
  )
}
