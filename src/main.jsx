import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import { LanguageProvider } from './context/LanguageProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider >
      <ThemeProvider value>
        <App />
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>,
)
