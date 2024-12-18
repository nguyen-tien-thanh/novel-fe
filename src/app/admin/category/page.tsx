import { ICategory, List } from '@/types'
import { Category, del, get } from '@/lib'

const deleteCategory = async (id: number) => {
  'use server'
  const response = await del(`/category/${id}`)
  return response
}

export default async function CategoriesPage({ searchParams }) {
  const { skip = 0, take = 5 } = searchParams
  const filter = { skip, take }

  async function fetchCategories() {
    try {
      const response = await get<List<ICategory | undefined>>('/category', filter)
      return response
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      return []
    }
  }

  const categories = await fetchCategories()

  return <Category.List initialCategories={categories} deleteCategory={deleteCategory} />
}
