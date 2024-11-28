'use client'

// import { Box, Fab, Tooltip } from '@mui/material'
import React from 'react'
import { Tooltip } from '@/components'
// import ExpandLessIcon from '@mui/icons-material/ExpandLess'

export const ScrollToTopButton = () => {
  const handleScroll = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

  return (
    <Tooltip title="Scroll to top">
      <button></button>
      {/* Use a span to wrap the Box component */}
      <span onClick={handleScroll} style={{ cursor: 'pointer' }}>
        hehe
        {/* <Box
        sx={{ '& > :not(style)': { m: 1 } }}
        className="opacity-50 hover:opacity-100 transition-all z-50 !fixed bottom-14 right-5 rounded-full animate-bounce size-14"
      >
        <Fab size="medium" color="primary" aria-label="scroll to top">
          <ExpandLessIcon fontSize="medium" />
        </Fab>
      </Box> */}
      </span>
    </Tooltip>
  )
}
