// 'use client'

// import React, { useState } from 'react'
// import Avatar from '@mui/material/Avatar'
// import Button from '@mui/material/Button'
// import TextField from '@mui/material/TextField'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Checkbox from '@mui/material/Checkbox'
// import Link from '@mui/material/Link'
// import Box from '@mui/material/Box'
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
// import Typography from '@mui/material/Typography'
// import { Container } from '@/components'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'

const Login = () => {
  return <>login</>
}
//   const { data: session } = useSession()
//   const router = useRouter()
//   const [submit, setSubmit] = useState(false)
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [errorText, setErrorText] = useState('')

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     setSubmit(true)

//     if (!email || !password) return

//     const user = await fetch('api/auth/login', {
//       method: 'POST',
//       body: JSON.stringify({ email, password }),
//     })
//     if (user.status !== 200) {
//       setErrorText('Sai tài khoản hoặc Mật khẩu')
//     } else {
//       window.location.href = '/'
//     }
//   }

//   if (session) return router.push('/')

//   return (
//     <Container component="main" maxWidth="xs" className="flex justify-center items-center">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Avatar sx={{ m: 1 }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Đăng nhập
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             onChange={e => {
//               setEmail(e.target.value)
//             }}
//             error={submit && !email}
//             helperText={submit && !email ? 'Vui lòng nhập Email' : ''}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Mật khẩu"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             onChange={e => {
//               setPassword(e.target.value)
//             }}
//             error={submit && !password}
//             helperText={submit && !password ? 'Vui lòng nhập Mật khẩu' : ''}
//           />
//           <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Nhớ mật khâủ" />
//           <Typography color="error" className={`mt-2 ${errorText && submit ? 'block' : 'hidden'}`}>
//             {errorText}
//           </Typography>
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//             Đăng nhập
//           </Button>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
//             <Link href="#" variant="body2">
//               Quên mật khâủ
//             </Link>
//             <Link href="/register" variant="body2">
//               Bạn chưa có tài khoản? Đăng ký
//             </Link>
//           </Box>
//         </Box>
//       </Box>
//     </Container>
//   )
// }

export default Login
