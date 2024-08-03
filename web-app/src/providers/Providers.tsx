import theme from "@/styles/mui-theme";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { ModalProvider } from "./ModalProvider";
import createApolloClient from "@/apollo-client";

const Providers = ({ children }: { children: ReactNode }) => {
  const apolloClient = createApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <SnackbarProvider>{children}</SnackbarProvider>
          </ModalProvider>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default Providers;
