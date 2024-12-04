import { Button } from '@/components'
import Link from 'next/link'

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center flex-1">
      <h1 className="text-5xl">403</h1>
      <h6 className="text-3xl text-center">Bạn không có quyền truy cập vào trang này</h6>
      <Link href="/">
        <Button className="mt-3 mb-2 btn-primary">Quay lại trang chủ</Button>
      </Link>
    </div>
  )
}

export default Error
