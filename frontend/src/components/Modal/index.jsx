import React from 'react'
import { FaTimes } from 'react-icons/fa'

import './styles.css'

export default function Modal({ children, isActive, setIsActive,  }) {
  return (
    <div className={isActive ? "modal-container active" : "modal-container"}>
      <div className="modal-content">
        {children}
      </div>
      <button type="button" className="btn-close" onClick={() => setIsActive(false)} >
        <FaTimes size={18} />
      </button>
    </div>
  )
}
