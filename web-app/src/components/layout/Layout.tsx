import { Stack } from "@mui/material";
import Header from "@/components/headers/Header";
import { ReactNode } from "react";
import { DEFAULT_CONTENT_HEIGHT } from "@/styles/constants";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Stack maxWidth="100%" minHeight="100vh" component="main">
        <Header />
        <Stack
          maxWidth="inherit"
          minHeight={DEFAULT_CONTENT_HEIGHT}
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </Stack>
      </Stack>
    </>
  );
};

export default Layout;
