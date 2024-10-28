import { auth } from '@/auth'
import { NextResponse, NextRequest } from 'next/server'
// import { UserRole } from './types'

export default auth((req: NextRequest) => {
  // const user = get(req, 'auth.user.user') as UserRole | undefined
  const user = { role: '' }
  console.log('user======>', user)
  if (!user) {
    if (req.nextUrl.pathname !== '/error') {
      return NextResponse.redirect(new URL('/error', req.url))
    }
  }

  const hasPermission = user && (user.role === 'ADMIN' || user.role === 'MANAGER')

  if (!hasPermission) {
    if (req.nextUrl.pathname !== '/error') {
      return NextResponse.redirect(new URL('/error', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  // matcher: ['/categories-management/:path*', '/products-management/:path*', '/chapters-management/:path*'],
  unstable_allowDynamic: ['**/node_modules/_root.js'],
  matcher: ['/admin((?!api|error|_next/static|_next/image|favicon.ico).*)'],
}
