import { CarbonEmissionPageLayout } from "@/components/Layout/CarbonEmissionPageLayout/CarbonEmissionPageLayoutStyled";
import RideFormView from "./view/RideFormView/RideFormView";
import { TitleView } from "../../components/TitleView/TitleView";

export default function CarbonEmissionPage() {
  return (
    <CarbonEmissionPageLayout>
      <TitleView>Je calcule mon empreinte carbone</TitleView>
      <RideFormView />
    </CarbonEmissionPageLayout>
  );
}
