import BaseButton from '@/components/Buttons/BaseButton/BaseButton';
import { Form } from '@/components/FormElements/Form/Form.styled';
// import Form from '@/components/FormElements/Form/Form';
import {
  FormTitle,
  FormViewStyled,
} from '@/components/FormElements/FormView/FormView.styled';
import {
  FormLabelWithField,
  FormSelect,
  FormTextField,
} from '@/components/FormElements/Inputs/FormInputs';
import { MutationCreateRideArgs } from '@/gql/graphql';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const CREATE_RIDE = gql`
  mutation CreateRideForm(
    $label: String!
    $distance: Float!
    $date: String!
    $transportation: String!
  ) {
    createRide(
      label: $label
      distance: $distance
      date: $date
      transportation: $transportation
    ) {
      id
      label
      distance
      date
      transportation {
        id
        label
      }
    }
  }
`;

export default function RideFormView() {
  const [formData, setFormData] = useState<MutationCreateRideArgs>({
    label: '',
    distance: 0,
    date: '',
    transportationId: 1,
  });

  const updateFormData = (partialFormData: Partial<MutationCreateRideArgs>) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [createRideMutation] = useMutation<MutationCreateRideArgs>(CREATE_RIDE);

  const createRide = async () => {
    const { data } = await createRideMutation({
      variables: {
        label: formData.label,
        distance: formData.distance,
        date: formData.date,
        transportation: formData.transportationId,
      },
    });
  };

  return (
    <>
      <FormViewStyled>
        <FormTitle>Nouveau trajet :</FormTitle>
        <Form
          onSubmit={(event: { preventDefault: () => void }) => {
            event.preventDefault();
            createRide();
          }}
        >
          <FormLabelWithField>
            Nom du trajet:
            <FormTextField
              type='text'
              required
              minLength={2}
              onChange={(event) => {
                updateFormData({ label: event.target.value });
              }}
            />
          </FormLabelWithField>
          <FormLabelWithField>
            Distance en km:
            <FormTextField
              type='text'
              required
              onChange={(event) => {
                updateFormData({ distance: parseInt(event.target.value) });
              }}
            />
          </FormLabelWithField>
          <FormLabelWithField>
            Date:
            <FormTextField
              type='date'
              required
              onChange={(event) => {
                updateFormData({ date: event.target.value });
              }}
            />
          </FormLabelWithField>
          <FormLabelWithField>
            Moyen de transport:
            <FormSelect
              required
              onChange={(event) => {
                updateFormData({
                  transportationId: parseInt(event.target.value),
                });
              }}
            >
              <option value=''>Sélectionner</option>
              <option value='1'>Train</option>
              <option value='2'>Voiture</option>
              <option value='2'>Bus</option>
              <option value='4'>Avion</option>
            </FormSelect>
          </FormLabelWithField>
          <BaseButton>Ajouter mon trajet</BaseButton>
        </Form>
      </FormViewStyled>
    </>
  );
}
