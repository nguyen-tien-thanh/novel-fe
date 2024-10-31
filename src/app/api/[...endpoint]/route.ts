import { get, patch, post } from '@/lib'
import { NextRequest, NextResponse } from 'next/server'

interface IParams {
  params: { endpoint: string[] }
}

export async function GET(req: NextRequest, { params }: IParams) {
  const endpoint = params.endpoint.join('/')

  const resp = await get(endpoint)

  return NextResponse.json(resp)
}

export async function POST(req: NextRequest, { params }: IParams) {
  const endpoint = params.endpoint.join('/')

  const body = await req.json()

  const resp = await post(endpoint, body)

  return NextResponse.json(resp)
}

export async function PATCH(req: NextRequest, { params }: IParams) {
  const endpoint = params.endpoint.join('/')

  const body = await req.json()

  const resp = await patch(endpoint, body)

  return NextResponse.json(resp)
}

export async function DELETE(req: NextRequest, { params }: IParams) {
  const endpoint = params.endpoint.join('/')

  const resp = await get(endpoint)

  return NextResponse.json(resp)
}
