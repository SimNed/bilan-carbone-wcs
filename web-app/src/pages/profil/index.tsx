import { capitalizeFirstLetter, getDefaultUser } from "@/utils";
import {
  ProfilContentStyled,
  ProfilHeaderStyled,
  RidesContainerStyled,
  TitleCounter,
} from "../../components/Profil/profil.styled";
import BaseButton from "@/components/Buttons/BaseButton/BaseButton";
import { CenteredContainerStyled } from "@/components/Containers/CenteredContainer.styled";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { GetRidesQuery, GetTransportationsQuery } from "@/gql/graphql";
import RideDetails from "./components/RideDetails";
import {
  FormLabelWithField,
  FormSelect,
  FormTextField,
} from "@/components/FormElements/Inputs/FormInputs";

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

  const GET_TRANSPORTATIONS = gql`
    query GetTransportations {
      transportations {
        label
        id
        carboneEmission
      }
    }
  `;

  const { data: rideData, refetch } = useQuery<GetRidesQuery>(GET_RIDES);
  const { data: transportationData } =
    useQuery<GetTransportationsQuery>(GET_TRANSPORTATIONS);

  const [filterData, setFilterData] = useState({
    label: "",
    transportation: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    refetch();
  }, []);

  // Calcul du nombre de trajets
  let NbRides = 0;
  if (rideData && rideData.rides.length > 0) {
    NbRides = rideData.rides.length;
  }

  // Calcul de la dépense totale en CO2
  let totalCO2 = 0;
  if (rideData && rideData.rides.length > 0) {
    totalCO2 = rideData.rides.reduce(
      (accumulator, ride) =>
        accumulator +
        (ride.distance * ride.transportation.carboneEmission) / 1000,
      0
    );
  }

  return (
    <CenteredContainerStyled $width="50%">
      <ProfilHeaderStyled>
        <img
          src="https://www.volaille-francaise.fr/wp-content/uploads/2021/05/nouveau-projet-21.jpg"
          style={{ height: "50px" }}
        ></img>
        <div>
          <h1>{`${defaultUser.firstName} ${defaultUser.lastName}`}</h1>
          <h2>{`${defaultUser.email}`}</h2>
        </div>
        <BaseButton onClick={() => {}}>éditer mon profil</BaseButton>
      </ProfilHeaderStyled>
      <ProfilContentStyled>
        <FormLabelWithField>
          <FormTextField
            placeholder="Nom du trajet"
            onChange={(e) =>
              setFilterData({ ...filterData, label: e.target.value })
            }
          />
        </FormLabelWithField>
        <FormLabelWithField>
          Moyen de transport:
          <FormSelect
            onChange={(e) =>
              setFilterData({ ...filterData, transportation: e.target.value })
            }
          >
            {transportationData?.transportations.map((transportation) => (
              <option value={transportation.id}>
                {capitalizeFirstLetter(transportation.label)}
              </option>
            ))}
          </FormSelect>
        </FormLabelWithField>
        <FormLabelWithField>
          Du :
          <FormTextField
            type="date"
            required
            onChange={(event) => {
              setFilterData({
                ...filterData,
                startDate: new Date(event.target.value).toISOString(),
              });
            }}
          />
        </FormLabelWithField>
        <FormLabelWithField>
          Jusqu'au :
          <FormTextField
            type="date"
            required
            onChange={(event) => {
              setFilterData({
                ...filterData,
                endDate: new Date(event.target.value).toISOString(),
              });
            }}
          />
        </FormLabelWithField>
        {rideData && rideData.rides.length > 0 ? (
          <>
            <TitleCounter>
              Nombre de trajet{NbRides > 1 ? "s" : ""} réalisé
              {NbRides > 1 ? "s" : ""}: {NbRides}
            </TitleCounter>
            <TitleCounter>
              Total émission carbone : {totalCO2} Kg de CO2
            </TitleCounter>
            <RidesContainerStyled>
              {rideData.rides.map(
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
