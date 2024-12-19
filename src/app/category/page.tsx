import { get } from '@/lib'
import { ICategory, IProduct, List, STATE } from '@/types'
import { Category } from './Category'

interface PageProps {
  searchParams: {
    ids?: string
    take?: string
    skip?: string
  }
}

export default async function Page({ searchParams }: PageProps) {
  const idsParams = searchParams.ids || ''
  const ids: number[] = idsParams ? idsParams.split(',').map(Number) : []

  const categories = await get<List<ICategory>>('/category', { where: { state: STATE.ACTIVE } })
  const products = await get<List<IProduct>>('/product', {
    where: {
      ...(ids.length > 0
        ? {
            AND: [
              { state: STATE.ACTIVE },
              ...ids.map(id => ({
                categories: {
                  some: {
                    id,
                    state: STATE.ACTIVE,
                  },
                },
              })),
            ],
          }
        : { state: STATE.ACTIVE }),
    },
    include: { categories: true },
    skip: Number(searchParams.skip) || 0,
    take: Number(searchParams.take) || 6,
  })

  console.log(products)

  return <Category categories={categories} products={products} />
}
