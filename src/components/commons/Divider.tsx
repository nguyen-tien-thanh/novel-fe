import { cn } from '@/lib'
import { HTMLAttributes, FC, ReactNode } from 'react'

export interface IDividerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  direction?: 'vertical' | 'horizontal'
  position?: 'default' | 'start' | 'end'
  children?: ReactNode
}

export const Divider: FC<IDividerProps> = ({
  className,
  direction = 'vertical',
  position = 'default',
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'divider',
        direction === 'vertical' && 'divider-vertical',
        direction === 'horizontal' && 'divider-horizontal',
        position === 'default' && 'divider-default',
        position === 'start' && 'divider-start',
        position === 'start' && 'divider-start',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
