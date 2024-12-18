import { ICategory, IProduct, List } from '@/types'
import { get, post, Product, uploadFile } from '@/lib'

export default async function CategoriesPageCreate() {
  const createProduct = async (body: IProduct) => {
    'use server'

    const response = await post<IProduct | undefined>('/product', body)

    return response
  }

  async function fetchCategories() {
    try {
      const response = await get<List<ICategory>>('/category')
      return response
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const { data: categories } = await fetchCategories()

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

  return <Product.InputField create={createProduct} categories={categories} upFile={upFile} />
}
