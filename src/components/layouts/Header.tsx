'use client'

import { Image } from '@/components'
import { Button, Drawer, HamburgerIcon, HeartIcon, ProfileButton, ThemeModeButton, Tooltip } from '@/components'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib'
import { useEffect, useState } from 'react'

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
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleOpenDrawer = () => setOpenDrawer(!openDrawer)

  const hideDropdownDaisy = (e: MouseEvent, forceClose?: boolean) => {
    document.querySelectorAll<HTMLDetailsElement>('.dropdown').forEach(dropdown => {
      if (!dropdown.contains(e.target as Node) || forceClose) dropdown.open = false
    })
  }
  useEffect(() => {
    window.addEventListener('click', hideDropdownDaisy)
    return () => window.removeEventListener('click', hideDropdownDaisy)
  }, [])

  return (
    <header className="navbar bg-base-200 h-[68px]">
      <nav className="navbar-start">
        <div className="dropdown">
          <Button onClick={handleOpenDrawer} className="btn-ghost btn-circle lg:hidden mx-1">
            <HamburgerIcon />
          </Button>
          <Drawer open={openDrawer} setOpen={setOpenDrawer}>
            {pages.map((page, i) => (
              <li key={i}>
                <Link
                  href={page.href}
                  onClick={handleOpenDrawer}
                  className={cn(pathname === page.href && 'bg-primary text-primary-content pointer-events-none')}
                >
                  {page.name}
                </Link>
                <ul>
                  {page.children &&
                    page.children.map((child, i) => (
                      <li
                        key={i}
                        className={cn(pathname === child.href && 'bg-primary text-primary-content pointer-events-none')}
                        style={{ borderRadius: 'var(--rounded-btn, 0.5rem)' }}
                      >
                        <Link onClick={handleOpenDrawer} href={child.href}>
                          {child.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </Drawer>
        </div>
        <Link className="btn btn-sm lg:btn-md btn-ghost text-xl px-0 lg:px-3" href="/">
          <Image
            className="hidden lg:block h-10 w-auto cursor-pointer"
            src={'/logo.png'}
            width={457}
            height={175}
            alt="logo"
            priority
          />
          <span className="text-lg lg:text-xl">
            Sota<span className="hidden lg:inline-flex">Truyen</span>
          </span>
        </Link>
      </nav>
      <nav className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {pages.map((page, i) => (
            <li key={i}>
              {!page.children ? (
                <Link
                  href={page.href}
                  className={cn(pathname === page.href && 'bg-primary text-primary-content pointer-events-none')}
                >
                  {page.name}
                </Link>
              ) : (
                <details className="z-10 dropdown">
                  <summary className={cn('font-normal', pathname.includes(page.href) && 'btn btn-primary btn-sm')}>
                    {page.name}
                  </summary>
                  <ul className="p-2 bg-base-200">
                    {page.children.map((child, i) => (
                      <li key={i}>
                        <Link
                          href={child.href}
                          onClick={e => hideDropdownDaisy(e.nativeEvent, true)}
                          className={cn(
                            'min-w-24',
                            pathname === child.href && 'bg-primary text-primary-content pointer-events-none',
                          )}
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
