import { ReactNode } from "react";
import Head from "next/head";

import Header from "../Header/Header";
import { MainContent } from "./Layout.styled";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>The Good Corner</title>
        <meta
          name="description"
          content="The Good Corner, pour acheter et vendre vos articles neufs et d'occasion."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <MainContent>{children}</MainContent>
    </>
  );
}
