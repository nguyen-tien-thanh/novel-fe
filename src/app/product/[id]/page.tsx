import ProductDetail from './ProductDetail'
import { get } from '@/lib'
import { IChapter, IProduct, IRate, List, STATE } from '@/types'

interface PageProps {
  params: { id: number }
}

export default async function Page({ params }: PageProps) {
  const { id } = params
  const [product, products] = await Promise.all([
    get<IProduct>(`/product/${id}`, { include: { rates: true, chapters: true } }),
    get<List<IProduct>>(`/product`, { take: 8, where: { state: STATE.ACTIVE } }),
  ])
  const { chapters, rates, ...data } = product

  return <ProductDetail id={id} product={product} products={products} />
}
