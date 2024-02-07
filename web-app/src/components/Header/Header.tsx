import { HeaderStyled, HeaderTitleSectionStyled } from './Header.styled';
import LinkButton from '../Buttons/LinkButton/LinkButton';
import LinkImageButton from '../Buttons/LinkImageButton/LinkImageButton';

export default function Header() {
  return (
    <HeaderStyled>
      <HeaderTitleSectionStyled>
        <LinkImageButton
          href='./'
          src='https://www.volaille-francaise.fr/wp-content/uploads/2021/05/nouveau-projet-21.jpg'
          alt='bilan carbone logo'
        />
        <h1>Bilan carbone</h1>
      </HeaderTitleSectionStyled>
      <div className='header-user-section'>
        <LinkButton color='PRIMARY' href='./sign-up'>
          se connecter
        </LinkButton>
      </div>
    </HeaderStyled>
  );
}
