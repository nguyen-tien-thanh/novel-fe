export enum PRODUCT_STATUS {
  PROGRESS = 'PROGRESS',
  DONE = 'DONE',
}

export enum ROLE {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
}

export enum STATE {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type TEntity = ICategory | IChapter | IProduct | IUser

export interface IProduct {
  id: number
  createdBy?: number
  authorName: string
  name: string
  source?: string
  status?: PRODUCT_STATUS
  image?: string | File
  viewCount?: number
  description?: string
  createdAt: string
  updatedAt?: string
  averageRate?: number
  chapterCount?: number
  state?: STATE
  categories?: ICategory[]
  rates?: IRate[]
  chapters?: IChapter[]
}

export interface ICategory {
  id: number
  name?: string
  description?: string
  state?: STATE
  products?: IProduct[]
}

export interface IChapter {
  id: number
  chapterName: string
  content: string
  chapterNumber: number
  price: number
  createdAt: string
  updatedAt: string
  users: number[]
  state?: STATE
  productId: number | IProduct
  product?: IProduct
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

export interface List<T> {
  data: T[]
  count: number
}

export interface IRegister {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface IFilter {
  skip?: number
  take?: number
  where?: Record<string, unknown>
  orderBy?: Record<string, unknown>
  include?: Record<string, unknown>
  select?: Record<string, unknown>
  [x: string]: any
}

export interface IList {
  id: number
  classification: 'READING' | 'FAVORITE'
  createdBy: number
  updatedAt: string
  chapters?: IChapter[]
  products?: IProduct[]
}
