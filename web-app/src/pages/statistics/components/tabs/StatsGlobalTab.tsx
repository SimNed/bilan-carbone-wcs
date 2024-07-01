import LegendContainer from "@/components/containers/LegendContainer";
import { STATISTICS_LEGEND_ELEMENTS } from "@/constants/charts.constants";
import {
  getPieChartRidesCounterSeriesData,
  getPieChartRidesEmissionsSeriesData,
} from "@/utils/chart.utils";
import { getNumberFormatedToTwoDecimals } from "@/utils/maths.utils";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import PieChartCard from "../charts/PieChartCard";
import { SearchRidesQuery } from "@/gql/graphql";
import { useMemo } from "react";

const StatsGlobalTab = ({ data }: { data: SearchRidesQuery }) => {
  const totalRides = useMemo(
    () => (data && data.searchRides.length > 0 ? data.searchRides.length : 0),
    [data]
  );

  const totalCO2 = useMemo(() => {
    return data && data.searchRides.length > 0
      ? data.searchRides.reduce(
          (accumulator, ride) =>
            accumulator +
            (ride.distance * ride.transportation.carboneEmission) / 1000000,
          0
        )
      : 0;
  }, [data]);

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
              pieSeriesData={
                data ? getPieChartRidesCounterSeriesData(data) : []
              }
              total={totalRides}
              cardLabel="trajets totaux"
              unit=""
            />
            <Stack direction="column" alignItems="flex-start">
              <Typography variant="h2">{totalRides}</Typography>
              <Typography paragraph textAlign="center">
                TRAJETS
              </Typography>
            </Stack>
          </Stack>
          <Stack flex={1} direction="row" alignItems="center">
            <PieChartCard
              data={data}
              pieSeriesData={
                data ? getPieChartRidesEmissionsSeriesData(data) : []
              }
              total={totalCO2}
              cardLabel="émissions totales"
              unit="kg"
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

      <Stack direction="column" flex={3}>
        <p>gh</p>
      </Stack>
    </Stack>
  );
};

export default StatsGlobalTab;
