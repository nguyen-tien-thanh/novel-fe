import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { IProduct } from '@/types'
import { useRouter } from 'next/navigation'

interface CoverProps {
  product: IProduct
  href?: string
  height?: string | number | Record<string, string | number>
  width?: string | number | Record<string, string | number>
}

export const Cover: FC<CoverProps> = ({
  product,
  href,
  height = { xs: '160px', lg: '320px' },
  width = { xs: '120px', lg: '240px' },
}) => {
  const router = useRouter()
  const { authorName, image, name } = product

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        py: {
          xs: 0,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 4,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: width,
          height: height,
          float: 'left',
          zIndex: 1,
          webkitPerspective: '1800px',
          perspective: '1800px',
          cursor: href && 'pointer',
        }}
        onClick={() => {
          if (href) router.push(href)
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: height,
            transformStyle: 'preserve-3d',
            webkitTransformStyle: 'preserve-3d',
            transition: 'transform 0.5s',
            webkitTransition: 'transform 0.5s',
            '&:hover': {
              transform: 'rotate3d(0, 1, 0, 35deg)',
              webkitTransform: 'rotate3d(0, 1, 0, 35deg)',
            },
          }}
        >
          <Box
            sx={{
              webkitTransformStyle: 'preserve-3d',
              transformStyle: 'preserve-3d',
              webkitTransformOrigin: '0% 50%',
              transformOrigin: '0% 50%',
              webkitTransition: 'transform 0.5s',
              transition: 'transform 0.5s',
              webkitTransform: 'translate3d(0, 0, 20px)',
              transform: 'translate3d(0, 0, 20px)',
              zIndex: 10,
              position: 'absolute',
              height: height,
              width: width,
            }}
          >
            <Box
              className="after:absolute after:top-0 after:left-[10px] after:bottom-0 after:w-[3px] after:bg-[rgba(0,0,0,0.06)] after:shadow-[1px_0_3px_rgba(255,255,255,0.1)]"
              sx={{
                position: 'absolute',
                height: height,
                width: width,
                backgroundImage: `url('${image}'), url('/assets/notfound.webp')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                borderRadius: '0 3px 3px 0',
              }}
            >
              <Typography
                sx={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  left: '0',
                  padding: '30px',
                  backgroundColor: 'rgb(0,0,0,0.2)',
                  color: '#fff',
                  textShadow: '0 -1px 0 rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    display: 'block',
                    textTransform: 'uppercase',
                    fontWeight: 400,
                    fontSize: 13,
                    paddingRight: '20px',
                  }}
                  className="line-clamp-1"
                >
                  {authorName}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 400,
                    fontSize: 15,
                    paddingRight: '20px',
                  }}
                  className="line-clamp-2"
                >
                  {name}
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              height: height,
              width: width,
              webkitTransform: 'rotate3d(0, 1, 0, -180deg) translate3d(0, 0, 20px)',
              transform: 'rotate3d(0, 1, 0, -180deg) translate3d(0, 0, 20px)',
              boxShadow: '10px 10px 30px rgba(0, 0, 0, 0.5)',
              borderRadius: '3px 0 0 3px',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              width: '40px',
              left: '-20px',
              height: height,
              webkitTransform: 'rotate3d(0, 1, 0, -90deg)',
              transform: 'rotate3d(0, 1, 0, -90deg)',
              backgroundImage: `url('${image}'), url('/assets/notfound.webp')`,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backdropFilter: 'blur(20px)',
                zIndex: 1,
              }}
            />
            <Typography
              component="h2"
              sx={{
                position: 'relative',
                zIndex: 2,
                color: '#fff',
                fontSize: '15px',
                lineHeight: '40px',
                paddingRight: '10px',
                textAlign: 'right',
                width: height,
                height: '40px',
                webkitTransformOrigin: '0 0',
                mozTransformOrigin: '0 0',
                transformOrigin: '0 0',
                webkitTransform: 'rotate(90deg) translateY(-40px)',
                transform: 'rotate(90deg) translateY(-40px)',
              }}
            >
              <Typography
                component="span"
                sx={{
                  textTransform: 'uppercase',
                  fontSize: 12,
                  paddingRight: '20px',
                }}
              >
                {authorName}
              </Typography>
              <Typography
                component="span"
                sx={{
                  textTransform: 'uppercase',
                  fontSize: 12,
                }}
              >
                {name}
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
