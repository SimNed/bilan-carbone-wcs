import { useMutation } from '@apollo/client';
import { SEARCH_RIDES } from '../../../api-gql/queries/ride.queries';
import { DELETE_RIDE } from '@/api-gql/mutations/ride.mutations';
import { Box, Button, Modal, Typography } from '@mui/material';

interface DeleteRideProps {
  rideId: string;
  closeModal: () => void;
}

const DeleteRide = ({ rideId, closeModal }: DeleteRideProps) => {
  const [deleteRideMutation] = useMutation(DELETE_RIDE, {
    onCompleted: () => {
      closeModal();
    },
  });

  const handleDeleteRide = () => {
    deleteRideMutation({
      variables: { id: rideId },
      refetchQueries: [{ query: SEARCH_RIDES, variables: {} }],
    });
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <Typography variant='h6' gutterBottom>
          Confirmation de suppression
        </Typography>
        <Typography variant='body1' gutterBottom>
          Voulez-vous supprimer ce trajet ?
        </Typography>
        <Button
          onClick={handleDeleteRide}
          variant='contained'
          color='primary'
          sx={{ mr: 2 }}
        >
          Oui
        </Button>
        <Button onClick={closeModal} variant='contained' color='primary'>
          Annuler
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteRide;
