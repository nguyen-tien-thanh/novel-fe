'use client'
// import { PaymentElement, LinkAuthenticationElement } from '@stripe/react-stripe-js'
// import { useStripe, useElements } from '@stripe/react-stripe-js'
import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'
import { ICategory } from '@/types'
import Form from '@/components/form/Form'
import { Input } from '@/components/form'
import { isEmpty } from '@/lib'

interface CategoryProps {
  create?: (body: ICategory) => Promise<ICategory | undefined>
  edit?: (body: ICategory) => Promise<ICategory | undefined>
  defaultValue?: ICategory
}

export default function CategoryInput({ create, edit, defaultValue }: CategoryProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

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
        return
      }

      const successMessage = id ? 'Cập nhật danh mục thành công' : 'Tạo danh mục thành công'

      toast.success(successMessage)

      router.push('/categories-management')
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.')
      console.error('Submission error:', error)
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        fullWidth
        validation={{ required: 'Vui lòng điền tên' }}
        label="Name"
        name="name"
        autoFocus
        defaultValue={defaultValue?.name}
      />
      <Input
        fullWidth
        validation={{ required: 'Vui lòng điền mô tả' }}
        label="Description"
        name="description"
        rows={4}
        multiline
        defaultValue={defaultValue?.description}
      />
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Form>
  )
}
