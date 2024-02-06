import Link from "next/link";
import { HeaderStyled, HeaderTitleSectionStyled } from "./Header.styled";
import LinkButton from "../Buttons/LinkButton/LinkButton";

export default function Header() {
  return (
    <HeaderStyled>
      <HeaderTitleSectionStyled>
        <LinkButton href={"./"}>
          <img
            src="https://www.volaille-francaise.fr/wp-content/uploads/2021/05/nouveau-projet-21.jpg"
            alt="test"
          />
        </LinkButton>
        <h1>Bilan carbone</h1>
      </HeaderTitleSectionStyled>
      <div className="header-user-section">
        <LinkButton href='./sign-up'>se connecter</LinkButton>
      </div>
    </HeaderStyled>
  );
}
