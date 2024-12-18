import { get } from '@/lib'
import { IChapter, List } from '@/types'
import React from 'react'
import { Chapter } from './Chapter'

interface IPageParams {
  params: { id: number; chapterNumber: number }
}

export default async function Page({ params }: IPageParams) {
  const { id, chapterNumber } = params
  const { data: chapters } = await get<List<IChapter>>('/chapter', { where: { productId: +id } })
  const chapter = chapters.find(c => c?.chapterNumber === +chapterNumber)

  return <Chapter chapters={chapters} chapter={chapter} />
}
