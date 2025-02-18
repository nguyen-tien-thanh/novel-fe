import type { Metadata } from 'next'
import './globals.css'
import { Footer, Header, ScrollToTopButton } from '@/components'
import { auth } from '@/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SessionProvider } from 'next-auth/react'
import { QueryProvider, ThemeProvider } from '@/providers'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'SotaTruyen',
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
      <QueryProvider>
        <ThemeProvider>
          <html lang="vi" suppressHydrationWarning data-theme={theme?.value || 'cupcake'}>
            <head>
              <meta name="google-adsense-account" content="ca-pub-9011651022330880" />
            </head>
            <body>
              <Header />
              <ToastContainer />
              <main className="relative min-h-[calc(100dvh-68px-52px)]">
                {children}

                <ScrollToTopButton />
              </main>
              <Footer />
            </body>
          </html>
        </ThemeProvider>
      </QueryProvider>
    </SessionProvider>
  )
}
