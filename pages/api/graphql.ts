import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from '../../graphql/schema'
import { resolvers } from '../../graphql/resolvers'
import { createContext } from '../../graphql/context'
import Cors from 'micro-cors'

// This api route is the GraphQL end-point (Single End-Point)

const cors = Cors()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext
})

const startServer = apolloServer.start()

export default cors(async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Methods',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer

  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false
  }
}