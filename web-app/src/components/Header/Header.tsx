import Link from "next/link";
import { HeaderStyled, HeaderTitleSectionStyled } from "./Header.styled";

export default function Header() {
  return (
  <HeaderStyled>
    <HeaderTitleSectionStyled>
        <img src='https://www.volaille-francaise.fr/wp-content/uploads/2021/05/nouveau-projet-21.jpg' alt='test'/>
      <h1>Bilan carbone</h1>
    </HeaderTitleSectionStyled>
    <div className="header-user-section">
    <Link href={'./sign-up'}>se connecter</Link>
    </div>
  </HeaderStyled>);
}
