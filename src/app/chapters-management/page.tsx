import { ICategory, IProduct } from '@/types'
import ChapterList from './ChapterList'
import { auth } from '@/auth'

async function fetchChapters() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapter`)
  if (!response.ok) {
    throw new Error('Failed to fetch Chapters')
  }
  return response.json()
}

async function fetchProducts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`)
  if (!response.ok) {
    throw new Error('Failed to fetch Products')
  }
  return response.json()
}

export default async function ChapterPage() {
  const session = await auth()
  const token = session?.accessToken
  const chapters: ICategory[] = await fetchChapters()
  const products: IProduct[] = await fetchProducts()

  const deleteChapter = async (id: number) => {
    'use server'

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapter/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  }

  return <ChapterList initialChapters={chapters} deleteChapter={deleteChapter} products={products} />
}
