import { auth } from '@/auth'
import ProductInput from '../ProductInput'
import { ApiResponse, ICategory, ICrawledData, IProduct } from '@/types'

export default async function CategoriesPageCreate() {
  const session = await auth()
  const token = session?.accessToken

  const createCategories = async (body: string): Promise<ApiResponse<IProduct>> => {
    'use server'

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    })
    return response.json()
  }

  const crawlData = async (url: string, body: string): Promise<ApiResponse<ICrawledData>> => {
    'use server'

    console.log('response===> vaooooooooo kkkkkkkkkkk', url, body)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/crawler/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    })
    console.log('response===> crea', response)
    return response.json()
  }

  const createChapter = async (body: string) => {
    'use server'

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    })
    return response.json()
  }
  async function fetchCategories() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`)
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    return response.json()
  }

  const categories: ICategory[] = await fetchCategories()

  return (
    <ProductInput create={createCategories} crawl={crawlData} createChapter={createChapter} categories={categories} />
  )
}
