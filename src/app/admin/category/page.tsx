import { ICategory } from '@/types'
import { Category, del, get } from '@/lib'

async function fetchCategories(): Promise<ICategory[] | undefined> {
  try {
    const response = await get<ICategory[] | undefined>('/category')
    return response
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

export default async function CategoriesPage() {
  const categories: ICategory[] = (await fetchCategories()) || []

  const deleteCategory = async (id: number) => {
    'use server'

    const response = await del(`/category/${id}`)
    return response
  }
  return ``
  // return <Category.List initialCategories={categories} deleteCategory={deleteCategory} />
}
