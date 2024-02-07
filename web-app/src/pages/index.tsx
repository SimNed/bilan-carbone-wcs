import LinkButton from '@/components/Buttons/LinkButton/LinkButton';
import {
  PageContentLayout,
  PageLayout,
} from '@/components/Layout/Layout.styled';
import { TitleView } from '@/components/TitleView/TitleView';

export default function HomePage() {
  return (
    <>
      <PageLayout>
        <TitleView>Bienvenue</TitleView>
        <p>Calculer votre empreinte carbone simplement 👇🏻</p>
        <PageContentLayout>
          <LinkButton href='./carbonEmissionPage'>
            Je calcule mon empreinte carbonne
          </LinkButton>
          <LinkButton href='./profil'>Voir mon profil</LinkButton>
        </PageContentLayout>
      </PageLayout>
    </>
  );
}
