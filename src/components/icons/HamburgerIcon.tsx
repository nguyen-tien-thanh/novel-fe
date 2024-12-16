import { cn } from '@/lib'
import { FC, SVGProps } from 'react'

export const HamburgerIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={cn('size-5', className)} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
    </svg>
  )
}
