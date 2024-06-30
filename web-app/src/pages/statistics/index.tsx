import { GET_USER_PROFIL } from "@/api-gql/queries/user.queries";
import SelectWithNavigation from "@/components/Nav/SelectWithNavigtion";
import { GetUserProfileQuery, SearchRidesQuery } from "@/gql/graphql";
import {
  checkRideMonthAndYearEquality,
  getMonthWithId,
} from "@/utils/date.utils";
import { useQuery } from "@apollo/client";
import { Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
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

const StatisticsPage = () => {
  const { data: userData } = useQuery<GetUserProfileQuery>(GET_USER_PROFIL);
  const { loading, error, data, refetch } =
    useQuery<SearchRidesQuery>(SEARCH_RIDES);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    refetch();
  }, [refetch]);

  const totalRides = useMemo(
    () => (data && data.searchRides.length > 0 ? data.searchRides.length : 0),
    [data]
  );

  const ridesByMonthAndYear = useMemo(
    () =>
      data && data.searchRides.length > 0
        ? data.searchRides.filter((ride) =>
            checkRideMonthAndYearEquality(
              ride.date,
              selectedMonth,
              selectedYear
            )
          ).length
        : 0,
    [data, selectedMonth, selectedYear]
  );

  const totalCO2 = useMemo(() => {
    return data && data.searchRides.length > 0
      ? data.searchRides.reduce(
          (accumulator, ride) =>
            accumulator +
            (ride.distance * ride.transportation.carboneEmission) / 1000,
          0
        )
      : 0;
  }, [data]);

  const CO2ByMonthAndYear = useMemo(() => {
    if (!data || data.searchRides.length === 0) return 0;

    return data.searchRides
      .filter((ride) =>
        checkRideMonthAndYearEquality(ride.date, selectedMonth, selectedYear)
      )
      .reduce(
        (accumulator, ride) =>
          accumulator +
          (ride.distance * ride.transportation.carboneEmission) / 1000,
        0
      );
  }, [data, selectedYear, selectedMonth]);

  const monthSelectItems = [];
  for (let i = 0; i < 12; i++) {
    monthSelectItems.push({ label: getMonthWithId(i), value: i });
  }

  const yearSelectItems = [];
  for (let i = 1900; i <= 2024; i++) {
    yearSelectItems.push({ label: i, value: i });
  }

  return (
    <Stack direction="row" flex={5} spacing={2} height="100%">
      <Stack direction="column" flex={2}>
        <Stack flex={4} justifyContent="center" alignItems="center">
          <Typography variant="h2">
            {`${userData?.getUserProfile.firstName} ${userData?.getUserProfile.lastName}`}
          </Typography>
          <LegendContainer elements={STATISTICS_LEGEND_ELEMENTS} gap={8} />
        </Stack>
        <Stack flex={1} justifyContent="center" alignItems="center">
          <PieChartCard
            data={data}
            pieSeriesData={data ? getPieChartRidesCounterSeriesData(data) : []}
            total={totalRides}
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
      </Stack>

      <Stack
        direction="column"
        flex={3}
        // sx={{ backgroundColor: "red" }}
      >
        <Stack direction="row" flex={1}>
          <SelectWithNavigation
            isReversed
            handleSelectChange={(value) => setSelectedYear(value as number)}
            selectItems={yearSelectItems}
            selectValue={{ label: selectedYear, value: selectedYear }}
          />
          <SelectWithNavigation
            isRightButtonEnable={
              new Date(selectedYear, selectedMonth + 1) <= new Date()
            }
            handleSelectChange={(value) => setSelectedMonth(value as number)}
            selectItems={monthSelectItems}
            selectValue={{ label: selectedMonth, value: selectedMonth }}
          />
        </Stack>
        <Stack flex={4}>
          <BarChartMonthEmissions
            data={data}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </Stack>
        <Stack
          flex={2}
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          // sx={{ backgroundColor: "blue" }}
        >
          <StatsDetailsTable>
            <StatsDetailsTableColumn>
              <Stack>
                <Typography variant="h6">TRAJETS</Typography>
              </Stack>
              <Stack>
                <PieChartCard
                  data={data}
                  pieSeriesData={
                    data
                      ? getPieChartRidesCounterByMonthAndYearSeriesData(
                          data,
                          selectedMonth,
                          selectedYear
                        )
                      : []
                  }
                  total={totalRides}
                  cardLabel="trajets totaux"
                  unit=""
                />
                <Typography variant="h5">{ridesByMonthAndYear}</Typography>
              </Stack>
            </StatsDetailsTableColumn>
            <StatsDetailsTableColumn>
              <Stack>
                <Typography variant="h6">Co2 kg</Typography>
              </Stack>
              <Stack>
                <PieChartCard
                  data={data}
                  pieSeriesData={
                    data ? getPieChartRidesCounterSeriesData(data) : []
                  }
                  total={totalRides}
                  cardLabel="trajets totaux"
                  unit=""
                />
                <Typography variant="h5">
                  {getNumberFormatedToTwoDecimals(CO2ByMonthAndYear)}
                </Typography>
              </Stack>
            </StatsDetailsTableColumn>
          </StatsDetailsTable>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default StatisticsPage;
