import React from 'react'
import ReactDOM from 'react-dom/client'
import './presentation/assets/styles/index.css'
import { Battle } from './presentation/components/pages/Battle'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Battle />
  </React.StrictMode>,
)
