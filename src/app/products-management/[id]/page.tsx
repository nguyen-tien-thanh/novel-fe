import { auth } from '@/auth'
import ProductInput from '../ProductInput'
import { ICategory } from '@/types'

export default async function ProductsPageEdit({ params, searchParams }) {
  const { id } = params || {}
  const session = await auth()
  const token = session?.accessToken

  const editProducts = async (body: string) => {
    'use server'

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    })
    return response.json()
  }

  async function fetchCategories() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`)
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    return response.json()
  }

  const categories: ICategory[] = await fetchCategories()

  return <ProductInput edit={editProducts} defaultValue={searchParams} categories={categories} />
}
