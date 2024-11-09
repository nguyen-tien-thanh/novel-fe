'use client'
import {
  Box,
  Chip,
  Divider,
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
import { useRouter } from 'next/navigation'
import Rating from '@mui/material/Rating'
import { IChapter, IProduct, IRate, PRODUCT_STATUS } from '@/types'
import { formatCurrency, formatDatetime } from '@/lib/utils'
import { Container } from '@/components'
import { useSession } from 'next-auth/react'
import { Book } from '@/components/book'

export interface ProductDetailProps {
  id: number
  product: IProduct
  products?: IProduct[]
  chapters?: IChapter[]
  rates?: IRate[]
}

export default function ProductDetail({ id, products, product, chapters, rates }: ProductDetailProps) {
  const router = useRouter()
  const session = useSession()
  const user = session?.data?.user

  const [flag, setFlag] = useState(false)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setChaptersPerPage] = React.useState(5)
  const [relatedProduct, setRelatedProduct] = useState<IProduct[]>([])

  const handleChapterClick = (chap: IChapter) => {
    return router.push(`/product/${chap.productId}/chapter/${chap.chapterNumber}`)
    // TODO: UnComment
    // if (!user) return router.push('/login')

    // if (chap.price > 0 && user && !chap.users.includes(+user.id)) {
    //   // setChapter({ ...chap, productId: params?.id })
    //   // setOpenPopup(true)}
    // } else {
    //   router.push(`/products/${params?.id}/chapters/${chap.chapterNumber}`)
    // }
  }
  useEffect(() => {
    if (products) {
      if (id) {
        setRelatedProduct(products.filter(prod => prod.id !== id))
      }
    }
  }, [products, id])

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setChaptersPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (!product) return null

  const handleRating = (rating: number | null) => {
    // TODO: Remove rate api
    if (!user) return router.push('/login')
    if (!rating || !rates) return

    const existingRate = rates.find(rate => rate.createdBy === +user.id)

    setFlag(!flag)

    if (!existingRate) {
      return fetch(`/api/rate`, {
        method: 'POST',
        body: JSON.stringify({ productId: product.id, rating }),
      })
    } else {
      if (existingRate.rating === rating) return
      return fetch(`/api/rate/${existingRate.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ rating }),
      })
    }
  }

  return (
    <Container>
      <Box component={'section'} className="grid lg:grid-cols-7 gap-8 place-items-center lg:place-items-start">
        <Box className="relative h-full w-full lg:col-span-2">
          <Book.Cover product={product} />
        </Box>
        <Box className="lg:col-span-5">
          <Box className="lg:px-5 pb-0 lg:pt-5 rounded-md">
            <Box className="flex flex-col justify-center items-center">
              <Typography variant="h4" className="font-bold text-center">
                {product.name}
              </Typography>
              <Box className="flex flex-col items-center">
                <Rating
                  name="simple-controlled"
                  value={product.averageRate || 0}
                  size="small"
                  onChange={(e, val) => handleRating(val)}
                />

                {rates && (
                  <Typography variant="body2" color="textSecondary">
                    ({rates.length} lượt đánh giá)
                  </Typography>
                )}
              </Box>
            </Box>

            <Box className="mt-6 flex flex-col gap-2">
              <Box className="flex">
                <Typography width={100} color="textSecondary">
                  Author
                </Typography>
                <Typography>{product.authorName}</Typography>
              </Box>
              <Box className="flex items-center">
                <Typography width={100} color="textSecondary">
                  Status
                </Typography>
                <Chip
                  label={product.status}
                  color={product.status === PRODUCT_STATUS.DONE ? 'primary' : 'warning'}
                  size="small"
                />
              </Box>
              <Box className="flex">
                <Typography width={100} color="textSecondary">
                  View
                </Typography>
                <Typography>{product.viewCount}</Typography>
              </Box>
              <Box className="flex">
                <Typography width={100} color="textSecondary">
                  Published
                </Typography>
                <Typography>{product.createdAt && formatDatetime(product.createdAt)}</Typography>
              </Box>
            </Box>
            {product.categories && (
              <Box className="my-4 flex flex-wrap gap-2">
                {product.categories.map(cate => (
                  <Chip key={cate.id} label={cate.name} />
                ))}
              </Box>
            )}
            <Typography variant="body1" color="textSecondary" className="mt-6">
              {product.description}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider className="w-full !my-10" />

      {chapters && (
        <Box component={'section'}>
          <TableContainer sx={{ boxShadow: 'none' }} component={Paper}>
            <Typography variant="h5" className="p-2">
              Chương ({chapters.length})
            </Typography>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow className="[&>*]:font-bold">
                  <TableCell>Tập</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Ngày đăng</TableCell>
                  {user && <TableCell>Giá</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? chapters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : chapters
                ).map(chap => (
                  <TableRow key={chap.id} role="button" hover onClick={() => handleChapterClick(chap)}>
                    <TableCell>{chap.chapterNumber}</TableCell>
                    <TableCell component="th" scope="row">
                      {chap.chapterName}
                    </TableCell>
                    <TableCell>{formatDatetime(chap.createdAt)}</TableCell>
                    {user && (
                      <TableCell
                        className={`${chap.price > 0 && user && !chap.users.includes(+user.id) ? 'text-red-600' : ''}`}
                      >
                        {chap.price > 0 ? formatCurrency(chap.price) : ''}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'Tất cả', value: -1 }]}
                    count={chapters.length}
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
                    labelRowsPerPage="Số hàng"
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      )}

      {relatedProduct && (
        <Box component={'section'} className="relative mt-20">
          <Typography variant="h5">Truyện liên quan</Typography>

          <Box sx={{ py: 2 }}>
            <Book.Swiper items={relatedProduct.slice(0, 10)} slidesPerView={5} />
          </Box>
        </Box>
      )}
      {/* <StripePaymentForm
          open={openPopup}
          handleClose={handleClosePopup}
          chapter={chapter}
        /> */}
    </Container>
  )
}
