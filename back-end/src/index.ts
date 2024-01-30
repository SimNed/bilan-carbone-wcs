import { DataSource } from "typeorm";
import "reflect-metadata";
import { Response } from "express";

import Ad from "./entities/ad";
import Category from "./entities/category";
import Tag from "./entities/tag";
import User from "./entities/user";
import UserSession from "./entities/userSession";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AuthChecker, buildSchema } from "type-graphql";
import { AdResolver } from "./resolvers/AdResolver";
import { TagResolver } from "./resolvers/TagResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { getUserSessionIdFromCookie } from "./utils/cookie";

export type Context = { res: Response; user: User | null };

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Ad, Category, Tag, User, UserSession],
  synchronize: true,
});

const authChecker: AuthChecker<Context> = ({ context }) => {
  return Boolean(context.user);
};

const PORT = 4000;
const startApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [AdResolver, TagResolver, UserResolver],
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

  await dataSource.initialize();
  await Category.initializeCategories();

  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();
