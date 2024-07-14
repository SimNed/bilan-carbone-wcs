import SelectWithNavigation from "@/components/navs/SelectWithNavigtion";

import { getNumberFormatedToTwoDecimals } from "@/utils/maths.utils";
import { Grid, Typography } from "@mui/material";
import BarChartMonthEmissions from "../charts/BarChartMonthEmissions";

import { SearchRidesQuery } from "@/gql/graphql";
import { useMemo, useState } from "react";
import { getMonthWithId } from "@/utils/date.utils";
import { checkRideMonthAndYearEquality } from "@/utils/ride.utils";
import PieChartRidesCounter from "../charts/PieChartRidesCounter";
import PieChartRidesEmissions from "../charts/PieChartRidesEmissions";

import RidesCounterDateComparator from "../RidesCounterDateComparator";
import { DEFAULT_HEADER_HEIGHT, WHITE_COLOR } from "@/styles/constants";
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
        lg={4}
        sx={{ backgroundColor: WHITE_COLOR }}
        zIndex={10}
      >
        <Grid
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
          display={{ md: "grid", xs: "none" }}
        >
          <Typography variant="h2" textAlign="center">{`${capitalizeFirstLetter(
            getMonthWithId(selectedMonth)
          )} ${selectedYear}`}</Typography>
        </Grid>
        <Grid
          p={0}
          item
          container
          height={DEFAULT_HEADER_HEIGHT}
          position={{ xs: "sticky", md: "relative" }}
          top={{ xs: `calc((${DEFAULT_HEADER_HEIGHT} * 2.7))`, md: 0 }}
          xs={12}
          justifyContent="center"
          sx={{ backgroundColor: WHITE_COLOR }}
          zIndex={100}
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
        <Grid container item xs={12} justifyContent="flex-start">
          <Grid item xs={6} justifyContent="center">
            <StatCard
              value={rides.length}
              label="trajets"
              pieChart={<PieChartRidesCounter rides={rides} />}
            />
          </Grid>
          <Grid item xs={6}>
            <StatCard
              value={getNumberFormatedToTwoDecimals(CO2ByMonthAndYear)}
              label="co2 en t"
              pieChart={<PieChartRidesEmissions rides={rides} />}
            />
          </Grid>
          <Grid item xs={12}>
            <RidesCounterDateComparator
              data={data}
              currentRides={rides}
              month={selectedMonth}
              year={selectedYear}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={8} xs={12}>
        <BarChartMonthEmissions
          data={data}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </Grid>
    </Grid>
  );
};

export default StatsByMonthTab;
