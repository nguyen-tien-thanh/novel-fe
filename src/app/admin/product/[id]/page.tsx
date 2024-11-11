import { ICategory, IProduct } from '@/types'
import { get, patch, Product } from '@/lib'

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

  async function fetchCategories() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`)
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    return response.json()
  }

  const categories: ICategory[] = await fetchCategories()
  const defaultValue: IProduct | undefined = await fetchProductDetail()

  return <Product.InputField edit={editProducts} defaultValue={defaultValue} categories={categories} />
}
