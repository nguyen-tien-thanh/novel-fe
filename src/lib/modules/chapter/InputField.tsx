'use client'

// import { Button } from '@mui/material'
import React from 'react'
import { IChapter, IProduct } from '@/types'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { isEmpty } from '@/lib'
import { AutoCompleteInput, Button, EditorInput, Form, Input } from '@/components'

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

    let result
    if (!isEmpty(id)) {
      result = await edit!(body)
    } else {
      result = await create!(body)
    }

    if (result?.statusCode) {
      toast.error(result?.message)
    } else {
      router.push('/admin/chapter')
      toast.success('Tạo thành công chương')
    }
  }
  return (
    <div className="flex flex-col justify-center items-center p-[20px]">
      <h2 className="text-2xl font-bold mb-3 justify-center">{defaultValue ? 'Cập nhật chương' : 'Tạo mới chương'}</h2>
      <Form
        defaultValues={defaultValue}
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '900px',
          padding: '20px',
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        }}
      >
        <AutoCompleteInput
          name="productId"
          validation={{
            validate: val => {
              if (!val) {
                return 'Vui lòng chọn ít nhất 1 truyện'
              }
            },
          }}
          options={products}
          label="Truyện"
        />
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Chương số</span>
          </label>
          <Input validation={{ required: 'Vui lòng chương mấy' }} name="chapterNumber" type="number" autoFocus />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Giá</span>
          </label>
          <Input validation={{ required: 'Vui lòng giá' }} name="price" type="number" autoFocus />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Tên chương</span>
          </label>
          <Input validation={{ required: 'Vui lòng tên chương' }} name="chapterName" autoFocus />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Nội dung</span>
          </label>
          <EditorInput
            validation={{ required: 'Vui lòng điền nội dung' }}
            name="content"
            label="Nội dung"
            defaultValue={defaultValue?.content}
          />
        </div>
        <div className="form-control mt-[90px]">
          <Button className="btn-primary">Gửi</Button>
        </div>
      </Form>
    </div>
  )
}
