import { stringAvatar } from '@/lib'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Image } from '@/components'

export const ProfileButton = () => {
  const { data } = useSession()
  if (!data || !data.user) return null
  const { name, image } = data.user

  return (
    <>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {image ? (
            <Image width={40} height={40} src={image} alt={name ?? 'Avatar'} />
          ) : name ? (
            <div {...stringAvatar(name)} />
          ) : null}
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-max p-2 shadow">
        <li>
          <Link className="p-2" href="/profile">
            Trang cá nhân
          </Link>
        </li>
        <li>
          <Link className="p-2" href="/#!">
            Yêu thích
          </Link>
        </li>
        <li>
          <Link className="p-2" href="/setting">
            Cài đặt
          </Link>
        </li>
        <li>
          <Link href="#!" className="p-2" onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
            Đăng xuất
          </Link>
        </li>
      </ul>
    </>
  )
}
