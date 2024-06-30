import { GET_USER_PROFIL } from "@/api-gql/queries/user.queries";
import SelectWithNavigation from "@/components/Nav/SelectWithNavigtion";
import { GetUserProfileQuery, SearchRidesQuery } from "@/gql/graphql";
import {
  checkRideMonthAndYearEquality,
  getMonthWithId,
} from "@/utils/date.utils";
import { useQuery } from "@apollo/client";
import { Stack, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import BarChartMonthEmissions from "./components/charts/BarChartMonthEmissions";
import { SEARCH_RIDES } from "@/api-gql/queries/ride.queries";

import {
  getPieChartRidesCounterByMonthAndYearSeriesData,
  getPieChartRidesCounterSeriesData,
  getPieChartRidesEmissionsSeriesData,
} from "@/utils/chart.utils";
import PieChartCard from "./components/charts/PieChartCard";
import { getNumberFormatedToTwoDecimals } from "@/utils/maths.utils";
import { capitalizeFirstLetter } from "@/utils/typo.utils";
import LegendContainer from "@/components/Container/LegendContainer";
import { STATISTICS_LEGEND_ELEMENTS } from "@/constants/charts.constants";
import {
  StatsDetailsTable,
  StatsDetailsTableColumn,
} from "@/styles/mui-classes";
import TabPanel from "../profil/components/DashboardTabs/TabPanel";
import StatsGlobalTab from "./components/tabs/StatsGlobalTab";
import StatsByMonthTab from "./components/tabs/StatsByMonthTab";

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

  return (
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

      <TabPanel value={tabIndex} index={0}>
        {data && <StatsGlobalTab data={data} />}
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        {data && <StatsByMonthTab data={data} />}
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        Content for the third tab
      </TabPanel>
    </Stack>
  );
};

export default StatisticsPage;
