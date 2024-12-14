'use client'

import { Dispatch, FC, useEffect, useId } from 'react'
import { MarkIcon } from '../icons'
import { cn } from '@/lib'

export interface DrawerProps {
  open?: boolean
  setOpen?: Dispatch<boolean>
  children?: React.ReactNode
  position?: 'left' | 'right'
}

export const Drawer: FC<DrawerProps> = ({ open = false, setOpen, position = 'left', children }) => {
  const id = useId()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && setOpen) setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setOpen])

  return (
    <div className={cn('drawer z-[9999]', position === 'right' && 'drawer-end')}>
      <input
        id={id}
        type="checkbox"
        className="drawer-toggle"
        checked={open}
        onChange={e => setOpen && setOpen(!open)}
      />

      <div className="drawer-side">
        <label htmlFor={id} aria-label="close sidebar" className="drawer-overlay" />

        <ul className="menu bg-base-200 text-base-content min-h-full w-[80%] lg:max-w-sm p-4 pt-10">
          <label
            htmlFor={id}
            aria-label="close sidebar"
            role="button"
            className="btn btn-sm btn-ghost absolute top-1 right-1"
          >
            <MarkIcon className="size-4" />
          </label>

          {children}
        </ul>
      </div>
    </div>
  )
}
