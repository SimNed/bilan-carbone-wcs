import BaseLineChart from "@/components/charts/BaseLineChart";
import {
  WORLD_EMISSIONS_START_DATE,
  WORLD_EMISSIONS_END_DATE,
} from "@/constants/constants";
import { Ride } from "@/gql/graphql";
import {
  BLACK_COLOR,
  BUS_COLOR_CODE,
  CAR_COLOR_CODE,
  PLANE_COLOR_CODE,
  TRAIN_COLOR_CODE,
} from "@/styles/constants";
import { getMonthWithId } from "@/utils/date.utils";
import { getTotalEmissionsByMonthAndTransportation } from "@/utils/ride.utils";
import { useMemo } from "react";

const LineChartYearEmissions =
  () =>
  ({ data }: { data: Ride[] }) => {
    const seriesData = useMemo(() => {
      const data = [{ transportation: "train" }];
    }, [data]);

    const getAllMonthEmissionsByYearAndTransportation = (
      transportationLabel: string,
      year: number
    ) => {
      const filteredData = data.filter(
        (ride) =>
          ride.transportation.label.toLowerCase() === transportationLabel &&
          new Date(ride.date).getFullYear() === year
      );
      const accumulator = [];

      for (let i = 0; i < 12; i++) {
        accumulator.push(i);
      }

      return filteredData
        .reduce((acc, ride) => {
          const rideMonth: number = new Date(ride.date).getMonth();
          acc[rideMonth] +=
            (ride.distance * ride.transportation.carboneEmission) / 1000;
          return acc;
        }, accumulator)
        .map((accData, idx) => {
          return { month: getMonthWithId(idx), carboneEmissions: accData };
        });
    };

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
          datakey: "carboneEmissions",
          label: "train",
          valueFormatter: (value: number | null) => `${value} / kg Co2`,
          color: TRAIN_COLOR_CODE,
        },
        {
          datakey: "carboneEmissions",
          label: "bus",
          valueFormatter: (value: number | null) => `${value} / kg Co2`,
          color: BUS_COLOR_CODE,
        },
        {
          datakey: "carboneEmissions",
          label: "voiture",
          valueFormatter: (value: number | null) => `${value} / kg Co2`,
          color: CAR_COLOR_CODE,
        },
        {
          datakey: "avion",
          label: "train",
          valueFormatter: (value: number | null) => `${value} / kg Co2`,
          color: PLANE_COLOR_CODE,
        },
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

export default LineChartYearEmissions;

// toutes les variable dans ce linecart sont un tableau de nombres
{
  /* <LineChart
xAxis={[
  {
    id: 'Years',
    data: years,
    scaleType: 'time',
    valueFormatter: (date) => date.getFullYear().toString(),
  },
]}
series={[
  {
    id: 'France',
    label: 'French GDP per capita',
    data: FranceGDPperCapita,
    stack: 'total',
    area: true,
    showMark: false,
  },
  {
    id: 'Germany',
    label: 'German GDP per capita',
    data: GermanyGDPperCapita,
    stack: 'total',
    area: true,
    showMark: false,
  },
  {
    id: 'United Kingdom',
    label: 'UK GDP per capita',
    data: UKGDPperCapita,
    stack: 'total',
    area: true,
    showMark: false,
  },
]}
width={600}
height={400}
margin={{ left: 70 }}
/> */
}
