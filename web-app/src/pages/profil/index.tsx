import Form from "@/components/FormElements/Form/Form";
import { Input } from "@/components/FormElements/Input/Input";
import { getDefaultUser, getRideAndCarboneRandomNumbers } from "@/utils";
import { ProfilContentStyled, ProfilHeaderStyled } from "./profil.styled";
import CarbonEmissionButton from "@/components/Buttons/CarbonEmissionButton/CarbonEmissionButton";
import BaseButton from "@/components/Buttons/BaseButton/BaseButton";
import { CenteredContainerStyled } from "@/components/Containers/CenteredContainer.styled";
import { useState } from "react";

export default function ProfilPage() {

    const [defaultUser, setDefaultUser] = useState(getDefaultUser());
    const [defaultRideAndCarbonNumber, setDefaultRideAndCarbonNumber] = useState(getRideAndCarboneRandomNumbers())

  return(
    <CenteredContainerStyled $width="50%">
      <ProfilHeaderStyled>
            <img src='https://www.volaille-francaise.fr/wp-content/uploads/2021/05/nouveau-projet-21.jpg' style={{height: '50px'}}></img>
            <div>
                <h1>{`${defaultUser.firstName} ${defaultUser.lastName}`}</h1>
                <h2>{`${defaultUser.email}`}</h2>
            </div>
            <BaseButton onClick={() => console.log('CLICK')}>éditer mon profil</BaseButton>
      </ProfilHeaderStyled>
      <ProfilContentStyled>
        <Input type="text" label="Filtres"/>
        <h3>Nombre d'empreinte carbone réalisé: {`${defaultRideAndCarbonNumber.ride}`}</h3>
        <h3>Nombre d'empreinte carbone réalisé: {`${defaultRideAndCarbonNumber.carbon}`}</h3>
      </ProfilContentStyled>
    </CenteredContainerStyled>
  );
}
