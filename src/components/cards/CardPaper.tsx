import React from 'react'
import { Divider } from '../commons'

export interface ICardPaper {
  title: string
  children: React.ReactNode
}

export const CardPaper = ({ children, title }) => {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl">{title}</h2>

      <Divider className="w-full place-self-center divider-primary mb-2 mt-0 md:mb-3 md:mt-1" />

      {children}
    </div>
  )
}
