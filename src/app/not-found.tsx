import React from 'react'
import Link from 'next/link'
import { Button } from '@/components'

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100dvh-68px-52px)]">
      <h1 className="text-5xl">404</h1>
      <h6 className="text-center">Trang bạn đang tìm kiếm không tồn tại.</h6>
      <Link href="/" className="mt-5 lg:mt-10">
        <Button className="btn-primary">Quay lại trang chủ</Button>
      </Link>
    </div>
  )
}

export default NotFound
