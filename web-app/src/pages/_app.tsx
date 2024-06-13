import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../apollo-client";
import { SnackbarProvider } from "notistack";
import { Container } from "@mui/material";
import { AuthProvider } from "@/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <SnackbarProvider>
        <AuthProvider>
          <Container>
            <Component {...pageProps} />
          </Container>
        </AuthProvider>
      </SnackbarProvider>
    </ApolloProvider>
  );
}
