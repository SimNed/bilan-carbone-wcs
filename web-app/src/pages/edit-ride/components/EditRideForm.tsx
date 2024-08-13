import { CREATE_RIDE, UPDATE_RIDE } from "@/api-gql/mutations/ride.mutations";
import { GET_TRANSPORTATIONS } from "@/api-gql/queries/transportation.queries";
import {
  GetTransportationsQuery,
  UpdateRideMutation,
  UpdateRideMutationVariables,
} from "@/gql/graphql";
import { RideData } from "@/type/RideData.type";
import { getDateFormatedInISO8601 } from "@/utils/date.utils";
import { capitalizeFirstLetter } from "@/utils/typo.utils";
import { useQuery, useMutation } from "@apollo/client";
import { Typography, TextField, MenuItem, Button, Stack } from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

interface EditRideFormProps {
  ride: RideData;
  handleCancelEdition: () => void;
}

const EditRideForm = ({ ride, handleCancelEdition }: EditRideFormProps) => {
  const [formData, setFormData] = useState<UpdateRideMutationVariables>({
    id: ride.id,
    label: ride.label,
    distance: ride.distance,
    date: ride.date,
    transportationId: ride.transportation.id,
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
    partialFormData: Partial<UpdateRideMutationVariables>
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [updateRideMutation] = useMutation<
    UpdateRideMutation,
    UpdateRideMutationVariables
  >(UPDATE_RIDE);

  const updateRide = async () => {
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

    await updateRideMutation({
      variables: {
        id: formData.id,
        label: formData.label,
        distance: formData.distance,
        date: formData.date,
        transportationId: formData.transportationId,
      },
      onCompleted: () => {
        router.push("/rides");
        enqueueSnackbar("trajet modifié !", { variant: "success" });
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
      <form
        onSubmit={(event) => {
          event.preventDefault();
          updateRide();
        }}
        style={{ width: "100%", marginTop: "1rem" }}
      >
        <TextField
          defaultValue={formData.label}
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
          defaultValue={formData.distance}
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
          defaultValue={getDateFormatedInISO8601(formData.date)}
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
          defaultValue={formData.transportationId}
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
        <Stack direction="column" gap={1}>
          <Button variant="contained" color="success" type="submit" fullWidth>
            Modifier mon trajet
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={handleCancelEdition}
            sx={{ mb: 4 }}
            fullWidth
          >
            Annuler
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default EditRideForm;
