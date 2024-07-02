import { GET_USER_PROFIL } from "@/api-gql/queries/user.queries";

import { GetUserProfileQuery, SearchRidesQuery } from "@/gql/graphql";

import { useQuery } from "@apollo/client";
import { Stack, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";

import { SEARCH_RIDES } from "@/api-gql/queries/ride.queries";

import StatsGlobalTab from "./components/tabs/StatsGlobalTab";
import StatsByMonthTab from "./components/tabs/StatsByMonthTab";
import TabNav from "@/components/navs/TabNav";
import Loader from "@/components/loader/Loader";

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
    <Stack direction="column" sx={{ width: "100%", height: "100%" }}>
      <Stack direction="row" alignItems="center" px={6} spacing={6}>
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
            id="simple-tab-0"
            aria-controls="simple-tabpanel-0"
          />
          <Tab
            label="Mois"
            id="simple-tab-1"
            aria-controls="simple-tabpanel-1"
          />
        </Tabs>
      </Stack>

      <TabNav value={tabIndex} index={0}>
        {data && <StatsGlobalTab data={data} />}
      </TabNav>
      <TabNav value={tabIndex} index={1}>
        {data && <StatsByMonthTab data={data} />}
      </TabNav>
      <TabNav value={tabIndex} index={2}>
        Content for the third tab
      </TabNav>
    </Stack>
  ) : (
    <Loader />
  );
};

export default StatisticsPage;
