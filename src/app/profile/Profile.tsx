'use client'

import { Button, Image, LocationIcon, MailIcon, PhoneIcon } from '@/components'
import { stringAvatar } from '@/lib'
import { useSession } from 'next-auth/react'

export const Profile = () => {
  const { data } = useSession()
  if (!data || !data.user) return null
  const { name, image, email } = data.user

  const handleChangeAvatar = () => {}

  return (
    <div className="container mx-auto flex items-center justify-center p-4">
      <div className="bg-base-200 rounded-xl w-full p-8 transition-all duration-300 animate-fade-in">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 text-center mb-8 lg:mb-0">
            <label htmlFor="avatar">
              {image ? (
                <Image
                  role="button"
                  width={192}
                  height={192}
                  src={image}
                  alt={name ?? 'Avatar'}
                  fallbackSrc="/assets/notfound-user.webp"
                  className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-primary transition-all duration-300 hover:brightness-75"
                />
              ) : name ? (
                <div {...stringAvatar(name)} />
              ) : null}
              <input hidden id="avatar" type="file" name="avatar" onChange={handleChangeAvatar} accept="image/*" />
            </label>
            <h1 className="text-2xl font-bold text-base-content mb-2">{name}</h1>
            <p className="text-base-content">Editor</p>
            <Button className="mt-4 btn-primary transition-colors duration-300">Chỉnh sửa</Button>
          </div>

          <div className="lg:w-2/3 lg:pl-8">
            <h2 className="text-xl font-semibold text-base-content mb-4">Giới thiệu</h2>
            <p className="text-base-content mb-6">
              Passionate software developer with 5 years of experience in web technologies. I love creating
              user-friendly applications and solving complex problems.
            </p>

            <h2 className="text-xl font-semibold text-base-content mb-4">Sở thích</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="badge badge-neutral badge-lg text-sm">Kỳ huyễn</span>
              <span className="badge badge-neutral badge-lg text-sm">Cận đại</span>
              <span className="badge badge-neutral badge-lg text-sm">Vườn trường</span>
              <span className="badge badge-neutral badge-lg text-sm">Xuyên không</span>
            </div>

            <h2 className="text-xl font-semibold text-base-content mb-4">Thông tin liên hệ</h2>
            <ul className="space-y-2 text-base-content">
              <li className="flex items-center gap-2">
                <MailIcon className="size-5 text-primary" />
                {email}
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="size-5 text-primary" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <LocationIcon className="size-5 text-primary" />
                Hồ chí minh, VN
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
