import "reflect-metadata";
import { Response, Request } from "express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AuthChecker, buildSchema } from "type-graphql";
import Transportation from "./entities/transportation";
import User from "./entities/user";
import { TransportationResolver } from "./resolvers/TransportationResolver";
import { RideResolver } from "./resolvers/RideResolver";
import { getDataSource } from "./database";
import { UserResolver } from "./resolvers/UserResolver";
import { createUser } from "./fixtures/user";
import { createRides } from "./fixtures/ride";
import { parse } from "cookie";

export type Context = {
  req: Request;
  res: Response;
  user: User | null;
  userSessionId: string | undefined;
};

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
      const cookies = parse(req.headers.cookie || "");
      const userSessionId = cookies.userSessionId;
      const user = userSessionId
        ? await User.getUserWithSessionId(userSessionId)
        : null;
      return { req: req as Request, res: res as Response, user, userSessionId };
    },
  });

  await getDataSource();

  await Transportation.initializeTransportations();

  if (process.env.NODE_ENV === "dev") {
    const user = await createUser();
    await createRides(50, user);
  }

  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();
