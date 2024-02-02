import { CarbonEmissionPageLayout } from '@/components/Layout/CarbonEmissionPageLayout/CarbonEmissionPageLayoutStyled';
import RideFormView from './view/RideFormView/RideFormView';

export default function CarbonEmissionPage() {
  return (
    <CarbonEmissionPageLayout>
      <h1>Carbon emission page</h1>
      <RideFormView />
    </CarbonEmissionPageLayout>
  );
}
