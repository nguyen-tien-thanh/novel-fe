'use client'

import * as React from 'react'
// import Box from '@mui/material/Box'
// import AppBar from '@mui/material/AppBar'
// import Toolbar from '@mui/material/Toolbar'
// import Button from '@mui/material/Button'
// import Divider from '@mui/material/Divider'
// import Typography from '@mui/material/Typography'
// import MenuItem from '@mui/material/MenuItem'
// import Drawer from '@mui/material/Drawer'
// import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
// import FavoriteIcon from '@mui/icons-material/Favorite'
// import Link from 'next/link'
// import IconButton from '@mui/material/IconButton'
import { ProfileButton, ThemeModeButton } from '@/components'
// import PersonIcon from '@mui/icons-material/Person'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
// import { Settings } from '@mui/icons-material'

const pages = [
  { name: 'Danh sách', href: '/' },
  { name: 'Thể loại', href: '/' },
  { name: 'Phân loại', href: '/' },
  {
    name: 'Quản lý',
    href: '/admin',
    children: [
      { name: 'Quản lý Truyện', href: '/admin/product', role: 'ADMIN' },
      { name: 'Quản lý Danh mục', href: '/admin/category', role: 'ADMIN' },
      { name: 'Quản lý Chương', href: '/admin/chapter', role: 'ADMIN' },
    ],
  },
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
    <div className="navbar bg-base-100">
      {/* Mobile */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {pages.map((page, i) => (
              <li key={i}>
                <Link href={page.href}>{page.name}</Link>
                <ul className="p-2">
                  {page.children &&
                    page.children.map((child, i) => (
                      <li key={i}>
                        <Link href={child.href}>{child.name}</Link>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" href="/">
          <Image
            className="h-10 sm:h-12 w-auto cursor-pointer"
            src={'/logo.png'}
            width={457}
            height={175}
            alt="logo"
            priority
          />
          AiTruyen
        </Link>
      </div>
      {/* PC */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {pages.map((page, i) => (
            <li key={i}>
              {!page.children ? (
                <Link href={page.href}>{page.name}</Link>
              ) : (
                <details>
                  <summary>{page.name}</summary>
                  <ul className="p-2">
                    {page.children.map((child, i) => (
                      <li key={i}>
                        <Link href={child.href} className="w-max">
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        {!user ? (
          <div className="space-x-2">
            <Link href="/register">
              <button className="btn btn-outline">Đăng kí</button>
            </Link>
            <Link href="/login">
              <button className="btn">Đăng nhập</button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="dropdown dropdown-end">
              {/* <div className="lg:tooltip lg:tooltip-bottom" data-tip="hello">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">8</span>
                  </div>
                </div>
              </div>
              <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                <div className="card-body">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">View cart</button>
                  </div>
                </div>
              </div> */}
              <ThemeModeButton />
            </div>
            <div className="dropdown dropdown-end">
              {/* <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-max p-2 shadow"
              >
                <li>
                  <Link className="p-2" href="/profile">
                    Trang cá nhân
                  </Link>
                </li>
                <li>
                  <Link className="p-2" href="/setting">
                    Cài đặt
                  </Link>
                </li>
                <li>
                  <a className="p-2" onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
                    Đăng xuất
                  </a>
                </li>
              </ul> */}
              <ProfileButton />
            </div>

            {/* <IconButton aria-label="delete" color="error" disabled>
              <FavoriteIcon />
            </IconButton>
            

            <ProfileButton /> */}
          </div>
        )}
      </div>
    </div>
  )
  // <AppBar
  //   position="fixed"
  //   sx={{
  //     boxShadow: 0,
  //     bgcolor: 'transparent',
  //     backgroundImage: 'none',
  //     mt: 2,
  //   }}
  // >
  //   <Container maxWidth="lg">
  //     <Toolbar
  //       variant="regular"
  //       sx={theme => ({
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'space-between',
  //         flexShrink: 0,
  //         borderRadius: '999px',
  //         bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
  //         backdropFilter: 'blur(24px)',
  //         maxHeight: 40,
  //         border: '1px solid',
  //         borderColor: 'divider',
  //         boxShadow:
  //           theme.palette.mode === 'light'
  //             ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
  //             : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
  //       })}
  //     >
  //       <Box
  //         sx={{
  //           flexGrow: 1,
  //           display: 'flex',
  //           alignItems: 'center',
  //           px: 0,
  //         }}
  //       >
  //         <Link href="/">
  //           <Box className="flex items-center gap-2" sx={{ mr: 2 }}>
  //             <Image
  //               className="h-10 sm:h-12 w-auto cursor-pointer"
  //               src={'/logo.png'}
  //               width={457}
  //               height={175}
  //               alt="logo"
  //               priority
  //             />

  //             <Typography
  //               color="primary"
  //               variant="h5"
  //               sx={{ fontWeight: 'bold', display: { xs: 'none', md: 'block' } }}
  //             >
  //               AiTruyen
  //             </Typography>
  //           </Box>
  //         </Link>
  //         <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
  //           {pages.map((page, i) => (
  //             <Link href={page.href} key={i}>
  //               <Button variant="text" color="primary" size="large">
  //                 {page.name}
  //               </Button>
  //             </Link>
  //           ))}
  //         </Box>
  //       </Box>

  //       {/* Tablet - PC */}
  //       <Box
  //         sx={{
  //           display: { xs: 'none', md: 'flex' },
  //           gap: 0.5,
  //           alignItems: 'center',
  //         }}
  //       >
  //         <ThemeModeButton />
  //         {!user ? (
  //           <>
  //             <Link href="/register">
  //               <Button color="primary" variant="text" size="medium">
  //                 Đăng kí
  //               </Button>
  //             </Link>
  //             <Link href="/login">
  //               <Button color="primary" variant="contained" size="medium">
  //                 Đăng nhập
  //               </Button>
  //             </Link>
  //           </>
  //         ) : (
  //           <>
  //             {/* <Tooltip title="Yêu thích"> */}
  //             <IconButton aria-label="delete" color="error" disabled>
  //               <FavoriteIcon />
  //             </IconButton>
  //             {/* </Tooltip> */}

  //             <ProfileButton />
  //           </>
  //         )}
  //       </Box>

  //       {/* Mobile */}
  //       <Box sx={{ display: { sm: '', md: 'none' } }}>
  //         <ThemeModeButton />
  //         <Button
  //           variant="text"
  //           color="primary"
  //           aria-label="menu"
  //           onClick={toggleDrawer(true)}
  //           sx={{ minWidth: '30px', p: '4px' }}
  //         >
  //           <MenuIcon />
  //         </Button>
  //         <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
  //           <Box
  //             sx={{
  //               minWidth: '60dvw',
  //               p: 2,
  //               backgroundColor: 'background.paper',
  //               flexGrow: 1,
  //             }}
  //           >
  //             {pages.map((page, i) => (
  //               <MenuItem key={i} onClick={() => router.push(page.href)}>
  //                 {page.name}
  //               </MenuItem>
  //             ))}
  //             <Divider />
  //             {!user ? (
  //               <>
  //                 <MenuItem>
  //                   <Button color="primary" variant="outlined" component="a" href="/register" sx={{ width: '100%' }}>
  //                     Đăng kí
  //                   </Button>
  //                 </MenuItem>
  //                 <MenuItem>
  //                   <Button color="primary" variant="contained" component="a" href="/login" sx={{ width: '100%' }}>
  //                     Đăng nhập
  //                   </Button>
  //                 </MenuItem>
  //               </>
  //             ) : (
  //               <>
  //                 <MenuItem disabled>
  //                   <Button
  //                     color="primary"
  //                     variant="outlined"
  //                     component="a"
  //                     href="/profile"
  //                     sx={{ width: '100%' }}
  //                     startIcon={<PersonIcon />}
  //                   >
  //                     Trang cá nhân
  //                   </Button>
  //                 </MenuItem>
  //                 <MenuItem disabled>
  //                   <Button
  //                     color="primary"
  //                     variant="outlined"
  //                     component="a"
  //                     sx={{ width: '100%' }}
  //                     startIcon={<Settings />}
  //                   >
  //                     Cài đặt
  //                   </Button>
  //                 </MenuItem>
  //                 <Divider />
  //                 <MenuItem>
  //                   <Button
  //                     color="error"
  //                     variant="contained"
  //                     sx={{ width: '100%' }}
  //                     onClick={() => signOut({ callbackUrl: '/', redirect: true })}
  //                   >
  //                     Đăng xuất
  //                   </Button>
  //                 </MenuItem>
  //               </>
  //             )}
  //           </Box>
  //         </Drawer>
  //       </Box>
  //     </Toolbar>
  //   </Container>
  // </AppBar>
}
