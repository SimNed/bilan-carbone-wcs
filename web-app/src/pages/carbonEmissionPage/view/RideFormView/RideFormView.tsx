import CarbonEmissionButton from '@/components/Buttons/CarbonEmissionButton/CarbonEmissionButton';
import Form from '@/components/FormElements/Form/Form';
import {
  FormTitle,
  FormViewStyled,
} from '@/components/FormElements/FormView/FormView.styled';
import {
  FormLabelWithField,
  FormSelect,
  FormTextField,
} from '@/components/FormElements/Inputs/FormInputs';

export default function RideFormView() {
  return (
    <>
      <FormViewStyled>
        <FormTitle>Nouveau trajet :</FormTitle>
        <Form>
          <FormLabelWithField>
            Nom du trajet:
            <FormTextField type='text' />
          </FormLabelWithField>
          <FormLabelWithField>
            Distance en km:
            <FormTextField type='text' />
          </FormLabelWithField>
          <FormLabelWithField>
            Date:
            <FormTextField type='date' />
          </FormLabelWithField>
          <FormLabelWithField>
            Moyen de transport:
            <FormSelect>
              <option value=''>Select</option>
              <option value='car'>Voiture</option>
              <option value='bike'>Bus</option>
              <option value='publicTransport'>Avion</option>
            </FormSelect>
          </FormLabelWithField>
          <CarbonEmissionButton />
        </Form>
      </FormViewStyled>
    </>
  );
}
