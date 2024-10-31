'use client'
// import { PaymentElement, LinkAuthenticationElement } from '@stripe/react-stripe-js'
// import { useStripe, useElements } from '@stripe/react-stripe-js'
import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'
import { ICategory } from '@/types'

interface CategoryProps {
  create?: (body: string) => Promise<void>
  edit?: (body: string) => Promise<void>
  defaultValue?: ICategory
}

export default function CategoryInput({ create, edit, defaultValue }: CategoryProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const jsonData = JSON.stringify({
      name: data.get('name'),
      description: data.get('description'),
    })
    try {
      let result

      if (id && edit) {
        result = await edit(jsonData)
      } else if (create) {
        result = await create(jsonData)
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
    <Box className="flex flex-col items-center" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="Name"
        label="Name"
        name="name"
        autoFocus
        defaultValue={defaultValue?.name}
      />
      <TextField
        margin="normal"
        fullWidth
        name="description"
        label="Description"
        id="description"
        multiline
        autoFocus
        rows={4}
        defaultValue={defaultValue?.description}
      />
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  )
}
