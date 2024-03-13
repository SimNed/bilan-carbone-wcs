import { DataSource } from 'typeorm';
import 'reflect-metadata';
import { Response } from 'express';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import Transportation from './entities/transportation';
import { TransportationResolver } from './resolvers/TransportationResolver';
import Ride from './entities/ride';
import { RideResolver } from './resolvers/RideResolver';
import User from './entities/user';
import { UserResolver } from './resolvers/UserResolver';

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Transportation, Ride, User],
  synchronize: true,
});

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

  await dataSource.initialize();
  await Transportation.initializeTransportations();

  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();