import LinkButton from "@/components/Buttons/LinkButton/LinkButton";
import { ContainerBanner } from "@/components/Containers/ContainerBanner";
import { FlexCenteredContainerStyled } from "@/components/Containers/FlexCenteredContainer.styled";
import styled from "styled-components";

const Welcome = () => {
  return (
    <>
      <ContainerBanner $isColumn>
        <h2>Bienvenue</h2>
        <p>Calculer votre empreinte carbone simplement 👇🏻</p>
      </ContainerBanner>
      <FlexCenteredContainerStyled $isColumn>
        <LinkButton href='./carbonEmissionPage'>Je calcule mon empreinte carbonne</LinkButton>
      </FlexCenteredContainerStyled>
    </>
  );
};

export default Welcome;
