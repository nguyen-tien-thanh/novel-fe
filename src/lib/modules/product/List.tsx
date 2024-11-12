'use client'

import React from 'react'

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { NVCell, NVList } from '@/components'

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
        render={value => (value.length > 50 ? `${value.slice(0, 50)} ...` : value)}
      />
      <NVCell name="createdAt" headerName="Ngày tạo" />
      <NVCell name="viewCount" headerName="Lượt xem" />
      <NVCell
        name="image"
        headerName="Hình ảnh"
        render={value => <img src={value} height={100} width={300} alt="" />}
      />

      <NVCell name="state" headerName="Công khai" render={value => (value ? 'Công khai' : 'Không công khai')} />
    </NVList>
  )
}
