import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { ROLE } from './types'

export default auth(req => {
  // const { nextUrl, auth } = req

  // const user = auth?.user
  // const isAdminPage = nextUrl?.pathname.startsWith('/admin')

  // if (isAdminPage && !user?.role.includes(ROLE.ADMIN)) {
  //   return Response.redirect(new URL('/error', nextUrl))
  // }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*'],
}
