'use client'
import { Button } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import { ICategory } from '@/types'
import { isEmpty } from '@/lib'
import { Form, Input } from '@/components'

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
          label="Tên danh mục"
          name="name"
          style={{ marginBottom: '16px' }}
          autoFocus
          defaultValue={defaultValue?.name}
        />
        <Input
          fullWidth
          validation={{ required: 'Vui lòng điền mô tả' }}
          label="Mô tả"
          name="description"
          style={{ marginBottom: '16px' }}
          rows={4}
          multiline
          defaultValue={defaultValue?.description}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Gửi
        </Button>
      </Form>
    </div>
  )
}
