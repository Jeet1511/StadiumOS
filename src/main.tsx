/**
 * @module main
 * @description Application entry point. Wraps root component with ErrorBoundary
 * for graceful error handling during hackathon demos.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import ErrorBoundary from './views/shared/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
