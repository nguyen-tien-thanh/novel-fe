'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { NVCell, NVList, Row, Table } from '@/components'
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
  const editRow = async (id: number) => router.push(`/admin/category/${id}`)

  return (
    <Table
      data={initialCategories}
      resource="category"
      title="Danh sách danh mục"
      onEdit={editRow}
      onDelete={deleteCate}
      onCreate={() => router.push('/admin/category/create')}
    >
      <Row name="name" colName="Tên" />
      <Row name="description" colName="Mô tả" />
      <Row name="state" colName="Công khai" render={value => (value ? 'Công khai' : 'Không công khai')} />
    </Table>
  )
}
