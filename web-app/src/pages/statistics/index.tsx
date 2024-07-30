import { GET_USER_PROFIL } from "@/api-gql/queries/user.queries";

import { GetUserProfileQuery, SearchRidesQuery } from "@/gql/graphql";

import { useQuery } from "@apollo/client";
import { Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";

import { SEARCH_RIDES } from "@/api-gql/queries/ride.queries";

import StatsGlobalTab from "./components/tabs/StatsGlobalTab";
import StatsByMonthTab from "./components/tabs/StatsByMonthTab";
import TabNav from "@/components/navs/TabNav";
import Loader from "@/components/loader/Loader";
import { DEFAULT_HEADER_HEIGHT, WHITE_COLOR } from "@/styles/constants";
import LegendContainer from "@/components/containers/LegendContainer";
import { STATISTICS_LEGEND_ELEMENTS } from "@/charts.constants";

const StatisticsPage = () => {
  const { data: userData } = useQuery<GetUserProfileQuery>(GET_USER_PROFIL);
  const { loading, error, data, refetch } =
    useQuery<SearchRidesQuery>(SEARCH_RIDES);

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (_event: SyntheticEvent, index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return !loading ? (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      sx={{ backgroundColor: WHITE_COLOR }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        height={DEFAULT_HEADER_HEIGHT}
        sx={{ backgroundColor: WHITE_COLOR }}
        width="100%"
        position="sticky"
        top={DEFAULT_HEADER_HEIGHT}
        zIndex={100}
      >
        <Grid
          container
          item
          xs={12}
          md={6}
          direction="row"
          justifyContent={{ xs: "space-between", md: "flex-start" }}
          alignItems="center"
          sx={{ backgroundColor: WHITE_COLOR }}
        >
          <Typography variant="h5" mx={4}>
            {`${userData?.getUserProfile.firstName} ${userData?.getUserProfile.lastName}`}
          </Typography>

          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="simple tabs example"
          >
            <Tab
              label="Global"
              id="simple-tab-0"
              aria-controls="simple-tabpanel-0"
            />
            <Tab
              label="Mois"
              id="simple-tab-1"
              aria-controls="simple-tabpanel-1"
            />
          </Tabs>
        </Grid>

        <Grid item xs={12} md={6} height={DEFAULT_HEADER_HEIGHT}>
          <LegendContainer elements={STATISTICS_LEGEND_ELEMENTS} />
        </Grid>
      </Grid>

      <TabNav value={tabIndex} index={0}>
        {data && <StatsGlobalTab data={data} />}
      </TabNav>
      <TabNav value={tabIndex} index={1}>
        {data && <StatsByMonthTab data={data} />}
      </TabNav>
    </Stack>
  ) : (
    <Loader />
  );
};

export default StatisticsPage;
