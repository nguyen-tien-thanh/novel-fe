'use client'

import React, { useState } from 'react'
import {
  Button,
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
// import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import CreateForm from './create'
import { formatDatetime } from '@/lib'
import { IProduct } from '@/types'

interface ProductsProps {
  initialProducts: IProduct[]
}

export default function ProductList({ initialProducts }: ProductsProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openPopup, setOpenPopup] = useState(false)
  //   const { data: session } = useSession()
  //   const token = session?.accessToken

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleClosePopup = () => {
    setOpenPopup(false)
  }

  return (
    <div style={{ alignSelf: 'center' }}>
      <div className="w-full lg:max-w-[1200px] lg:px-6 flex flex-col justify-center">
        <TableContainer sx={{ boxShadow: 'none' }} component={Paper}>
          <div className="flex justify-between">
            <Typography variant="h6">Stories Management</Typography>
            <Button
              color="primary"
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setOpenPopup(true)}
            >
              Create
            </Button>
          </div>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className="[&>*]:font-bold">
                <TableCell>Name</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Public Date</TableCell>
                <TableCell>Views number</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Action</TableCell>
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
                  <TableCell>
                    <img src={row.image} height={100} width={300} alt="" />
                  </TableCell>
                  <TableCell>
                    {/* <IconButton
                        onClick={async () => {
                          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${row.id}`, {
                            method: 'DELETE',
                            headers: { Authorization: `Bearer ${token}` },
                          })
                          setRefresh(true)
                        }}
                      >
                        <DeleteIcon />
                      </IconButton> */}
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
      <CreateForm open={openPopup} handleClose={handleClosePopup} setRefresh={() => {}} />
    </div>
  )
}
