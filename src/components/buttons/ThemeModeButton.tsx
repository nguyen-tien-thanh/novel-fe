'use client'

import { useEffect, useState } from 'react'
import { ThemeIcon } from '../icons'
import { themeChange } from 'theme-change'
import { cn } from '@/lib'

const themes = [
  { name: 'Mặc Định', value: 'default', icon: '' },
  { name: 'Tươi Sáng', value: 'light', icon: '' },
  { name: 'Bóng Tối', value: 'dark', icon: '' },
  { name: 'Ngọt Ngào', value: 'cupcake', icon: '' },
  { name: 'Ong Vàng', value: 'bumblebee', icon: '' },
  { name: 'Ngọc Bích', value: 'emerald', icon: '' },
  { name: 'Chuyên Nghiệp', value: 'corporate', icon: '' },
  { name: 'Sóng Điện Tử', value: 'synthwave', icon: '' },
  { name: 'Cổ Điển', value: 'retro', icon: '' },
  { name: 'Tương Lai Ảo', value: 'cyberpunk', icon: '' },
  { name: 'Lãng Mạn', value: 'valentine', icon: '' },
  { name: 'Ma Quái', value: 'halloween', icon: '' },
  { name: 'Khu Vườn Xanh', value: 'garden', icon: '' },
  { name: 'Rừng Sâu', value: 'forest', icon: '' },
  { name: 'Biển Cả', value: 'aqua', icon: '' },
  { name: 'Nhẹ Nhàng', value: 'lofi', icon: '' },
  { name: 'Màu Nhẹ', value: 'pastel', icon: '' },
  { name: 'Huyền Ảo', value: 'fantasy', icon: '' },
  { name: 'Đơn Giản', value: 'wireframe', icon: '' },
  { name: 'Bóng Đêm', value: 'black', icon: '' },
  { name: 'Cao Cấp', value: 'luxury', icon: '' },
  { name: 'Huyền Bí', value: 'dracula', icon: '' },
  { name: 'Sắc Màu In Ấn', value: 'cmyk', icon: '' },
  { name: 'Sắc Thu', value: 'autumn', icon: '' },
  { name: 'Hiện Đại', value: 'business', icon: '' },
  { name: 'Rực Rỡ', value: 'acid', icon: '' },
  { name: 'Tươi Mát', value: 'lemonade', icon: '' },
  { name: 'Đêm Tĩnh Lặng', value: 'night', icon: '' },
  { name: 'Ấm Áp', value: 'coffee', icon: '' },
  { name: 'Lạnh Giá', value: 'winter', icon: '' },
  { name: 'U Ám', value: 'dim', icon: '' },
  { name: 'Bắc Âu', value: 'nord', icon: '' },
  { name: 'Hoàng Hôn ', value: 'sunset', icon: '' },
]

export const ThemeModeButton = () => {
  const [currentTheme, setCurrentTheme] = useState('')

  const setThemeFromLocalStorage = () => {
    const theme = localStorage.getItem('theme') || ''
    setCurrentTheme(theme)
  }

  useEffect(() => {
    themeChange(false)
    setThemeFromLocalStorage()
  }, [])

  return (
    <div>
      <div className="lg:tooltip lg:tooltip-bottom" data-tip="Theme">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <ThemeIcon />
        </div>
      </div>
      <div tabIndex={0} className="card card-compact dropdown-content z-[1] mt-3 w-52 shadow-lg rounded-lg">
        <div className="join join-vertical max-h-[200px] overflow-auto no-scrollbar rounded-lg">
          {themes.map((theme, i) => (
            <input
              key={i}
              type="radio"
              name="theme-buttons"
              className={cn(
                'btn theme-controller join-item no-animation rounded-lg relative',
                theme.value == currentTheme && "before:content-['✓'] before:text-3xl before:absolute before:left-2",
              )}
              aria-label={theme.name}
              value={theme.value}
              data-theme={theme.value}
              data-set-theme={theme.value}
              onChange={() => setThemeFromLocalStorage()}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
