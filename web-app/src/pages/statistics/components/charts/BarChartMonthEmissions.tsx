import { BarChartDayEmissionData } from "@/type/ChartData.type";

import {
  AxisConfig,
  ChartsXAxisProps,
  ChartsYAxisProps,
  ScaleName,
} from "@mui/x-charts";
import { useEffect, useMemo, useState } from "react";

import { SearchRidesQuery } from "@/gql/graphql";
import BaseBarChart from "@/components/charts/BaseBarChart";
import {
  TRAIN_COLOR_CODE,
  BUS_COLOR_CODE,
  CAR_COLOR_CODE,
  PLANE_COLOR_CODE,
} from "@/styles/constants";
import { getTotalEmissionsByDayAndTransportation } from "@/utils/ride.utils";
import { MakeOptional } from "@mui/x-charts/internals";

const BarChartMonthEmissions = ({
  data,
  selectedMonth,
  selectedYear,
}: {
  data: SearchRidesQuery | undefined;
  selectedMonth: number;
  selectedYear: number;
}) => {
  const numberOfDaysInMonth = useMemo(
    () => new Date(selectedYear, selectedMonth + 1, 0).getDate(),
    [selectedMonth, selectedYear]
  );

  const dataset = useMemo(() => {
    if (!data) return;
    let chartDataSet: BarChartDayEmissionData[] = [];

    for (let i = 1; i < numberOfDaysInMonth + 1; i++) {
      chartDataSet.push({
        day: i,
        train: getTotalEmissionsByDayAndTransportation(
          data,
          "train",
          i,
          selectedMonth,
          selectedYear
        ),
        bus: getTotalEmissionsByDayAndTransportation(
          data,
          "bus",
          i,
          selectedMonth,
          selectedYear
        ),
        voiture: getTotalEmissionsByDayAndTransportation(
          data,
          "voiture",
          i,
          selectedMonth,
          selectedYear
        ),
        avion: getTotalEmissionsByDayAndTransportation(
          data,
          "avion",
          i,
          selectedMonth,
          selectedYear
        ),
      });
    }
    console.log("CHARTS DATASET!!", chartDataSet);

    return chartDataSet;
  }, [selectedMonth, selectedYear]);

  const series = [
    {
      dataKey: "train",
      label: "train",
      color: TRAIN_COLOR_CODE,
    },
    {
      dataKey: "bus",
      label: "bus",
      color: BUS_COLOR_CODE,
    },
    {
      dataKey: "voiture",
      label: "voiture",
      color: CAR_COLOR_CODE,
    },
    {
      dataKey: "avion",
      label: "avion",
      color: PLANE_COLOR_CODE,
    },
  ].map((serie) => ({
    ...serie,
    valueFormatter: (value: number | null) => `${value} kg`,
  }));

  const xAxis: MakeOptional<
    AxisConfig<ScaleName, any, ChartsXAxisProps>,
    "id"
  >[] = [
    {
      dataKey: "day",
      scaleType: "band",
    },
  ];

  const yAxis: MakeOptional<
    AxisConfig<ScaleName, any, ChartsYAxisProps>,
    "id"
  >[] = [
    {
      label: "kg / co2",
      min: 0,
      max: 1000,
    },
  ];

  return (
    <BaseBarChart
      dataset={dataset}
      series={series}
      xAxis={xAxis}
      yAxis={yAxis}
    />
  );
};

export default BarChartMonthEmissions;
