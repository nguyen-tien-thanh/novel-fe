import ProductDetail from './ProductDetail'
import { get } from '@/lib'
import { IProduct, List, STATE } from '@/types'

interface PageProps {
  params: { id: number }
}

export default async function Page({ params }: PageProps) {
  const { id } = params
  const [product, products] = await Promise.all([
    get<IProduct>(`/product/${id}`, { include: { rates: true, chapters: true, categories: true } }),
    get<List<IProduct>>(`/product`, { take: 8, where: { state: STATE.ACTIVE } }),
  ])

  return <ProductDetail id={id} product={product} products={products} />
}
