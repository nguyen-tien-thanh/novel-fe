import { IChapter, IProduct } from '@/types'
import { Chapter, get, post } from '@/lib'

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

  return <Chapter.InputField create={createChapter} products={products} />
}
