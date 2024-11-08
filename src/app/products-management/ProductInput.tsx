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
import { AutoCompleteInput, Input } from '@/components/form'
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
      <Input
        fullWidth
        validation={{ required: 'Vui lòng điền tên' }}
        id="name"
        label="Name"
        name="name"
        autoFocus
        defaultValue={defaultValue?.name}
      />
      <AutoCompleteInput
        disablePortal
        name="categories"
        fullWidth
        multiple
        validation={{
          validate: val => {
            if (!val) {
              return 'Vui lòng chọn ít nhất 1 danh mục'
            }
          },
        }}
        options={categories}
        label={'Categories'}
        getOptionLabel={option => option.name}
        renderInput={params => <TextField {...params} label="Categories" required />}
      />
      <Input fullWidth id="description" label="Description" name="description" />
      <Input fullWidth id="authorName" label="Author Name" name="authorName" />
      <Input
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
