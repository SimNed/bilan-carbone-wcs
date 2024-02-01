import Link from 'next/link';
import { CarbonEmissionButtonStyled } from './CarbonEmissionButton.styled';

export default function CarbonEmissionButton() {
  return (
    <Link href='/carbonEmissionPage'>
      <CarbonEmissionButtonStyled>Ajouter un trajet</CarbonEmissionButtonStyled>
    </Link>
  );
}
