import { cn } from '@/lib'
import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  className?: string
  children: ReactNode
}

export const Button: FC<IButtonProps> = ({ color, className, children, ...props }) => {
  return (
    <button className={cn('btn', className)} {...props} aria-label="button">
      {children}
    </button>
  )
}
