'use client'
import { ICategory, IProduct, PRODUCT_STATUS } from '@/types'
import React from 'react'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import { isEmpty, pick, sanitizeFileName, uploadFile } from '@/lib'
import { AutoCompleteInput, Button, EditorInput, FileInput, Form, Input } from '@/components'

interface CreateFormProps {
  create?: (body: IProduct) => Promise<IProduct | undefined>
  edit?: (body: IProduct) => Promise<IProduct | undefined>
  categories: ICategory[]
  defaultValue?: IProduct
  upFile?: (body: FormData) => Promise<Response>
}

export const InputField = ({ create, edit, defaultValue, categories, upFile }: CreateFormProps) => {
  const { id } = useParams()
  const router = useRouter()

  const handleSubmit = async (data: IProduct) => {
    const { id: _id, image, name } = data
    if (image && typeof image === 'object') {
      const formData = new FormData()
      const [nameImage, suffix] = image.name.split('.')
      const renamedFile = new File([image], `${sanitizeFileName(name).toLowerCase()}.${suffix}`, {
        type: image.type,
      })

      formData.append('files', renamedFile)
      const result = await upFile!(formData)
      data.image = result.url.replace('minio.thanhsonnguyen.io.vn/media', 'thanhsonnguyen.io.vn/assets')
    }

    if (!data.categories) {
      toast.error('Please choose at least one category')
      return
    }

    const body: IProduct = {
      ...pick(
        {
          ...data,
          source: 'Sưu tầm',
          status: 'PROGRESS' as PRODUCT_STATUS,
        },
        ['name', 'authorName', 'image', 'description', 'categories', 'source', 'status'],
      ),
      id: data.id,
      createdAt: data.createdAt,
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
        defaultValues={defaultValue}
        className="bg-base-200 text-base-content"
        style={{
          width: '100%',
          maxWidth: '900px',
          padding: '20px',
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
        />
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Tên truyện</span>
          </label>
          <Input validation={{ required: 'Vui lòng điền tên' }} name="name" autoFocus />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Tác giả</span>
          </label>
          <Input name="authorName" />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Ảnh</span>
          </label>
          <FileInput name="image" validation={{ required: 'Vui lòng thêm ảnh cho truyện' }} />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Mô tả</span>
          </label>
          <EditorInput validation={{ required: 'Vui lòng điền nội dung' }} name="description" label="Nội dung" />
        </div>

        <div className="form-control mt-8">
          <Button type="submit" className="btn-primary">
            Gửi
          </Button>
        </div>
      </Form>
    </div>
  )
}
