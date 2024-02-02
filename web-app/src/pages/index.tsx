import CarbonEmissionButton from "@/components/Buttons/CarbonEmissionButton/CarbonEmissionButton";
import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import { ContainerBanner } from "@/components/Containers/ContainerBanner";
import { FlexCenteredContainerStyled } from "@/components/Containers/FlexCenteredContainer.styled";
import { ButtonLink } from "@/components/Link/ButtonLink";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <ContainerBanner>
        <h1>Home</h1>
      </ContainerBanner>
      <FlexCenteredContainerStyled $isColumn>
        <ButtonLink href={"./sign-up"}>
          <PrimaryButton style={{ margin: "1rem 0 1rem" }}>
            S'inscrire
          </PrimaryButton>
        </ButtonLink>
        <ButtonLink href={"./Welcome"}>
          <PrimaryButton $isPrimary style={{ margin: "1rem 0 1rem" }}>
            Accueil
          </PrimaryButton>
        </ButtonLink>
        <CarbonEmissionButton />
      </FlexCenteredContainerStyled>
    </>
  );
}
