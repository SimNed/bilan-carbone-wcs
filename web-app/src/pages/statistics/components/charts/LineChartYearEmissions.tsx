import BaseLineChart from "@/components/charts/BaseLineChart";
import { SearchRidesQuery } from "@/gql/graphql";
import {
  BUS_COLOR_CODE,
  CAR_COLOR_CODE,
  PLANE_COLOR_CODE,
  TRAIN_COLOR_CODE,
} from "@/styles/constants";
import { getMonthWithId } from "@/utils/date.utils";
import { getAllMonthsEmissionsByYearAndTransportation } from "@/utils/ride.utils";
import { useMemo } from "react";

interface LineChartYearEmissionsProps {
  data: SearchRidesQuery;
}

const LineChartYearEmissions = ({ data }: LineChartYearEmissionsProps) => {
  const currentYear = new Date().getFullYear();

  const series = useMemo(() => {
    return [
      {
        data: getAllMonthsEmissionsByYearAndTransportation(
          data,
          currentYear,
          "train"
        ),
        label: "train",
        valueFormatter: (value: number | null) => `${value} / kg Co2`,
        color: TRAIN_COLOR_CODE,
      },
      {
        data: getAllMonthsEmissionsByYearAndTransportation(
          data,
          currentYear,
          "bus"
        ),
        label: "bus",
        valueFormatter: (value: number | null) => `${value} / kg Co2`,
        color: BUS_COLOR_CODE,
      },
      {
        data: getAllMonthsEmissionsByYearAndTransportation(
          data,
          currentYear,
          "voiture"
        ),
        label: "voiture",
        valueFormatter: (value: number | null) => `${value} / kg Co2`,
        color: CAR_COLOR_CODE,
      },
      {
        data: getAllMonthsEmissionsByYearAndTransportation(
          data,
          currentYear,
          "avion"
        ),
        label: "avion",
        valueFormatter: (value: number | null) => `${value} / kg Co2`,
        color: PLANE_COLOR_CODE,
      },
    ];
  }, [data]);

  return (
    <BaseLineChart
      series={series}
      xAxis={[
        {
          data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          valueFormatter: (value: number) => getMonthWithId(value),
          tickMinStep: 1,
        },
      ]}
      yAxis={[
        {
          label: "kg Co2 ",
        },
      ]}
    />
  );
};

export default LineChartYearEmissions;
