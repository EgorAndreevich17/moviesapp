import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App/App'
import '../src/styles/nullstyle.scss'
import '../src/styles/global.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
