import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

import { GetAdsHomePageQuery } from "@/gql/graphql";



export default function HomePage() {
  const [currency, setCurrency] = useState<"EURO" | "DOLLAR">("EURO");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const { data } = useQuery<GetAdsHomePageQuery>(GET_ADS_HOME_PAGE);

  // return (
    // <PageContainer>
    //   <MainContentTitle>Annonces récentes</MainContentTitle>
    //   <CheckboxLabel>
    //     <input type="checkbox" onChange={toggleCurrency} />
    //     Afficher les prix en dollars
    //   </CheckboxLabel>
    //   {/* <PrimaryButton onClick={toggleModal}>Afficher la modale</PrimaryButton> */}
    //   <CardGrid>
    //     {data?.ads ? (
    //       data.ads.map((article) => (
    //         <ArticleCard
    //           key={article.id}
    //           id={article.id}
    //           title={article.title}
    //           price={
    //             currency === "EURO"
    //               ? article.price
    //               : article.price * DOLLAR_IN_EURO
    //           }
    //           currency={currency}
    //         />
    //       ))
    //     ) : (
    //       <Loader global />
    //     )}
    //   </CardGrid>
    //   {isModalOpen && <Modal onClose={toggleModal}>Contenu de la modale</Modal>}
    // </PageContainer>
  // );
}
