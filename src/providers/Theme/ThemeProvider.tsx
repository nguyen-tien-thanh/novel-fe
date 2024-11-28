'use client'

import { createContext, useContext, useState } from 'react'

export const ThemeContext = createContext({ theme: '', changeTheme: (theme: string) => {} })

export const ThemeProvider = ({ children }) => {
  // Todo: Theme renders after HTML
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'cupcake')

  const changeTheme = (theme: string) => {
    setTheme(theme)
    localStorage.setItem('theme', theme)
  }

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
