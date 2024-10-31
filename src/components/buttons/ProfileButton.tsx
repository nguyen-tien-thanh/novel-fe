import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { signOut, useSession } from 'next-auth/react'
import { stringAvatar } from '@/lib'
import CircularProgress from '@mui/material/CircularProgress'

export const ProfileButton = () => {
  const { data } = useSession()
  const user = data?.user
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {user && user.image ? (
          <Avatar sx={{ width: 28, height: 28 }} src={user.image} srcSet={user.image} />
        ) : user && user.name ? (
          <Avatar {...stringAvatar(user.name)} />
        ) : null}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} disabled>
          <Avatar /> {user && user.name}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} disabled>
          <ListItemIcon>
            <CircularProgress size={20} />
          </ListItemIcon>
          Developing...
        </MenuItem>
        <MenuItem onClick={handleClose} disabled>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Cài đặt
        </MenuItem>
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
