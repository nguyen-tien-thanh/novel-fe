'use client'
import React from 'react'
import { formatDatetime } from '@/lib'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Row, Table } from '@/components'
import { IProduct } from '@/types'

export const List = ({ initialChapters, deleteChapter }) => {
  const router = useRouter()

  const deleteChap = async (id: number) => {
    const result = await deleteChapter(id)
    if (result?.statusCode) {
      toast.error(result?.message)
    } else {
      router.push('/admin/chapter')
      toast.success('Xóa thành công chương')
    }
  }

  const editRow = async (id: number) => router.push(`/admin/chapter/${id}`)
  return (
    <Table
      data={initialChapters}
      resource="chapter"
      title="Danh sách chương"
      onEdit={editRow}
      onDelete={deleteChap}
      onCreate={() => router.push('/admin/chapter/create')}
    >
      <Row
        name="product"
        colName="Tên truyện"
        render={(value: IProduct | unknown) => {
          const product = value as IProduct
          return product?.name
        }}
      />
      <Row name="chapterName" colName="Tên chương" />
      <Row name="chapterNumber" colName="Số chương" />
      <Row name="price" colName="giá" />
      <Row
        name="content"
        colName="Nội dung"
        render={(value: unknown) => {
          const _value = value as string
          return _value.length > 50 ? `${_value.slice(0, 50)} ...` : _value
        }}
      />
      <Row
        name="createdAt"
        colName="Thời gian tạo"
        render={(createdAt: unknown) => {
          const _createdAt = createdAt as string
          return formatDatetime(_createdAt)
        }}
      />
      <Row name="state" colName="Công khai" render={value => (value ? 'Công khai' : 'Không công khai')} />
    </Table>
  )
}
