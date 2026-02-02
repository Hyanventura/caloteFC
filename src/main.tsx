import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ListaGols from './ListaGols'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ListaGols />
  </StrictMode>,
)
