import React, { useRef, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
} from "@mui/material";
import {
  CreateRideFormMutation,
  CreateRideFormMutationVariables,
  GetTransportationsQuery,
} from "@/gql/graphql";
import { enqueueSnackbar } from "notistack";
import { useMutation, useQuery } from "@apollo/client";
import { capitalizeFirstLetter } from "@/utils/typo.utils";
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

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        p: 6,
      }}
    >
      <Typography variant="h5">Nouveau trajet</Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createRide();
          router.push("./rides");
        }}
        style={{ width: "100%", marginTop: "1rem" }}
      >
        <TextField
          required
          label="Nom du trajet"
          size="small"
          InputLabelProps={{ shrink: true }}
          onChange={(event) => {
            updateFormData({ label: event.target.value });
          }}
        />
        <TextField
          required
          label="Distance en km"
          size="small"
          InputLabelProps={{ shrink: true }}
          onChange={(event) => {
            updateFormData({ distance: parseInt(event.target.value) });
          }}
        />
        <TextField
          required
          label="Date"
          size="small"
          InputLabelProps={{ shrink: true }}
          onChange={(event) => {
            updateFormData({
              date: new Date(event.target.value).toISOString(),
            });
          }}
          type="date"
        />
        <TextField
          required
          select
          label="Moyen de transport"
          size="small"
          onChange={(event) => {
            updateFormData({
              transportationId: parseInt(event.target.value as string),
            });
          }}
          sx={{ width: "100%" }}
        >
          {data?.transportations.map((transportation) => (
            <MenuItem key={transportation.id} value={transportation.id}>
              {capitalizeFirstLetter(transportation.label)}
            </MenuItem>
          ))}
        </TextField>
        <div style={{ marginTop: "16px" }}>
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ mb: 4 }}
            fullWidth
          >
            Ajouter mon trajet
          </Button>
        </div>
      </form>
    </Container>
  );
}
