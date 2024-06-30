import React from "react";
import { LineChart, axisClasses } from "@mui/x-charts";
import { getBarChartYearsEmissionsByCountryDataSeries } from "@/utils/chart.utils"; // Assurez-vous que cette fonction est correctement implémentée
import { CarboneEmissionData } from "@/type/CarboneEmissionData.type";
import { BLACK_COLOR } from "@/styles/constants";
import {
  WORLD_EMISSIONS_END_DATE,
  WORLD_EMISSIONS_START_DATE,
} from "@/constants/constants";

const LineChartYearsEmissionsByCountry = ({
  data,
  selectedYear,
  handleSelectedYear,
}: {
  data: CarboneEmissionData[] | [];
  selectedYear: number;
  handleSelectedYear: (year: number) => void;
}) => {
  return (
    data && (
      <LineChart
        height={400}
        onAxisClick={(_event, data) =>
          handleSelectedYear(data?.axisValue as number)
        }
        margin={{ top: 0, left: 60, right: 0, bottom: 0 }}
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
            label: "Co2 t. per capita ",
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
            strokeWidth: 3,
            stroke: BLACK_COLOR,
            fill: BLACK_COLOR,
          },
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: "translate(-12px, 0)",
          },
        }}
        slotProps={{
          legend: {
            hidden: true,
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
