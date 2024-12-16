import { FC } from 'react'
import { TEntity } from '@/types'
import { cn } from '@/lib'

export interface IRowProps<T extends TEntity> {
  name: string
  colName?: string
  render?: (value: T[keyof T], row: T) => React.ReactNode | React.ReactElement
  rowData?: T
  className?: string
}

export const Row: FC<IRowProps<TEntity>> = ({ name, colName, render, rowData, className, ...props }) => {
  if (!rowData || !name || !rowData[name]) return <td className={className} {...props}></td>

  const cellContent = render ? render(rowData[name], rowData) : rowData[name]

  return (
    <td className={cn('whitespace-nowrap lg:whitespace-normal', className)} {...props}>
      {cellContent}
    </td>
  )
}
