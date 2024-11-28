'use client'

// import { ThemeProvider } from '@mui/material/styles'
// import { CssBaseline } from '@mui/material'
// import { createTheme } from '@mui/material/styles'

export function ThemeClientProvider({ children }: { children: React.ReactNode }) {
  // const theme = createTheme({
  //   breakpoints: {
  //     values: {
  //       xs: 0,
  //       sm: 600,
  //       md: 900,
  //       lg: 1200,
  //       xl: 1920,
  //     },
  //   },
  //   colorSchemes: { dark: true },
  // })

  return (
    // <ThemeProvider theme={theme}>
    // <CssBaseline enableColorScheme />
    { children }
    // </ThemeProvider>
  )
}
