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
import React, { useEffect, useState } from 'react'
// import { Elements, PaymentElement } from '@stripe/react-stripe-js';
// import StripePaymentForm from '@/components/StripePaymentForm';
// import Header from '@/components/Header/Header'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { formatDatetime } from '@/lib'
import CreateForm from './create'
import { IChapter, IProduct } from '@/types'

// export default function Categories({ params }: { params: { slug: string } }) {
export default function Categories() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [openPopup, setOpenPopup] = useState(false)
  // const [rows, setRows] = useState<IChapter[]>([])
  // const [products, setProducts] = useState<IProduct[]>()

  const rows: IChapter[] = []
  const products: IProduct[] = []
  const token = ''
  const [refresh, setRefresh] = React.useState(false)

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const chapter = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapter`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     })
    //     const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     })
    //     if (chapter.ok) {
    //       const chapterData = await chapter.json()
    //       setRows(chapterData)
    //       setRefresh(false)
    //     } else {
    //       console.error('Failed to fetch products:', chapter.statusText)
    //     }
    //     if (product.ok) {
    //       const productData = await product.json()
    //       setProducts(productData)
    //       setRefresh(false)
    //     } else {
    //       console.error('Failed to fetch products:', product.statusText)
    //     }
    //   } catch (error) {
    //     console.error('Error fetching products:', error)
    //   }
    // }
    // fetchData()
  }, [refresh])

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
                onClick={() => setOpenPopup(true)}
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
                {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map(
                  (row, index) => (
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
                          onClick={async () => {
                            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapter/${row.id}`, {
                              method: 'DELETE',
                              headers: { Authorization: `Bearer ${token}` },
                            })
                            setRefresh(true)
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    count={rows.length}
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
      <CreateForm open={openPopup} handleClose={handleClosePopup} setRefresh={setRefresh} products={products} />
    </div>
  )
}
