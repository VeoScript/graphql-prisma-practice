import { gql } from 'apollo-server-micro'

export const GET_STUDENTS_QUERY = gql`
  query Students {
    students {
      id
      name
      age
      gender
      course
    }
  }
`

export const GET_UNIQUE_STUDENT_QUERY = gql`
  query Student($getId: String!) {
    getStudent(id: $getId) {
      id
      name
      age
      gender
      course
    }
  }
`