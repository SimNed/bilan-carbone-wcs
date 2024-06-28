import React from "react";
import { LineChart, LinePlot, MarkPlot } from "@mui/x-charts";
import { getBarChartYearsEmissionsByCountryDataSeries } from "@/utils/chart.utils"; // Assurez-vous que cette fonction est correctement implémentée
import { CarboneEmissionData } from "@/type/CarboneEmissionData.type";

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
        xAxis={[
          {
            dataKey: "year",
            valueFormatter: (value) => value.toString(),
            min: 1820,
            max: 2022,
          },
        ]}
        yAxis={[
          {
            max: 25,
          },
        ]}
        grid={{ vertical: true, horizontal: true }}
        series={getBarChartYearsEmissionsByCountryDataSeries()}
        dataset={data}
        slotProps={{
          legend: {
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
      >
        <MarkPlot
          type="monotone"
          dataKey="carbonEmissionsPerCapita"
          stroke="red"
          marks={[{ value: selectedYear, label: selectedYear }]}
        />
      </LineChart>
    )
  );
};

export default LineChartYearsEmissionsByCountry;
