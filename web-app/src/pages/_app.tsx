import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../apollo-client";
import { ThemeProvider } from "@mui/material";
import theme from "@/styles/mui-theme";
import { AuthProvider } from "@/AuthProvider";
import Layout from "@/components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
