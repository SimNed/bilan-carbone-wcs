import { Button, Container, Typography } from "@mui/material";

interface DeleteRideProps {
  rideId: number;
  handleDeleteRideConfirmation: (rideId: number) => void;
  handleCloseModal: () => void;
}

const DeleteRide = ({
  rideId,
  handleDeleteRideConfirmation,
  handleCloseModal,
}: DeleteRideProps) => {
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
        onClick={() => handleDeleteRideConfirmation(rideId)}
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
