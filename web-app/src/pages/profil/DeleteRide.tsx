import { gql, useMutation } from "@apollo/client";

interface DeleteRideProps {
  rideId: string;
  closeModal: () => void;
}

const DeleteRide = ({ rideId, closeModal }: DeleteRideProps) => {
  const DELETE_RIDE = gql`
    mutation DeleteRide($id: ID!) {
      deleteRide(id: $id) {
        id
        label
      }
    }
  `;

  const [deleteRideMutation] = useMutation(DELETE_RIDE, {
    variables: { id: rideId },
    onCompleted: () => {
      closeModal();
    },
  });

  const handleDeleteRide = () => {
    deleteRideMutation();
  };

  return (
    <div>
      <p>Voulez-vous supprimer ce trajet ?</p>
      <button onClick={handleDeleteRide}>Oui</button>
      <button onClick={closeModal}>Annuler</button>
    </div>
  );
};

export default DeleteRide;
