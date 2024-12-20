'use client'

import type { Metadata } from 'next'
import '../globals.css'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { cn } from '@/lib'
import { usePathname } from 'next/navigation'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const pages = [
    { name: 'Truyện', href: '/admin/product' },
    { name: 'Danh mục', href: '/admin/category' },
    { name: 'Chương', href: '/admin/chapter' },
  ]

  return (
    <div className="flex">
      <div className=" w-80 bg-base-200 text-base-content min-h-screen">
        <ul className={cn('menu bg-base-200 text-base-content min-h-screen w-[80%] lg:max-w-xs')}>
          {pages.map((page, i) => (
            <li key={i}>
              <Link
                href={page.href}
                className={cn(
                  pathname === page.href && 'bg-primary text-primary-content pointer-events-none',
                  'text-lg p-2 rounded-md block',
                )}
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="p-4">{children}</div>
    </div>
  )
}
