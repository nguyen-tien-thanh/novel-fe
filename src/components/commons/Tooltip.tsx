import { FC, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib'

export interface ITooltipProps extends HTMLAttributes<HTMLDivElement> {
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
        'lg:tooltip z-[5]',
        position === 'top' && 'lg:tooltip-top',
        position === 'bottom' && 'lg:tooltip-bottom',
        position === 'left' && 'lg:tooltip-left',
        position === 'right' && 'lg:tooltip-right',
        color === 'primary' && 'lg:tooltip-primary',
        color === 'secondary' && 'lg:tooltip-secondary',
        color === 'accent' && 'lg:tooltip-accent',
        color === 'info' && 'lg:tooltip-info',
        color === 'success' && 'lg:tooltip-success',
        color === 'warning' && 'lg:tooltip-warning',
        color === 'error' && 'lg:tooltip-error',
        className,
      )}
      data-tip={title}
      {...props}
    >
      {children}
    </div>
  )
}
