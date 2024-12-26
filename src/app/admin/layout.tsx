'use client'

import '../globals.css'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { cn } from '@/lib'
import { usePathname } from 'next/navigation'
import { BookIcon, CollectionIcon, DocIcon } from '@/components'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const pages = [
    { name: 'Danh mục', href: '/admin/category', icon: CollectionIcon },
    { name: 'Truyện', href: '/admin/product', icon: BookIcon },
    { name: 'Chương', href: '/admin/chapter', icon: DocIcon },
  ]

  return (
    <div className="flex">
      <div className="lg:w-80 bg-base-200 text-base-content min-h-screen">
        <ul className={cn('menu bg-base-200 text-base-content min-h-screen lg:max-w-xs')}>
          {pages.map((page, i) => (
            <li key={i} className="my-[1px]">
              <Link
                href={page.href}
                className={cn(
                  pathname === page.href && 'bg-primary text-primary-content pointer-events-none',
                  'text-lg p-2 rounded-md flex',
                )}
              >
                <span>{page.icon && <page.icon className="w-5 h-5" />}</span>
                <span className="hidden lg:block">{page.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="p-4 w-full">
        <div className="p-2 overflow-x-auto max-w-[calc(100vw-102px)] lg:max-w-full">{children}</div>
      </div>
    </div>
  )
}
