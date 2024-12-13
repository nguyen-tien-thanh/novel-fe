import { ICategory } from '@/types'
import { Category, del, get } from '@/lib'

async function fetchCategories(): Promise<ICategory[] | undefined> {
  try {
    const response = await get<ICategory[]>('/category')
    return response
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

const deleteCategory = async (id: number) => {
  'use server'
  const response = await del(`/category/${id}`)
  return response
}

export default async function CategoriesPage() {
  const categories: ICategory[] = (await fetchCategories()) || []
  return <Category.List initialCategories={categories} deleteCategory={deleteCategory} />
}
