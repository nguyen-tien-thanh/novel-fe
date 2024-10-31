import { auth } from '@/auth'
import ProductInput from '../ProductInput'
import { ApiResponse, ICategory, ICrawledData, IProduct } from '@/types'
import { get, post } from '@/lib'

export default async function CategoriesPageCreate() {
  const createProduct = async (body: IProduct) => {
    'use server'

    const response = await post<IProduct | undefined>('/chapter', body)

    return response
  }

  async function fetchCategories() {
    const response = await get<ICategory[]>('/category')
    if (!response) return []
    return response
  }

  const categories: ICategory[] = await fetchCategories()

  return <ProductInput create={createProduct} categories={categories} />
}
