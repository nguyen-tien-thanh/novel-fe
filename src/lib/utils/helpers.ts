import { twMerge } from 'tailwind-merge'

export const cn = twMerge

const _stringToColor = (string: string) => {
  let hash = 0
  let i

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }

  return color
}

export const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: _stringToColor(name),
      width: 28,
      height: 28,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }
}

export const isEmpty = (value: string | number | Array<any> | Object | null | undefined) => {
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
