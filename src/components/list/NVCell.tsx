import React from 'react'
import { TableCell } from '@mui/material'

interface CustomTableCellProps {
  name: string
  headerName: string
  render?: (value: any, row: any) => React.ReactNode
  rowData?: any // Pass the whole row data for custom rendering if needed
}

export const NVCell: React.FC<CustomTableCellProps> = ({ name, headerName, render, rowData }) => {
  const cellContent = render ? render(rowData[name], rowData) : rowData[name]
  return <TableCell>{cellContent}</TableCell>
}
