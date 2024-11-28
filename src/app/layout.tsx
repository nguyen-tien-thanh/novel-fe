import type { Metadata } from 'next'
import './globals.css'
import { Footer, Header, ScrollToTopButton } from '@/components'
import { auth } from '@/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider, ThemeWrapper } from '@/providers'

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
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider>
            <ThemeWrapper>
              <Header />

              <ToastContainer />
              <main className="relative min-h-[calc(100dvh-64px-52px)] lg:min-h-[calc(100dvh-68px-52px)] flex flex-col">
                {children}

                <ScrollToTopButton />
              </main>

              <Footer />
            </ThemeWrapper>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
