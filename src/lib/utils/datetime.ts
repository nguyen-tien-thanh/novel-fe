import { format as fnsFormat, parse } from 'date-fns'

export const formatDatetime = (value: string, format?: string) => {
  if (!value) return

  const date = parse(value, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date())
  const formatDate = format ?? 'dd/MM/yyyy'
  const formatTime = ''
  return fnsFormat(new Date(date), `${formatDate} ${formatTime}`)
}

export const formatTimeAgo = (date: Date | string): string => {
  const now = new Date()
  const diffMs = now.getTime() - new Date(date).getTime()

  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  if (diffMinutes < 60) return `${diffMinutes} phút trước`

  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours} giờ trước`

  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 30) return `${diffDays} ngày trước`

  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths < 30) return `${diffMonths} tháng trước`

  const diffYears = Math.floor(diffMonths / 12)
  return `${diffYears} năm trước`
}
