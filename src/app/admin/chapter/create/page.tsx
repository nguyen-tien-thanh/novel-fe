import { IChapter, IProduct, List } from '@/types'
import { Chapter, get, post } from '@/lib'

export default async function ChapterPageCreate() {
  const createChapter = async (body: IChapter) => {
    'use server'

    const response = await post<IChapter | undefined>('/chapter', body)

    return response
  }

  const { data: products } = await get<List<IProduct>>('/product')

  return <Chapter.InputField create={createChapter} products={products} />
}
