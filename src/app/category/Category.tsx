'use client'

import { Button, CardPaper, Image, Skeleton, Spinner } from '@/components'
import { cn, formatDatetime } from '@/lib'
import { ICategory, IProduct, List } from '@/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

export interface ICategoryParams {
  categories?: List<ICategory>
  products?: List<IProduct>
}

export const Category: FC<ICategoryParams> = ({ categories, products = { data: [], count: 0 } }) => {
  const searchParams = useSearchParams()
  const ids = searchParams.get('ids')?.split(',').map(Number) || []

  const router = useRouter()
  const pathname = usePathname()
  const [selected, setSelected] = useState<number[]>(ids)
  const observerRef = useRef<HTMLDivElement | null>(null)

  const toggleCategory = (id?: number) => {
    if (!id) {
      setSelected([])
      router.push('/category')
      return
    }

    const isSelected = selected.includes(id)
    const updatedSelected = isSelected ? selected.filter(categoryId => categoryId !== id) : [...selected, id]

    setSelected(updatedSelected)

    const query = updatedSelected.length ? `/category/?ids=${updatedSelected.join(',')}` : '/category'
    router.push(query)
  }

  const handleScroll = useCallback(() => {
    if (products.data.length >= products.count) return

    const params = new URLSearchParams(searchParams)
    const currentTake = params.get('take') || '6'
    params.set('take', (Number(currentTake) + 6).toString())

    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [products.data.length, products.count, searchParams, pathname, router])

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting) handleScroll()
    },
    [handleScroll],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 })
    if (observerRef.current) observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [handleObserver])

  return (
    <div className="container mx-auto relative py-2 lg:py-4 space-y-6 lg:space-y-4">
      <section>
        <CardPaper title="Thể loại">
          <div className="flex flex-wrap gap-2">
            <Button
              className={cn('btn-xs lg:btn-sm font-normal', selected.length === 0 && 'btn-primary pointer-events-none')}
              onClick={() => toggleCategory()}
            >
              Tất cả
            </Button>
            {categories?.data.map(category => (
              <Button
                key={category.id}
                className={cn('btn-xs lg:btn-sm font-normal', selected.includes(category.id) && 'btn-primary')}
                onClick={() => toggleCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </CardPaper>
      </section>

      {products && (
        <section>
          <ul className="grid grid-cols-2 gap-2 lg:gap-4">
            {products?.data?.map(product => (
              <li key={product.id}>
                <div className="card lg:card-side bg-base-100 shadow-xl">
                  {product.image && (
                    <figure
                      className="relative min-w-[140px] h-[210px] group"
                      role="button"
                      onClick={() => router.push(`/product/${product.id}`)}
                    >
                      <Image
                        src={String(product.image)}
                        fill
                        className="object-cover group-hover:brightness-105 transition-all"
                        alt={product.name}
                      />
                    </figure>
                  )}
                  <div className="card-body p-3 lg:p-4">
                    <div>
                      <h2
                        className="hover:underline underline-offset-4 lg:text-lg truncate"
                        role="button"
                        onClick={() => router.push(`/product/${product.id}`)}
                      >
                        {product.name}
                      </h2>
                      <p className="text-primary text-sm lg:text-md truncate">{product.authorName}</p>
                      {/* {product.updatedAt && (
                        <p className="text-sm opacity-70">
                          Cập nhật: <span>{formatDatetime(product.updatedAt)}</span>
                        </p>
                      )} */}
                      <p
                        className="text-xs lg:text-sm line-clamp-2 opacity-70"
                        dangerouslySetInnerHTML={{ __html: product.description || '' }}
                      />
                    </div>
                    <div className="card-actions">
                      {product.categories && (
                        <div className="flex gap-1 lg:gap-2 h-7 overflow-auto lg:h-auto lg:flex-wrap no-scrollbar">
                          {product.categories.map(category => (
                            <Button
                              key={category.id}
                              onClick={() => toggleCategory(category.id)}
                              className={cn(
                                'btn-xs lg:btn-xs font-normal',
                                selected.includes(category.id) && 'btn-outline btn-active pointer-events-none',
                              )}
                            >
                              {category.name}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div ref={observerRef}>
        {products?.data?.length < products.count && (
          <div className="grid grid-cols-2 gap-2 lg:gap-4">
            <Skeleton className="h-[346px] lg:h-[210px]" count={2} />
          </div>
        )}
      </div>
    </div>
  )
}
