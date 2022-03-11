  import { gql } from 'apollo-server-micro'

  export const typeDefs = gql`
    # Your Database Tables Here...
    type Student {
      id: String
      name: String
      age: String
      gender: String
      course: String 
    }

    # Your Queries Here...
    type Query {
      students: [Student]!
    }

    # Your Mutations Here...
    type Mutation {
      addStudent(name: String!, age: String!, gender: String!, course: String!): Student!
      updateStudent(id: String!, name: String, age: String, gender: String, course: String): Student!
      deleteStudent(id: String!): Student!
    }
  `