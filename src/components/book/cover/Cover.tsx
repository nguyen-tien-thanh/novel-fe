import { ComponentType, createElement, FC, ReactNode } from 'react'
import { IProduct } from '@/types'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib'
import Image from 'next/image'
import './cover.css'

export type TCoverShowOptions = 'overlay'

export interface ICoverProps {
  product: IProduct
  href?: string
  height?: number
  width?: number
  component?: ComponentType<unknown> | ReactNode
  show?: TCoverShowOptions[]
}

/**
 * `Width` should be equal 2/3 `Height`
 * @example
 * - 240 x 360
 * - 180 x 240
 * - 120 x 180
 */
export const Cover: FC<ICoverProps> = ({ product, href, height = 360, width = 240, component, show = ['overlay'] }) => {
  const router = useRouter()
  const { authorName, image, name, createdAt } = product

  return (
    <div
      className={cn('book-cover transition-all hover:scale-110 duration-500', href && 'cursor-pointer')}
      onClick={() => {
        if (href) router.push(href)
      }}
    >
      <div className="book-container">
        <div className="book" style={{ height, width }}>
          <div className="front">
            <div className="cover" style={{ height, width }}>
              {component && (typeof component === 'function' ? createElement(component) : component)}
              {image && typeof image === 'string' && (
                <Image className="image" height={height} width={width} alt={name} src={image} />
              )}
              {show.includes('overlay') && <p className="book-name truncate">{name}</p>}
            </div>
          </div>
          <div className="left-side" style={{ height }}>
            {image && typeof image === 'string' && <Image className="object-cover" fill alt={name} src={image} />}
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
