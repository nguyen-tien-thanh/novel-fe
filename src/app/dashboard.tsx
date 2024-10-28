'use client'

import {
  Box,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import React from 'react'
import { formatTimeAgo } from '@/lib/utils'
import Grid from '@mui/material/Grid2'
import Link from 'next/link'
import { CardPaper, Container, ProductGrid } from '@/components'
import { Swiper } from '@/components/swiper'
import { ICategory, IProduct, PRODUCT_STATUS } from '@/types'

export interface DashboardProps {
  products: IProduct[]
  categories: ICategory[]
}

export default function Dashboard({ products, categories }: DashboardProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (products.length > 0 && categories.length > 0) {
      setLoading(false)
    }
  }, [products, categories])

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CardPaper title="🔥 Hot">
            <Box sx={{ p: 2 }}>
              <Swiper items={products.slice(0, 10)} loading={loading} />
            </Box>
          </CardPaper>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <CardPaper title="Tin tức" sx={{ height: '100%' }}>
            <Box
              sx={{
                overflowY: 'auto',
                height: {
                  xs: 180,
                  md: 620,
                  lg: 340,
                  xl: 430,
                },
                p: 2,
              }}
            >
              {loading ? (
                <Stack spacing={2}>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Stack key={i} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Skeleton variant="text" width="50px" height="20px" />
                      <Skeleton variant="text" width="100%" height="20px" />
                    </Stack>
                  ))}
                </Stack>
              ) : (
                <Stack spacing={2}>
                  <Stack role="button" direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'20/10'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tuyển dụng Dịch giả/Editor </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                </Stack>
              )}
            </Box>
          </CardPaper>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <CardPaper title="Thể loại">
            <Box sx={{ overflowY: 'auto', p: 2 }}>
              <Grid container spacing={1} sx={{ height: { xs: 300, sm: 620 } }}>
                {!categories || loading
                  ? Array.from({ length: 20 }).map((_, i) => (
                      <Grid size={6} key={i}>
                        <Skeleton variant="text" />
                      </Grid>
                    ))
                  : categories.map(cate => {
                      return (
                        <Grid size={{ xs: 6, sm: 4, lg: 6 }} key={cate.id}>
                          <Link
                            className="hover:underline underline-offset-4"
                            href={`/category/${cate.id}`}
                            onClick={() => router.push(`/category/${cate.id}`)}
                          >
                            <Typography color="textSecondary">{cate.name}</Typography>
                          </Link>
                        </Grid>
                      )
                    })}
              </Grid>
            </Box>
          </CardPaper>
        </Grid>

        <Grid size={{ xs: 12, lg: 9 }}>
          <CardPaper title="Chương mới">
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer component={Paper} sx={{ height: 620 + 16 + 16 }}>
                <Table aria-label="sticky table" stickyHeader>
                  <TableHead>
                    <TableRow className="[&>*]:font-bold">
                      <TableCell>Tên</TableCell>
                      <TableCell>Chương</TableCell>
                      <TableCell>Tác giả</TableCell>
                      <TableCell>Ngày đăng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!products || loading
                      ? Array.from({ length: 15 }).map((_, i) => (
                          <TableRow key={i}>
                            {Array.from({ length: 4 }).map((_, i) => (
                              <TableCell key={i} component="th" scope="row">
                                <Skeleton variant="rounded" width="100%" />
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      : products
                          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                          .map((prod, i) => (
                            <TableRow hover key={i} onClick={() => router.push(`/product/${prod.id}`)} role="button">
                              <TableCell>{prod.name}</TableCell>
                              <TableCell>
                                <Chip label={prod.chapterCount} color="info" />
                              </TableCell>
                              <TableCell>{prod.authorName}</TableCell>
                              <TableCell>{formatTimeAgo(prod.updatedAt)}</TableCell>
                            </TableRow>
                          ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </CardPaper>
        </Grid>

        <Grid size={12}>
          <CardPaper title="Truyện đã hoàn thành">
            <Box sx={{ p: 2 }}>
              <ProductGrid
                products={products.filter(d => d.status === PRODUCT_STATUS.DONE)}
                loading={loading}
                limit={6}
                showInfo
              />
            </Box>
          </CardPaper>
        </Grid>
      </Grid>
    </Container>
  )
}
