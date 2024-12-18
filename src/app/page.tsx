import { ICategory, IProduct, List } from '@/types'
import Dashboard from './dashboard'
import { get } from '@/lib'

export default async function Home() {
  const products = await get<List<IProduct> | undefined>('/product')
  const categories = await get<ICategory[] | null>('/category')

  if (!products || !categories) return

  return <Dashboard products={products.data} categories={categories} />
}
