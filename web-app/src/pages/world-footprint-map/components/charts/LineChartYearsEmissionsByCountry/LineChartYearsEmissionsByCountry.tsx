import React from "react";
import { LineChart, MarkPlot } from "@mui/x-charts";
import { getBarChartYearsEmissionsByCountryDataSeries } from "@/utils/chart.utils"; // Assurez-vous que cette fonction est correctement implémentée
import { CarboneEmissionData } from "@/type/CarboneEmissionData.type";
import { SUCCESS_COLOR } from "@/styles/constants";
import {
  WORLD_EMISSIONS_END_DATE,
  WORLD_EMISSIONS_START_DATE,
} from "@/utils/constants.utils";

const LineChartYearsEmissionsByCountry = ({
  data,
  selectedYear,
}: {
  data: CarboneEmissionData[] | [];
  selectedYear: number;
}) => {
  return (
    data && (
      <LineChart
        height={500}
        margin={{ top: 0 }}
        skipAnimation
        xAxis={[
          {
            dataKey: "year",
            valueFormatter: (value) => value.toString(),
            min: WORLD_EMISSIONS_START_DATE,
            max: WORLD_EMISSIONS_END_DATE,
          },
        ]}
        yAxis={[
          {
            max: 25,
          },
        ]}
        grid={{ vertical: true, horizontal: true }}
        series={getBarChartYearsEmissionsByCountryDataSeries(
          data,
          selectedYear
        )}
        dataset={data}
        sx={{
          padding: 0,
          ["& .MuiMarkElement-root"]: {
            strokeWidth: 2,
            stroke: SUCCESS_COLOR,
            fill: "none",
          },
        }}
        slotProps={{
          legend: {
            hidden: true,
            position: { vertical: "top", horizontal: "left" },
            padding: {
              left: 30,
            },
          },
          popper: {
            sx: {
              ["& .MuiChartsTooltip-mark"]: {
                display: "none",
              },
            },
          },
        }}
      ></LineChart>
    )
  );
};

export default LineChartYearsEmissionsByCountry;
