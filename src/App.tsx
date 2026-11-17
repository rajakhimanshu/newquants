import { Navigate, Route, Routes } from 'react-router-dom'
import { Shell } from './components/layout/Shell'
import { Home } from './pages/Home'
import { MonteCarloPage } from './pages/MonteCarloPage'
import { ResearchNotePage } from './pages/ResearchNotePage'
import { ResearchPage } from './pages/ResearchPage'
import { ToolsPage } from './pages/ToolsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Home />} />
        <Route path="research" element={<ResearchPage />} />
        <Route path="research/:slug" element={<ResearchNotePage />} />
        <Route path="tools" element={<ToolsPage />} />
        <Route path="tools/monte-carlo" element={<MonteCarloPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
