import { CarbonEmissionPageLayout } from '@/components/Layout/CarbonEmissionPageLayout/CarbonEmissionPageLayoutStyled';
import RideFormView from './view/RideFormView/RideFormView';
import { HeaderView } from './view/HeaderView/HeaderView';

export default function CarbonEmissionPage() {
  return (
    <CarbonEmissionPageLayout>
      <HeaderView>Je calcule mon empreinte carbone</HeaderView>
      <RideFormView />
    </CarbonEmissionPageLayout>
  );
}
