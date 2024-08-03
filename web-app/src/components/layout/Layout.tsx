import { Stack } from "@mui/material";
import Header from "@/components/headers/Header";
import { ReactNode, useEffect } from "react";
import { DEFAULT_CONTENT_HEIGHT } from "@/styles/constants";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

const protectedRoutes = ["/rides", "/add-ride", "/statistics"];

const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (protectedRoutes.includes(router.pathname) && !user) {
      router.push("/403");
    }
  }, [user, router]);

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
