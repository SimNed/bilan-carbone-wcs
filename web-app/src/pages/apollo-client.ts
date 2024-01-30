import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "/api",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
