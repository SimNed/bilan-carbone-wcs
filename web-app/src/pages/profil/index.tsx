import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { GET_USER_PROFIL } from "@/api-gql/queries/user.queries";
import { SEARCH_RIDES } from "@/api-gql/queries/ride.queries";
import { RideFilterData } from "@/type/RideFilterData.type";
import { GetUserProfileQuery, SearchRidesQuery } from "@/gql/graphql";
import RideFilters from "./components/RideFilters";
import { useModal } from "@/components/Layout/Layout";

import BarChartMonthEmissions from "./components/BarChartMonthEmissions";

import PieChartRidesByTypeCounter from "./components/PieChartRidesByTypeCounter";
import { HEADER_HEIGHT } from "@/styles/constants";
import RideCard from "./components/RideCard";
import PieChartRidesByTypeEmissions from "./components/PieChartRidesByTypeEmissions";
import { PiePlot, ResponsiveChartContainer } from "@mui/x-charts";

export default function ProfilPage() {
  const { loading, error, data, refetch } =
    useQuery<SearchRidesQuery>(SEARCH_RIDES);

  const { handleCloseModal } = useModal();

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
    <Stack
      direction="row"
      sx={{ background: "tomato", width: "100%", height: "100%" }}
    >
      <Box width="30%" height="100%" sx={{ background: "blue" }}>
        <Stack
          position="fixed"
          width="inherit"
          height="inherit"
          direction="column"
          spacing={4}
          p={8}
          sx={{ background: "aliceblue" }}
        >
          <Typography variant="h6">
            {`${userData?.getUserProfile.firstName} ${userData?.getUserProfile.lastName}`}
          </Typography>
          <RideFilters
            handleRideFilter={handleRideFilter}
            closeModal={handleCloseModal}
          />
        </Stack>
      </Box>
      <Stack
        width="70%"
        height="80%"
        direction="row"
        justifyContent="space-between"
        p={6}
      >
        <Stack
          width="30%"
          height="100%"
          direction="column"
          justifyContent="space-around"
          sx={{ backgroundColor: "salmon" }}
        >
          <Stack
            width="100%"
            height="40%"
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ backgroundColor: "aliceblue" }}
          >
            <PieChartRidesByTypeCounter data={data} />

            <Box flex={1} sx={{ backgroundColor: "yellow" }} textAlign="center">
              <Typography variant="h1">{NbRides}</Typography>
            </Box>
          </Stack>
          <Box width="100%" height="40%" sx={{ backgroundColor: "aliceblue" }}>
            <PieChartRidesByTypeEmissions data={data} />
          </Box>
        </Stack>
        <Stack
          direction="column"
          width="60%"
          height="100%"
          sx={{ backgroundColor: "aliceblue" }}
        >
          <Box width="100%">
            <Stack>
              <Button></Button>
              <Button></Button>
            </Stack>
          </Box>
          <BarChartMonthEmissions data={data} />
        </Stack>
      </Stack>
    </Stack>

    // <div
    //   style={{
    //     display: "flex",
    //     position: "relative",
    //     width: "100%",
    //     height: `calc(100vh - ${HEADER_HEIGHT})`,
    //     background: "tomato",
    //   }}
    // >
    //   <div
    //     style={{
    //       position: "relative",
    //       flex: 1,
    //       height: "100vh",
    //       background: "cornflowerblue",
    //     }}
    //   >
    //     <div
    //       style={{
    //         position: "fixed",
    //         width: "calc((100% / 4) - 1rem)",
    //         background: "gainsboro",
    //         height: `calc(100vh - ${HEADER_HEIGHT})`,
    //         padding: "2rem",
    //       }}
    //     >
    //       <Typography variant="h6">
    //         {`${userData?.getUserProfile.firstName} ${userData?.getUserProfile.lastName}`}
    //       </Typography>
    //       <RideFilters
    //         handleRideFilter={handleRideFilter}
    //         closeModal={handleCloseModal}
    //       />
    //     </div>
    //   </div>

    //   <div style={{ flex: 3, display: "flex", padding: "2rem" }}>
    //     <Stack direction="column" spacing={2}>
    //       <Stack>
    //         <PieChartRidesByTypeEmissions data={data} />
    //         <Typography variant="h6">
    //           total des emissions: {totalCO2}
    //         </Typography>
    //       </Stack>
    //       <Stack>
    //         <PieChartRidesByTypeCounter data={data} />
    //         <Typography variant="h6">total des trajets: {NbRides}</Typography>
    //       </Stack>
    //     </Stack>
    //     <div style={{ flex: 3 }}>
    // <BarChartMonthEmissions data={data} />
    //     </div>
    //   </div>
    // </div>
    // <div
    //   style={{
    //     width: "100%",
    //     display: "flex",
    //     padding: "2rem",
    //     gap: "2rem",
    //     height: "100%",
    //   }}
    // >
    //   <div
    //     style={{
    //       flex: 1,
    //       position: "sticky",
    //       top: `calc(${HEADER_HEIGHT} + 2rem)`,
    //       height: "100vh",
    //     }}
    //   >
    //     <Typography variant="h6">
    //       {`${userData?.getUserProfile.firstName} ${userData?.getUserProfile.lastName}`}
    //     </Typography>
    //     <RideFilters
    //       handleRideFilter={handleRideFilter}
    //       closeModal={handleCloseModal}
    //     />
    //   </div>

    //   <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "column",
    //       flex: 3,
    //       height: "100%",
    //     }}
    //   >
    //     <div style={{ display: "flex", gap: "2rem", height: "100%" }}>
    //       <div
    //         style={{
    //           flex: 1,
    //           display: "flex",
    //           flexDirection: "column",
    //           gap: "2rem",
    //           maxHeight: "100%",
    //         }}
    //       >
    //         <div
    //           style={{
    //             flex: 1,
    //             backgroundColor: "#FFF",
    //             maxHeight: "100%",
    //           }}
    //         >
    //           <PieChartRidesByTypeCounter data={data} />
    //         </div>

    //  <PieChartRidesByTypeEmissions data={data} />
    //       </div>
    //       <div
    //         style={{
    //           flex: 3,
    //           padding: "2rem",
    //           height: "500px",
    //           backgroundColor: "#FFF",
    //         }}
    //       >
    //         <BarChartMonthEmissions data={data} />
    //       </div>
    //     </div>
    //     <div>
    //       <Typography variant="h5" gutterBottom>
    //         Trajets effectués :
    //       </Typography>

    //       {data && data.searchRides.map((ride) => <RideCard ride={ride} />)}
    //     </div>
    //   </div>
    // </div>
  );
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
