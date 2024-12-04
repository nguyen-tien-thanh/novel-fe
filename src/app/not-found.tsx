import React from 'react'
import Link from 'next/link'
import { Button } from '@/components'

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center flex-1">
      <h1 className="text-5xl">404</h1>
      <h6 className="text-3xl text-center">Trang bạn đang tìm kiếm không tồn tại.</h6>
      <Link href="/">
        <Button className="mt-3 mb-2 btn-primary">Quay lại trang chủ</Button>
      </Link>
    </div>
  )
}

export default NotFound
