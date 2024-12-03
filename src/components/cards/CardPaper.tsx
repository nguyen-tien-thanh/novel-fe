import React from 'react'
import { Divider } from '../commons'

export interface ICardPaper {
  title: string
  children: React.ReactNode
}

export const CardPaper = ({ children, title }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">{title}</h2>

      <Divider className="w-full divider-primary mb-2 mt-0 lg:mt-1" />

      {children}
    </div>
  )
}
