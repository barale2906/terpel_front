import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout.tsx'
import { StationsPage } from './pages/StationsPage.tsx'
import { ProblemsPage } from './pages/ProblemsPage.tsx'
import { BugsPage } from './pages/BugsPage.tsx'
import { DeliverablesPage } from './pages/DeliverablesPage.tsx'
import { BackendStationsPage } from './pages/BackendStationsPage.tsx'
import { BackendProblemsPage } from './pages/BackendProblemsPage.tsx'
import { BackendBugsPage } from './pages/BackendBugsPage.tsx'
import { BackendDeliverablesPage } from './pages/BackendDeliverablesPage.tsx'
import { ROUTE_PATTERNS } from './routes/paths.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      gcTime: 5 * 60 * 1000,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<StationsPage />} />
          <Route path={ROUTE_PATTERNS.problems} element={<ProblemsPage />} />
          <Route path={ROUTE_PATTERNS.bugs} element={<BugsPage />} />
          <Route path={ROUTE_PATTERNS.deliverables} element={<DeliverablesPage />} />
          <Route path={ROUTE_PATTERNS.backend} element={<BackendStationsPage />} />
          <Route path={ROUTE_PATTERNS.backendProblems} element={<BackendProblemsPage />} />
          <Route path={ROUTE_PATTERNS.backendBugs} element={<BackendBugsPage />} />
          <Route path={ROUTE_PATTERNS.backendDeliverables} element={<BackendDeliverablesPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
