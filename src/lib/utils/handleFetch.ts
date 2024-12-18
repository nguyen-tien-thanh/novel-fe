export function _handleParams(url: string, params: Record<string, string> = {}) {
  const queryParams: Record<string, string> = { ...params }
  const queryString = new URLSearchParams(queryParams).toString()

  return (queryString ? `${url}?${queryString}` : url).replace(/\/\//g, '/')
}

export async function _handleResponse<T>(res: Response) {
  if (!res.ok) console.error(res)

  let json = {}
  try {
    json = await res.json()
  } catch (error) {
    console.error(error)
  }

  return json as Promise<T>
}
