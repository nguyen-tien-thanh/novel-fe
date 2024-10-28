'use server'

import { auth } from '@/auth'
import { _handleResponse } from '@/lib/utils'

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

export async function get<T>(endpoint: string): Promise<T | undefined> {
  const response = await _fetchWithAuth(endpoint)
  return _handleResponse<T | undefined>(response)
}

export async function post<T>(endpoint: string, body: T): Promise<T | undefined> {
  const response = await _fetchWithAuth(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  })

  return _handleResponse<T | undefined>(response)
}

export async function patch<T>(endpoint: string, body: T): Promise<T | undefined> {
  const response = await _fetchWithAuth(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })

  return _handleResponse<T | undefined>(response)
}

export async function del(endpoint: string): Promise<void> {
  const response = await _fetchWithAuth(endpoint, {
    method: 'DELETE',
  })
  return _handleResponse<undefined>(response)
}
