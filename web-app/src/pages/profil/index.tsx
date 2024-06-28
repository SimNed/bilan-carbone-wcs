import { SetStateAction, SyntheticEvent, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { GET_USER_PROFIL } from "@/api-gql/queries/user.queries";
import { SEARCH_RIDES } from "@/api-gql/queries/ride.queries";
import { GetUserProfileQuery, SearchRidesQuery } from "@/gql/graphql";
import { useModal } from "@/components/Layout/Layout";

import DashboardMainTab from "../statistics/components/tabs/MonthEmissionsTab";
import RidesListTab from "../rides/components/RidesList";
import TabPanel from "./components/DashboardTabs/TabPanel";
import { HEADER_HEIGHT } from "@/styles/constants";
import MonthEmissionsTab from "../statistics/components/tabs/MonthEmissionsTab";

export default function ProfilPage() {
  const [tabIndex, setTabIndex] = useState(0);

  const { loading, error, data, refetch } =
    useQuery<SearchRidesQuery>(SEARCH_RIDES);
  const { data: userData } = useQuery<GetUserProfileQuery>(GET_USER_PROFIL);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleTabChange = (_event: SyntheticEvent, index: number) => {
    setTabIndex(index);
  };

  return (
    <Stack direction="column" sx={{ width: "100%", height: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        height={HEADER_HEIGHT}
        sx={{ backgroundColor: "#FFF" }}
        px={6}
        spacing={6}
      >
        <Typography variant="h5">
          {`${userData?.getUserProfile.firstName} ${userData?.getUserProfile.lastName}`}
        </Typography>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="simple tabs example"
        >
          <Tab
            label="Stats"
            id="simple-tab-0"
            aria-controls="simple-tabpanel-0"
          />
          <Tab
            label="Trajets"
            id="simple-tab-1"
            aria-controls="simple-tabpanel-1"
          />
          <Tab
            label="Contact"
            id="simple-tab-2"
            aria-controls="simple-tabpanel-2"
          />
        </Tabs>
      </Stack>

      <TabPanel value={tabIndex} index={0}>
        {data && <MonthEmissionsTab data={data} />}
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        {data && <RidesListTab data={data} />}
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        Content for the third tab
      </TabPanel>
    </Stack>
  );
}

{
  /* <Box width="24%" height="100%">
        <Stack
          position="fixed"
          width="inherit"
          height="inherit"
          direction="column"
          spacing={4}
          p={8}
        >
          <Stack direction="column" justifyContent="space-around" spacing={2}>
            <Stack direction="row" alignItems="center" gap={2}>
              <CircleIcon sx={{ color: CAR_COLOR_CODE }} /> voiture
            </Stack>
            <Stack direction="row" alignItems="center" gap={2}>
              <CircleIcon sx={{ color: BUS_COLOR_CODE }} /> bus
            </Stack>
            <Stack direction="row" alignItems="center" gap={2}>
              <CircleIcon sx={{ color: TRAIN_COLOR_CODE }} /> train
            </Stack>
            <Stack direction="row" alignItems="center" gap={2}>
              <CircleIcon sx={{ color: PLANE_COLOR_CODE }} /> avion
            </Stack>
          </Stack>
          <Button
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
          </Button>
        </Stack>
      </Box>
      <Grid container spacing={2} width="76%" sx={{ backgroundColor: "red" }}>
        <Grid item xs={5}>
          <PieChartCard
            data={data}
            pieSeriesData={data ? getPieChartRidesCounterSeriesData(data) : []}
            total={nbRides}
            cardLabel="trajets totaux"
            unit=""
          />
        </Grid>
        <Grid item xs={5}>
          <PieChartCard
            data={data}
            pieSeriesData={
              data ? getPieChartRidesEmissionsSeriesData(data) : []
            }
            total={totalCO2}
            cardLabel="émissions totales"
            unit="kg"
          />
        </Grid>
        <Grid item xs={10}>
          <BarChartMonthEmissions data={data} />
        </Grid>
      </Grid> */
}

{
  /* <Stack
        width="76%"
        direction="column"
        justifyContent="space-between"
        spacing={4}
        p={6}
      > */
}
{
  /* <Stack direction="row" width="100%" minHeight="50vh" spacing={4}>
          <Stack
            flex={1}
            height="100%"
            direction="column"
            justifyContent="space-between"
            gap={1}
          >
            <PieChartCard
              data={data}
              pieSeriesData={
                data ? getPieChartRidesCounterSeriesData(data) : []
              }
              total={nbRides}
              cardLabel="trajets totaux"
              unit=""
            />
            <PieChartCard
              data={data}
              pieSeriesData={
                data ? getPieChartRidesEmissionsSeriesData(data) : []
              }
              total={totalCO2}
              cardLabel="émissions totales"
              unit="kg"
            />
          </Stack>
          <Stack direction="column" flex={3} height="100%">
            <BarChartMonthEmissions data={data} />
          </Stack>
        </Stack>
        <Stack direction="column">
          <Box>
            <Typography p={2} variant="h5" gutterBottom>
              Trajets
            </Typography>
            <Stack direction="column" spacing={1}>
              {data && data.searchRides.map((ride) => <RideCard ride={ride} />)}
            </Stack>
          </Box>
        </Stack> */
}
{
  /* </Stack> */
}
