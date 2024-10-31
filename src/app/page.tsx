import { ICategory, IProduct } from '@/types'
import Dashboard from './dashboard'
import { get } from '@/lib'

export default async function Home() {
  const products = await get<IProduct[] | null>('/product')
  const categories = await get<ICategory[] | null>('/category')

  if (!products || !categories) return

  return <Dashboard products={products} categories={categories} />
}
