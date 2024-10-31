import { post } from '@/lib'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json()

  return await post('auth/register', {
    name,
    email,
    password,
  })
    .then(resp => NextResponse.json(resp, { status: 200 }))
    .catch(err => NextResponse.json(err, { status: err.statusCode }))
}
