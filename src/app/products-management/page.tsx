import { IProduct } from '@/types'
import ProductList from './ProductList'
import { auth } from '@/auth'

async function fetchProducts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export default async function ProductsPage() {
  const session = await auth()
  const token = session?.accessToken
  const products: IProduct[] = await fetchProducts()

  const deleteCategory = async (id: number) => {
    'use server'

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  }
  return <ProductList initialProducts={products} deleteProduct={deleteCategory} />
}
