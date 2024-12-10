'use client'

import Image from 'next/image'
import { Button, HamburgerIcon, HeartIcon, ProfileButton, ThemeModeButton, Tooltip } from '@/components'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib'

const pages = [
  { name: 'Danh sách', href: '/' },
  { name: 'Thể loại', href: '/category' },
  { name: 'Phân loại', href: '' },
  {
    name: 'Quản lý',
    href: '/admin',
    children: [
      { name: 'Truyện', href: '/admin/product', role: 'ADMIN' },
      { name: 'Danh mục', href: '/admin/category', role: 'ADMIN' },
      { name: 'Chương', href: '/admin/chapter', role: 'ADMIN' },
    ],
  },
]

export const Header = () => {
  const { data } = useSession()
  const user = data?.user
  const pathname = usePathname()

  return (
    <header className="navbar bg-base-100 h-[68px]">
      <nav className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden px-3">
            <HamburgerIcon />
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            {pages.map((page, i) => (
              <li key={i}>
                <Link href={page.href} className={cn('', pathname === page.href && 'bg-primary pointer-events-none')}>
                  {page.name}
                </Link>
                <ul className="p-2">
                  {page.children &&
                    page.children.map((child, i) => (
                      <li key={i} className={cn('', pathname === child.href && 'bg-primary pointer-events-none')}>
                        <Link href={child.href}>{child.name}</Link>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl px-0 lg:px-3" href="/">
          <Image
            className="hidden lg:block h-10 w-auto cursor-pointer"
            src={'/logo.png'}
            width={457}
            height={175}
            alt="logo"
            priority
          />
          <span className="text-xl">AiTruyen</span>
        </Link>
      </nav>
      <nav className="navbar-center hidden lg:flex lg:z-[1]">
        <ul className="menu menu-horizontal px-1">
          {pages.map((page, i) => (
            <li key={i}>
              {!page.children ? (
                <Link href={page.href} className={cn('', pathname === page.href && 'bg-primary pointer-events-none')}>
                  {page.name}
                </Link>
              ) : (
                <details>
                  <summary className={cn('font-normal', pathname.includes(page.href) && 'btn btn-primary btn-sm')}>
                    {page.name}
                  </summary>
                  <ul className="p-2">
                    {page.children.map((child, i) => (
                      <li key={i}>
                        <Link
                          href={child.href}
                          className={cn('min-w-24', pathname === child.href && 'bg-primary pointer-events-none')}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <nav className="navbar-end">
        <div className="flex items-center space-x-1">
          <div className="dropdown dropdown-end">
            <ThemeModeButton />
          </div>
          {!user ? (
            <div className="space-x-1">
              <Link href="/register" className="hidden lg:inline-flex">
                <Button className="btn-ghost">Đăng kí</Button>
              </Link>
              <Link href="/login">
                <Button className="btn-outline">Đăng nhập</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="dropdown dropdown-end">
                <Tooltip title="Yêu thích">
                  <Button className="btn-ghost btn-circle">
                    <HeartIcon />
                  </Button>
                </Tooltip>
              </div>
              <div className="dropdown dropdown-end">
                <ProfileButton />
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
