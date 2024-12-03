'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import React from 'react'
import { ICategory, IProduct } from '@/types'
import { Book } from '@/components/book'
import { CardPaper, Hero } from '@/components'
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

      <section className="container mx-auto mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div id="product-section" className="space-y-10">
            <CardPaper title="Mới cập nhật">
              <ul className="lg:flex lg:flex-wrap lg:gap-x-2 lg:gap-x-3 xl:gap-x-4">
                {products.slice(0, 20).map(product => (
                  <li key={product.id} className="border-b border-b-base flex justify-between gap-2 py-1 lg:w-[49%]">
                    <Link href={`/product/${product.id}`} className="truncate hover:underline underline-offset-4">
                      ({`C${product.chapterCount}`}) {product.name}
                    </Link>
                    {/* TODO */}
                    <Link href="#!" className="truncate hover:underline underline-offset-4 text-secondary max-w-32">
                      {product.authorName}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardPaper>

            <CardPaper title="Đánh giá cao">
              <ul className="lg:flex lg:flex-wrap lg:gap-x-2 lg:gap-x-3 xl:gap-x-4">
                {products.slice(0, 20).map(product => (
                  <li key={product.id} className="border-b border-b-base flex justify-between gap-2 py-1 lg:w-[49%]">
                    <Link href={`/product/${product.id}`} className="truncate hover:underline underline-offset-4">
                      {product.name}
                    </Link>
                    {/* TODO */}
                    <Link href="#!" className="truncate hover:underline underline-offset-4 text-secondary max-w-32">
                      {product.authorName}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardPaper>

            <CardPaper title="Đã hoàn thành">
              <ul className="lg:flex lg:flex-wrap lg:gap-x-2 lg:gap-x-3 xl:gap-x-4">
                {products.slice(0, 20).map(product => (
                  <li key={product.id} className="border-b border-b-base flex justify-between gap-2 py-1 lg:w-[49%]">
                    <Link href={`/product/${product.id}`} className="truncate hover:underline underline-offset-4">
                      {product.name}
                    </Link>
                    {/* TODO */}
                    <Link href="#!" className="truncate hover:underline underline-offset-4 text-secondary max-w-32">
                      {product.authorName}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardPaper>
          </div>

          <div className="lg:max-w-sm space-y-10">
            <CardPaper title="Danh mục">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => {
                  const colors = ['btn-primary', 'btn-secondary', 'btn-accent']
                  const colorIndex = category.id % colors.length
                  const colorClass = colors[colorIndex]
                  return (
                    <Link
                      href={`/category/${category.id}`}
                      key={category.id}
                      className={cn('btn btn-outline btn-sm', colorClass)}
                    >
                      {category.name}
                    </Link>
                  )
                })}
              </div>
            </CardPaper>

            <CardPaper title="Top tuần">
              <ul className="lg:flex lg:flex-wrap lg:gap-x-2 lg:gap-x-3 xl:gap-x-4">
                {products.slice(0, 10).map((product, idx) => (
                  <li key={product.id} className="border-b border-b-base flex items-center gap-2 py-1 w-full">
                    <div className="flex">
                      <span className="text-secondary font-semibold p-1 w-6">{++idx}</span>
                      <Link
                        href={`/product/${product.id}`}
                        className="p-1 w-[200px] truncate hover:underline underline-offset-4"
                      >
                        {product.name}
                      </Link>
                    </div>
                    {/* TODO */}
                    <Link href="#!" className="p-1 truncate hover:underline underline-offset-4 text-secondary">
                      {product.authorName}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={'#!'} className="btn w-full mt-2">
                Xem thêm
              </Link>
            </CardPaper>

            <CardPaper title="Top tháng">
              <ul className="lg:flex lg:flex-wrap lg:gap-x-2 lg:gap-x-3 xl:gap-x-4">
                {products.slice(0, 10).map((product, idx) => (
                  <li key={product.id} className="border-b border-b-base flex justify-between items-center gap-2 py-1">
                    <div>
                      <span className="text-secondary font-semibold p-1">{++idx}</span>
                      <Link
                        href={`/product/${product.id}`}
                        className="p-1 w-[200px] truncate hover:underline underline-offset-4"
                      >
                        {product.name}
                      </Link>
                    </div>
                    {/* TODO */}
                    <Link href="#!" className="p-1 truncate hover:underline underline-offset-4 text-secondary">
                      {product.authorName}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={'#!'} className="btn w-full mt-2">
                Xem thêm
              </Link>
            </CardPaper>
          </div>
        </div>
      </section>
    </div>
  )
}
