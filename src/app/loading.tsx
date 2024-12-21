import { Spinner } from '@/components'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex min-h-[80vh] pb-20 justify-center items-center">
      <Spinner className="w-10 lg:w-16" />
    </div>
  )
}

export default Loading
