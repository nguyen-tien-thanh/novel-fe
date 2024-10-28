import { IProduct } from '@/types'
import ProductList from './ProductList'

async function fetchProducts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export default async function ProductsPage() {
  const products: IProduct[] = await fetchProducts()

  return <ProductList initialProducts={products} />
}
