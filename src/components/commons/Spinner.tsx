import { cn } from '@/lib'
import { FC } from 'react'

export interface ISpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}
export const Spinner: FC<ISpinnerProps> = ({ size = 'md', className, ...props }) => {
  return (
    <span
      className={cn(
        'loading loading-infinity',
        size === 'xs' && 'loading-xs',
        size === 'sm' && 'loading-sm',
        size === 'md' && 'loading-md',
        size === 'lg' && 'loading-lg',
        className,
      )}
      {...props}
    />
  )
}
