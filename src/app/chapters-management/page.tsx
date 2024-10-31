import { ICategory, IProduct } from '@/types'
import ChapterList from './ChapterList'
import { del, get } from '@/lib'

async function fetchChapters() {
  const response = await get<ICategory[] | undefined>('/chapter')
  return response
}

async function fetchProducts() {
  const response = await get<IProduct[] | undefined>('/product')
  return response
}

export default async function ChapterPage() {
  const chapters: ICategory[] | undefined = await fetchChapters()
  const products: IProduct[] | undefined = await fetchProducts()

  const deleteChapter = async (id: number) => {
    'use server'

    const response = await del(`/chapter/${id}`)
    return response
  }

  return <ChapterList initialChapters={chapters} deleteChapter={deleteChapter} products={products} />
}
