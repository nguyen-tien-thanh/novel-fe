'use client'

import { IProduct } from '@/types'
import Link from 'next/link'
import { FC } from 'react'
import { Book } from '../book'
import { Carousel, CarouselItem } from '../carousel'

export interface IProductListProps {
  products: IProduct[]
  badgeText?: string
}

const BadgeTop = ({ text }: { text: string | number | undefined }) =>
  text && (
    <div className="z-[4] top-1 right-0 absolute bg-primary bg-opacity-40">
      <span className="p-1 text-white font-semibold">{text}</span>
    </div>
  )

export const ProductList: FC<IProductListProps> = ({ products, badgeText }) => {
  return (
    <ul className="lg:flex lg:flex-wrap lg:gap-x-2">
      <Carousel className="pt-2 pb-5">
        {products.slice(0, 4).map(product => (
          <CarouselItem key={product.id} className="w-1/2 lg:w-1/4">
            <Book.Cover
              product={product}
              width={140}
              height={210}
              href={`/product/${product.id}`}
              component={<BadgeTop text={badgeText} />}
            />
          </CarouselItem>
        ))}
      </Carousel>

      {products.slice(4, 20).map(product => (
        <li key={product.id} className="border-b border-b-base flex justify-between gap-2 py-1 lg:w-[49%]">
          <Link href={`/product/${product.id}`} className="truncate hover:underline underline-offset-4 w-[70%]">
            {product.name}
          </Link>
          {/* TODO */}
          <Link
            href="#!"
            className="truncate hover:underline underline-offset-4 text-primary text-right float-right w-[30%] opacity-80"
          >
            {product.authorName}
          </Link>
        </li>
      ))}
    </ul>
  )
}
