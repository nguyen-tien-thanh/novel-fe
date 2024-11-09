export enum PRODUCT_STATUS {
  PROGRESS = 'PROGRESS',
  DONE = 'DONE',
}

export enum ROLE {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
}

export interface IProduct {
  id: number
  createdBy?: number
  authorName: string
  name: string
  source?: string
  status?: PRODUCT_STATUS
  image?: string
  viewCount?: number
  description?: string
  createdAt?: string
  updatedAt?: string
  averageRate?: number
  chapterCount?: number
  categories?: ICategory[]
}

export interface ICategory {
  id: number
  name?: string
  description?: string
}

export interface IChapter {
  id?: number
  productId: number | IProduct
  chapterName: string
  content: string
  chapterNumber: number
  price: number
  createdAt: string
  updatedAt: string
  users: number[]
}

export interface IRate {
  id: number
  productId: number
  rating: number
  createdBy: number
  createdAt: string
  updatedAt: string
}

export interface IUser {
  id: number | string
  role: ROLE
  name?: string | null
  email?: string
  phone?: string | null
  birthdate?: string | null
  image?: string | null
  money?: number
  refreshToken?: string | null
  emailVerified?: Date | null
  createdAt?: string
  accessToken?: string
}

export interface LoginResponse {
  accessToken: string
  data: IUser
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SessionLogin {
  accessToken?: string
  user?: IUser
}

export interface UserRole {
  role: 'ADMIN' | 'MANAGER' | string // Define other fields as needed
}

export interface DashboardProps {
  products: IProduct[]
  categories: ICategory[]
  doneProducts: IProduct[]
}

export interface ProductDetailProps {
  id?: number
  products: IProduct[]
  product: IProduct
  chapters: IChapter[]
  rates: IRate[]
  user: IUser | string
}
export interface ITextStyle {
  fontFamily?: string
  fontWeight: number
  fontSize: number
  lineHeight: number
  letterSpacing: number
}

export interface ICrawledData {
  name: string
  description: string
  author: string
  image: string
  chapters: {
    chapterNumber: number
    chapterName: string
    content: string
  }[]
}

export interface ApiResponse<T> {
  data: T
  statusCode: number
  message: string
}
