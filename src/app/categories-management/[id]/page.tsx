import { patch } from '@/lib'
import CategoryInput from '../CategoryInput'
import { auth } from '@/auth'
import { ICategory } from '@/types'

export default async function CategoriesPageEdit({ params, searchParams }) {
  const { id } = params || {}
  const session = await auth()
  const token = session?.accessToken

  const editCategories = async (body: ICategory) => {
    'use server'

    const response = await patch(`/category/${id}`, body)
    return response
  }

  return <CategoryInput edit={editCategories} defaultValue={searchParams} />
}
