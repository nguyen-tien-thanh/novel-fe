'use client'
import { ICategory, IProduct, PRODUCT_STATUS } from '@/types'
import React from 'react'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import { isEmpty } from '@/lib'
import { AutoCompleteInput, Button, EditorInput, Form, Input } from '@/components'

interface CreateFormProps {
  create?: (body: IProduct) => Promise<IProduct | undefined>
  edit?: (body: IProduct) => Promise<IProduct | undefined>
  categories: ICategory[]
  defaultValue?: IProduct
}

export const InputField = ({ create, edit, defaultValue, categories }: CreateFormProps) => {
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
    if (result?.statusCode) {
      toast.error(result?.message)
    } else {
      router.push('/admin/product')
      toast.success('Tạo thành công truyện')
    }
  }

  return (
    <div className="flex flex-col justify-center items-center p-[20px]">
      <h2 className="text-2xl font-bold mb-3 justify-center">{defaultValue ? 'Cập nhật truyện' : 'Tạo mới truyện'}</h2>
      <Form
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
          name="categories"
          multiple
          label="Danh mục"
          validation={{
            validate: val => {
              if (!val) {
                return 'Vui lòng chọn ít nhất 1 danh mục'
              }
            },
          }}
          options={categories}
          defaultValue={defaultValue?.categories}
        />
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Tên truyện</span>
          </label>
          <Input
            validation={{ required: 'Vui lòng điền tên' }}
            name="name"
            autoFocus
            defaultValue={defaultValue?.name}
          />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Tác giả</span>
          </label>
          <Input name="authorName" defaultValue={defaultValue?.authorName} />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Ảnh</span>
          </label>
          <Input name="image" defaultValue={defaultValue?.image} />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Mô tả</span>
          </label>
          <EditorInput
            validation={{ required: 'Vui lòng điền nội dung' }}
            name="description"
            label="Nội dung"
            defaultValue={defaultValue?.description}
          />
        </div>

        <div className="form-control mt-[90px]">
          <Button className="btn-primary">Gửi</Button>
        </div>
      </Form>
    </div>
  )
}
