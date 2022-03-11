import { gql } from 'apollo-server-micro'

export const GET_STUDENTS_QUERY = gql`
  query getStudents {
    students {
      id
      name
      age
      gender
      course
    }
  }
`