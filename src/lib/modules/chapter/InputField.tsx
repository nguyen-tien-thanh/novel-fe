'use client'

import { Button } from '@mui/material'
import React from 'react'
import { IChapter, IProduct } from '@/types'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Form from '@/components/form/Form'
import { AutoCompleteInput, Input } from '@/components/form'
import { isEmpty } from '@/lib'

interface CreateFormProps {
  edit?: (body: IChapter) => Promise<IChapter | undefined>
  create?: (body: IChapter) => Promise<IChapter | undefined>
  products: IProduct[]
  defaultValue?: IChapter
}

export const InputField = ({ products, edit, create, defaultValue }: CreateFormProps) => {
  const { id } = useParams()
  const router = useRouter()

  const handleSubmit = async (data: IChapter) => {
    const body: IChapter = {
      ...data,
      chapterNumber: Number(data.chapterNumber),
      price: Number(data.price),
      productId: typeof data.productId === 'object' ? data.productId.id : data.productId,
      createdAt: defaultValue?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      users: defaultValue?.users || [],
    }

    console.log('body=========>', body)
    let result
    if (!isEmpty(id)) {
      result = await edit!(body)
    } else {
      result = await create!(body)
    }

    if (result?.statusCode) {
      toast.error(result?.message)
    } else {
      router.push('/chapters-management')
      toast.success('Tạo thành công chương')
    }
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <Form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '20px',
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        }}
      >
        <AutoCompleteInput
          name="productId"
          fullWidth
          validation={{
            validate: val => {
              if (!val) {
                return 'Vui lòng chọn ít nhất 1 truyện'
              }
            },
          }}
          options={products}
          defaultValue={defaultValue?.productId}
          label="Truyện"
          style={{ marginBottom: '16px' }}
        />
        <Input
          fullWidth
          validation={{ required: 'Vui lòng chương mấy' }}
          label="Chương số"
          name="chapterNumber"
          type="number"
          autoFocus
          defaultValue={defaultValue?.chapterNumber}
          style={{ marginBottom: '16px' }}
        />
        <Input
          fullWidth
          validation={{ required: 'Vui lòng giá' }}
          label="Giá"
          name="price"
          type="number"
          autoFocus
          defaultValue={defaultValue?.price}
          style={{ marginBottom: '16px' }}
        />
        <Input
          fullWidth
          validation={{ required: 'Vui lòng tên chương' }}
          label="Tên chương"
          name="chapterName"
          autoFocus
          defaultValue={defaultValue?.chapterName}
          style={{ marginBottom: '16px' }}
        />
        <Input
          fullWidth
          validation={{ required: 'Vui lòng điền nội dung' }}
          label="Nội dung"
          name="content"
          rows={4}
          multiline
          defaultValue={defaultValue?.content}
          style={{ marginBottom: '16px' }}
        />

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, width: '100%' }}>
          Tạo
        </Button>
      </Form>
    </div>
  )
}
