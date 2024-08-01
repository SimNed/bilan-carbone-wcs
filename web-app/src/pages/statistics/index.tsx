import { GET_USER_PROFIL } from "@/api-gql/queries/user.queries";

import { GetUserProfileQuery, SearchRidesQuery } from "@/gql/graphql";

import { useQuery } from "@apollo/client";
import { Stack, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";

import { SEARCH_RIDES } from "@/api-gql/queries/ride.queries";

import StatsGlobalTab from "./components/tabs/StatsGlobalTab";
import StatsByMonthTab from "./components/tabs/StatsByMonthTab";
import TabNav from "@/components/navs/TabNav";
import Loader from "@/components/loader/Loader";
import { WHITE_COLOR } from "@/styles/constants";
import LegendContainer from "@/components/containers/LegendContainer";
import { STATISTICS_LEGEND_ELEMENTS } from "@/charts.constants";
import SubHeader from "@/components/headers/SubHeader";

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
      <SubHeader
        leftChildren={
          <Stack direction="row" alignItems="center" gap={6}>
            <Typography variant="h5">
              {`${userData?.getUserProfile.firstName} ${userData?.getUserProfile.lastName}`}
            </Typography>

            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              aria-label="simple tabs example"
            >
              <Tab
                label="Global"
                id="global-tab"
                aria-controls="simple-tabpanel-0"
              />
              <Tab
                label="Mois"
                id="month-tab"
                aria-controls="simple-tabpanel-1"
              />
            </Tabs>
          </Stack>
        }
        rightChildren={
          <LegendContainer elements={STATISTICS_LEGEND_ELEMENTS} />
        }
      />

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
