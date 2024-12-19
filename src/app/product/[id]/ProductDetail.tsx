'use client'

import { CardPaper, Rating, Row, Table } from '@/components'
import { Book } from '@/components/book'
import { cn, formatDatetime } from '@/lib'
import { IChapter, IProduct, IRate, List, PRODUCT_STATUS } from '@/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export interface IProductDetailProps {
  id: number
  product?: IProduct
  products?: List<IProduct>
}

export default function ProductDetail({ id, products, product }: IProductDetailProps) {
  const router = useRouter()
  const session = useSession()
  const user = session?.data?.user

  const handleRowClick = (chapterId: number) => {
    if (!product?.chapters) return
    const chapter = product.chapters.find(chapter => chapter.id === chapterId)
    if (!chapter) return
    return router.push(`/product/${id}/chapter/${chapter.chapterNumber}`)
    //
    // TODO: UnComment
    // if (!user) return router.push('/login')
    // if (chap.price > 0 && user && !chap.users.includes(+user.id)) {
    //   // setChapter({ ...chap, productId: params?.id })
    //   // setOpenPopup(true)}
    // } else {
    //   router.push(`/products/${params?.id}/chapters/${chap.chapterNumber}`)
    // }
  }

  const handleRating = (rating: number | null) => {
    // TODO: Remove rate api
    if (!user) {
      toast.warn('Bạn cần đăng nhập để thực hiện')
      return router.push('/login')
    }
    if (!rating || !product?.rates) return
    const existingRate = product.rates.find(rate => rate.createdBy === +user.id)

    if (!existingRate) {
      return fetch(`/api/rate`, {
        method: 'POST',
        body: JSON.stringify({ productId: id, rating }),
      })
    } else {
      if (existingRate.rating === rating) return
      return fetch(`/api/rate/${existingRate.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ rating }),
      })
    }
  }

  return (
    <div className="container mx-auto">
      <section className="grid lg:grid-cols-7 gap-4 lg:gap-8 place-items-center lg:place-items-start">
        {product && (
          <div className="relative h-full w-full lg:col-span-2 lg:pt-5 overflow-hidden">
            <Book.Cover product={product} show={[]} height={300} width={200} />
          </div>
        )}
        <div className="lg:col-span-5 w-full">
          <div className="lg:px-5 pb-0 lg:pt-5 rounded-md">
            <div className="flex flex-col justify-center items-center">
              {product && <p className="font-bold text-center text-xl lg:text-3xl">{product.name}</p>}
              {product && (
                <div className="flex flex-col items-center">
                  <Rating
                    name="rating"
                    value={product.averageRate || 0}
                    size="sm"
                    onChange={(e, val) => handleRating(val)}
                  />

                  {product.rates && <p className="text-sm opacity-65">({product.rates.length} lượt đánh giá)</p>}
                  {/* TODO */}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <div className="flex">
                <p className="min-w-24 opacity-65">Tác giả</p>
                {product && <p>{product.authorName}</p>}
              </div>
              <div className="flex items-center">
                <p className="min-w-24 opacity-65">Trạng thái</p>
                {product && (
                  <div
                    className={cn('badge', product.status === PRODUCT_STATUS.DONE ? 'badge-success' : 'badge-warning')}
                  >
                    {product.status === PRODUCT_STATUS.DONE ? 'Hoàn thành' : 'Cập nhật'}
                  </div>
                )}
              </div>
              <div className="flex">
                <p className="min-w-24 opacity-65">Lượt xem</p>
                {product && <p>{product.viewCount}</p>}
              </div>
              <div className="flex">
                <p className="min-w-24 opacity-65">Ngày đăng</p>
                {product && <p>{product.createdAt && formatDatetime(product.createdAt)}</p>}
              </div>
            </div>
            {product && product.categories && (
              <div className="my-4 flex flex-wrap gap-2">
                {product.categories.map(cate => (
                  <Link key={cate.id} href={`/category?ids=${cate.id}`} className="btn btn-xs font-normal">
                    {cate.name}
                  </Link>
                ))}
              </div>
            )}
            {product && (
              <div className="mt-4 opacity-65" dangerouslySetInnerHTML={{ __html: product.description || '' }} />
            )}
          </div>
        </div>
      </section>

      <section className="mt-8">
        {product && product.chapters && (
          <Table
            data={{ data: product.chapters, count: product.chapters.length }}
            pagination={false}
            onRowClick={handleRowClick}
          >
            <Row name="chapterNumber" />
            <Row name="chapterName" colName="Tên" />
            <Row name="createdAt" colName="Ngày tạo" render={value => formatDatetime(value as string)} />
          </Table>
        )}
      </section>

      {products && (
        <section className="mt-10 lg:mt-20">
          <CardPaper title="Truyện liên quan">
            <Book.Swiper items={products.data} />
          </CardPaper>
        </section>
      )}
    </div>
  )
}
