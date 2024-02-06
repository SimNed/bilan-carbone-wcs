import { RideFormStyled } from './RideForm.styled';
import {
  FormLabelWithField,
  Select,
  TextField,
} from '../RideFormInput/RideFormInput.styled';
import BaseButton from '@/components/Buttons/BaseButton/BaseButton';

export default function RideForm() {
  return (
    <RideFormStyled>
      <FormLabelWithField>
        Nom du trajet:
        <TextField type='text' />
      </FormLabelWithField>
      <FormLabelWithField>
        Distance en km:
        <TextField type='text' />
      </FormLabelWithField>
      <FormLabelWithField>
        Date:
        <TextField type='date' />
      </FormLabelWithField>
      <FormLabelWithField>
        Moyen de transport:
        <Select>
          <option value=''>Select</option>
          <option value='car'>Voiture</option>
          <option value='bike'>Bus</option>
          <option value='publicTransport'>Avion</option>
        </Select>
      </FormLabelWithField>
      <BaseButton onClick={() => {}}>calcul</BaseButton>
    </RideFormStyled>
  );
}
