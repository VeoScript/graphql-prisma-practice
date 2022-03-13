import { NextPage, GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import DefaultErrorPage from 'next/error'
import { useQuery } from '@apollo/client'
import { request } from 'graphql-request'
import { GET_STUDENTS_QUERY, GET_UNIQUE_STUDENT_QUERY } from '../../graphql/modules/queries'
import useSWR from 'swr'
import prisma from '../../lib/Prisma'
import LoadingPage from '../../layouts/loading'
// import { client } from '../../lib/Apollo'

interface IProps {
  params: any
}

const StudentProfile: NextPage<IProps> = ({ params }) => {

  const getId = params.id

  const { data: getStudent } = useQuery(GET_UNIQUE_STUDENT_QUERY, {
    variables: { getId }
  })

  const { data, isValidating, error } = useSWR([GET_UNIQUE_STUDENT_QUERY, getId], (query, getId) => request('/api/graphql', query, { getId }), {
    refreshInterval: 1000,
    fallbackData: getStudent
  })
  
  if (getId !== data?.getStudent.id) {
    if (isValidating) return <LoadingPage />
    return <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <DefaultErrorPage statusCode={404} />
    </>
  }
  
  if (error) return <p>Oh no... {error.message}</p>

  const student = data.getStudent

  return (
    <React.Fragment>
      <Head>
        <title>{ student.name }</title>
      </Head>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex flex-col items-center w-full max-w-xl space-y-10">
          <div className="flex flex-col w-full space-y-1 text-center">
            <h1 className="font-black text-6xl tracking-widest">CERTIFICATE</h1>
            <h3 className="font-medium text-2xl">OF ACHIEVEMENT</h3>
          </div>
          <div className="flex flex-col w-full space-y-1 text-center">
            <h1 className="font-light text-2xl">This certificate is proudly presented to:</h1>
          </div>
          <div className="flex flex-col w-full space-y-1 text-center">
            <h1 className="font-bold text-6xl uppercase">{ student.name }</h1>
          </div>
          <div className="flex flex-col w-full space-y-1 text-center">
            <p className="font-light text-2xl">
              Has successfully acquired { student.gender === 'Male' ? 'his' : 'her' } Degree in <span className="font-bold">{ student.course }</span>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  const { params } = ctx

  // const data = await request('/api/graphql', GET_STUDENTS_QUERY)

  // console.log(data)
  return {
    props: {
      params
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const students = await prisma.student.findMany({
    select: {
      id: true
    }
  })

  return {
    paths: students.map((student: any) => ({
      params: {
        id: student.id
      }
    })),
    fallback: 'blocking'
  }
}

export default StudentProfile