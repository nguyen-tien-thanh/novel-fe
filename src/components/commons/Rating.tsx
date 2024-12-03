'use client'

import { cn } from '@/lib'
import { HTMLAttributes, FC, useState } from 'react'

export interface IRatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  value?: string | number
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, val: number | null) => void
}

export const Rating: FC<IRatingProps> = ({ name = '', size = 'md', value = 0, className, onChange, ...props }) => {
  const [selectedValue, setSelectedValue] = useState<number>(Number(value))
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const maxRating = 5

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setSelectedValue(index + 1)
    if (onChange) {
      onChange(e, index + 1)
    }
  }

  return (
    <div
      className={cn(
        'rating',
        size === 'xs' && 'rating-xs',
        size === 'sm' && 'rating-sm',
        size === 'md' && 'rating-md',
        size === 'lg' && 'rating-lg',
        className,
      )}
      {...props}
    >
      {Array.from({ length: maxRating }, (_, index) => {
        const isChecked = index < selectedValue
        const isHovered = hoveredIndex !== null && index <= hoveredIndex

        return (
          <input
            key={index}
            type="radio"
            name={name}
            value={index + 1}
            className={cn('mask mask-star', isHovered ? 'bg-primary' : isChecked ? 'bg-secondary' : 'bg-gray-200')}
            checked={selectedValue === index + 1}
            onChange={e => handleInputChange(e, index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        )
      })}
    </div>
  )
}
