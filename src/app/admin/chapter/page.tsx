import { ICategory, IChapter, IProduct, List } from '@/types'
import { Chapter, del, get } from '@/lib'

export default async function ChapterPage({ searchParams }) {
  const { skip = 0, take = 5 } = searchParams
  const filter = { skip, take, include: { product: true } }

  async function fetchChapters() {
    const response = await get<List<IChapter | undefined>>('/chapter', filter)
    return response
  }

  const chapters = await fetchChapters()

  const deleteChapter = async (id: number) => {
    'use server'

    const response = await del(`/chapter/${id}`)
    return response
  }

  return <Chapter.List initialChapters={chapters} deleteChapter={deleteChapter} />
}
