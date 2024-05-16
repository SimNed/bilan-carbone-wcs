import { formatDateToDisplay } from "@/utils";
import {
  CardTitle,
  RideCO2Emission,
  RideCard,
  RideDate,
  RideDistance,
  RideTransportation,
} from "../../../components/Profil/profil.styled";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import DeleteRide from "./DeleteRide";

const RideDetails = ({
  ride,
}: {
  ride: {
    id: string;
    label: string;
    distance: number;
    date: string;
    transportation: { label: string; carboneEmission: number };
  };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    openModal();
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  //calcul de l'empreinte carbone pour un trajet
  let RideCO2 = 0;
  if (ride) {
    RideCO2 = (ride.distance * ride.transportation.carboneEmission) / 1000;
  }

  if (!ride) return;
  return (
    <RideCard>
      <button onClick={handleOpenModal}>supprimer le trajet</button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <DeleteRide rideId={ride.id} closeModal={closeModal} />
        </Modal>
      )}
      <CardTitle>trajet : {ride.label}</CardTitle>
      <RideDate>date : {formatDateToDisplay(ride.date)}</RideDate>
      <RideTransportation>
        moyen de transport : {ride.transportation.label}
      </RideTransportation>
      <RideDistance>distance parcourue: {ride.distance} km</RideDistance>
      <RideCO2Emission>Emission : {RideCO2} Kg de CO2</RideCO2Emission>
    </RideCard>
  );
};

export default RideDetails;
