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
    transportationId: 0,
  });

  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState({
    label: "",
    distance: "",
    date: "",
    transportationId: "",
  });

  const { data } = useQuery<GetTransportationsQuery>(GET_TRANSPORTATIONS);
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
    const newFieldErrors = {
      label: formData.label ? "" : "Le nom du trajet est obligatoire.",
      distance:
        formData.distance > 0 ? "" : "Vous devez entrer une distance positive.",
      date: formData.date ? "" : "La date est obligatoire.",
      transportationId:
        data &&
        data.transportations.some(
          (transportation) => transportation.id === formData.transportationId
        )
          ? ""
          : "Vous devez choisir un transport valide.",
    };
    setFieldErrors(newFieldErrors);

    await createRideMutation({
      variables: {
        label: formData.label,
        distance: formData.distance,
        date: formData.date,
        transportationId: formData.transportationId,
      },
      onCompleted: () => {
        router.push("./rides");
        enqueueSnackbar("trajet enregistré !", { variant: "success" });
      },
      onError: () => {
        if (Object.values(newFieldErrors).some((error) => error !== "")) {
          setError("Veuillez remplir tous les champs obligatoires.");
          return;
        }
        setError("Une erreur s'est produite.");
      },
    });
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
        }}
        style={{ width: "100%", marginTop: "1rem" }}
      >
        <TextField
          label="Nom du trajet"
          size="small"
          InputLabelProps={{ shrink: true }}
          onChange={(event) => {
            updateFormData({ label: event.target.value });
            setFieldErrors({ ...fieldErrors, label: "" });
          }}
          error={!!fieldErrors.label}
          helperText={fieldErrors.label}
        />
        <TextField
          type="number"
          label="Distance en km"
          size="small"
          InputProps={{ inputProps: { min: 0 } }}
          InputLabelProps={{ shrink: true }}
          onChange={(event) => {
            updateFormData({ distance: parseInt(event.target.value) });
            setFieldErrors({ ...fieldErrors, distance: "" });
          }}
          error={!!fieldErrors.distance}
          helperText={fieldErrors.distance}
        />
        <TextField
          type="date"
          label="Date"
          size="small"
          InputLabelProps={{ shrink: true }}
          onChange={(event) => {
            updateFormData({
              date: new Date(event.target.value).toISOString(),
            });
            setFieldErrors({ ...fieldErrors, date: "" });
          }}
          error={!!fieldErrors.date}
          helperText={fieldErrors.date}
        />
        <TextField
          select
          label="Moyen de transport"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={formData.transportationId || ""}
          onChange={(event) => {
            updateFormData({
              transportationId: parseInt(event.target.value as string),
            });
            setFieldErrors({ ...fieldErrors, transportationId: "" });
          }}
          sx={{ width: "100%" }}
          error={!!fieldErrors.transportationId}
          helperText={fieldErrors.transportationId}
        >
          {data ? (
            data.transportations.map((transportation) => (
              <MenuItem key={transportation.id} value={transportation.id}>
                {capitalizeFirstLetter(transportation.label)}
              </MenuItem>
            ))
          ) : (
            <MenuItem></MenuItem>
          )}
        </TextField>
        {error && (
          <Typography color="error" style={{ marginBottom: "1rem" }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="success"
          type="submit"
          sx={{ mb: 4 }}
          fullWidth
        >
          Ajouter mon trajet
        </Button>
      </form>
    </Container>
  );
}
