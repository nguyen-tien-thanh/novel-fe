'use client'

import { DarkMode, WbSunny } from '@mui/icons-material'
import { IconButton, Tooltip, useColorScheme } from '@mui/material'
import { useEffect } from 'react'

export const ThemeModeButton = () => {
  const { mode, setMode } = useColorScheme()

  useEffect(() => {
    if (!mode) {
      setMode('light')
    }
  }, [mode, setMode])

  return mode === 'dark' ? (
    <Tooltip title="Sáng" onClick={() => setMode('light')}>
      <span>
        <IconButton>
          <DarkMode />
        </IconButton>
      </span>
    </Tooltip>
  ) : (
    <Tooltip title="Tối" onClick={() => setMode('dark')}>
      <span>
        <IconButton color="warning">
          <WbSunny />
        </IconButton>
      </span>
    </Tooltip>
  )
}
