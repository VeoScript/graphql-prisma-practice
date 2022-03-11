import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Table from '../components/Table'
import CreateForm from '../components/CreateForm'
import { request } from 'graphql-request'
import { GET_STUDENTS_QUERY } from '../graphql/modules/queries'
import useSWR from 'swr'

const Home: NextPage = () => {

  const { data, error } = useSWR(GET_STUDENTS_QUERY, (query) =>request('/api/graphql', query), {
    refreshInterval: 1000
  })

  if (!data) return <p>Loading...</p>

  if (error) return <p>Oh no... {error.message}</p>

  return (
    <React.Fragment>
      <Head>
        <title>GraphQL + Prisma</title>
      </Head>
      <div className="flex flex-col items-center justify-start w-full h-screen space-y-10 py-10 bg-white">
        <div className="flex justify-between w-full max-w-3xl">
          <div className="flex flex-col space-y-1">
            <h1 className="font-bold text-xl">Integration of GraphQL using Prisma and NextJS</h1>
            <h3 className="font-light text-lg">Simple Student Registration Form - Basic (CRUD)</h3>
          </div>
          <div className="flex-">
            <CreateForm />
          </div>
        </div>
        <Table students={data.students} />
      </div>
    </React.Fragment>
  )
}

export default Home
