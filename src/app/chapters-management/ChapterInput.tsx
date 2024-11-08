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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const body: IChapter = {
      productId: 1,
      chapterName: data.get(`chapterName`) as string,
      price: data.get(`price`) as unknown as number,
      content: data.get(`content`) as string,
      chapterNumber: Number(data.get(`chapterNumber`)),
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
    <Box className="flex flex-col items-center" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
      <TextField
        margin="normal"
        required
        fullWidth
        id="chapterNumber"
        label="Chapter Number"
        name="chapterNumber"
        type="number"
        defaultValue={defaultValue?.chapterNumber}
        autoFocus
      />
      <TextField margin="normal" required fullWidth id="price" label="Price" name="price" type="number" autoFocus />
      <TextField
        margin="normal"
        required
        fullWidth
        id="chapterName"
        defaultValue={defaultValue?.chapterName}
        label="Chapter Name"
        name="chapterName"
        autoFocus
      />
      <TextField
        margin="normal"
        defaultValue={defaultValue?.content}
        fullWidth
        name="content"
        label="Content"
        id="content"
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  )
}
