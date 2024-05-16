import { useMutation } from "@apollo/client";
import { SEARCH_RIDES } from "../../api-gql/queries/ride.queries";
import { DELETE_RIDE } from "@/api-gql/mutations/ride.mutations";

interface DeleteRideProps {
  rideId: string;
  closeModal: () => void;
}

const DeleteRide = ({ rideId, closeModal }: DeleteRideProps) => {
  const [deleteRideMutation] = useMutation(DELETE_RIDE, {
    variables: { id: rideId },
    onCompleted: () => {
      closeModal();
    },
    refetchQueries: [{ query: SEARCH_RIDES }],
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
