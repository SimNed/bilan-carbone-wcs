import React, { useRef, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import {
  CreateRideFormMutation,
  CreateRideFormMutationVariables,
  GetTransportationsQuery,
} from "@/gql/graphql";
import { enqueueSnackbar } from "notistack";
import { useMutation, useQuery } from "@apollo/client";
import { capitalizeFirstLetter } from "@/utils";
import { GET_TRANSPORTATIONS } from "@/api-gql/queries/transportation.queries";
import { CREATE_RIDE } from "@/api-gql/mutations/ride.mutations";
import { useRouter } from "next/router";

export default function CreateRideForm() {
  const [formData, setFormData] = useState<CreateRideFormMutationVariables>({
    label: "",
    distance: 0,
    date: "",
    transportationId: 1,
  });

  const { data } = useQuery<GetTransportationsQuery>(GET_TRANSPORTATIONS);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

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
      enqueueSnackbar("trajet enregistré !", { variant: "success" });
      if (formRef.current) formRef.current.reset();
      // setTimeout(() => {
      //   router.push('/profil');
      // }, 2000);
    } else {
      enqueueSnackbar("erreur d'enregistrement", { variant: "error" });
    }
  };

  const handleSubmit = () => {
    // event.preventDefault();
    // Place your authentication logic here
    console.log("Email:");
    console.log("Password:");
  };

  return (
    <Box width="100%" height="100%">
      <Typography variant="h5">Nouveau trajet :</Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createRide();
        }}
      >
        <Typography variant="body1">Nom du trajet:</Typography>
        <TextField
          variant="outlined"
          onChange={(event) => {
            updateFormData({ label: event.target.value });
          }}
          style={{ marginBottom: "1rem", width: "100%" }}
        />
        <Typography variant="body1">Distance en km:</Typography>
        <TextField
          onChange={(event) => {
            updateFormData({ distance: parseInt(event.target.value) });
          }}
          variant="outlined"
          style={{ marginBottom: "1rem", width: "100%" }}
        />
        <Typography variant="body1">Date:</Typography>
        <TextField
          onChange={(event) => {
            updateFormData({
              date: new Date(event.target.value).toISOString(),
            });
          }}
          type="date"
          variant="outlined"
          required
          style={{ marginBottom: "1rem", width: "100%" }}
        />
        <Typography variant="body1">Moyen de transport:</Typography>
        <Select
          onChange={(event) => {
            updateFormData({
              transportationId: parseInt(event.target.value as string),
            });
          }}
          style={{ width: "100%" }}
        >
          {data?.transportations.map((transportation) => (
            <MenuItem key={transportation.id} value={transportation.id}>
              {capitalizeFirstLetter(transportation.label)}
            </MenuItem>
          ))}
        </Select>
        <div style={{ marginTop: "16px" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ width: "100%" }}
          >
            Ajouter mon trajet
          </Button>
        </div>
      </form>
    </Box>
  );
}
