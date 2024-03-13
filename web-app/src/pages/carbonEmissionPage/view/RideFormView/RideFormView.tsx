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
import { CreateRideFormMutation, CreateRideFormMutationVariables, MutationCreateRideArgs } from '@/gql/graphql';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const CREATE_RIDE = gql`
  mutation CreateRideForm(
    $label: String!
    $distance: Float!
    $date: DateTimeISO!
    $transportationId: Int!
  ) {
    createRide(
      label: $label
      distance: $distance
      date: $date
      transportationId: $transportationId
    ) {
      id
    }
  }
`;

const GET_TRANSPORTATIONS = gql`
  query Query {
    transportations {
      label
      id
      carboneEmission
    }
  }
`

export default function RideFormView() {
  const [formData, setFormData] = useState<CreateRideFormMutationVariables>({
    label: '',
    distance: 0,
    date: '',
    transportationId: 1,
  });

  const updateFormData = (partialFormData: Partial<CreateRideFormMutationVariables>) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [createRideMutation] = useMutation<CreateRideFormMutation, CreateRideFormMutationVariables>(CREATE_RIDE);

  const createRide = async () => {
    const {data} = await createRideMutation({
      variables: {
        label: formData.label,
        distance: formData.distance,
        date: formData.date,
        transportationId: formData.transportationId,
      },
    });
  };

  return (
    <>
      <FormViewStyled>
        <FormTitle>Nouveau trajet :</FormTitle>
        <Form
          aria-label='form'
          onSubmit={(event) => {
            event.preventDefault();
            console.log(formData)
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
                updateFormData({ date: new Date(event.target.value).toISOString() });
              }}
            />
          </FormLabelWithField>
          <FormLabelWithField>
            Moyen de transport:
            <FormSelect
              required
              onChange={(event) => {
                updateFormData({
                  transportationId: 3,
                });
              }}
            >
              <option value=''>Sélectionner</option>
              <option value='1'>Train</option>
              <option value='2'>Voiture</option>
              <option value='3'>Bus</option>
              <option value='4'>Avion</option>
            </FormSelect>
          </FormLabelWithField>
          <BaseButton>Ajouter mon trajet</BaseButton>
        </Form>
      </FormViewStyled>
    </>
  );
}
