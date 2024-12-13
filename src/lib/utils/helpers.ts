import { twMerge } from 'tailwind-merge'

export const cn = twMerge

export const stringAvatar = (name: string) => {
  const _stringToColor = (string: string) => {
    let hash = 0
    let i

    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }

    return color
  }

  return {
    style: { backgroundColor: _stringToColor(name) },
    className: 'flex justify-center items-center size-10',
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }
}

export const isEmpty = (value: string | number | Array<unknown> | object | null | undefined): boolean => {
  if (value === undefined || value === null) {
    return true
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }

  if (typeof value === 'number') {
    return value === 0
  }

  return false
}

export const sanitizeFileName = (fileName: string): string => {
  return fileName.replace(/[^a-z0-9]/gi, '_').replace(/_{2,}/g, '_')
}

export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return keys.reduce(
    (result, key) => {
      if (key in obj) {
        result[key] = obj[key]
      }
      return result
    },
    {} as Pick<T, K>,
  )
}
