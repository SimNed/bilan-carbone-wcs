import RideForm from '../../components/RideForm/RideForm';
import { RideFormViewStyled } from './RideFormView.styled';

export default function RideFormView() {
  return (
    <RideFormViewStyled>
      <h1>Nouveau trajet :</h1>
      <RideForm />
    </RideFormViewStyled>
  );
}
