import { FC } from 'react'
import { Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react'
import { IProduct } from '@/types'
import { Box, Skeleton } from '@mui/material'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import './swiper.css'
import Link from 'next/link'
import { Book } from '..'

export interface ISwiperProps {
  items: IProduct[]
  loading?: boolean
  slidesPerView?: number
}

export const Swiper: FC<ISwiperProps> = ({ items, loading, slidesPerView = 5 }) => {
  return (
    <SwiperReact
      modules={[Autoplay, Pagination, Scrollbar, A11y]}
      slidesPerView={2}
      speed={1000}
      breakpoints={{
        600: {
          slidesPerView: 2,
        },
        900: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: slidesPerView,
        },
      }}
      spaceBetween={10}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
    >
      {!items || loading
        ? Array.from({ length: slidesPerView }).map((_, i) => (
            <SwiperSlide key={i}>
              <Box
                sx={{
                  height: {
                    xs: 180,
                    md: 270,
                    xl: 360,
                  },
                }}
              >
                <Skeleton variant="rounded" width="100%" height="100%" />
              </Box>
            </SwiperSlide>
          ))
        : items.map((item: IProduct) => (
            <SwiperSlide key={item.id}>
              <Link href={`/product/${item.id}`} className="relative group overflow-hidden">
                <Box
                  sx={{
                    height: {
                      xs: 180,
                      md: 270,
                      xl: 360,
                    },
                  }}
                >
                  <Book.Cover product={item} />
                </Box>
              </Link>
            </SwiperSlide>
          ))}
    </SwiperReact>
  )
}
