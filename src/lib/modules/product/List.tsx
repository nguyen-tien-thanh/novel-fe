'use client'

import React from 'react'

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Row, Table, CheckIcon } from '@/components'
import { formatDatetime } from '@/lib/utils'
import { Image } from '@/components'

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

  const editRow = async (id: number) => router.push(`/admin/product/${id}`)

  return (
    <div className="p-2">
      <Table
        data={initialProducts}
        resource="product"
        title="Danh sách truyện"
        onDelete={deleteRow}
        onEdit={editRow}
        onCreate={() => router.push('/admin/product/create')}
        zebra
        footer
      >
        <Row
          name="image"
          render={(value: unknown) => {
            const stringValue = value as string
            return value ? (
              <div className="mask mask-squircle size-12 relative">
                <Image fill src={stringValue} className="object-center object-cover" alt="Image preview" />
              </div>
            ) : (
              <div></div>
            )
          }}
        />
        <Row name="name" colName="Tên" />
        <Row name="authorName" colName="Tác giả" />
        <Row
          name="description"
          colName="Mô tả"
          render={(value: unknown) => {
            const stringValue = value as string | undefined
            if (typeof stringValue === 'string') {
              return stringValue.length > 50 ? `${stringValue.slice(0, 50)} ...` : stringValue
            }
            return ''
          }}
        />
        <Row name="createdAt" colName="Ngày tạo" render={(createdAt: unknown) => formatDatetime(createdAt as string)} />
        <Row name="viewCount" colName="Lượt xem" />
        <Row name="state" colName="Công khai" render={value => value && <CheckIcon />} />
      </Table>
    </div>
  )
}
