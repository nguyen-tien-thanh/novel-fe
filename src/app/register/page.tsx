'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Input } from '@/components'
import { useSession } from 'next-auth/react'
import { IRegister } from '@/types'

const Register = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [checked, setChecked] = useState(false)
  const [errorText, setErrorText] = useState('')

  const handleSubmit = async (event: IRegister) => {
    const { firstName, lastName, email, password } = event

    if (checked === false) return setErrorText('Vui lòng chấp nhận các điều khoản và điều kiện')

    return fetch('api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name: lastName + ' ' + firstName, email, password }),
    })
      .then(async res => {
        const json = await res.json()
        if (!res.ok) throw new Error(json.message)

        return router.push('/login')
      })
      .catch((err: Error) => setErrorText(err.message))
  }

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setChecked(isChecked)
  }

  if (session) return router.push('/')

  return (
    <div className=" flex flex-col justify-center items-center gap-5">
      <div className="prose">
        <h1>Đăng kí</h1>
      </div>
      <Form onSubmit={handleSubmit} className="w-[500px]">
        <Input name="firstName" validation={{ required: 'Vui lòng nhập tên' }} label="Tên" placeholder="Tên" />
        <Input name="lastName" validation={{ required: 'Vui lòng nhập họ' }} label="Họ" placeholder="Họ" />
        <Input
          type="email"
          placeholder="aitruyen@gmail.com"
          name="email"
          validation={{ required: 'Vui lòng nhập email' }}
          label="Email"
        />
        <Input name="password" type="password" validation={{ required: 'Vui lòng nhập mật khẩu' }} label="Mật khẩu" />
        {typeof errorText === 'string' && <p className="text-red-500 text-xs">{errorText}</p>}
        <div className="form-control flex flex-row items-center">
          <input type="checkbox" className="checkbox " onChange={handleClick} />
          <label className="cursor-pointer label">
            <span className="label-text"> Tôi đồng ý với các điều khoản</span>
          </label>
        </div>
        <button type="submit" className="btn">
          Gửi
        </button>
      </Form>
    </div>
  )
}

export default Register
