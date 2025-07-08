import React from 'react'

export default function VideoForSide() {
  return (
    <div className="hidden sm:flex overflow-hidden w-full min-w-1/2 h-full items-center justify-center">
        <video
          loop
          muted
          autoPlay
          className="w-full scale-130 h-full "
          src="/video.webm"
        ></video>
      </div>
  )
}
