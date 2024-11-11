import { IChapter, IProduct } from '@/types'
import { Chapter, get, patch } from '@/lib'

export default async function ChaptersPageEdit({ params, searchParams }) {
  const { id } = params || {}

  async function fetchChapterDetail() {
    const response = await get<IChapter>(`/chapter/${id}`)
    if (!response) return
    return response
  }

  const editChapters = async (body: IChapter) => {
    'use server'

    const response = await patch(`/chapter/${id}`, body)
    return response
  }

  async function fetchProducts() {
    const response = await get<IProduct[]>('/product')
    if (!response) return []
    return response
  }

  const products: IProduct[] = await fetchProducts()
  const defaultValue: IChapter | undefined = await fetchChapterDetail()

  return <Chapter.InputField edit={editChapters} defaultValue={defaultValue} products={products} />
}
