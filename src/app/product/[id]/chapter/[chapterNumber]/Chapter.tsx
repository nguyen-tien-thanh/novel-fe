'use client'

import React, { useEffect, useState } from 'react'
import { Box, Skeleton, Typography } from '@mui/material'
import { IChapter, ITextStyle } from '@/types'
import { ArraySkeleton, ChapterActionButton, Container } from '@/components'
import { useBlockCopy } from '@/hooks/useBlockCopy'

interface IPageParams {
  chapters: IChapter[]
  chapter: IChapter
}

export const Chapter = ({ chapter, chapters }: IPageParams) => {
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

  useBlockCopy()

  return (
    <Container sx={{ position: 'relative' }}>
      <Box className="flex flex-col justify-center">
        {!chapter || loading ? (
          <Skeleton variant="text" sx={{ display: 'flex', alignSelf: 'center', fontSize: '28px' }} width="300px" />
        ) : (
          <Typography variant="h4" className="font-bold text-center">
            Chap {chapter.chapterNumber} - {chapter.chapterName}
          </Typography>
        )}

        {chapter && (
          <ChapterActionButton
            textStyle={textStyle}
            handleChangeTextStyle={handleChangeTextStyle}
            className="mt-6 hidden md:flex justify-center gap-2 sticky top-[90px]"
            chapter={chapter}
            count={chapters.length}
          />
        )}

        {!chapter || loading ? (
          <Box>
            <ArraySkeleton sx={{ my: 2 }} variant="text" height="20px" />
          </Box>
        ) : (
          <Box sx={{ py: 3 }}>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'justify',
                fontFamily: textStyle.fontFamily,
                fontWeight: textStyle.fontWeight,
                fontSize: textStyle.fontSize + 'em',
                lineHeight: textStyle.lineHeight + 'em',
                letterSpacing: textStyle.letterSpacing + 'em',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
              dangerouslySetInnerHTML={{ __html: chapter.content }}
            />
          </Box>
        )}
      </Box>

      {chapter && (
        <ChapterActionButton
          textStyle={textStyle}
          handleChangeTextStyle={handleChangeTextStyle}
          chapter={chapter}
          count={chapters.length}
          className="gap-2 "
        />
      )}
    </Container>
  )
}
