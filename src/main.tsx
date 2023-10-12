import React from 'react'
import ReactDOM from 'react-dom/client'
import './presentation/assets/styles/index.css'
import { Battle } from './presentation/components/pages/Battle'
import { BattleProvider } from './presentation/context/battle.context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BattleProvider>
      <Battle />
    </BattleProvider>
  </React.StrictMode>,
)
