import LegendContainer from "@/components/containers/LegendContainer";
import SelectWithNavigation from "@/components/navs/SelectWithNavigtion";
import { STATISTICS_LEGEND_ELEMENTS } from "@/constants/charts.constants";
import {
  StatsDetailsTable,
  StatsDetailsTableColumn,
} from "@/styles/mui-classes";
import {
  getPieChartRidesCounterSeriesData,
  getPieChartRidesEmissionsSeriesData,
  getPieChartRidesCounterByMonthAndYearSeriesData,
} from "@/utils/chart.utils";
import { getNumberFormatedToTwoDecimals } from "@/utils/maths.utils";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import BarChartMonthEmissions from "../charts/BarChartMonthEmissions";
import PieChartCard from "../charts/PieChartCard";
import { SearchRidesQuery } from "@/gql/graphql";
import { useMemo, useState } from "react";
import { getMonthWithId } from "@/utils/date.utils";
import { checkRideMonthAndYearEquality } from "@/utils/ride.utils";

const StatsByMonthTab = ({ data }: { data: SearchRidesQuery }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

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
    <Stack direction="row" flex={1} height="100%">
      <Stack direction="column" flex={2} p={8}>
        <Stack
          flex={1}
          direction="row"
          justifyContent="space-around"
          alignItems="flex-start"
        >
          <Stack flex={1} direction="row" alignItems="center">
            <PieChartCard
              data={data}
              seriesData={data ? getPieChartRidesCounterSeriesData(data) : []}
            />
            <Stack direction="column" alignItems="flex-start">
              <Typography variant="h2">{578}</Typography>
              <Typography paragraph textAlign="center">
                TRAJETS
              </Typography>
            </Stack>
          </Stack>
          <Stack flex={1} direction="row" alignItems="center">
            <PieChartCard
              data={data}
              seriesData={data ? getPieChartRidesEmissionsSeriesData(data) : []}
            />
            <Stack direction="column" alignItems="flex-start">
              <Typography variant="h2">
                {getNumberFormatedToTwoDecimals(10.789795)}
              </Typography>
              <Typography paragraph textAlign="center">
                Co2 EN t
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <LegendContainer elements={STATISTICS_LEGEND_ELEMENTS} gap={12} />
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
                  total={875}
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
                  total={98798}
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

export default StatsByMonthTab;
