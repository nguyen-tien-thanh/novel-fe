import { Category, post } from '@/lib'
import { ICategory } from '@/types'

export default async function CategoriesPageCreate() {
  const createCategories = async (body: ICategory) => {
    'use server'

    const response = await post<ICategory | undefined>('/category', body)

    return response
  }

  return <Category.InputField create={createCategories} />
}
