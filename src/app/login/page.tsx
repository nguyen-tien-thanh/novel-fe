'use client'

import React, { useState } from 'react'
import { Form, Input } from '@/components'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LoginRequest } from '@/types'

const Login = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [errorText, setErrorText] = useState('')

  const handleSubmit = async (data: LoginRequest) => {
    const { email, password } = data
    const user = await fetch('api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    if (user.status !== 200) {
      setErrorText('Sai tài khoản hoặc Mật khẩu')
    } else {
      window.location.href = '/'
    }
  }

  if (session) return router.push('/')

  return (
    <div className=" flex flex-col justify-center items-center gap-5">
      <div className="prose">
        <h1>Đăng nhập</h1>
      </div>
      <Form onSubmit={handleSubmit} className="w-[500px]">
        <Input name="username" validation={{ required: 'Vui lòng nhập tài khoản' }} label="Tài khoản" />
        <Input name="password" type="password" validation={{ required: 'Vui lòng nhập mật khẩu' }} label="Mật khẩu" />
        {errorText && typeof errorText === 'string' && <p className="text-red-500 text-xs">{errorText}</p>}
        <button type="submit" className="btn">
          Gửi
        </button>

        <div className="flex justify-between">
          <a href="#" className="link link-info">
            Quên mật khâủ
          </a>

          <a href="/register" className="link link-info">
            Bạn chưa có tài khoản? Đăng ký
          </a>
        </div>
      </Form>
    </div>
  )
}

export default Login
