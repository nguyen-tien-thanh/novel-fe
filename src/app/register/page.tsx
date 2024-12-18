'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Divider, Form, Input, KeyIcon, MailIcon } from '@/components'
import { useSession } from 'next-auth/react'
import { IRegister } from '@/types'
import Link from 'next/link'
import { toast } from 'react-toastify'

const Register = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [checked, setChecked] = useState(false)

  const handleSubmit = async (event: IRegister) => {
    const { firstName, lastName, email, password } = event

    if (checked === false) return toast.error('Vui lòng chấp nhận các điều khoản và điều kiện')

    return fetch('api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name: lastName.trim() + ' ' + firstName.trim(), email, password }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) throw new Error(json.message)
        return router.push('/login')
      })
      .catch(err => toast.error(err.message))
  }

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setChecked(isChecked)
  }

  if (session) return router.push('/')

  return (
    <section className="bg-base-200 flex items-center justify-center min-h-[calc(100dvh-68px-52px)]">
      <div className="card min-w-80 lg:w-[480px] bg-base-100 shadow-xl">
        <div className="card-body p-6">
          <h2 className="card-title text-2xl font-bold mb-3 justify-center">Đăng kí</h2>
          <Form onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tên</span>
                </label>
                <Input
                  name="lastName"
                  validation={{ required: 'Vui lòng nhập tên' }}
                  placeholder="John"
                  autoComplete="given-name"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Họ</span>
                </label>
                <Input
                  name="firstName"
                  validation={{ required: 'Vui lòng nhập họ' }}
                  placeholder="Doe"
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Tài khoản</span>
              </label>
              <Input
                placeholder="johndoe@example.com"
                name="email"
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
            </div>

            <div className="form-control flex flex-row items-center gap-1 mt-4">
              <input type="checkbox" className="checkbox" onChange={handleClick} />
              <label className="cursor-pointer label">
                <span className="label-text">
                  Tôi đồng ý với các{' '}
                  <Link href="#" className="link link-primary">
                    điều khoản và chính sách
                  </Link>
                </span>
              </label>
            </div>

            <div className="form-control mt-6">
              <Button className="btn-md btn-primary">Đăng kí</Button>
            </div>
          </Form>

          <Divider className="opacity-50">HOẶC</Divider>

          <div className="text-center">
            <p>Bạn đã có tài khoản?</p>
            <Link href="/login" className="link link-primary">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
