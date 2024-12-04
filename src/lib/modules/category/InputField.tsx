'use client'
import React from 'react'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import { ICategory } from '@/types'
import { isEmpty } from '@/lib'
import { Button, EditorInput, Form, Input } from '@/components'

interface CategoryProps {
  create?: (body: ICategory) => Promise<ICategory | undefined>
  edit?: (body: ICategory) => Promise<ICategory | undefined>
  defaultValue?: ICategory
}

export const InputField = ({ create, edit, defaultValue }: CategoryProps) => {
  const router = useRouter()
  const { id } = useParams()

  const handleSubmit = async (data: ICategory) => {
    try {
      let result

      if (!isEmpty(id)) {
        result = await edit!(data)
      } else {
        result = await create!(data)
      }

      if (result?.statusCode) {
        toast.error(result.message || 'An error occurred')
      }

      const successMessage = id ? 'Cập nhật danh mục thành công' : 'Tạo danh mục thành công'

      toast.success(successMessage)

      router.push('/admin/category')
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.')
      console.error('Submission error:', error)
    }
  }
  return (
    <div className="flex flex-col justify-center items-center p-[20px]">
      <h2 className="text-2xl font-bold mb-3 justify-center">
        {defaultValue ? 'Cập nhật danh mục' : 'Tạo mới danh mục'}
      </h2>
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
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Tên danh mục</span>
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
