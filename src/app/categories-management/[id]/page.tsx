import CategoryInput from '../CategoryInput'
import { auth } from '@/auth'

export default async function CategoriesPageEdit({ params, searchParams }) {
  const { id } = params || {}
  const session = await auth()
  const token = session?.accessToken

  const editCategories = async (body: string) => {
    'use server'

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    })
    return response.json()
  }

  return <CategoryInput edit={editCategories} defaultValue={searchParams} />
}
