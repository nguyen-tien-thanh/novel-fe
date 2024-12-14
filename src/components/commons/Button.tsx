import { cn } from '@/lib'
import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  className?: string
  children: ReactNode
  responsive?: boolean
}

export const Button: FC<IButtonProps> = ({ color, className, children, responsive = true, ...props }) => {
  return (
    <button
      className={cn(
        'btn',
        responsive && 'btn-sm lg:btn-md',
        color === 'primary' && 'btn-primary',
        color === 'secondary' && 'btn-secondary',
        color === 'accent' && 'btn-accent',
        color === 'info' && 'btn-info',
        color === 'success' && 'btn-success',
        color === 'warning' && 'btn-warning',
        color === 'error' && 'btn-error',
        className,
      )}
      {...props}
      aria-label="button"
    >
      {children}
    </button>
  )
}
