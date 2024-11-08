'use client'
import { ICategory, IProduct, PRODUCT_STATUS } from '@/types'
import { Button } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import Form from '@/components/form/Form'
import { AutoCompleteInput, Input } from '@/components/form'
import { isEmpty } from '@/lib'

interface CreateFormProps {
  create?: (body: IProduct) => Promise<IProduct | undefined>
  edit?: (body: IProduct) => Promise<IProduct | undefined>
  categories: ICategory[]
  defaultValue?: IProduct
}

export default function ProductInput({ create, edit, defaultValue, categories }: CreateFormProps) {
  const { id } = useParams()
  const router = useRouter()

  const handleSubmit = async (data: IProduct) => {
    if (!data.categories) {
      toast.error('Please choose at least one category')
      return
    }

    const body = {
      ...data,
      source: 'Sưu tầm',
      status: 'PROGRESS' as PRODUCT_STATUS,
    }
    let result
    if (!isEmpty(id)) {
      result = await edit!(body)
    } else {
      result = await create!(body)
    }
    console.log('result========>', result)
    if (result?.statusCode) {
      toast.error(result?.message)
    } else {
      router.push('/products-management')
      toast.success('Tạo thành công truyện')
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
        <Input
          fullWidth
          validation={{ required: 'Vui lòng điền tên' }}
          label="Tên truyện"
          name="name"
          autoFocus
          style={{ marginBottom: '16px' }}
          defaultValue={defaultValue?.name}
        />
        <AutoCompleteInput
          name="categories"
          label="Danh mục"
          fullWidth
          multiple
          validation={{
            validate: val => {
              if (!val) {
                return 'Vui lòng chọn ít nhất 1 danh mục'
              }
            },
          }}
          options={categories}
          defaultValue={defaultValue?.categories}
          style={{ marginBottom: '16px' }}
        />
        <Input
          fullWidth
          label="Mô tả"
          name="description"
          style={{ marginBottom: '16px' }}
          defaultValue={defaultValue?.description}
        />
        <Input
          fullWidth
          label="Tác giả"
          name="authorName"
          style={{ marginBottom: '16px' }}
          defaultValue={defaultValue?.authorName}
        />
        <Input fullWidth label="Ảnh" name="image" style={{ marginBottom: '16px' }} defaultValue={defaultValue?.image} />
        <Button type="submit">Tạo</Button>
      </Form>
    </div>
  )
}
