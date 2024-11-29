import type { Metadata } from 'next'
import './globals.css'
import { Footer, Header, ScrollToTopButton } from '@/components'
import { auth } from '@/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/providers'
import { cookies } from 'next/headers'

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
  const theme = cookies().get('theme')

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <html lang="en" suppressHydrationWarning data-theme={theme?.value || 'cupcake'}>
          <body>
            <Header />

            <ToastContainer />
            <main className="relative min-h-[calc(100dvh-64px-52px)] lg:min-h-[calc(100dvh-68px-52px)] flex flex-col">
              {children}

              <ScrollToTopButton />
            </main>

            <Footer />
          </body>
        </html>
      </ThemeProvider>
    </SessionProvider>
  )
}
