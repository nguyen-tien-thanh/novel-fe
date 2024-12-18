'use client'

import { ChapterActionButton } from '@/components'
import { useBlockCopy } from '@/hooks'
import { formatDatetime } from '@/lib'
import { IChapter, ITextStyle } from '@/types'
import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas-pro'
import { useMediaQuery } from 'usehooks-ts'

export interface IChapterParams {
  chapters: IChapter[] // TODO
  chapter: IChapter
}

export const Chapter = ({ chapter, chapters }: IChapterParams) => {
  const isMobile = useMediaQuery('(max-width: 480px)')
  const [loading, setLoading] = useState(true)
  const [textStyle, setTextStyle] = useState<ITextStyle>({
    fontFamily: '',
    fontWeight: 400,
    fontSize: 1,
    lineHeight: 2.5,
    letterSpacing: 0,
  })

  const handleChangeTextStyle = (state: Partial<ITextStyle>) => {
    setTextStyle(prevStyle => {
      const updatedStyle = { ...prevStyle, ...state }
      localStorage.setItem('textStyle', JSON.stringify(updatedStyle))
      return updatedStyle
    })
  }

  useEffect(() => {
    const savedStyle = localStorage.getItem('textStyle')
    if (savedStyle) setTextStyle(JSON.parse(savedStyle))
  }, [])

  useEffect(() => {
    if (chapters.length > 0 && chapter) {
      setLoading(false)
    }
  }, [chapters, chapter])

  useEffect(() => {
    const incrementViewCount = async () => {
      await fetch(`/api/product/${chapter.productId}/view`, { method: 'POST', body: JSON.stringify({}) })
    }

    incrementViewCount()
  }, [chapter.productId])

  useEffect(() => {
    if (document && document.querySelector('#content')) {
      const contentElement = document.querySelector('#content') as HTMLElement
      html2canvas(contentElement).then(canvas => contentElement.replaceWith(canvas))
    }
  }, [chapter.content])

  useBlockCopy()

  return (
    <div className="container mx-auto relative py-5 lg:py-10">
      <div className="flex flex-col justify-center">
        <p className="text-xl lg:*:text-3xl font-semibold text-center">
          Chap {chapter.chapterNumber} - {chapter.chapterName}
        </p>

        <p className="text-right italic text-sm lg:text-base">
          {formatDatetime(chapter.createdAt, 'HH:mm - dd/MM/yyyy')}
        </p>

        {!chapter || loading ? (
          <div>{/* <ArraySkeleton sx={{ my: 2 }} variant="text" height="20px" /> */}</div>
        ) : (
          <div className="py-3">
            <p
              id="content"
              className="text-justify select-none pointer-events-none"
              style={{
                fontFamily: textStyle.fontFamily,
                fontWeight: textStyle.fontWeight,
                fontSize: textStyle.fontSize + 'em',
                lineHeight: textStyle.lineHeight + 'em',
                letterSpacing: textStyle.letterSpacing + 'em',
                backgroundColor: 'var(--fallback-b1,oklch(var(--b1)/1))',
                padding: '0 8px',
              }}
              dangerouslySetInnerHTML={{ __html: chapter.content }}
            />
            {!isMobile && <RenderHtmlToCanvas html={chapter.content} />}
          </div>
        )}
      </div>

      {chapter && (
        <ChapterActionButton
          textStyle={textStyle}
          handleChangeTextStyle={handleChangeTextStyle}
          chapter={chapter}
          count={chapters.length}
        />
      )}
    </div>
  )
}

const RenderHtmlToCanvas = ({ html }: { html: string }) => {
  useEffect(() => {
    if (document && document.querySelector('#content')) {
      const contentElement = document.querySelector('#content') as HTMLElement
      html2canvas(contentElement).then(canvas => contentElement.replaceWith(canvas))
    }
  }, [html])

  return null
}
