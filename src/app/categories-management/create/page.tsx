import CategoryInput from '../CategoryInput'
import { auth } from '@/auth'

export default async function CategoriesPageCreate() {
  const session = await auth()
  const token = session?.accessToken

  const createCategories = async (body: string) => {
    'use server'

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    })
    return response.json()
  }

  return <CategoryInput create={createCategories} />
}
