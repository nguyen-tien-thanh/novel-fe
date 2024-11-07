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
import Form from '@/components/form/Form'
import { AutoCompleteInput, TextInput } from '@/components/form'
import { useFormContext } from 'react-hook-form'
import { isEmpty } from '@/lib'

interface CreateFormProps {
  create?: (body: IProduct) => Promise<IProduct | undefined>
  edit?: (body: IProduct) => Promise<IProduct | undefined>
  categories: ICategory[]
  defaultValue?: IProduct
}

export default function ProductInput({ create, edit, defaultValue, categories }: CreateFormProps) {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter()

  const handleSubmit = async (data: IProduct) => {
    if (!data.categories) {
      toast.error('Please choose at least one category')
      return
    }
    const body = {
      ...data,
      categories: data.categories.map(category => ({
        id: category.id,
      })),
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
    <Form onSubmit={handleSubmit}>
      <TextInput fullWidth id="name" label="Name" name="name" autoFocus defaultValue={defaultValue?.name} />
      <AutoCompleteInput
        disablePortal
        name="categories"
        fullWidth
        multiple
        options={categories}
        label={'Categories'}
        getOptionLabel={option => option.name}
        renderInput={params => <TextField {...params} label="Categories" required />}
      />
      <TextInput required fullWidth id="description" label="Description" name="description" />
      <TextInput required fullWidth id="authorName" label="Author Name" name="authorName" />
      <TextInput
        required
        fullWidth
        id="image"
        label="Image"
        placeholder="Put the image's link from gg to display for product"
        name="image"
      />
      <Button type="submit">Create</Button>
    </Form>
  )
}
