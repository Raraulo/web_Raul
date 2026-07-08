import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import Clarity from '@microsoft/clarity'
import './index.css'
import App from './App.jsx'

Clarity.init("xizus3zlmv")

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)