import { IChapter, IProduct } from '@/types'
import ChapterInput from '../ChapterInput'
import { auth } from '@/auth'
import { get, post } from '@/lib'

export default async function ChapterPageCreate() {
  const createChapter = async (body: IChapter) => {
    'use server'

    const response = await post<IChapter | undefined>('/chapter', body)

    return response
  }

  async function fetchProducts() {
    const response = await get<IProduct[]>('/product')
    if (!response) return []
    return response
  }

  const products: IProduct[] = await fetchProducts()

  return <ChapterInput create={createChapter} products={products} />
}
