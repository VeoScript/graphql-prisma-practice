import React from 'react'
import Head from 'next/head'
import CubeLoader from '../utils/CubeLoader'

const LoadingPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Loading...</title>
      </Head>
      <div className="flex flex-col items-center justify-center w-full h-screen space-y-3">
        <CubeLoader />
        <p className="font-light">Loading...</p>
      </div>
    </React.Fragment>
  )
}

export default LoadingPage