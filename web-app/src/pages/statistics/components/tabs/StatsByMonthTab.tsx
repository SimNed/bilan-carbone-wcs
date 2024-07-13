import LegendContainer from "@/components/containers/LegendContainer";
import SelectWithNavigation from "@/components/navs/SelectWithNavigtion";
import { STATISTICS_LEGEND_ELEMENTS } from "@/constants/charts.constants";

import { getNumberFormatedToTwoDecimals } from "@/utils/maths.utils";
import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import BarChartMonthEmissions from "../charts/BarChartMonthEmissions";

import { SearchRidesQuery } from "@/gql/graphql";
import { useMemo, useState } from "react";
import { getMonthWithId } from "@/utils/date.utils";
import { checkRideMonthAndYearEquality } from "@/utils/ride.utils";
import PieChartRidesCounter from "../charts/PieChartRidesCounter";
import PieChartRidesEmissions from "../charts/PieChartRidesEmissions";

import RidesCounterDateComparator from "../RidesCounterDateComparator";
import {
  BLACK_COLOR,
  GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from "@/styles/constants";
import { capitalizeFirstLetter } from "@/utils/typo.utils";
import StatCard from "../StatCard";

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
    <Grid
      container
      height="100%"
      alignItems={{ md: "center", xs: "flex-start" }}
      sx={{ backgroundColor: WHITE_COLOR }}
    >
      <Grid
        container
        item
        xs={12}
        position={{ xs: "sticky", md: "relative" }}
        top={0}
        sx={{ backgroundColor: WHITE_COLOR }}
        zIndex={10}
      >
        <Grid item lg={4} xs={12} justifyContent="center" alignItems="center">
          <Grid item xs={12} justifyContent="center" alignItems="center">
            <Typography
              variant="h2"
              fontSize={{ xs: "2rem", md: "3rem", lg: "4rem" }}
              textAlign="center"
            >{`${capitalizeFirstLetter(
              getMonthWithId(selectedMonth)
            )} ${selectedYear}`}</Typography>
          </Grid>
          <Grid
            item
            container
            py={2}
            xs={12}
            justifyContent="center"
            alignItems="center"
          >
            <SelectWithNavigation
              isRightButtonEnable={
                new Date(selectedYear, selectedMonth + 1) <= new Date()
              }
              handleSelectChange={(value) => setSelectedMonth(value as number)}
              selectItems={monthSelectItems}
              selectValue={{ label: selectedMonth, value: selectedMonth }}
            />

            <SelectWithNavigation
              isReversed
              handleSelectChange={(value) => setSelectedYear(value as number)}
              selectItems={yearSelectItems}
              selectValue={{ label: selectedYear, value: selectedYear }}
            />
          </Grid>
        </Grid>
        <Grid container item lg={8} xs={12} alignItems="center">
          <LegendContainer elements={STATISTICS_LEGEND_ELEMENTS} gap={12} />
        </Grid>
      </Grid>

      <Grid
        container
        item
        lg={4}
        xs={12}
        justifyContent={{ lg: "center", xs: "flex-start" }}
        alignItems="center"
      >
        <Grid item lg={12} xs={6} justifyContent="center">
          <StatCard
            value={rides.length}
            label="trajets"
            pieChart={<PieChartRidesCounter rides={rides} />}
          />
        </Grid>
        <Grid item lg={12} xs={6}>
          <StatCard
            value={getNumberFormatedToTwoDecimals(CO2ByMonthAndYear)}
            label="co2 en t"
            pieChart={<PieChartRidesEmissions rides={rides} />}
          />
        </Grid>
      </Grid>
      <Grid item lg={8} xs={12}>
        <BarChartMonthEmissions
          data={data}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <RidesCounterDateComparator
          data={data}
          currentRides={rides}
          month={selectedMonth}
          year={selectedYear}
        />
      </Grid>
    </Grid>
  );
};

export default StatsByMonthTab;
