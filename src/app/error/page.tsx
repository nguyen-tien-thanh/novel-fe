import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'

const Error = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className="flex-1"
    >
      <Typography variant="h1">403</Typography>
      <Typography variant="h6" className="text-center">
        Bạn không có quyền truy cập vào trang này
      </Typography>
      <Link href="/">
        <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
          Back Home
        </Button>
      </Link>
    </Box>
  )
}

export default Error
