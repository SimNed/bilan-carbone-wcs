import { getNumberFormatedToTwoDecimals } from "@/utils/maths.utils";
import { Grid, Typography } from "@mui/material";

import { SearchRidesQuery } from "@/gql/graphql";
import { useMemo } from "react";
import PieChartRidesCounter from "../charts/PieChartRidesCounter";
import PieChartRidesEmissions from "../charts/PieChartRidesEmissions";
import LineChartYearEmissions from "../charts/LineChartYearEmissions";

import StatCard from "../StatCard";
import { getTotalEmissions } from "@/utils/ride.utils";
import { CO2_KG_UNIT_LABEL } from "@/charts.constants";

interface StatsGlobalTabProps {
  data: SearchRidesQuery;
}

const StatsGlobalTab = ({ data }: StatsGlobalTabProps) => {
  const totalRides = useMemo(
    () => (data && data.searchRides.length > 0 ? data.searchRides.length : 0),
    [data]
  );

  const totalCO2 = useMemo(() => {
    return data && data.searchRides.length > 0
      ? getTotalEmissions(data.searchRides)
      : 0;
  }, [data]);

  return (
    <Grid container height="100%" px={{ xs: 0, md: 4 }}>
      <Grid
        item
        lg={8}
        md={6}
        display={{ md: "grid", xs: "none" }}
        alignItems="center"
      >
        <Typography variant="h2">{new Date().getFullYear()}</Typography>
      </Grid>

      <Grid container item direction={{ xs: "row", md: "row-reverse" }}>
        <Grid container item xs={12} md={4} alignItems="center">
          <Grid item xs={12} justifyContent="center">
            <StatCard
              value={totalRides}
              label="trajets"
              pieChart={
                <PieChartRidesCounter
                  rides={data.searchRides}
                  width={200}
                  height={200}
                />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <StatCard
              value={getNumberFormatedToTwoDecimals(totalCO2)}
              label={CO2_KG_UNIT_LABEL}
              pieChart={
                <PieChartRidesEmissions
                  rides={data.searchRides}
                  width={200}
                  height={200}
                />
              }
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} md={8} alignItems="flex-end">
          <LineChartYearEmissions data={data} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StatsGlobalTab;
