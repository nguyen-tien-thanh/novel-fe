import { ICategory, IProduct } from '@/types'
import { get, post, Product } from '@/lib'

export default async function CategoriesPageCreate() {
  const createProduct = async (body: IProduct) => {
    'use server'

    const response = await post<IProduct | undefined>('/product', body)
    console.log('response======>x', response)

    return response
  }

  async function fetchCategories() {
    const response = await get<ICategory[]>('/category')
    if (!response) return []
    return response
  }

  const categories: ICategory[] = await fetchCategories()

  return <Product.InputField create={createProduct} categories={categories} />
}
