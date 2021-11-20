import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { FaTimes } from 'react-icons/fa'
import styles from '@/styles/Modal.module.css'

export default function Modal({ show, onClose, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false)

  // Create ref for the modalWrapperRef
  const modalWrapperRef = useRef()

  // check if the user has clickedInside or ourside the modal
  const backDropHandler = (e) => {
    if (show && !modalWrapperRef?.current?.contains(e.target)) {
      onClose()
    }
  }

  useEffect(() => {
    setIsBrowser(true)
    window.addEventListener('click', backDropHandler)
    show && (document.body.style.overflow = 'hidden')
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('click', backDropHandler)
    }
  }, [show])

  const handleClose = (e) => {
    e.preventDefault()
    onClose()
    setIsBrowser(false)
  }

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.wrapper} ref={modalWrapperRef}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <a href='#' onClick={handleClose}>
              <FaTimes />
            </a>
          </div>
          {title && <div>{title}</div>}
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    )
  } else {
    return null
  }
}
