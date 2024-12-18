import { ICategory, IProduct, List } from '@/types'
import { get, patch, Product, uploadFile } from '@/lib'

export default async function ProductsPageEdit({ params }) {
  const { id } = params || {}

  async function fetchProductDetail() {
    const response = await get<IProduct>(`/product/${id}`)
    if (!response) return
    return response
  }

  const editProducts = async (body: IProduct) => {
    'use server'

    const response = await patch(`/product/${id}`, body)
    return response
  }

  const { data: categories } = await get<List<ICategory>>('/category')
  const defaultValue: IProduct | undefined = await fetchProductDetail()

  async function upFile(body: FormData) {
    'use server'
    const response = await uploadFile('/file/upload', body)
    if (response.ok) {
      const data = await response.json()
      return data[0]
    } else {
      console.error('Upload failed:', response.statusText)
      throw new Error(`Upload failed with status: ${response.status}`)
    }
  }

  return <Product.InputField edit={editProducts} defaultValue={defaultValue} categories={categories} upFile={upFile} />
}
