import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import { ContainerBanner } from "@/components/Containers/ContainerBanner";
import { FlexCenteredContainerStyled } from "@/components/Containers/FlexCenteredContainer.styled";
import { ButtonLink } from "@/components/Link/ButtonLink";
import Link from "next/link";
import styled from "styled-components";

const Welcome = () => {
  return (
    <>
      <ContainerBanner $isColumn>
        <h2>Bienvenue</h2>
        <p>Calculer votre empreinte carbone simplement 👇🏻</p>
      </ContainerBanner>
      <FlexCenteredContainerStyled $isColumn>
        <ButtonLink href={"/carbonEmissionPage"}>
          <PrimaryButton $isPrimary style={{ margin: "1rem 0 1rem" }}>
            Je calcule mon empreinte carbone
          </PrimaryButton>
        </ButtonLink>
        <ButtonLink href={"./profil"}>
          <PrimaryButton style={{ margin: "1rem 0 1rem" }}>
            Voir mes statistiques
          </PrimaryButton>
        </ButtonLink>
      </FlexCenteredContainerStyled>
    </>
  );
};

export default Welcome;
