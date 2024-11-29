'use client'

import { createContext, useContext, useLayoutEffect, useState } from 'react'

const defaultTheme = 'cupcake'

export const ThemeContext = createContext({ theme: defaultTheme, changeTheme: (theme: string) => {} })

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(defaultTheme)

  const changeTheme = (theme: string) => {
    setTheme(theme)
    document.cookie = `theme=${theme}; path=/`
  }

  const getCookie = (name: string): string | undefined => {
    const cookies = document.cookie.split('; ')
    const cookie = cookies.find(c => c.startsWith(`${name}=`))
    return cookie ? cookie.split('=')[1] : undefined
  }

  useLayoutEffect(() => {
    const current = getCookie('theme') || defaultTheme
    setTheme(current)

    document.documentElement.setAttribute('data-theme', current)
  }, [theme, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }} data-theme={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
