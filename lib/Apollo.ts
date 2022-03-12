import { ApolloClient, InMemoryCache } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'

let dynamic_uri

if (process.env.NODE_ENV === 'production') {
  dynamic_uri = process.env.PRODUCTION_URI
} else {
  dynamic_uri = 'http://localhost:3000/api/graphql'
}

export const client = new ApolloClient({
  uri: dynamic_uri,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          links: relayStylePagination(),
        },
      },
    },
  }),
})