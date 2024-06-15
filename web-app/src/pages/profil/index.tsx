import { formatDateToDisplay, getDefaultUser } from "@/utils";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardContent, Grid, Typography, Button } from "@mui/material";
import { GET_USER_PROFIL } from "@/api-gql/queries/user.queries";
import { SEARCH_RIDES } from "@/api-gql/queries/ride.queries";
import { RideFilterData } from "@/type/RideFilterData.type";
import { GetUserProfileQuery, SearchRidesQuery } from "@/gql/graphql";
import RideFilters from "./components/RideFilters";
import { useModal } from "@/components/Layout/Layout";
import DeleteRide from "./components/DeleteRide";

export default function ProfilPage() {
  const { loading, error, data, refetch } =
    useQuery<SearchRidesQuery>(SEARCH_RIDES);

  const { handleModalComponent, handleCloseModal } = useModal();

  const { data: userData } = useQuery<GetUserProfileQuery>(GET_USER_PROFIL);

  useEffect(() => {
    refetch();
  }, []);

  const handleRideFilter = (filterData: RideFilterData) => {
    refetch(filterData);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Calcul du nombre de trajets
  let NbRides = 0;
  if (data && data.searchRides.length > 0) {
    NbRides = data.searchRides.length;
  }

  // Calcul de la dépense totale en CO2
  let totalCO2 = 0;
  if (data && data.searchRides.length > 0) {
    totalCO2 = data.searchRides.reduce(
      (accumulator, ride) =>
        accumulator +
        (ride.distance * ride.transportation.carboneEmission) / 1000,
      0
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <div style={{ flex: 1 }}>
        <RideFilters
          handleRideFilter={handleRideFilter}
          closeModal={handleCloseModal}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 3,
        }}
      >
        <div style={{ backgroundColor: "#FFF" }}>
          <Typography variant="h4" style={{ marginBottom: "1.5rem" }}>
            Bienvenue {userData?.getUserProfile.firstName}!
          </Typography>

          <Typography variant="h6" gutterBottom>
            Nombre de trajets réalisés : {NbRides}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Total émission de CO2 : {totalCO2}
          </Typography>
        </div>
        <div>
          <Typography variant="h5" gutterBottom>
            Trajets effectués :
          </Typography>

          <Grid container spacing={3}>
            {data &&
              data.searchRides.map((ride) => (
                <Grid item xs={12} sm={6} md={4} key={ride.id}>
                  <Card
                    style={{
                      width: "110%",
                      marginBottom: "2rem",
                      marginTop: "2rem",
                      position: "relative",
                    }}
                  >
                    <Button
                      onClick={() =>
                        handleModalComponent(
                          <DeleteRide
                            rideId={ride.id}
                            handleCloseModal={handleCloseModal}
                          />
                        )
                      }
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        margin: "0.5rem",
                      }}
                    >
                      X
                    </Button>

                    <CardContent style={{ padding: "1rem" }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        style={{ marginBottom: "0.5rem" }}
                      >
                        {ride.label}
                      </Typography>
                      <div style={{ marginBottom: "0.5rem" }}>
                        <Typography variant="body1">
                          <strong>Date:</strong>{" "}
                          {formatDateToDisplay(ride.date)}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Moyen de transport:</strong>{" "}
                          {ride.transportation.label}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Distance:</strong> {ride.distance} km
                        </Typography>
                        <Typography variant="body1">
                          <strong>Émission CO2:</strong>{" "}
                          {(ride.distance *
                            ride.transportation.carboneEmission) /
                            1000}{" "}
                          kg
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

{
  /* 
<RideFilters
  handleRideFilter={handleRideFilter}
  closeModal={closeFilterModal}
/>; */
}

{
  /* <Button
          variant="contained"
          color="primary"
          onClick={() =>
            handleModalComponent(
              <RideFilters
                handleRideFilter={handleRideFilter}
                closeModal={handleCloseModal}
              />
            )
          }
        >
          Filtrer les trajets
        </Button> */
}
