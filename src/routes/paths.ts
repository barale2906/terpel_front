/** Rutas absolutas (navegación, links). */
export const ROUTES = {
  home: '/',
  problems: '/problems',
  bugs: '/bugs',
  deliverables: '/deliverables',
  backendHome: '/backend',
  backendProblems: '/backend/problems',
  backendBugs: '/backend/bugs',
  backendDeliverables: '/backend/deliverables',
} as const

/** Valores de `path` en `<Route>` (hijos del layout con `path="/"`). */
export const ROUTE_PATTERNS = {
  problems: 'problems',
  bugs: 'bugs',
  deliverables: 'deliverables',
  backend: 'backend',
  backendProblems: 'backend/problems',
  backendBugs: 'backend/bugs',
  backendDeliverables: 'backend/deliverables',
} as const

export type AppRoutePath = (typeof ROUTES)[keyof typeof ROUTES]
