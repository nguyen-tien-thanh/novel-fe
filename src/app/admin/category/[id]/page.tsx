import { Category, get, patch } from '@/lib'
import { ICategory } from '@/types'

export default async function CategoriesPageEdit({ params }) {
  const { id } = params || {}

  async function fetchCategoryDetail() {
    const response = await get<ICategory>(`/category/${id}`)
    if (!response) return
    return response
  }

  const defaultValue: ICategory | undefined = await fetchCategoryDetail()

  const editCategories = async (body: ICategory) => {
    'use server'

    const response = await patch(`/category/${id}`, body)
    return response
  }

  return <Category.InputField edit={editCategories} defaultValue={defaultValue} />
}
