import { ReactNode } from "react";
import Head from "next/head";

import Header from "../Header/Header";
import { LayoutContainerStyled, MainContentContainerStyled } from "./Layout.styled";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Bilan Carbone</title>
        <meta
          name="description"
          content="Mesurer son impact carbone"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LayoutContainerStyled>
        <Header />
        <MainContentContainerStyled>{children}</MainContentContainerStyled>
      </LayoutContainerStyled>
    </>
  );
}
