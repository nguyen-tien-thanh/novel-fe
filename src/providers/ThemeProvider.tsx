'use client'

import { createContext, useContext, useLayoutEffect, useState } from 'react'

export const ThemeContext = createContext({ theme: 'cupcake', changeTheme: (theme: string) => {} })

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('cupcake')

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
    const current = getCookie('theme') || 'cupcake'
    setTheme(current)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }} data-theme={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
