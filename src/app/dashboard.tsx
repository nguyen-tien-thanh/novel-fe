'use client'

import { ICategory, IProduct } from '@/types'
import { Book } from '@/components/book'
import { CardPaper, Hero, ProductList, ProductRate } from '@/components'
import Link from 'next/link'
import { cn } from '@/lib'

export interface DashboardProps {
  products?: {
    recommend?: IProduct[]
    updated?: IProduct[]
    topRated?: IProduct[]
    completed?: IProduct[]
    weeklyTop?: IProduct[]
    monthlyTop?: IProduct[]
  }
  categories?: ICategory[]
}

export default function Dashboard({ products, categories }: DashboardProps) {
  return (
    <div className="pb-10 lg:pb-20">
      <section className="lg:container lg:mx-auto">
        <Hero
          title="Welcome"
          subtitle="Chúc các bạn đọc truyện vui vẻ nhé!"
          className="min-h-[30vh]"
          image="https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp"
          buttonText="Khám phá ngay"
          href="#product-section"
        />
      </section>

      <section className="container mx-auto">
        <CardPaper title="Được đề xuất">{products?.recommend && <Book.Swiper items={products.recommend} />}</CardPaper>
      </section>

      <section className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-5">
          <div id="product-section" className="grow space-y-6">
            <CardPaper title="Mới cập nhật">
              {products?.updated && <ProductList badgeText="New" products={products.updated} />}
            </CardPaper>

            <CardPaper title="Đánh giá cao">
              {products?.topRated && <ProductList badgeText="Hot" products={products.topRated} />}
            </CardPaper>

            <CardPaper title="Đã hoàn thành">
              {products?.completed && <ProductList products={products.completed} />}
            </CardPaper>
          </div>

          <div className="lg:max-w-xs space-y-10">
            <CardPaper title="Thể loại">
              <div className="flex flex-wrap gap-2">
                {categories?.map(category => {
                  const colors = [
                    'text-success hover:bg-success hover:border-success',
                    'text-info hover:bg-info hover:border-info',
                    'text-default hover:bg-neutral',
                    'text-info hover:bg-info hover:border-info',
                    'text-default hover:bg-neutral',
                  ]
                  const index = category.id % colors.length
                  const randomColor = colors[index]
                  return (
                    <Link
                      href={`/category?ids=${category.id}`}
                      key={category.id}
                      className={cn('font-semibold btn btn-xs hover:text-white', randomColor)}
                    >
                      {category.name}
                    </Link>
                  )
                })}
              </div>
            </CardPaper>

            <CardPaper title="Top tuần">
              {products?.weeklyTop && <ProductRate products={products.weeklyTop} />}
            </CardPaper>

            <CardPaper title="Top tháng">
              {products?.monthlyTop && <ProductRate products={products.monthlyTop} />}
            </CardPaper>
          </div>
        </div>
      </section>
    </div>
  )
}
