import RideFormView from './view/RideFormView/RideFormView';
import { TitleView } from '../../components/TitleView/TitleView';
import { PageLayout } from '@/components/Layout/Layout.styled';

export default function CarbonEmissionPage() {
  return (
    <PageLayout>
      <TitleView>Je calcule mon empreinte carbone</TitleView>
      <RideFormView />
    </PageLayout>
  );
}
