'use client'

import { HeartIcon, TrashIcon } from '../icons'
import { Button, Drawer, Image, Spinner, Tooltip } from '../commons'
import { useState, MouseEvent } from 'react'
import { CardPaper } from '../cards'
import { useQuery } from '@tanstack/react-query'
import { IList, List } from '@/types'
import { useRouter } from 'next/navigation'

export const FavoriteButton = () => {
  const router = useRouter()
  const [flag, setFlag] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const handleOpenDrawer = () => setOpenDrawer(!openDrawer)

  const handleRemove = async (e: MouseEvent<HTMLDivElement>, classification: 'READING' | 'FAVORITE', id: number) => {
    e.preventDefault()
    e.stopPropagation()

    return await fetch('/api/list', {
      method: 'PATCH',
      body: JSON.stringify({ classification, products: [{ id }], chapters: [{ id }] }),
    }).finally(() => setFlag(!flag))
  }

  const { data: listResp, isLoading } = useQuery({
    queryKey: ['list', flag],
    queryFn: () => fetch('/api/list').then(res => res.json() as unknown as List<IList>),
  })

  return (
    <>
      <Tooltip title="Danh sách">
        <Button className="btn-ghost btn-circle" onClick={handleOpenDrawer}>
          <HeartIcon />
        </Button>
      </Tooltip>
      <Drawer open={openDrawer} setOpen={setOpenDrawer} position="right" className="pt-4 lg:max-w-sm">
        {isLoading && (
          <div className="h-[90dvh] place-content-center place-self-center">
            <Spinner />
          </div>
        )}
        {listResp?.data?.map(list => {
          if (list.classification === 'READING' && list.chapters?.length !== 0)
            return (
              <CardPaper title="Đang đọc">
                {list.chapters?.map(chapter => {
                  return (
                    <a
                      onClick={() => {
                        router.push(`/product/${chapter.product?.id}/chapter/${chapter.chapterNumber}`)
                        setOpenDrawer(false)
                      }}
                      key={chapter.id}
                      role="button"
                      className="flex hover:bg-primary/10 p-2 rounded-lg group transition-all"
                    >
                      <div className="flex flex-col justify-center items-center uppercase text-primary mr-3">
                        <span className="text-xs">Chap</span>
                        <span className="text-xl font-semibold">
                          {chapter.chapterNumber < 10 ? '0' + chapter.chapterNumber : chapter.chapterNumber}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs line-clamp-1 opacity-70">{chapter.product?.name}</p>
                        <h2 className="card-title line-clamp-1 text-lg">{chapter.chapterName}</h2>
                        <p className="line-clamp-1 text-sm">{chapter.content.slice(0, 100)}</p>
                      </div>

                      <Tooltip title="Xóa" className="place-self-center">
                        <div
                          role="button"
                          className="lg:hidden lg:group-hover:block lg:p-2 hover:text-error transition-all"
                          onClick={e => handleRemove(e, 'READING', chapter.id)}
                        >
                          <TrashIcon className="size-5" />
                        </div>
                      </Tooltip>
                    </a>
                  )
                })}
              </CardPaper>
            )
        })}

        {listResp?.data?.map(list => {
          if (list.classification === 'FAVORITE' && list.products?.length !== 0)
            return (
              <CardPaper title="Yêu thích">
                {list.products?.map(product => {
                  return (
                    <a
                      onClick={() => {
                        router.push(`/product/${product.id}`)
                        setOpenDrawer(false)
                      }}
                      key={product.id}
                      role="button"
                      className="flex hover:bg-primary/10 p-2 rounded-lg group transition-all"
                    >
                      <div className="w-max">
                        <div className="h-[90px] w-[60px] mr-3 relative">
                          <Image
                            fill
                            className="object-cover border rounded"
                            src={product.image as string}
                            alt="Image"
                            sizes="60px"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-xs line-clamp-1 opacity-70">{product.authorName}</p>
                        <h2 className="card-title line-clamp-1 text-lg">{product.name}</h2>
                        <p className="line-clamp-2 text-sm">{product.description}</p>
                      </div>

                      <Tooltip title="Xóa" className="place-self-center">
                        <div
                          role="button"
                          className="lg:hidden lg:group-hover:block lg:p-2 hover:text-error transition-all"
                          onClick={e => handleRemove(e, 'FAVORITE', product.id)}
                        >
                          <TrashIcon className="size-5" />
                        </div>
                      </Tooltip>
                    </a>
                  )
                })}
              </CardPaper>
            )
        })}
      </Drawer>
    </>
  )
}
