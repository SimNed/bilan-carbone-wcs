import { formatDateToDisplay, getDefaultUser } from '@/utils';
import {
  ProfilContentStyled,
  ProfilHeaderStyled,
  RideDetailsStyled,
  RidesContainerStyled,
} from './profil.styled';
import BaseButton from '@/components/Buttons/BaseButton/BaseButton';
import { CenteredContainerStyled } from '@/components/Containers/CenteredContainer.styled';
import { useEffect, useState } from 'react';
import { Input } from '@/components/FormElements/Inputs/Input';

export default function ProfilPage() {
  const [defaultUser, setDefaultUser] = useState(getDefaultUser());

  useEffect(() => {
    console.log(defaultUser.rides);
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
        <BaseButton onClick={() => console.log('CLICK')}>
          éditer mon profil
        </BaseButton>
      </ProfilHeaderStyled>
      <ProfilContentStyled>
        <Input type='text' label='Filtres' />
        <h3>Nombre d'empreinte carbone réalisé: {defaultUser.rides.length}</h3>
        <h3>Nombre de dépenses réalisées (CO2/Kg): ???</h3>
        <RidesContainerStyled>
          {defaultUser.rides.map(
            (ride: {
              label: string;
              distance: number;
              date: string;
              carbon: number;
            }) => {
              let formatedDate = new Date(ride.date);

              return (
                <RideDetailsStyled>
                  <h4>{ride.label}</h4>
                  <p>{formatDateToDisplay(ride.date)}</p>
                  <p>distance parcourue: {ride.distance} km</p>
                  <p>dépense carbone: ??? CO2/kg</p>
                </RideDetailsStyled>
              );
            }
          )}
        </RidesContainerStyled>
      </ProfilContentStyled>
    </CenteredContainerStyled>
  );
}
