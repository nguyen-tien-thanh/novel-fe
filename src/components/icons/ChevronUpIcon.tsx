import { cn } from '@/lib'
import { FC, SVGProps } from 'react'

export const ChevronUpIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn('size-5 lg:size-6', className)}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
  )
}
