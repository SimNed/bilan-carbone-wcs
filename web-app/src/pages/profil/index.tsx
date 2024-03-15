import { formatDateToDisplay, getDefaultUser } from '@/utils';
import {
  ProfilContentStyled,
  ProfilHeaderStyled,
  RidesContainerStyled,
  TitleCounter,
} from './profil.styled';
import BaseButton from '@/components/Buttons/BaseButton/BaseButton';
import { CenteredContainerStyled } from '@/components/Containers/CenteredContainer.styled';
import { useEffect } from 'react';
import { Input } from '@/components/FormElements/Inputs/Input';
import { gql, useQuery } from '@apollo/client';
import { GetRidesQuery } from '@/gql/graphql';
import RideDetails from './components/RideDetails';

export default function ProfilPage() {
  const defaultUser = getDefaultUser();

  const GET_RIDES = gql`
    query GetRides {
      rides {
        id
        label
        distance
        date
        transportation {
          id
          label
          carboneEmission
        }
      }
    }
  `;
  const { data } = useQuery<GetRidesQuery>(GET_RIDES);

  useEffect(() => {
    console.log('Data', data);
  }, []);

  // Calcul du nombre de trajets
  let NbRides = 0;
  if (data && data.rides.length > 0) {
    NbRides = data.rides.length;
  }

  // Calcul de la dépense totale en CO2
  let totalCO2 = 0;
  if (data && data.rides.length > 0) {
    totalCO2 = data.rides.reduce(
      (accumulator, ride) =>
        accumulator +
        (ride.distance * ride.transportation.carboneEmission) / 1000,
      0
    );
  }

  return (
    <CenteredContainerStyled $width='50%'>
      <ProfilHeaderStyled>
        <img
          src='https://www.volaille-francaise.fr/wp-content/uploads/2021/05/nouveau-projet-21.jpg'
          style={{ height: '50px' }}
        ></img>
        <div>
          <h1>{`${defaultUser.firstName} ${defaultUser.lastName}`}</h1>
          <h2>{`${defaultUser.email}`}</h2>
        </div>
        <BaseButton onClick={() => {}}>éditer mon profil</BaseButton>
      </ProfilHeaderStyled>
      <ProfilContentStyled>
        <Input type='text' label='Filtres' />
        {data && data.rides.length > 0 ? (
          <>
            <TitleCounter>
              Nombre de trajet{NbRides > 1 ? 's' : ''} réalisé
              {NbRides > 1 ? 's' : ''}: {NbRides}
            </TitleCounter>
            <TitleCounter>
              Total émission carbone : {totalCO2} Kg de CO2
            </TitleCounter>
            <RidesContainerStyled>
              {data.rides.map(
                (ride: {
                  id: string;
                  label: string;
                  distance: number;
                  date: string;
                  transportation: { label: string; carboneEmission: number };
                }) => {
                  return (
                    <RideDetails key={ride.label + ride.date} ride={ride} />
                  );
                }
              )}
            </RidesContainerStyled>
          </>
        ) : (
          <TitleCounter>Pas de dépenses carbone enregistrées</TitleCounter>
        )}
      </ProfilContentStyled>
    </CenteredContainerStyled>
  );
}
