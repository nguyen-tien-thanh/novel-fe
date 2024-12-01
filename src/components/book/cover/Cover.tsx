import { FC } from 'react'
import { IProduct } from '@/types'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib'
import Image from 'next/image'
import './cover.css'

interface ICoverProps {
  product: IProduct
  href?: string
  height?: number
  width?: number
}

export const Cover: FC<ICoverProps> = ({ product, href, height = 320, width = 240 }) => {
  const router = useRouter()
  const { authorName, image, name, createdAt } = product

  return (
    <div
      className={cn('book-cover', href && 'cursor-pointer')}
      onClick={() => {
        if (href) router.push(href)
      }}
    >
      <div className="book-container">
        <div className="book" style={{ height, width }}>
          <div className="front">
            <div className="cover" style={{ height, width }}>
              {image && <Image className="image" height={height} width={width} alt={name} src={image} />}
              <p className="book-name">{name}</p>
            </div>
          </div>
          <div className="left-side" style={{ height }}>
            {image && <Image className="object-cover" fill alt={name} src={image} />}
            <h2 style={{ width: height }} className="backdrop-blur-md">
              <span>{authorName}</span>
              <span>{new Date(createdAt).getFullYear()}</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
