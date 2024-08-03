import { CO2_KG_UNIT_LABEL } from "@/charts.constants";
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
    const trainEmissions = getAllMonthsEmissionsByYearAndTransportation(
      data,
      currentYear,
      "train"
    );

    const busEmissions = getAllMonthsEmissionsByYearAndTransportation(
      data,
      currentYear,
      "bus"
    );

    const carEmissions = getAllMonthsEmissionsByYearAndTransportation(
      data,
      currentYear,
      "voiture"
    );

    const planeEmissions = getAllMonthsEmissionsByYearAndTransportation(
      data,
      currentYear,
      "avion"
    );

    return [
      {
        data: trainEmissions,
        label: "train",
        valueFormatter: (value: number | null) =>
          `${value} ${CO2_KG_UNIT_LABEL}`,
        color: TRAIN_COLOR_CODE,
        showMark: ({ index }: { index: number }) => trainEmissions[index] > 0,
      },
      {
        data: busEmissions,
        label: "bus",
        valueFormatter: (value: number | null) =>
          `${value} ${CO2_KG_UNIT_LABEL}`,
        color: BUS_COLOR_CODE,
        showMark: ({ index }: { index: number }) => busEmissions[index] > 0,
      },
      {
        data: carEmissions,
        label: "voiture",
        valueFormatter: (value: number | null) =>
          `${value} ${CO2_KG_UNIT_LABEL}`,
        color: CAR_COLOR_CODE,
        showMark: ({ index }: { index: number }) => carEmissions[index] > 0,
      },
      {
        data: planeEmissions,
        label: "avion",
        valueFormatter: (value: number | null) =>
          `${value} ${CO2_KG_UNIT_LABEL}`,
        color: PLANE_COLOR_CODE,
        showMark: ({ index }: { index: number }) => planeEmissions[index] > 0,
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
