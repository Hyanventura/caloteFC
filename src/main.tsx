import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ListaGols from './ListaGols'
import { Footer } from './Footer'
import { Header } from './Header'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <ListaGols />
    <Footer/>
  </StrictMode>,
)
