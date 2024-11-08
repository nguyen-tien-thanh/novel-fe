'use client'
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
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { formatDatetime } from '@/lib'
import Link from 'next/link'
import EditIcon from '@mui/icons-material/Edit'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function ChapterList({ initialChapters, deleteChapter, products }) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const router = useRouter()

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const deleteChap = async (id: number) => {
    const result = await deleteChapter(id)
    if (result?.statusCode) {
      toast.error(result?.message)
    } else {
      router.push('/categories-management')
      toast.success('Xóa thành công danh mục')
    }
  }
  return (
    <div style={{ alignSelf: 'center' }}>
      <main className="relative mt-28 px-[30px] flex flex-col items-center justify-center">
        <div className="w-full lg:max-w-[1200px] lg:px-6 flex flex-col justify-center">
          <TableContainer sx={{ boxShadow: 'none' }} component={Paper}>
            <div className="flex justify-between">
              <Typography variant="h6">Chapters Management</Typography>
              <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                startIcon={<AddIcon />}
                onClick={() => router.push('/chapters-management/create')}
              >
                Create
              </Button>
            </div>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow className="[&>*]:font-bold">
                  <TableCell>Product Name</TableCell>
                  <TableCell>Chapter Name</TableCell>
                  <TableCell>Content</TableCell>
                  <TableCell>Chapter Number</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? initialChapters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : initialChapters
                ).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {products?.find(v => v?.id === row?.productId)?.name}
                    </TableCell>
                    <TableCell>{row?.chapterName}</TableCell>
                    <TableCell>{row?.content?.slice(0, 50)}...</TableCell>
                    <TableCell>{row?.chapterNumber}</TableCell>
                    <TableCell>{row?.price}</TableCell>
                    <TableCell>{formatDatetime(row?.createdAt)}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          deleteChap(row.id)
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Link
                        href={{
                          pathname: `/chapters-management/${row.id}`,
                          // query: row,
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
                    count={initialChapters.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      },
                    }}
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
