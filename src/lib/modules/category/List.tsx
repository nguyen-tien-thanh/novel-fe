'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { NVCell, NVList } from '@/components'
import React from 'react'

export const List = ({ initialCategories, deleteCategory }) => {
  const router = useRouter()

  const deleteCate = async (id: number) => {
    const result = await deleteCategory(id)
    if (result?.statusCode) {
      toast.error(result?.message)
    } else {
      router.push('/admin/category')
      toast.success('Xóa thành công danh mục')
    }
  }

  return (
    <NVList
      data={initialCategories}
      resource="category"
      title="Danh sách danh mục"
      isEdit
      onDel={deleteCate}
      onAdd={() => router.push('/admin/category/create')}
    >
      <NVCell name="name" headerName="Tên" />
      <NVCell name="description" headerName="Mô tả" />
      <NVCell name="state" headerName="Công khai" render={value => (value ? 'Công khai' : 'Không công khai')} />
    </NVList>
  )
}
