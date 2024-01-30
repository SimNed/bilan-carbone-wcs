import { ReactNode } from "react";
import Head from "next/head";

import Header from "../Header/Header";
import { MainContent } from "./Layout.styled";

export const CATEGORIES = [
  { id: 1, name: "Ameublement" },
  { id: 2, name: "Électroménager" },
  { id: 3, name: "Photographie" },
  { id: 4, name: "Informatique" },
  { id: 5, name: "Téléphonie" },
  { id: 6, name: "Vélos" },
  { id: 7, name: "Véhicules" },
  { id: 8, name: "Sport" },
  { id: 9, name: "Habillement" },
  { id: 10, name: "Bébé" },
  { id: 11, name: "Outillage" },
  { id: 12, name: "Services" },
  { id: 13, name: "Vacances" },
];

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
