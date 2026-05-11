import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ErrorFallBack from './ui/ErrorFallback.jsx'
import {ErrorBoundary} from 'react-error-boundary'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={()=>window.location.replace("/")}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
