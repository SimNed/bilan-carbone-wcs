import { useMutation } from "@apollo/client";
import { SEARCH_RIDES } from "../../../api-gql/queries/ride.queries";
import { DELETE_RIDE } from "@/api-gql/mutations/ride.mutations";
import { Button, Container, Typography } from "@mui/material";

interface DeleteRideProps {
  rideId: string;
  handleCloseModal: () => void;
}

const DeleteRide = ({ rideId, handleCloseModal }: DeleteRideProps) => {
  const [deleteRideMutation] = useMutation(DELETE_RIDE, {
    onCompleted: () => {
      handleCloseModal();
    },
  });

  const handleDeleteRide = () => {
    deleteRideMutation({
      variables: { id: rideId },
      refetchQueries: [{ query: SEARCH_RIDES, variables: {} }],
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
      <Typography variant="h5" mb={2}>
        Confirmation de suppression
      </Typography>
      <Typography variant="body1" mb={2}>
        Voulez-vous supprimer ce trajet ?
      </Typography>
      <Button
        variant="contained"
        color="success"
        onClick={handleDeleteRide}
        sx={{ mb: 2 }}
        fullWidth
      >
        Oui
      </Button>
      <Button
        variant="outlined"
        color="success"
        onClick={handleCloseModal}
        sx={{ mb: 4 }}
        fullWidth
      >
        Annuler
      </Button>
    </Container>
  );
};

export default DeleteRide;
