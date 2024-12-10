import React from 'react'
import Link from 'next/link'
import { Button } from '@/components'

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100dvh-68px-52px)]">
      <h1 className="text-5xl">403</h1>
      <h6 className="text-center">Bạn không có quyền truy cập vào trang này.</h6>
      <Link href="/" className="mt-10">
        <Button className="btn-primary">Quay lại trang chủ</Button>
      </Link>
    </div>
  )
}

export default NotFound
