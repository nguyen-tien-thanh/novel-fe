'use client'

import Image from 'next/image'
import { Button, HamburgerIcon, HeartIcon, ProfileButton, ThemeModeButton, Tooltip } from '@/components'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const pages = [
  { name: 'Danh sách', href: '/' },
  { name: 'Thể loại', href: '/' },
  { name: 'Phân loại', href: '/' },
  {
    name: 'Quản lý',
    href: '/admin',
    children: [
      { name: 'Quản lý Truyện', href: '/admin/product', role: 'ADMIN' },
      { name: 'Quản lý Danh mục', href: '/admin/category', role: 'ADMIN' },
      { name: 'Quản lý Chương', href: '/admin/chapter', role: 'ADMIN' },
    ],
  },
]

export const Header = () => {
  const { data } = useSession()
  const user = data?.user

  return (
    <header className="navbar bg-base-100 h-[68px]">
      <nav className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="Button" className="btn btn-ghost lg:hidden">
            <HamburgerIcon />
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {pages.map((page, i) => (
              <li key={i}>
                <Link href={page.href}>{page.name}</Link>
                <ul className="p-2">
                  {page.children &&
                    page.children.map((child, i) => (
                      <li key={i}>
                        <Link href={child.href}>{child.name}</Link>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" href="/">
          <Image
            className="hidden md:block h-10 sm:h-12 w-auto cursor-pointer"
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
                <Link href={page.href}>{page.name}</Link>
              ) : (
                <details>
                  <summary>{page.name}</summary>
                  <ul className="p-2">
                    {page.children.map((child, i) => (
                      <li key={i}>
                        <Link href={child.href} className="min-w-[150px]">
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
              <Link href="/register" className="hidden md:inline-flex">
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
