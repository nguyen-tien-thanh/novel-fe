import { ICategory, IProduct, List } from '@/types'
import Dashboard from './dashboard'
import { get } from '@/lib'

export default async function Home() {
  const { data: products } = await get<List<IProduct>>('/product')
  const { data: categories } = await get<List<ICategory>>('/category')

  return <Dashboard products={products} categories={categories} />
}
