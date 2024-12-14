'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import React from 'react'
import { ICategory, IProduct } from '@/types'
import { Book } from '@/components/book'
import { CardPaper, Hero, ProductList, ProductRate } from '@/components'
import Link from 'next/link'
import { cn } from '@/lib'

export interface DashboardProps {
  products: IProduct[]
  categories: ICategory[]
}

export default function Dashboard({ products, categories }: DashboardProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (products.length > 0 && categories.length > 0) {
      setLoading(false)
    }
  }, [products, categories])

  return (
    <div className="pb-10 lg:pb-20">
      <section className="container mx-auto">
        <Hero
          title="Welcome"
          subtitle="Chúc các bạn đọc truyện vui vẻ"
          className="min-h-[30vh]"
          image="https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp"
          buttonText="Khám phá ngay"
          href="#product-section"
        />
      </section>

      <section className="container mx-auto mt-5">
        <CardPaper title="Được đề xuất">
          <Book.Swiper items={products.slice(0, 10)} />
        </CardPaper>
      </section>

      <section className="container mx-auto mt-5">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-5">
          <div id="product-section" className="space-y-14 lg:space-y-20">
            <CardPaper title="Mới cập nhật">
              <ProductList badgeText="New" products={products.slice(0, 20)} />
            </CardPaper>

            <CardPaper title="Đánh giá cao">
              <ProductList badgeText="Hot" products={products.slice(0, 14)} />
            </CardPaper>

            <CardPaper title="Đã hoàn thành">
              <ProductList products={products.slice(0, 18)} />
            </CardPaper>
          </div>

          <div className="lg:max-w-xs space-y-10">
            <CardPaper title="Danh mục">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => {
                  const colors = [
                    'text-success hover:bg-success hover:border-success',
                    'text-default hover:bg-neutral',
                    'text-info hover:bg-info hover:border-info',
                    'text-default hover:bg-neutral',
                  ]
                  const index = category.id % colors.length
                  const randomColor = colors[index]
                  return (
                    <Link
                      href={`/category/${category.id}`}
                      key={category.id}
                      className={cn('font-semibold btn btn-sm hover:text-white', randomColor)}
                    >
                      {category.name}
                    </Link>
                  )
                })}
              </div>
            </CardPaper>

            <CardPaper title="Top tuần">
              <ProductRate products={products} />
            </CardPaper>

            <CardPaper title="Top tháng">
              <ProductRate products={products} />
            </CardPaper>
          </div>
        </div>
      </section>
    </div>
  )
}
