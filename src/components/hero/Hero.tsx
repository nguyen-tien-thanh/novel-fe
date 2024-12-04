import { cn } from '@/lib'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

export interface IHeroProps {
  title?: string
  subtitle?: string
  image: string
  className?: string
  children?: ReactNode
  href?: string
  buttonText?: string
}

export const Hero: FC<IHeroProps> = ({
  title,
  subtitle,
  image,
  className,
  children,
  href = '#!',
  buttonText,
  ...props
}) => {
  return (
    <div className={cn('hero min-h-dvh', className)} style={{ backgroundImage: `url(${image})` }} {...props}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          {children ? (
            children
          ) : (
            <>
              {title && <h1 className="mb-5 text-3xl lg:text-5xl font-bold">{title}</h1>}
              {subtitle && <p className="mb-5">{subtitle}</p>}
              {buttonText && (
                <Link href={href}>
                  <button className="btn btn-primary">{buttonText}</button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
