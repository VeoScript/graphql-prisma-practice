import { gql } from 'apollo-server-micro'

export const CREATE_STUDENT_MUTATION = gql`
  mutation ($name: String!, $age: String!, $gender: String!, $course: String!) {
    addStudent(name: $name, age: $age, gender: $gender, course: $course) {
      name
      age
      gender
      course
    }
  }
`