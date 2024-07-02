import LegendContainer from "@/components/containers/LegendContainer";
import SelectWithNavigation from "@/components/navs/SelectWithNavigtion";
import { STATISTICS_LEGEND_ELEMENTS } from "@/constants/charts.constants";
import {
  StatsDetailsTable,
  StatsDetailsTableColumn,
} from "@/styles/mui-classes";

import { getNumberFormatedToTwoDecimals } from "@/utils/maths.utils";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import BarChartMonthEmissions from "../charts/BarChartMonthEmissions";

import { SearchRidesQuery } from "@/gql/graphql";
import { useMemo, useState } from "react";
import { getMonthWithId } from "@/utils/date.utils";
import { checkRideMonthAndYearEquality } from "@/utils/ride.utils";
import PieChartMonthRidesEmissions from "../charts/PieChartMonthRidesCounter";
import PieChartRidesCounter from "../charts/PieChartRidesCounter";
import PieChartRidesEmissions from "../charts/PieChartRidesEmissions";

const StatsByMonthTab = ({ data }: { data: SearchRidesQuery }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const rides = useMemo(
    () =>
      data.searchRides.filter((ride) =>
        checkRideMonthAndYearEquality(ride.date, selectedMonth, selectedYear)
      ),
    [data, selectedMonth, selectedYear]
  );

  const CO2ByMonthAndYear = useMemo(() => {
    if (!data || data.searchRides.length === 0) return 10;

    return rides.reduce(
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
            <PieChartRidesCounter rides={rides} />
            <Stack direction="column" alignItems="flex-start">
              <Typography variant="h2">{578}</Typography>
              <Typography paragraph textAlign="center">
                TRAJETS
              </Typography>
            </Stack>
          </Stack>
          <Stack flex={1} direction="row" alignItems="center">
            <PieChartRidesEmissions rides={rides} />
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

      <Stack direction="column" flex={3}>
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
        >
          <StatsDetailsTable>
            <StatsDetailsTableColumn>
              <Stack>
                <Typography variant="h6">TRAJETS</Typography>
              </Stack>
              <Stack>
                <PieChartMonthRidesEmissions
                  data={data}
                  month={selectedMonth}
                  year={selectedYear}
                />
                <Typography variant="h5">{rides.length}</Typography>
              </Stack>
            </StatsDetailsTableColumn>
            <StatsDetailsTableColumn>
              <Stack>
                <Typography variant="h6">Co2 kg</Typography>
              </Stack>
              <Stack>
                <PieChartRidesEmissions rides={rides} />
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
