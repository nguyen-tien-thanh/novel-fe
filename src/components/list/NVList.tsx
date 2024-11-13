'use client'
import React, { ReactElement, ReactNode, useState } from 'react'
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import EditIcon from '@mui/icons-material/Edit'
import Link from 'next/link'
import { ICategory, IChapter, IProduct } from '@/types'

interface NVListColumnProps<T extends IProduct | ICategory | IChapter> {
  headerName: string
  name: keyof T
  render?: (value: T[keyof T], row: T) => ReactNode
}

interface NVListProps {
  data: IProduct[] | ICategory[] | IChapter[]
  title: string
  onAdd: () => void
  children: ReactElement<NVListColumnProps<IProduct | ICategory | IChapter>>[]
  onDel?: (id: number) => void
  isEdit?: boolean
  resource: string
}

export const NVList = ({ data, title, onAdd, children, onDel, isEdit, resource }: NVListProps) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div style={{ alignSelf: 'center' }}>
      <main className="relative mt-28 px-[30px] flex flex-col items-center justify-center">
        <div className="w-full lg:max-w-[1200px] lg:px-6 flex flex-col justify-center">
          <TableContainer sx={{ boxShadow: 'none' }} component={Paper}>
            <div className="flex justify-between">
              <Typography variant="h6">{title}</Typography>
              {onAdd && (
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component="a"
                  startIcon={<AddIcon />}
                  onClick={onAdd}
                >
                  Tạo mới
                </Button>
              )}
            </div>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow className="[&>*]:font-bold">
                  {React.Children.map(children, child => (
                    <TableCell>{child.props.headerName}</TableCell>
                  ))}
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map(
                  (row, index) => (
                    <TableRow key={index}>
                      {React.Children.map(children, child => (
                        <TableCell>
                          {child.props.render ? child.props.render(row[child.props.name], row) : row[child.props.name]}
                        </TableCell>
                      ))}

                      <TableCell>
                        {isEdit && (
                          <Link href={{ pathname: `/admin/${resource}/${row.id}` }}>
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                          </Link>
                        )}
                        {onDel && (
                          <IconButton onClick={() => onDel(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </main>
    </div>
  )
}
