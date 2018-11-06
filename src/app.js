import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";

import typeDefs from "./data/schema";
import resolvers from "./data/resolvers";
import SpotifyAPI from "./data/datasource";

const PORT = process.env.PORT || 4000;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ spotifyAPI: new SpotifyAPI() }),
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      const { authorization } = connection.context;
      return { authorization };
    }
    const { authorization } = req.headers;

    if (!authorization) throw new AuthorizationError("you must be authorize");

    return {
      authorization
    };
  }
});

server.applyMiddleware({ app });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  // eslint-disable-next-line
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  // eslint-disable-next-line
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${
      server.subscriptionsPath
    }`
  );
});
