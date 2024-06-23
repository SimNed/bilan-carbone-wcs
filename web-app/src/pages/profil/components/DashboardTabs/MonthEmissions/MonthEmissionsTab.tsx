import { Grid, Stack } from "@mui/material";
import PieChartCard from "../../PieChartCard";
import {
  getPieChartRidesCounterSeriesData,
  getPieChartRidesEmissionsSeriesData,
} from "@/utils/chart.utils";
import BarChartMonthEmissions from "./BarChartMonthEmissions";
import { SearchRidesQuery } from "@/gql/graphql";

import { useState } from "react";
import MonthEmissionNavigation from "./MonthEmissionNavigation";

const MonthEmissionsTab = ({ data }: { data: SearchRidesQuery }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  // Calcul du nombre de trajets
  const nbRides =
    data && data.searchRides.length > 0 ? data.searchRides.length : 0;

  // Calcul de la dépense totale en CO2
  const totalCO2 =
    data && data.searchRides.length > 0
      ? data.searchRides.reduce(
          (accumulator, ride) =>
            accumulator +
            (ride.distance * ride.transportation.carboneEmission) / 1000,
          0
        )
      : 0;
  return (
    <Stack direction="column" height="100%">
      <MonthEmissionNavigation
        year={selectedYear}
        month={selectedMonth}
        handleUpdateYear={(year: number) => setSelectedYear(year)}
        handleUpdateMonth={(month: number) => setSelectedMonth(month)}
      />
      <Stack
        direction="row"
        spacing={4}
        p={4}
        pt={0}
        width="100%"
        height="100%"
      >
        <Stack direction="column" flex={1} spacing={4}>
          <PieChartCard
            data={data}
            pieSeriesData={data ? getPieChartRidesCounterSeriesData(data) : []}
            total={nbRides}
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
        <BarChartMonthEmissions
          data={data}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </Stack>
    </Stack>
  );
};

export default MonthEmissionsTab;
