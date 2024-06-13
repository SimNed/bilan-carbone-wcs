import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../apollo-client";
import { SnackbarProvider } from "notistack";
import { Container, ThemeProvider } from "@mui/material";
import Header from "@/components/Header/Header";
import theme from "@/styles/mui-theme";
import { AuthProvider } from "@/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <SnackbarProvider />
          <Header />
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
