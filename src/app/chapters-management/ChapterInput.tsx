'use client'
// import {
//   PaymentElement,
//   LinkAuthenticationElement,
// } from '@stripe/react-stripe-js';
import { useEffect } from 'react'
// import { useStripe, useElements } from '@stripe/react-stripe-js';
import { Autocomplete, Box, Button, Dialog, TextField } from '@mui/material'
import React from 'react'
import { ApiResponse, IChapter, IProduct } from '@/types'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Form from '@/components/form/Form'
import { Input } from '@/components/form'

interface CreateFormProps {
  edit?: (body: IChapter) => Promise<IChapter | undefined>
  create?: (body: IChapter) => Promise<IChapter | undefined>
  products: IProduct[]
  defaultValue?: IChapter
}

export default function ChapterInput({ products, edit, create, defaultValue }: CreateFormProps) {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter()

  const handleSubmit = async (data: IChapter) => {
    const body: IChapter = {
      ...data,
      productId: 1,
      createdAt: defaultValue?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      users: defaultValue?.users || [],
    }
    let result
    if (id) {
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
    <Form onSubmit={handleSubmit}>
      {/* <Autocomplete
        disablePortal
        id="categories"
        fullWidth
        options={products}
        getOptionLabel={(option: { name: string }) => option.name}
        renderInput={params => <TextField {...params} label="Categories" id="id" />}
        // onChange={(e, val: any) => setProductValue(val?.map((v: any) => Number(v.id)))}
        renderOption={(props, option, key) => (
          <div key={key} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
            <h3>{option?.name}</h3>
          </div>
        )}
        
      /> */}
      <Input
        fullWidth
        validation={{ required: 'Vui lòng chương mấy' }}
        label="Chapter Number"
        name="chapterNumber"
        type="number"
        autoFocus
        defaultValue={defaultValue?.chapterNumber}
      />
      <Input
        fullWidth
        validation={{ required: 'Vui lòng giá' }}
        label="Price"
        name="price"
        type="number"
        autoFocus
        defaultValue={defaultValue?.price}
      />
      <Input
        fullWidth
        validation={{ required: 'Vui lòng tên chương' }}
        label="Chapter Name"
        name="chapterName"
        autoFocus
        defaultValue={defaultValue?.chapterName}
      />
      <Input
        fullWidth
        validation={{ required: 'Vui lòng điền nội dung' }}
        label="Content"
        name="content"
        rows={4}
        multiline
        defaultValue={defaultValue?.content}
      />

      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Form>
  )
}
