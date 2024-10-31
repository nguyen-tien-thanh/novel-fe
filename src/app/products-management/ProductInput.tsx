'use client'
import { ApiResponse, ICategory, ICrawledData, IProduct, PRODUCT_STATUS } from '@/types'
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'

interface CreateFormProps {
  create?: (body: IProduct) => Promise<IProduct | undefined>
  edit?: (body: IProduct) => Promise<IProduct | undefined>
  categories: ICategory[]
  defaultValue?: IProduct
}

export default function ProductInput({ create, edit, defaultValue, categories }: CreateFormProps) {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [categoryValue, setCategoryValue] = React.useState<ICategory[]>([])
  const [crawled, setCrawled] = React.useState<ICrawledData | null>(null)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const body = {
      categories: categoryValue,
      name: (data.get('name') as string) || '',
      source: 'clone',
      image: data.get('image') as string,
      description: data.get('description') as string,
      authorName: data.get('authorName') as string,
      // userId: JSON.parse(token).id,
      status: 'PROGRESS' as PRODUCT_STATUS,
    }
    let result
    if (id) {
      result = await edit!(body)
    } else {
      result = await create!(body)

      console.log('result========>', result)

      if (result?.statusCode) {
        toast.error(result?.message)
      } else {
        router.push('/products-management')
        toast.success('Tạo thành công truyện')
      }
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Fragment>
        <TextField required fullWidth id="name" label="Name" name="name" autoFocus defaultValue={defaultValue?.name} />
        <Autocomplete
          disablePortal
          id="categories"
          fullWidth
          multiple
          options={categories}
          getOptionLabel={option => option.name}
          renderInput={params => <TextField {...params} label="Categories" required />}
          onChange={(e, val) => setCategoryValue(val)}
        />
        <TextField required fullWidth id="description" label="Description" name="description" />
        <TextField required fullWidth id="authorName" label="Author Name" name="authorName" />
        <TextField
          required
          fullWidth
          id="image"
          label="Image"
          placeholder="Put the image's link from gg to display for product"
          name="image"
        />
      </Fragment>
      <Button type="submit">Create</Button>
    </Box>
  )
}
