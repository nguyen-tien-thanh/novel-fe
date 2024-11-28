// import { Container as MuiContainer, ContainerProps } from '@mui/material'

export const Container = ({ children, sx = {}, className = '', ...props }) => {
  return 'container'
  // <MuiContainer
  //   maxWidth="xl"
  //   sx={{
  //     width: {
  //       xs: '390px',
  //       sm: '600px',
  //       md: '900px',
  //       lg: '1200px',
  //       xl: '1720px',
  //     },
  //     ...sx,
  //   }}
  //   className={className}
  //   {...props}
  // >
  //   {children}
  // </MuiContainer>
}
