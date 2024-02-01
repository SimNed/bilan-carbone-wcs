import { HeaderStyled } from "./Header.styled";

export default function Header() {
  return (
  <HeaderStyled>
    <div className="header-title-section">
      <img src='https://www.volaille-francaise.fr/wp-content/uploads/2021/05/nouveau-projet-21.jpg' alt='test'/>
      <h1>Bilan carbone</h1>
    </div>
    <div className="header-user-section">
      <button>se connecter</button>
    </div>
  </HeaderStyled>);
}
