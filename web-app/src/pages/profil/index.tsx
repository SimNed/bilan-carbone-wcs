import { formatDateToDisplay, getDefaultUser } from '@/utils';
import {
  ProfilContentStyled,
  ProfilHeaderStyled,
  RideDetailsStyled,
  RidesContainerStyled,
} from './profil.styled';
import BaseButton from '@/components/Buttons/BaseButton/BaseButton';
import { CenteredContainerStyled } from '@/components/Containers/CenteredContainer.styled';
import { useEffect } from 'react';
import { Input } from '@/components/FormElements/Inputs/Input';
import { gql, useQuery } from '@apollo/client';
import { GetRidesQuery } from '@/gql/graphql';

export default function ProfilPage() {
  const defaultUser = getDefaultUser()
  
  const GET_RIDES = gql`
  query GetRides {
    rides {
      id
      label
      distance
      date
      transportation {
        label
      }
    }
  }
  `
  const { data } = useQuery<GetRidesQuery>(GET_RIDES)

  useEffect(() => {
    console.log("Data", data);
  }, []);

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
        <BaseButton onClick={() => {}}>
          éditer mon profil
        </BaseButton>
      </ProfilHeaderStyled>
      <ProfilContentStyled>
        <Input type='text' label='Filtres' />
        { data && data.rides.length > 0 ? (
          <>
            <h3>Nombre d'empreinte carbone réalisé: {data.rides.length}</h3>
            <h3>Nombre de dépenses réalisées (CO2/Kg): ???</h3>
            <RidesContainerStyled>
              {data.rides.map(
                (ride: {
                  id: string;
                  label: string;
                  distance: number;
                  date: string;
                  transportation: { label: string};
                }) => {
                  return (
                    <RideDetailsStyled key={ride.label + ride.date}>
                      <h4>{ride.label}</h4>
                      <p>{ride.transportation.label}</p>
                      <p>{formatDateToDisplay(ride.date)}</p>
                      <p>distance parcourue: {ride.distance} km</p>
                      <p>dépense carbone: ??? CO2/kg</p>
                    </RideDetailsStyled>
                  );
                }
              )}
            </RidesContainerStyled>
          </>) : (<p>Pas de dépenses carbone enregistrées</p>)}
        
      </ProfilContentStyled>
    </CenteredContainerStyled>
  );
}
