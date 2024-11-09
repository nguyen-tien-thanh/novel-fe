'use client'

import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { Container } from '@/components'
import { useSession } from 'next-auth/react'

const Register = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [submit, setSubmit] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
  const [errorText, setErrorText] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmit(true)

    if (!firstName || !lastName || !email || !password) return

    if (checked === false) return setErrorText('Please accept the terms and conditions')

    return fetch('api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name: lastName + ' ' + firstName, email, password }),
    })
      .then(async res => {
        const json = await res.json()
        if (!res.ok) throw new Error(json.message)

        return router.push('/login')
      })
      .catch((err: Error) => setErrorText(err.message))
  }

  if (session) return router.push('/')

  return (
    <Container component="main" maxWidth="xs" className="flex justify-center items-center">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng kí
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Tên"
                autoFocus
                onChange={e => {
                  setFirstName(e.target.value)
                }}
                error={submit && !firstName}
                helperText={submit && !firstName ? 'Vui lòng nhập Tên' : ''}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Họ"
                name="lastName"
                autoComplete="family-name"
                onChange={e => {
                  setLastName(e.target.value)
                }}
                error={submit && !lastName}
                helperText={submit && !lastName ? 'Vui lòng nhập Họ' : ''}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={e => {
                  setEmail(e.target.value)
                }}
                error={submit && !email}
                helperText={submit && !email ? 'Vui lòng nhập Email' : ''}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={e => {
                  setPassword(e.target.value)
                }}
                error={submit && !password}
                helperText={submit && !password ? 'Vui lòng nhập Mật khẩu' : ''}
              />
            </Grid>
            <Grid size={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={checked}
                    onChange={() => {
                      setChecked(!checked)
                    }}
                    color="primary"
                  />
                }
                label="Tôi đồng ý với các điều khoản"
              />
            </Grid>
          </Grid>
          <span className={`text-[#d32f2f] ${errorText && submit ? 'block' : 'hidden'}`}>{errorText}</span>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Đăng kí
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid>
              <Link href="/login" variant="body2">
                Đã có tài khoản? Đăng nhập
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Register
