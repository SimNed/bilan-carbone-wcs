import LinkButton from '@/components/Buttons/LinkButton/LinkButton';
import { PageContentLayout } from '@/components/Layout/Layout.styled';

export default function ContentView() {
  return (
    <>
      <PageContentLayout>
        <LinkButton color='SECONDARY' href='./carbonEmissionPage'>
          Je calcule mon empreinte carbonne
        </LinkButton>
        <LinkButton color='SECONDARY' href='./profil'>
          Voir mon profil
        </LinkButton>
      </PageContentLayout>
    </>
  );
}
