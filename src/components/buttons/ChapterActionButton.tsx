'use client'

import React, { FC } from 'react'
import { IChapter, ITextStyle } from '@/types'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '../commons'
import { ChevronLeftIcon, ChevronRightIcon, CogIcon } from '../icons'

export interface IChapterActionButton {
  chapter: IChapter
  count: number
  className?: string
  textStyle: ITextStyle
  handleChangeTextStyle: (state: Partial<ITextStyle>) => void
}

export const ChapterActionButton: FC<IChapterActionButton> = ({
  chapter,
  count,
  className = '',
  textStyle,
  handleChangeTextStyle,
}) => {
  const router = useRouter()

  const isFirst = chapter.chapterNumber - 1 === 0
  const isLast = chapter.chapterNumber + 1 > count
  const currentProductUrl = `/product/${chapter.productId}/chapter/`
  const handleClick = (chapterNumber: number) => {
    return router.push(currentProductUrl + chapterNumber)
  }

  return (
    <div
      className={cn(
        'flex justify-between lg:justify-center gap-2 sticky bottom-1 lg:bottom-2 items-center w-full ',
        className,
      )}
    >
      <Button
        disabled={isFirst}
        className={cn(
          'no-animation btn-neutral hover:brightness-150 transition-all active:brightness-125',
          isFirst && 'disabled disabled:bg-base-200',
        )}
        onClick={() => !isFirst && handleClick(chapter.chapterNumber - 1)}
      >
        <ChevronLeftIcon className="size-4" />
        {chapter.chapterNumber - 1 === 0 ? 'Chương ' : `Chương ${chapter.chapterNumber - 1}`}
      </Button>

      <div>
        <label
          htmlFor="settings-text"
          className="btn btn-sm lg:btn-md btn-secondary no-animation hover:brightness-125 transition-all active:brightness-110"
        >
          Cài đặt
        </label>
        <input type="checkbox" id="settings-text" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <label htmlFor="settings-text" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              x
            </label>

            <h3 className="text-lg font-semibold">Cài đặt</h3>

            <div className="py-4 space-y-4">
              {/* TODO: Font family */}
              <div className="flex flex-col gap-1">
                <label>Kích cỡ chữ ({textStyle.fontSize.toFixed(1)})</label>
                <div className="join">
                  <div>
                    <input
                      className="join-item btn btn-sm"
                      type="radio"
                      name="fontSize"
                      aria-label="Giảm"
                      disabled={textStyle.fontSize <= 0.2}
                      onClick={() => handleChangeTextStyle({ fontSize: textStyle.fontSize - 0.1 })}
                    />
                    <input
                      className="join-item btn btn-sm"
                      type="radio"
                      name="fontSize"
                      aria-label="Khôi phục"
                      onClick={() => handleChangeTextStyle({ fontSize: 1 })}
                    />
                    <input
                      className="join-item btn btn-sm"
                      type="radio"
                      name="fontSize"
                      aria-label="Tăng"
                      onClick={() => handleChangeTextStyle({ fontSize: textStyle.fontSize + 0.1 })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label>Đậm nhạt</label>
                <div className="join">
                  <div>
                    <input
                      className={cn('join-item btn btn-sm', textStyle.fontWeight === 300 && 'btn-primary')}
                      type="radio"
                      name="fontWeight"
                      aria-label="Nhạt"
                      onClick={() => handleChangeTextStyle({ fontWeight: 300 })}
                    />
                    <input
                      className={cn('join-item btn btn-sm', textStyle.fontWeight === 400 && 'btn-primary')}
                      type="radio"
                      name="fontWeight"
                      aria-label="Bình thường"
                      onClick={() => handleChangeTextStyle({ fontWeight: 400 })}
                    />
                    <input
                      className={cn('join-item btn btn-sm', textStyle.fontWeight === 700 && 'btn-primary')}
                      type="radio"
                      name="fontWeight"
                      aria-label="Đậm"
                      onClick={() => handleChangeTextStyle({ fontWeight: 700 })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label>Giãn cách dòng ({textStyle.lineHeight.toFixed(1)})</label>
                <div className="join">
                  <div>
                    <input
                      className="join-item btn btn-sm"
                      type="radio"
                      name="lineHeight"
                      aria-label="Giảm"
                      disabled={textStyle.lineHeight <= 0.2}
                      onClick={() => handleChangeTextStyle({ lineHeight: textStyle.lineHeight - 0.1 })}
                    />
                    <input
                      className="join-item btn btn-sm"
                      type="radio"
                      name="lineHeight"
                      aria-label="Khôi phục"
                      onClick={() => handleChangeTextStyle({ lineHeight: 2.5 })}
                    />
                    <input
                      className="join-item btn btn-sm"
                      type="radio"
                      name="lineHeight"
                      aria-label="Tăng"
                      onClick={() => handleChangeTextStyle({ lineHeight: textStyle.lineHeight + 0.1 })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label>Giãn cách chữ ({Math.round(textStyle.letterSpacing * 100)})</label>
                <div className="join">
                  <div>
                    <input
                      className="join-item btn btn-sm"
                      type="radio"
                      name="letterSpacing"
                      aria-label="Giảm"
                      disabled={textStyle.letterSpacing <= 0}
                      onClick={() => handleChangeTextStyle({ letterSpacing: textStyle.letterSpacing - 0.01 })}
                    />
                    <input
                      className="join-item btn btn-sm"
                      type="radio"
                      name="letterSpacing"
                      aria-label="Khôi phục"
                      onClick={() => handleChangeTextStyle({ letterSpacing: 0 })}
                    />
                    <input
                      className="join-item btn btn-sm"
                      type="radio"
                      name="letterSpacing"
                      aria-label="Tăng"
                      onClick={() => handleChangeTextStyle({ letterSpacing: textStyle.letterSpacing + 0.01 })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-action">
              <label htmlFor="settings-text" className="btn">
                Lưu
              </label>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="settings-text">
            Close
          </label>
        </div>
      </div>

      <Button
        disabled={isLast}
        className={cn(
          'no-animation btn-neutral hover:brightness-150 transition-all active:brightness-125',
          isLast && 'disabled disabled:bg-base-200',
        )}
        onClick={() => !isLast && handleClick(chapter.chapterNumber + 1)}
      >
        Chương {chapter.chapterNumber + 1}
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  )
}
