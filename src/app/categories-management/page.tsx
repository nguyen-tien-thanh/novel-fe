import { ICategory } from '@/types'
import CategoryList from './CategoryList'
import { auth } from '@/auth'

async function fetchCategories() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`)
  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }
  return response.json()
}

export default async function CategoriesPage() {
  const session = await auth()
  const token = session?.accessToken
  const categories: ICategory[] = await fetchCategories()

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

  return <CategoryList initialCategories={categories} deleteCategory={deleteCategory} />
}
