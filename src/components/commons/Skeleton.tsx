import { cn } from '@/lib'
import { FC } from 'react'

export interface ISkeletonProps {
  className?: string
  variant?: 'text' | 'circle' | 'rectangle'
  count?: number
}

export const Skeleton: FC<ISkeletonProps> = ({ className, variant, count = 1, ...props }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'skeleton w-full',
            variant === 'text' && 'h-8',
            variant === 'circle' && 'size-8 rounded-full',
            variant === 'rectangle' && 'h-32',
            className,
          )}
          {...props}
        />
      ))}
    </>
  )
}
