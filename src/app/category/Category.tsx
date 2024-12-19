'use client'

import { Button, CardPaper, Image, Spinner } from '@/components'
import { cn, formatDatetime } from '@/lib'
import { ICategory, IProduct, List } from '@/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, useEffect, useRef, useState } from 'react'

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

  useEffect(() => {
    const handleScroll = () => {
      if (products.data.length >= products.count) return

      const params = new URLSearchParams(searchParams)
      const currentTake = params.get('take') || '6'
      params.set('take', (Number(currentTake) + 6).toString())

      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting) handleScroll()
    }

    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 })
    if (observerRef.current) observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [searchParams])

  return (
    <div className="container mx-auto relative py-4 lg:py-8 space-y-10">
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
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                        alt="Movie"
                      />
                    </figure>
                  )}
                  <div className="card-body p-4">
                    <div>
                      <h2
                        className="hover:underline underline-offset-4 text-lg"
                        role="button"
                        onClick={() => router.push(`/product/${product.id}`)}
                      >
                        {product.name}
                      </h2>
                      <p className="text-primary text-sm">{product.authorName}</p>
                      {product.updatedAt && (
                        <p className="text-sm opacity-70">
                          Cập nhật: <span>{formatDatetime(product.updatedAt)}</span>
                        </p>
                      )}
                      <p
                        className="text-sm line-clamp-2 opacity-70"
                        dangerouslySetInnerHTML={{ __html: product.description || '' }}
                      />
                    </div>
                    <div className="card-actions">
                      {product.categories && (
                        <div className="flex flex-wrap gap-2">
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
          <div className="flex justify-center">
            <Spinner size="lg" />
          </div>
        )}
      </div>
    </div>
  )
}
