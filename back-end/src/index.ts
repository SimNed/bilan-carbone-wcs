import "reflect-metadata";
import { Response } from "express";

import User from "./entities/user";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AuthChecker, buildSchema } from "type-graphql";
import Transportation from "./entities/transportation";
import { TransportationResolver } from "./resolvers/TransportationResolver";
import { RideResolver } from "./resolvers/RideResolver";
import { getDataSource } from "./database";
import { UserResolver } from "./resolvers/UserResolver";
import { getUserSessionIdFromCookie } from "./utils/cookie";

export type Context = { res: Response; user: User | null };

const authChecker: AuthChecker<Context> = ({ context }) => {
  return Boolean(context.user);
};

const PORT = 4000;
const startApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [TransportationResolver, RideResolver, UserResolver],
    validate: true,
    authChecker,
  });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req, res }): Promise<Context> => {
      const userSessionId = getUserSessionIdFromCookie(req);
      const user = userSessionId
        ? await User.getUserWithSessionId(userSessionId)
        : null;
      return { res: res as Response, user };
    },
  });

  await getDataSource();
  await Transportation.initializeTransportations();

  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();
