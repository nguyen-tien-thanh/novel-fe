import { FC, ReactNode } from 'react'
import { cn } from '@/lib'

export interface ITooltipProps {
  position?: 'top' | 'bottom' | 'left' | 'right'
  title: string
  children: ReactNode
  color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  className?: string
}

export const Tooltip: FC<ITooltipProps> = ({ position = 'bottom', title, children, color, className, ...props }) => {
  return (
    <div
      className={cn(
        'tooltip',
        position === 'top' && 'tooltip-top',
        position === 'bottom' && 'tooltip-bottom',
        position === 'left' && 'tooltip-left',
        position === 'right' && 'tooltip-right',
        color === 'primary' && 'tooltip-primary',
        color === 'secondary' && 'tooltip-secondary',
        color === 'accent' && 'tooltip-accent',
        color === 'info' && 'tooltip-info',
        color === 'success' && 'tooltip-success',
        color === 'warning' && 'tooltip-warning',
        color === 'error' && 'tooltip-error',
        className,
      )}
      data-tip={title}
      {...props}
    >
      {children}
    </div>
  )
}
