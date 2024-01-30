import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { CardGrid } from "@/components/CardGrid/CardGrid";
import { CATEGORIES } from "@/components/Layout/Layout";
import Loader from "@/components/Loader/Loader";
import { MainContentTitle } from "@/components/MainContentTitle/MainContentTitle";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { gql, useQuery } from "@apollo/client";
import {
  GetAdsForCategoryQuery,
  GetAdsForCategoryQueryVariables,
} from "@/gql/graphql";

const GET_ADS_FOR_CATEGORY = gql`
  query GetAdsForCategory($category: Float) {
    ads(category: $category) {
      id
      title
      price
    }
  }
`;

export default function Category() {
  const params = useParams();
  const id = params?.id as string;

  const category = CATEGORIES.find((category) => category.id === parseInt(id));
  if (!category) {
    return "La catégorie sélectionnée n'existe pas.";
  }

  const { data, loading, error } = useQuery<
    GetAdsForCategoryQuery,
    GetAdsForCategoryQueryVariables
  >(GET_ADS_FOR_CATEGORY, { variables: { category: category.id } });

  if (loading) {
    return <Loader global />;
  }

  if (error) {
    return "Erreur, veuillez réessayer.";
  }

  if (data) {
    const { ads } = data;

    if (ads.length === 0) {
      return `Aucune annonce dans la catégorie ${category.name}.`;
    }

    return (
      <PageContainer>
        <MainContentTitle>{category.name} – Annonces récentes</MainContentTitle>
        <CardGrid>
          {ads.map((ad) => (
            <ArticleCard
              key={ad.id}
              id={ad.id}
              title={ad.title}
              price={ad.price}
            />
          ))}
        </CardGrid>
      </PageContainer>
    );
  }
}
