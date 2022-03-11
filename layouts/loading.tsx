import React from 'react'
import CubeLoader from '../utils/CubeLoader'

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen space-y-3">
      <CubeLoader />
      <p className="font-light">Loading...</p>
    </div>
  )
}

export default LoadingPage