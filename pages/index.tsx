import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Table from '../components/Table'
import CreateForm from '../components/CreateForm'
import { Toaster } from 'react-hot-toast'
import { request } from 'graphql-request'
import { GET_STUDENTS_QUERY } from '../graphql/modules/queries'
import useSWR from 'swr'
import LoadingPage from '../layouts/loading'

const Home: NextPage = () => {

  const { data, error } = useSWR(GET_STUDENTS_QUERY, (query) => request('/api/graphql', query), {
    refreshInterval: 1000
  })

  if (!data) return <LoadingPage />

  if (error) return <p>Oh no... {error.message}</p>

  return (
    <React.Fragment>
      <Head>
        <title>GraphQL + Prisma</title>
      </Head>
      <Toaster
        position="top-right"
        reverseOrder={true}
      />
      <div className="flex flex-col items-center justify-start w-full h-screen space-y-10 py-10 bg-white">
        <div className="flex items-center justify-between w-full max-w-3xl">
          <div className="flex flex-col w-full space-y-1">
            <h1 className="font-bold text-xl">Integration of GraphQL using Prisma and NextJS</h1>
            <h3 className="font-light text-lg">Simple Student Registration Form - Basic (CRUD)</h3>
          </div>
          <div className="flex justify-end w-full max-w-[10rem]">
            <CreateForm />
          </div>
        </div>
        <div className="flex justify-center w-full pb-16">
          <Table students={data.students} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
