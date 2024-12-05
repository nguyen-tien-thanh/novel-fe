'use client'

import React from 'react'

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { NVCell, NVList } from '@/components'
import { formatDatetime } from '@/lib/utils'
import Image from 'next/image'

export const List = ({ initialProducts, deleteProduct }) => {
  const router = useRouter()

  const deleteRow = async (id: number) => {
    const result = await deleteProduct(id)
    if (result?.statusCode) {
      toast.error(result?.message)
    } else {
      router.push('/admin/product')
      toast.success('Xóa thành công truyện')
    }
  }

  return (
    <NVList
      data={initialProducts}
      resource="product"
      title="Danh sách danh mục"
      isEdit
      onDel={deleteRow}
      onAdd={() => router.push('/admin/product/create')}
    >
      <NVCell name="name" headerName="Tên" />
      <NVCell name="authorName" headerName="Tác giả" />
      <NVCell
        name="description"
        headerName="Mô tả"
        render={(value: unknown) => {
          const stringValue = value as string | undefined
          if (typeof stringValue === 'string') {
            return stringValue.length > 50 ? `${stringValue.slice(0, 50)} ...` : stringValue
          }
          return ''
        }}
      />
      <NVCell
        name="createdAt"
        headerName="Ngày tạo"
        render={(createdAt: unknown) => formatDatetime(createdAt as string)}
      />
      <NVCell name="viewCount" headerName="Lượt xem" />
      <NVCell
        name="image"
        headerName="Hình ảnh"
        render={(value: unknown) => {
          const stringValue = value as string
          return value ? (
            <Image
              width={100}
              height={100}
              src={stringValue || '/assets/notfound.webp'}
              onError={e => {
                const target = e.target as HTMLImageElement
                target.src = '/assets/notfound.webp'
              }}
              className="h-[100px] w-[100px] object-cover"
              alt="Image preview"
            />
          ) : (
            <div></div>
          )
        }}
      />

      <NVCell name="state" headerName="Công khai" render={value => (value ? 'Công khai' : 'Không công khai')} />
    </NVList>
  )
}
