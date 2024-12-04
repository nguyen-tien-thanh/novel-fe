'use client'

import React from 'react'
import { Button, ChevronUpIcon, Tooltip } from '@/components'

export const ScrollToTopButton = () => {
  const handleScroll = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

  return (
    <div className="z-50 fixed bottom-14 right-1 lg:right-5 animate-bounce hover:animate-none opacity-30 hover:opacity-100 transition-all">
      <Tooltip title="Scroll to top" position="top">
        <Button className="btn-circle btn-outline btn-active no-animation" onClick={handleScroll}>
          <ChevronUpIcon />
        </Button>
      </Tooltip>
    </div>
  )
}
