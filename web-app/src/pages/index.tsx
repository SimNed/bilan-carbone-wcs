import LinkButton from "@/components/Buttons/LinkButton/LinkButton";
import { ContainerBanner } from "@/components/Containers/ContainerBanner";
import { FlexCenteredContainerStyled } from "@/components/Containers/FlexCenteredContainer.styled";

export default function HomePage() {
  return (
    <>
      <ContainerBanner>
        <h1>Home</h1>
      </ContainerBanner>
      <FlexCenteredContainerStyled $isColumn>
        <LinkButton href='./sign-up'>s'inscrire</LinkButton>
        <LinkButton href='./welcome'>welcome</LinkButton>
      </FlexCenteredContainerStyled>
    </>
  );
}
