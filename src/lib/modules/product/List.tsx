'use client'

import React, { useState } from 'react'
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
import AddIcon from '@mui/icons-material/Add'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import { formatDatetime } from '@/lib'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export const List = ({ initialProducts, deleteProduct }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const router = useRouter()

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const deleteRow = async (id: number) => {
    const result = await deleteProduct(id)
    if (result?.statusCode) {
      toast.error(result?.message)
    } else {
      router.push('/admin/product')
      toast.success('Xóa thành công truyện')
    }
  }

  return (
    <div style={{ alignSelf: 'center' }}>
      <div className="w-full lg:max-w-[1200px] lg:px-6 flex flex-col justify-center">
        <TableContainer sx={{ boxShadow: 'none' }} component={Paper}>
          <div className="flex justify-between">
            <Typography variant="h6">Quản lí truyện</Typography>
            <Button
              color="primary"
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => router.push('/admin/product/create')}
            >
              Tạo mới
            </Button>
          </div>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className="[&>*]:font-bold">
                <TableCell>Tên truyện</TableCell>
                <TableCell>Tác giả</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Lượt xem</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Công khai</TableCell>
                <TableCell>Ảnh</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? initialProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : initialProducts
              ).map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row?.name}
                  </TableCell>
                  <TableCell>{row?.authorName}</TableCell>
                  <TableCell>
                    {row.description && row?.description.length > 50
                      ? `${row?.description.slice(0, 50)} ...`
                      : row?.description}
                  </TableCell>
                  <TableCell>{formatDatetime(row?.createdAt)}</TableCell>
                  <TableCell>{row?.viewCount}</TableCell>
                  <TableCell>{row?.state}</TableCell>
                  <TableCell>
                    <img src={row.image} height={100} width={300} alt="" />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        deleteRow(row.id)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Link
                      href={{
                        pathname: `/admin/product/${row.id}`,
                      }}
                    >
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  count={initialProducts.length}
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
    </div>
  )
}
