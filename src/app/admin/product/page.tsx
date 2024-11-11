import { IProduct } from '@/types'
import { auth } from '@/auth'
import { Product } from '@/lib'

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
  return <Product.List initialProducts={products} deleteProduct={deleteCategory} />
}
