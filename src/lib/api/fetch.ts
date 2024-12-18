'use server'

import { auth } from '@/auth'
import { _handleResponse, buildQueryString } from '@/lib/utils'
import { IFilter } from '@/types'

const getToken = async () => {
  const session = await auth()
  return session?.accessToken
}

export async function _fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const token = await getToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...options.headers,
  }
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`

  return fetch(baseUrl.replace(/\/\//g, '/'), { ...options, headers })
}

export async function uploadFile(endpoint: string, body: BodyInit): Promise<Response> {
  const token = await getToken()

  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`

  return fetch(baseUrl.replace(/\/\//g, '/'), {
    method: 'POST',
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function get<T>(endpoint: string, query: IFilter = {}, options?: RequestInit): Promise<T> {
  const queryString = buildQueryString(query)
  const response = await _fetchWithAuth(`${endpoint}?${queryString}`, options)
  return _handleResponse<T>(response)
}

export async function post<T>(endpoint: string, body: T, options: RequestInit = {}): Promise<T> {
  const response = await _fetchWithAuth(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  })

  return _handleResponse<T>(response)
}

export async function patch<T>(endpoint: string, body: T, options: RequestInit = {}): Promise<T> {
  const response = await _fetchWithAuth(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(body),
    ...options,
  })

  return _handleResponse<T>(response)
}

export async function put<T>(endpoint: string, body: T, options: RequestInit = {}): Promise<T> {
  const response = await _fetchWithAuth(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...options,
  })

  return _handleResponse<T>(response)
}

export async function del(endpoint: string): Promise<void> {
  const response = await _fetchWithAuth(endpoint, { method: 'DELETE' })
  return _handleResponse<undefined>(response)
}
