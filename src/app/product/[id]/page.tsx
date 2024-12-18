import ProductDetail from './ProductDetail'
import { get } from '@/lib'
import { IChapter, IProduct, IRate, List } from '@/types'

interface PageProps {
  params: { id: number }
}

async function fetchProductData(id: number) {
  const [products, product, chapters, rates] = await Promise.all([
    get<Promise<List<IProduct>>>('/product'),
    get<Promise<IProduct>>(`/product/${id}`),
    get<Promise<List<IChapter>>>(`/product/${id}/chapter`),
    get<Promise<IRate[]>>(`/product/${id}/rate`),
  ])

  return { products, product, chapters, rates }
}

export default async function Page({ params }: PageProps) {
  const { id } = params
  // const session = await auth()
  // const user = session?.user as any

  const { products, product, chapters, rates } = await fetchProductData(id)

  if (!product) return null

  return <ProductDetail id={id} products={products} product={product} chapters={chapters} rates={rates} />
}
