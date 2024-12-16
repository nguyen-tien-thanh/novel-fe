import { cn } from '@/lib'
import { FC, SVGProps } from 'react'

export const CheckIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('size-4', className)} {...props}>
      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
    </svg>
  )
}
