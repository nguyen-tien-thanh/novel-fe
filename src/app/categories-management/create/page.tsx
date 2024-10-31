import { post } from '@/lib'
import CategoryInput from '../CategoryInput'
import { ICategory } from '@/types'

export default async function CategoriesPageCreate() {
  const createCategories = async (body: ICategory) => {
    'use server'

    const response = await post<ICategory | undefined>('/category', body)

    return response
  }

  return <CategoryInput create={createCategories} />
}
