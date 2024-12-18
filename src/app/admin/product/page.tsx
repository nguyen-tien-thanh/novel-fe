import { IProduct, List } from '@/types'
import { buildQueryString, del, get, Product } from '@/lib'

export default async function ProductsPage({ searchParams }) {
  const { skip = 0, take = 5 } = searchParams
  const filter = { skip, take }

  async function fetchProducts() {
    const response = await get<List<IProduct[] | undefined>>(`/product`, filter)
    return response
  }

  const products = await fetchProducts()

  const deleteProduct = async (id: number) => {
    'use server'
    const response = await del(`/product/${id}`)
    return response
  }

  return <Product.List initialProducts={products} deleteProduct={deleteProduct} />
}
