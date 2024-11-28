'use client'

import { useTheme } from './ThemeProvider'

export const ThemeWrapper = ({ children }) => {
  const { theme } = useTheme()

  return <div data-theme={theme}>{children}</div>
}
