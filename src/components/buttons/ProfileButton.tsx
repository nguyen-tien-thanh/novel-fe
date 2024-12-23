import { stringAvatar } from '@/lib'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Divider, Image } from '@/components'

export const ProfileButton = () => {
  const { data } = useSession()
  if (!data || !data.user) return null
  const { name, image, email } = data.user

  return (
    <>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {image ? (
            <Image width={40} height={40} src={image} alt={name ?? 'Avatar'} fallbackSrc="/assets/notfound-user.webp" />
          ) : name ? (
            <div {...stringAvatar(name)} />
          ) : null}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-max p-2 shadow [&>a]:px-2"
      >
        <li className="pointer-events-none">
          <p>{name}</p>
          <p className="text-xs">{email}</p>
        </li>
        <Divider className="my-0" />
        <li>
          <Link className="py-2 px-4" href="/profile">
            Trang cá nhân
          </Link>
        </li>
        <li>
          <Link className="py-2 px-4" href="/#!">
            Yêu thích
          </Link>
        </li>
        <li>
          <Link className="py-2 px-4" href="/setting">
            Cài đặt
          </Link>
        </li>
        <li>
          <Link href="#!" className="py-2 px-4" onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
            Đăng xuất
          </Link>
        </li>
      </ul>
    </>
  )
}
