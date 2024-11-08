'use client'

import { useEffect } from 'react'

export const useBlockCopy = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return

    const detectDevTools = () => {
      const threshold = 160
      if (window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold) {
        debugger
      }
    }

    const blockActions = (e: Event) => {
      debugger

      if (e.type === 'contextmenu' || e.type === 'copy' || e.type === 'cut') {
        e.preventDefault()
      }

      if (e instanceof KeyboardEvent) {
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.metaKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.key === 'U') ||
          (e.metaKey && e.key === 'U') ||
          e.key === 'PrintScreen' ||
          (e.shiftKey && e.ctrlKey && e.key === 'S') ||
          (e.metaKey && e.shiftKey && e.key === '4')
        ) {
          e.preventDefault()
        }
      }
    }

    window.addEventListener('resize', detectDevTools)
    window.addEventListener('contextmenu', blockActions)
    window.addEventListener('keydown', blockActions)
    window.addEventListener('copy', blockActions)
    window.addEventListener('cut', blockActions)
    detectDevTools()

    return () => {
      window.addEventListener('resize', detectDevTools)
      window.removeEventListener('contextmenu', blockActions)
      window.removeEventListener('keydown', blockActions)
      window.removeEventListener('copy', blockActions)
      window.removeEventListener('cut', blockActions)
    }
  }, [])
}
