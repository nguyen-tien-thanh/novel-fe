import { cn } from '@/lib'
import React, { FC, ReactElement } from 'react'
import { CarouselItem } from './CarouselItem'

export interface ICarouselProps {
  type?: 'start' | 'center' | 'end' | 'vertical'
  className?: string
  children: ReactElement<typeof CarouselItem>[] | ReactElement<typeof CarouselItem>
}

export const Carousel: FC<ICarouselProps> = ({ type = 'start', className, children, ...props }) => {
  return (
    <div
      className={cn(
        'carousel w-full',
        type === 'start' && 'carousel-start',
        type === 'center' && 'carousel-center',
        type === 'end' && 'carousel-end',
        type === 'vertical' && 'carousel-vertical',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
