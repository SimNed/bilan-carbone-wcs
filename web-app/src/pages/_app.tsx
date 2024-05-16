import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../apollo-client';
import { SnackbarProvider } from 'notistack';
import { Container } from '@mui/material';

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <SnackbarProvider />
      <Container>
        <Component {...pageProps} />
      </Container>
    </ApolloProvider>
  );
}
