import React, { useRef, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  makeStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import {
  CreateRideFormMutation,
  CreateRideFormMutationVariables,
  GetTransportationsQuery,
} from '@/gql/graphql';
import { enqueueSnackbar } from 'notistack';
import { gql, useMutation, useQuery } from '@apollo/client';
import { capitalizeFirstLetter } from '@/utils';

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
  query GetTransportations {
    transportations {
      label
      id
      carboneEmission
    }
  }
`;

export default function CreateRideForm() {
  const [formData, setFormData] = useState<CreateRideFormMutationVariables>({
    label: '',
    distance: 0,
    date: '',
    transportationId: 1,
  });

  const { data } = useQuery<GetTransportationsQuery>(GET_TRANSPORTATIONS);
  const formRef = useRef<HTMLFormElement>(null);

  const updateFormData = (
    partialFormData: Partial<CreateRideFormMutationVariables>
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [createRideMutation] = useMutation<
    CreateRideFormMutation,
    CreateRideFormMutationVariables
  >(CREATE_RIDE);

  const createRide = async () => {
    const { data } = await createRideMutation({
      variables: {
        label: formData.label,
        distance: formData.distance,
        date: formData.date,
        transportationId: formData.transportationId,
      },
    });

    if (data) {
      enqueueSnackbar('trajet enregistré !', { variant: 'success' });
      if (formRef.current) formRef.current.reset();
    } else {
      enqueueSnackbar("erreur d'enregistrement", { variant: 'error' });
    }
  };

  const handleSubmit = () => {
    // event.preventDefault();
    // Place your authentication logic here
    console.log('Email:');
    console.log('Password:');
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography variant='h5'>Nouveau trajet :</Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createRide();
        }}
        style={{ width: '100%', marginTop: '1rem' }}
      >
        <Typography variant='body1'>Nom du trajet:</Typography>
        <TextField
          variant='outlined'
          onChange={(event) => {
            updateFormData({ label: event.target.value });
          }}
          style={{ marginBottom: '1rem', width: '100%' }}
        />
        <Typography variant='body1'>Distance en km:</Typography>
        <TextField
          onChange={(event) => {
            updateFormData({ distance: parseInt(event.target.value) });
          }}
          variant='outlined'
          style={{ marginBottom: '1rem', width: '100%' }}
        />
        <Typography variant='body1'>Date:</Typography>
        <TextField
          onChange={(event) => {
            updateFormData({
              date: new Date(event.target.value).toISOString(),
            });
          }}
          variant='outlined'
          required
          style={{ marginBottom: '1rem', width: '100%' }}
        />
        <Typography variant='body1'>Moyen de transport:</Typography>
        <Select
          onChange={(event) => {
            updateFormData({
              transportationId: parseInt(event.target.value as string),
            });
          }}
          style={{ width: '100%' }}
        >
          {data?.transportations.map((transportation) => (
            <MenuItem key={transportation.id} value={transportation.id}>
              {capitalizeFirstLetter(transportation.label)}
            </MenuItem>
          ))}
        </Select>
        <div style={{ marginTop: '16px' }}>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            style={{ width: '100%' }}
          >
            Ajouter mon trajet
          </Button>
        </div>
      </form>
    </Container>
  );
}