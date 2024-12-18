import { IChapter, IProduct, List } from '@/types'
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

  const { data: products } = await get<List<IProduct>>('/product')
  const defaultValue: IChapter | undefined = await fetchChapterDetail()

  return <Chapter.InputField edit={editChapters} defaultValue={defaultValue} products={products} />
}
