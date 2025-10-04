import './scss/main.scss'
import './components/utils'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

document.body.focus()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
