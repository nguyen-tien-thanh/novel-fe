import React, { FC, HTMLAttributes } from 'react'
import { Divider } from '../commons'
import { cn } from '@/lib'

export interface ICardPaper extends HTMLAttributes<HTMLDivElement> {
  title?: string
  children: React.ReactNode
}

export const CardPaper: FC<ICardPaper> = ({ children, title, className = '', ...props }) => {
  return (
    <div className={cn('py-2 lg:py-4', className)} {...props}>
      {title && <h2 className="text-xl lg:text-2xl font-semibold">{title}</h2>}

      <Divider className="w-full divider-primary mb-2 mt-0 lg:mt-1" />

      {children}
    </div>
  )
}
