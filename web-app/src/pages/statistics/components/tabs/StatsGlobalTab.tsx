import LegendContainer from "@/components/containers/LegendContainer";
import { STATISTICS_LEGEND_ELEMENTS } from "@/constants/charts.constants";

import { getNumberFormatedToTwoDecimals } from "@/utils/maths.utils";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

import { SearchRidesQuery } from "@/gql/graphql";
import { useMemo } from "react";
import PieChartRidesCounter from "../charts/PieChartRidesCounter";
import PieChartRidesEmissions from "../charts/PieChartRidesEmissions";
import LineChartYearEmissions from "../charts/LineChartYearEmissions";

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
            <PieChartRidesCounter rides={data.searchRides} />
            <Stack direction="column" alignItems="flex-start">
              <Typography variant="h3">{totalRides}</Typography>
              <Typography paragraph textAlign="center">
                TRAJETS
              </Typography>
            </Stack>
          </Stack>
          <Stack flex={1} direction="row" alignItems="center">
            <Stack direction="column" alignItems="flex-start">
              <PieChartRidesEmissions rides={data.searchRides} />
              <Typography variant="h3">
                {getNumberFormatedToTwoDecimals(totalCO2)}
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
        {data && data.searchRides.length > 0 && (
          <LineChartYearEmissions data={data} />
        )}
      </Stack>
    </Stack>
  );
};

export default StatsGlobalTab;
