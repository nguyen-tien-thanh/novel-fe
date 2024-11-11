import { IProduct } from '@/types'
import { auth } from '@/auth'
import { del, get, Product } from '@/lib'

async function fetchProducts() {
  const response = await get<IProduct[] | undefined>('/product')
  return response
}

export default async function ProductsPage() {
  const session = await auth()
  const token = session?.accessToken
  const products: IProduct[] | undefined = await fetchProducts()

  const deleteProduct = async (id: number) => {
    'use server'

    const response = await del(`/product/${id}`)
    return response
  }
  return <Product.List initialProducts={products} deleteProduct={deleteProduct} />
}
