import type { Metadata } from 'next'
import './globals.css'
import { Footer, Header, ScrollToTopButton } from '@/components'
import { ThemeClientProvider } from '@/providers'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  title: 'AiTruyen',
  description: 'Welcome',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <ThemeClientProvider>
        <html lang="en" suppressHydrationWarning>
          <body>
            <Header />

            <ToastContainer />
            <main className="relative mt-28 min-h-[calc(100dvh-112px-90px)] flex flex-col">
              {children}

              <ScrollToTopButton />
            </main>

            <Footer />
          </body>
        </html>
      </ThemeClientProvider>
    </SessionProvider>
  )
}
