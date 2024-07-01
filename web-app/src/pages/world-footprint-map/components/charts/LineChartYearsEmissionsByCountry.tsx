import React, { useMemo } from "react";
import { CarboneEmissionData } from "@/type/CarboneEmissionData.type";
import { BLACK_COLOR } from "@/styles/constants";
import {
  WORLD_EMISSIONS_END_DATE,
  WORLD_EMISSIONS_START_DATE,
} from "@/constants/constants";
import BaseLineChart from "@/components/charts/BaseLineChart";

const LineChartYearsEmissionsByCountry = ({
  data,
  selectedYear,
  handleSelectedYear,
}: {
  data: CarboneEmissionData[] | [];
  selectedYear: number;
  handleSelectedYear: (year: number) => void;
}) => {
  const xAxis = [
    {
      dataKey: "year",
      valueFormatter: (value: number) => value.toString(),
      min: WORLD_EMISSIONS_START_DATE,
      max: WORLD_EMISSIONS_END_DATE,
    },
  ];

  const yAxis = [
    {
      max: 25,
      label: "Co2 t. per capita ",
    },
  ];

  const series = useMemo(() => {
    return [
      {
        dataKey: "carboneEmissionsPerCapita",
        label: "Emissions de Co2",
        valueFormatter: (value: number | null) => `${value}/t per capita`,
        color: BLACK_COLOR,
        showMark: ({ index }: { index: number }) =>
          data[index].year === selectedYear,
      },
    ];
  }, [data, selectedYear]);

  return (
    <BaseLineChart
      dataset={data}
      series={series}
      onAxisClick={(_event, data) =>
        handleSelectedYear(data?.axisValue as number)
      }
      xAxis={xAxis}
      yAxis={yAxis}
    />
  );
};

export default LineChartYearsEmissionsByCountry;
