import { formatDateToDisplay } from '@/utils';
import {
  CardTitle,
  RideCO2Emission,
  RideCard,
  RideDate,
  RideDistance,
  RideTransportation,
} from '../profil.styled';

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
  //calcul de l'empreinte carbone pour un trajet
  let RideCO2 = 0;
  if (ride) {
    RideCO2 = (ride.distance * ride.transportation.carboneEmission) / 1000;
  }

  return (
    <RideCard>
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
