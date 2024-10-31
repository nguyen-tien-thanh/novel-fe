import { IProduct } from '@/types'
import ChapterInput from '../ChapterInput'
import { auth } from '@/auth'

export default async function ChapterPageCreate() {
  const session = await auth()
  const token = session?.accessToken

  const createChapter = async (body: string) => {
    'use server'

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    })
    return response.json()
  }

  async function fetchProducts() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`)
    if (!response.ok) {
      throw new Error('Failed to fetch Products')
    }
    return response.json()
  }

  const products: IProduct[] = await fetchProducts()

  return <ChapterInput create={createChapter} products={products} />
}
