'use client'

import { IProduct } from '@/types'
import Link from 'next/link'
import { FC } from 'react'
import { Book } from '../book'

export interface IProductRateProps {
  products: IProduct[]
}

const BadgeTop = ({ text }: { text: string | number }) => (
  <div className="z-[4] absolute bg-secondary size-10 [clip-path:polygon(0%_0%,_0%_100%,_100%_0%)]">
    <span className="p-2 text-white font-semibold">{text}</span>
  </div>
)

export const ProductRate: FC<IProductRateProps> = ({ products }) => {
  return (
    <div>
      <ul className="lg:flex lg:flex-wrap lg:gap-x-2">
        {products.slice(0, 10).map((product, idx) => (
          <li key={product.id} className="border-b border-b-base flex items-center gap-2 py-1 w-full">
            {idx === 0 ? (
              <>
                <div className="flex p-4">
                  <Book.Cover
                    product={product}
                    width={80}
                    height={120}
                    href={`/product/${product.id}`}
                    component={<BadgeTop text={++idx} />}
                    show={[]}
                  />
                </div>
                <div className="flex flex-col">
                  <Link
                    href={`/product/${product.id}`}
                    className="text-semibold lineclamp-2 text-lg hover:underline underline-offset-4"
                  >
                    {product.name}
                  </Link>
                  <Link href="#!" className="hover:underline underline-offset-4 text-primary opacity-80">
                    {product.authorName}
                  </Link>
                  {product.description && (
                    <p
                      className="line-clamp-2 !text-sm !text-base-content"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex">
                  <span className="text-primary font-semibold p-1 w-6 opacity-80">{++idx}</span>
                  <Link href={`/product/${product.id}`} className="p-1 truncate hover:underline underline-offset-4 ">
                    {product.name}
                  </Link>
                </div>
                <Link href="#!" className="p-1 truncate hover:underline underline-offset-4 text-primary opacity-80">
                  {product.authorName}
                </Link>
              </>
            )}
          </li>
        ))}
      </ul>
      <Link href={'#!'} className="btn btn-sm lg:btn-md w-full mt-2">
        Xem thêm
      </Link>
    </div>
  )
}
