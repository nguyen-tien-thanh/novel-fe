'use client'

import { Button, Divider, Form, Input, KeyIcon, MailIcon } from '@/components'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LoginRequest } from '@/types'
import Link from 'next/link'
import { toast } from 'react-toastify'

const Login = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async (data: LoginRequest) => {
    const { email, password } = data
    const user = await fetch('api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    if (user.status !== 200) {
      toast('Sai tài khoản hoặc mật khẩu', { type: 'error' })
    } else {
      window.location.href = '/'
    }
  }

  if (session) return router.push('/')

  return (
    <section className="bg-base-200 flex items-center justify-center min-h-[calc(100dvh-68px-52px)]">
      <div className="card min-w-80 md:w-[440px] bg-base-100 shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h2 className="card-title text-2xl font-bold mb-3 sm:mb-6 justify-center">Đăng nhập</h2>
          <Form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tài khoản</span>
              </label>
              <Input
                placeholder="johndoe@example.com"
                name="username"
                icon={<MailIcon className="opacity-70" />}
                iconPosition="start"
                validation={{ required: 'Vui lòng nhập tài khoản' }}
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Mật khẩu</span>
              </label>
              <Input
                placeholder="********"
                name="password"
                icon={<KeyIcon className="opacity-70" />}
                type="password"
                iconPosition="start"
                validation={{ required: 'Vui lòng nhập mật khẩu' }}
              />

              <label className="label">
                <Link href="#" className="label-text-alt link link-hover">
                  Quên mật khâủ
                </Link>
              </label>
            </div>

            <div className="form-control mt-6">
              <Button className="btn-primary">Đăng nhập</Button>
            </div>
          </Form>

          <Divider className="opacity-50">HOẶC</Divider>

          <div className="text-center">
            <p>Bạn chưa có tài khoản?</p>
            <Link href="/register" className="link link-primary">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
