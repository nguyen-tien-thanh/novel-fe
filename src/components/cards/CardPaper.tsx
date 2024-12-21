import React, { FC } from 'react'
import { Divider } from '../commons'

export interface ICardPaper {
  title?: string
  children: React.ReactNode
}

export const CardPaper: FC<ICardPaper> = ({ children, title }) => {
  return (
    <div className="py-2 lg:py-4">
      {title && <h2 className="text-xl lg:text-2xl font-semibold">{title}</h2>}

      <Divider className="w-full divider-primary mb-2 mt-0 lg:mt-1" />

      {children}
    </div>
  )
}
