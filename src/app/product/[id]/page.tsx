import { auth } from '@/auth'
import ProductDetail from './ProductDetail'

interface PageProps {
  params: { id: number }
}

async function fetchProductData(id: number) {
  const [productsResp, productResp, chaptersResp, ratesResp] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}/chapter`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}/rate`),
  ])

  const [products, product, chapters, rates] = await Promise.all([
    productsResp.json(),
    productResp.json(),
    chaptersResp.json(),
    ratesResp.json(),
  ])

  return { products, product, chapters, rates }
}

export default async function Page({ params }: PageProps) {
  const { id } = params
  const session = await auth()

  const user = session?.user

  const { products, product, chapters, rates } = await fetchProductData(id)

  if (!product) return null

  return (
    <ProductDetail
      id={id}
      user={user?.id || ''}
      products={products}
      product={product}
      chapters={chapters}
      rates={rates}
    />
  )
}
