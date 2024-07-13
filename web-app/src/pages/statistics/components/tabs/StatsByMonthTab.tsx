import LegendContainer from "@/components/containers/LegendContainer";
import SelectWithNavigation from "@/components/navs/SelectWithNavigtion";
import { STATISTICS_LEGEND_ELEMENTS } from "@/constants/charts.constants";

import { getNumberFormatedToTwoDecimals } from "@/utils/maths.utils";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import BarChartMonthEmissions from "../charts/BarChartMonthEmissions";

import { SearchRidesQuery } from "@/gql/graphql";
import { useMemo, useState } from "react";
import { getMonthWithId } from "@/utils/date.utils";
import { checkRideMonthAndYearEquality } from "@/utils/ride.utils";
import PieChartRidesCounter from "../charts/PieChartRidesCounter";
import PieChartRidesEmissions from "../charts/PieChartRidesEmissions";

import RidesCounterDateComparator from "../RidesCounterDateComparator";
import { BLACK_COLOR, GRAY_COLOR, PRIMARY_COLOR } from "@/styles/constants";
import { capitalizeFirstLetter } from "@/utils/typo.utils";

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
      <Stack direction="column" flex={2} p={8} justifyContent="flex-start">
        <Stack>
          <Typography variant="h2">{`${capitalizeFirstLetter(
            getMonthWithId(selectedMonth)
          )} ${selectedYear}`}</Typography>
        </Stack>
        <Stack
          flex={1}
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Stack flex={1} direction="row" alignItems="center">
            <PieChartRidesCounter rides={rides} />
            <Stack
              direction="column"
              alignItems="flex-start"
              color={rides.length > 0 ? BLACK_COLOR : GRAY_COLOR}
            >
              <Typography variant="h3" color="inherit">
                {rides.length}
              </Typography>
              <Typography paragraph textAlign="center" color="inherit">
                TRAJETS
              </Typography>
            </Stack>
          </Stack>
          <Stack flex={1} direction="row" alignItems="center">
            <PieChartRidesEmissions rides={rides} />
            <Stack
              direction="column"
              alignItems="flex-start"
              color={rides.length > 0 ? BLACK_COLOR : GRAY_COLOR}
            >
              <Typography
                variant="h3"
                color="inherit"
                sx={{ transition: "color ease .2s" }}
              >
                {getNumberFormatedToTwoDecimals(CO2ByMonthAndYear)}
              </Typography>
              <Typography
                paragraph
                textAlign="center"
                color="inherit"
                sx={{ transition: "color ease .2s" }}
              >
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
          <RidesCounterDateComparator
            data={data}
            currentRides={rides}
            month={selectedMonth}
            year={selectedYear}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default StatsByMonthTab;
