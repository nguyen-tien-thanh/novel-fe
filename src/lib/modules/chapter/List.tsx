'use client'
import React from 'react'
import { formatDatetime } from '@/lib'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { NVCell, NVList } from '@/components'

export const List = ({ initialChapters, deleteChapter, products }) => {
  const router = useRouter()

  const deleteChap = async (id: number) => {
    const result = await deleteChapter(id)
    if (result?.statusCode) {
      toast.error(result?.message)
    } else {
      router.push('/admin/chapter')
      toast.success('Xóa thành công danh mục')
    }
  }

  return (
    <NVList
      data={initialChapters}
      resource="chapter"
      title="Danh sách danh mục"
      isEdit
      onDel={deleteChap}
      onAdd={() => router.push('/admin/chapter/create')}
    >
      <NVCell name="productId" headerName="Tên truyện" render={value => products?.find(v => v?.id === value)?.name} />
      <NVCell name="chapterName" headerName="Tên chương" />
      <NVCell name="chapterNumber" headerName="Số chương" />
      <NVCell name="price" headerName="giá" />
      <NVCell
        name="content"
        headerName="Nội dung"
        render={(value: unknown) => {
          const _value = value as string
          return _value.length > 50 ? `${_value.slice(0, 50)} ...` : _value
        }}
      />
      <NVCell
        name="createdAt"
        headerName="Thời gian tạo"
        render={(createdAt: unknown) => {
          const _createdAt = createdAt as string
          return formatDatetime(_createdAt)
        }}
      />
      <NVCell name="state" headerName="Công khai" render={value => (value ? 'Công khai' : 'Không công khai')} />
    </NVList>
  )
}
