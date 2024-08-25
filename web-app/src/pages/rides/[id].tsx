import { GET_RIDE } from "@/api-gql/queries/ride.queries";
import Loader from "@/components/loader/Loader";
import { GetRideQuery, GetRideQueryVariables } from "@/gql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";

import { DELETE_RIDE } from "@/api-gql/mutations/ride.mutations";
import { useModal } from "@/providers/ModalProvider";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import EditRideForm from "./components/EditRideForm";
import { getDateFormatedForDisplay } from "@/utils/date.utils";
import { CO2_KG_UNIT_LABEL } from "@/charts.constants";
import { getNumberFormatedToTwoDecimals } from "@/utils/maths.utils";
import { getRideEmissionsInKg } from "@/utils/ride.utils";
import DeleteRide from "../my-rides/components/DeleteRide";

const EditRide = () => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { handleModalComponent, handleCloseModal } = useModal();

  const { data, loading, error } = useQuery<
    GetRideQuery,
    GetRideQueryVariables
  >(GET_RIDE, {
    variables: { id },
  });

  const [deleteRideMutation] = useMutation(DELETE_RIDE, {
    onCompleted: () => {
      handleCloseModal();
      enqueueSnackbar("trajet supprimé.", { variant: "info" });
    },
    onError: () => {
      enqueueSnackbar("le trajet n'a pas pu être supprimé.", {
        variant: "error",
      });
    },
  });

  const handleDeleteRide = (rideId: string) => {
    handleModalComponent(
      <DeleteRide
        rideId={rideId}
        handleDeleteRideConfirmation={handleDeleteRideConfirmation}
        handleCloseModal={handleCloseModal}
      />
    );
  };

  const handleDeleteRideConfirmation = (rideId: string) => {
    router.push("/my-rides");
    deleteRideMutation({
      variables: { id: rideId },
    });
  };

  if (error) {
    return (
      <Container>Une erreur est survenue, ce trajet n'existe pas</Container>
    );
  }

  return !loading && data ? (
    <Container>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h2">{data.ride.label}</Typography>
        <Stack direction="row" flexWrap="wrap">
          <Button
            variant={isInEditMode ? "contained" : "outlined"}
            color="primary"
            onClick={() => setIsInEditMode(true)}
            style={{
              margin: "0.5rem",
            }}
          >
            <EditIcon />
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteRide(data.ride.id)}
            style={{
              margin: "0.5rem",
            }}
          >
            <DeleteOutlineIcon />
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{ my: 2 }} />
      {isInEditMode ? (
        <EditRideForm
          ride={data.ride}
          handleCancelEdition={() => setIsInEditMode(false)}
        />
      ) : (
        <Stack direction="column" gap={2}>
          <Typography variant="h3">
            {getDateFormatedForDisplay(data.ride.date)}
          </Typography>
          <Typography variant="h4">{data.ride.transportation.label}</Typography>
          <Typography variant="h4">{data.ride.distance} km</Typography>
          <Typography variant="h4">
            {getNumberFormatedToTwoDecimals(getRideEmissionsInKg(data.ride))}{" "}
            {CO2_KG_UNIT_LABEL}
          </Typography>
        </Stack>
      )}
    </Container>
  ) : (
    <Loader />
  );
};

export default EditRide;
