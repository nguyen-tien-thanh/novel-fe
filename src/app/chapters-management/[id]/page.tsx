import { IChapter, IProduct } from '@/types'
import ChapterInput from '../ChapterInput'
import { auth } from '@/auth'

export default async function ChaptersPageEdit({ params, searchParams }) {
  const { id } = params || {}
  const session = await auth()
  const token = session?.accessToken

  async function fetchChapterDetail() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapter/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch Products')
    }
    return response.json()
  }

  const editChapters = async (body: string) => {
    'use server'

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapter/${id}`, {
      method: 'PATCH',
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
  const defaultValue: IChapter = await fetchChapterDetail()

  return <ChapterInput edit={editChapters} defaultValue={defaultValue} products={products} />
}
