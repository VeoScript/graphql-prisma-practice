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

export const UPDATE_STUDENT_MUTATION = gql`
  mutation ($getId: String!, $name: String, $age: String, $gender: String, $course: String) {
    updateStudent(id: $getId, name: $name, age: $age, gender: $gender, course: $course) {
      id
      name
      age
      gender
      course
    }
  }
`

export const DELETE_STUDENT_MUTATION = gql`
  mutation ($getId: String!) {
    deleteStudent(id: $getId) {
      id
    }
  }
`