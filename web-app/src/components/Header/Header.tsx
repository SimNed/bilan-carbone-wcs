import Link from "next/link";
import { HeaderStyled, HeaderTitleSectionStyled } from "./Header.styled";
import { ButtonLink } from "../Link/ButtonLink";
import { PrimaryButton } from "../Buttons/PrimaryButton";

export default function Header() {
  return (
    <HeaderStyled>
      <HeaderTitleSectionStyled>
        <ButtonLink href={"./"}>
          <img
            src="https://www.volaille-francaise.fr/wp-content/uploads/2021/05/nouveau-projet-21.jpg"
            alt="test"
          />
        </ButtonLink>
        <h1>Bilan carbone</h1>
      </HeaderTitleSectionStyled>
      <div className="header-user-section">
        <ButtonLink href={"./sign-up"}>
          <PrimaryButton $isPrimary style={{ margin: "1rem 0 1rem" }}>
            Se connecter
          </PrimaryButton>
        </ButtonLink>
      </div>
    </HeaderStyled>
  );
}
