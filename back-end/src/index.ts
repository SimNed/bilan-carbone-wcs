import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import Transportation from "./entities/transportation";
import { TransportationResolver } from "./resolvers/TransportationResolver";
import { RideResolver } from "./resolvers/RideResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { getDataSource } from "./database";

const PORT = 4000;
const startApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [TransportationResolver, RideResolver, UserResolver],
    validate: true,
  });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  await getDataSource();
  await Transportation.initializeTransportations();

  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();
