import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import Modal from './Components/Modal.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Modal/>  */}
  </StrictMode>,
)
