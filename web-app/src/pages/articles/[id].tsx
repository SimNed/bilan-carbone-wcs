import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { removeQueryParameter } from "@/utils";
import Modal from "@/components/Modal/Modal";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import ArticleDetails from "@/components/ArticleDetails/ArticleDetails";
import Loader from "@/components/Loader/Loader";
import { gql, useQuery } from "@apollo/client";
import { GetAdQuery, GetAdQueryVariables } from "@/gql/graphql";

const AlertBox = styled.div`
  padding: 8px;
  display: grid;
  gap: 8px;
`;

const GET_AD = gql`
  query GetAd($id: ID!) {
    ad(id: $id) {
      id
      title
      price
      description
      owner {
        id
        email
        firstName
        lastName
      }
      createdAt
    }
  }
`;

export default function ArticlePage() {
  const router = useRouter();
  const { id, publishConfirmation } = router.query as {
    id: string;
    publishConfirmation: string | undefined;
  };

  const [showPublishConfirmation, setShowPublishConfirmation] = useState(false);

  const showModal = () => {
    setShowPublishConfirmation(true);
  };
  const hideModal = () => {
    setShowPublishConfirmation(false);
  };

  useEffect(() => {
    if (publishConfirmation) {
      showModal();
      removeQueryParameter("publishConfirmation");
    }
  }, [publishConfirmation]);

  const { data, loading, error } = useQuery<GetAdQuery, GetAdQueryVariables>(
    GET_AD,
    { variables: { id } }
  );

  if (loading) {
    return <Loader global />;
  }

  if (error) {
    return "Erreur lors du chargement (l'article existe-t-il ?)";
  }

  if (data) {
    const { ad } = data;

    return (
      <>
        <ArticleDetails {...ad} />
        {showPublishConfirmation && (
          <Modal onClose={hideModal}>
            <AlertBox>
              L'article {ad.title} a bien été créé.
              <PrimaryButton onClick={hideModal}>OK</PrimaryButton>
            </AlertBox>
          </Modal>
        )}
      </>
    );
  }
}
