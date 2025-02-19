'use client'

import { CheckIcon, ThemeIcon } from '../icons'
import { cn } from '@/lib'
import { useTheme } from '@/providers'
import { Button, Drawer, Tooltip } from '../commons'
import { useState } from 'react'
import { CardPaper } from '../cards'

const themes = [
  // { name: 'Mặc Định', value: 'default', icon: '' },
  { name: 'Sáng', value: 'light', icon: '' },
  { name: 'Tối', value: 'dark', icon: '' },
  { name: 'Ngọt Ngào', value: 'cupcake', icon: '' },
  { name: 'Ong Vàng', value: 'bumblebee', icon: '' },
  { name: 'Ngọc Bích', value: 'emerald', icon: '' },
  { name: 'Sóng Điện', value: 'synthwave', icon: '' },
  { name: 'Cổ Điển', value: 'retro', icon: '' },
  // { name: 'Tương Lai', value: 'cyberpunk', icon: '' },
  { name: 'Lãng Mạn', value: 'valentine', icon: '' },
  { name: 'Ma Quái', value: 'halloween', icon: '' },
  { name: 'Khu Vườn', value: 'garden', icon: '' },
  { name: 'Rừng Sâu', value: 'forest', icon: '' },
  { name: 'Biển Cả', value: 'aqua', icon: '' },
  { name: 'Nhẹ Nhàng', value: 'lofi', icon: '' },
  { name: 'Màu Nhẹ', value: 'pastel', icon: '' },
  { name: 'Huyền Ảo', value: 'fantasy', icon: '' },
  { name: 'Đơn Giản', value: 'wireframe', icon: '' },
  { name: 'Bóng Đêm', value: 'black', icon: '' },
  { name: 'Cao Cấp', value: 'luxury', icon: '' },
  { name: 'Huyền Bí', value: 'dracula', icon: '' },
  { name: 'In Ấn', value: 'cmyk', icon: '' },
  { name: 'Sắc Thu', value: 'autumn', icon: '' },
  { name: 'Hiện Đại', value: 'business', icon: '' },
  { name: 'Hiện Đại', value: 'corporate', icon: '' },
  { name: 'Rực Rỡ', value: 'acid', icon: '' },
  { name: 'Tươi Mát', value: 'lemonade', icon: '' },
  { name: 'Đêm Tĩnh', value: 'night', icon: '' },
  { name: 'Ấm Áp', value: 'coffee', icon: '' },
  { name: 'Lạnh Giá', value: 'winter', icon: '' },
  { name: 'U Ám', value: 'dim', icon: '' },
  { name: 'Bắc Âu', value: 'nord', icon: '' },
  { name: 'Hoàng Hôn', value: 'sunset', icon: '' },
]

export const ThemeModeButton = () => {
  const { theme, changeTheme } = useTheme()
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleOpenDrawer = () => setOpenDrawer(!openDrawer)

  return (
    <>
      <Tooltip title="Giao diện">
        <Button className="btn-ghost btn-circle" onClick={handleOpenDrawer}>
          <ThemeIcon />
        </Button>
      </Tooltip>
      <Drawer open={openDrawer} setOpen={setOpenDrawer} position="right" className="pt-4">
        <CardPaper title="Giao diện">
          <div className="grid grid-cols-1 gap-3">
            {themes.map((t, i) => (
              <button
                key={i}
                className="outline-base-content text-start outline-offset-4"
                data-set-theme={t.value}
                onClick={() => changeTheme(t.value)}
              >
                <span
                  className="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                  data-theme={t.value}
                >
                  <span className="grid grid-cols-5 grid-rows-3">
                    <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                      <CheckIcon className={cn('invisible', t.value == theme && 'visible')} />
                      <span className="flex-grow text-sm">{t.name}</span>
                      <span className="flex h-full shrink-0 flex-wrap gap-1">
                        <span className="bg-primary rounded-badge w-2"></span>
                        <span className="bg-secondary rounded-badge w-2"></span>
                        <span className="bg-accent rounded-badge w-2"></span>
                        <span className="bg-neutral rounded-badge w-2"></span>
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </CardPaper>
      </Drawer>
    </>
  )
}
