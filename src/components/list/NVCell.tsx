import React from 'react'
import { TableCell } from '@mui/material'
import { ICategory, IChapter, IProduct } from '@/types'

interface CustomTableCellProps<T extends IProduct | ICategory | IChapter> {
  name: string
  headerName: string
  render?: (value: T[keyof T] | unknown, row: T) => React.ReactNode | React.ReactElement
  rowData?: T
}

export const NVCell: React.FC<CustomTableCellProps<IProduct | ICategory | IChapter>> = ({
  name,
  headerName,
  render,
  rowData,
}) => {
  if (!rowData || !name || !rowData[name]) return

  const cellContent = render ? render(rowData[name], rowData) : rowData[name]

  return <TableCell>{cellContent}</TableCell>
}
