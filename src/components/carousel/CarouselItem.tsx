import { cn } from '@/lib'
import { FC, ReactNode } from 'react'

export interface ICarouselItemProps {
  children: ReactNode
  className?: string
}

export const CarouselItem: FC<ICarouselItemProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn('carousel-item place-content-center', className)} {...props}>
      {children}
    </div>
  )
}
