import { FC } from 'react'
import { Autoplay, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper/modules'
import { SwiperProps, Swiper as SwiperReact, SwiperSlide } from 'swiper/react'
import { IProduct } from '@/types'
import Link from 'next/link'
import { Book } from '..'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import './swiper.css'
import { ICoverProps } from '../cover'

export interface ISwiperProps extends SwiperProps {
  items: IProduct[]
  itemsProps?: Partial<ICoverProps>
  // loading?: boolean
}

export const Swiper: FC<ISwiperProps> = ({ items, slidesPerView = 2, itemsProps, ...props }) => {
  return (
    <SwiperReact
      modules={[Autoplay, Pagination, Scrollbar, A11y, Mousewheel]}
      slidesPerView={slidesPerView}
      speed={1000}
      breakpoints={{
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
        1280: {
          slidesPerView: 7,
        },
        1536: {
          slidesPerView: 8,
        },
      }}
      spaceBetween={10}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop={true}
      cssMode={true}
      mousewheel={true}
      pagination={{ clickable: true, dynamicBullets: true }}
      className="[&>.swiper-pagination>.swiper-pagination-bullet]:bg-secondary"
      {...props}
    >
      {items.map((item: IProduct) => (
        <SwiperSlide key={item.id}>
          <Link href={`/product/${item.id}`}>
            <Book.Cover product={item} width={140} height={210} {...itemsProps} />
          </Link>
        </SwiperSlide>
      ))}
    </SwiperReact>
  )
}
