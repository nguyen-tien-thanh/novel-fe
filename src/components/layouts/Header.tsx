'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Link from 'next/link'
import IconButton from '@mui/material/IconButton'
import { Container, ProfileButton, ThemeModeButton } from '@/components'
import PersonIcon from '@mui/icons-material/Person'
import { signOut, useSession } from 'next-auth/react'
import { Settings } from '@mui/icons-material'

const pages = [
  { name: 'Danh sách', href: '/' },
  { name: 'Thể loại', href: '/' },
  { name: 'Phân loại', href: '/' },
  { name: 'QLtruyện', href: '/products-management', role: 'ADMIN' },
  { name: 'QLdanh mục', href: '/categories-management', role: 'ADMIN' },
  { name: 'QLchương', href: '/chapters-management', role: 'ADMIN' },
]

export const Header = () => {
  const { data } = useSession()
  const user = data?.user
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  // const scrollToSection = (sectionId: string) => {
  //   const sectionElement = document.getElementById(sectionId)
  //   const offset = 128
  //   if (sectionElement) {
  //     const targetScroll = sectionElement.offsetTop - offset
  //     sectionElement.scrollIntoView({ behavior: 'smooth' })
  //     window.scrollTo({
  //       top: targetScroll,
  //       behavior: 'smooth',
  //     })
  //     setOpen(false)
  //   }
  // }

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={theme => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '999px',
            bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(24px)',
            maxHeight: 40,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              px: 0,
            }}
          >
            <Link href="/">
              <Box className="flex items-center gap-2" sx={{ mr: 2 }}>
                <Image
                  className="h-10 sm:h-14 w-auto cursor-pointer"
                  src={'/logo.png'}
                  width={457}
                  height={175}
                  alt="logo"
                  priority
                />

                <Typography
                  color="primary"
                  variant="h5"
                  sx={{ fontWeight: 'bold', display: { xs: 'none', md: 'block' } }}
                >
                  AiTruyen
                </Typography>
              </Box>
            </Link>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, i) => (
                <Link href={page.href} key={i}>
                  <Button variant="text" color="primary" size="large">
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Box>
          </Box>

          {/* Tablet - PC */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            <ThemeModeButton />
            {!user ? (
              <>
                <Link href="/register">
                  <Button color="primary" variant="text" size="medium">
                    Đăng kí
                  </Button>
                </Link>
                <Link href="/login">
                  <Button color="primary" variant="contained" size="medium">
                    Đăng nhập
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {/* <Tooltip title="Yêu thích"> */}
                <IconButton aria-label="delete" color="error" disabled>
                  <FavoriteIcon />
                </IconButton>
                {/* </Tooltip> */}

                <ProfileButton />
              </>
            )}
          </Box>

          {/* Mobile */}
          <Box sx={{ display: { sm: '', md: 'none' } }}>
            <ThemeModeButton />
            <Button
              variant="text"
              color="primary"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ minWidth: '30px', p: '4px' }}
            >
              <MenuIcon />
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  minWidth: '60dvw',
                  p: 2,
                  backgroundColor: 'background.paper',
                  flexGrow: 1,
                }}
              >
                {pages.map((page, i) => (
                  <MenuItem key={i} onClick={() => router.push(page.href)}>
                    {page.name}
                  </MenuItem>
                ))}
                <Divider />
                {!user ? (
                  <>
                    <MenuItem>
                      <Button color="primary" variant="outlined" component="a" href="/register" sx={{ width: '100%' }}>
                        Đăng kí
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button color="primary" variant="contained" component="a" href="/login" sx={{ width: '100%' }}>
                        Đăng nhập
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem disabled>
                      <Button
                        color="primary"
                        variant="outlined"
                        component="a"
                        href="/profile"
                        sx={{ width: '100%' }}
                        startIcon={<PersonIcon />}
                      >
                        Trang cá nhân
                      </Button>
                    </MenuItem>
                    <MenuItem disabled>
                      <Button
                        color="primary"
                        variant="outlined"
                        component="a"
                        sx={{ width: '100%' }}
                        startIcon={<Settings />}
                      >
                        Cài đặt
                      </Button>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <Button color="error" variant="contained" sx={{ width: '100%' }} onClick={() => signOut()}>
                        Đăng xuất
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
