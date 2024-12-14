'use client'

import { FC, useState } from 'react'
import { ImageProps } from 'next/image'
import NextImage from 'next/image'

export interface IImageProps extends ImageProps {
  fallbackSrc?: string
}

export const Image: FC<IImageProps> = props => {
  const { src, fallbackSrc = '/assets/notfound.webp', ...rest } = props
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <NextImage
      {...rest}
      src={imgSrc}
      onError={() => {
        fallbackSrc && setImgSrc(fallbackSrc)
      }}
    />
  )
}
