export function _handleParams(url: string, params: Record<string, string> = {}) {
  const queryParams: Record<string, string> = { ...params }
  const queryString = new URLSearchParams(queryParams).toString()

  return (queryString ? `${url}?${queryString}` : url).replace(/\/\//g, '/')
}

export async function _handleResponse<T>(res: Response): Promise<T | undefined> {
  const json = res.status !== 204 && res.status !== 304 ? await res.json() : undefined
  if (res.ok) return json as Promise<T>
  if (res.status >= 400) return json
  return undefined
}
