import ProductDetail from './ProductDetail'
import { get } from '@/lib'
import { IChapter, IProduct, IRate } from '@/types'

interface PageProps {
  params: { id: number }
}

async function fetchProductData(id: number) {
  const [products, product, chapters, rates] = await Promise.all([
    get<Promise<IProduct[] | undefined>>('/product'),
    get<Promise<IProduct | undefined>>(`/product/${id}`),
    get<Promise<IChapter[] | undefined>>(`/product/${id}/chapter`),
    get<Promise<IRate[] | undefined>>(`/product/${id}/rate`),
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
