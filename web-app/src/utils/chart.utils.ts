import { SearchRidesQuery } from "@/gql/graphql";
import {
  BLACK_COLOR,
  BUS_COLOR_CODE,
  CAR_COLOR_CODE,
  PLANE_COLOR_CODE,
  TRAIN_COLOR_CODE,
} from "@/styles/constants";
import { CarboneEmissionData } from "@/type/CarboneEmissionData.type";

export function getPieChartRidesCounterSeriesData(data: SearchRidesQuery) {
  return [
    {
      id: 0,
      value: data.searchRides.filter(
        (ride) => ride.transportation.label.toLowerCase() === "voiture"
      ).length,
      label: "voiture",
      color: CAR_COLOR_CODE,
    },
    {
      id: 1,
      value: data.searchRides.filter(
        (ride) => ride.transportation.label.toLowerCase() === "bus"
      ).length,
      label: "bus",
      color: BUS_COLOR_CODE,
    },
    {
      id: 2,
      value: data.searchRides.filter(
        (ride) => ride.transportation.label.toLowerCase() === "train"
      ).length,
      label: "train",
      color: TRAIN_COLOR_CODE,
    },
    {
      id: 3,
      value: data.searchRides.filter(
        (ride) => ride.transportation.label.toLowerCase() === "avion"
      ).length,
      label: "avion",
      color: PLANE_COLOR_CODE,
    },
  ];
}

export function getPieChartRidesEmissionsSeriesData(data: SearchRidesQuery) {
  return [
    {
      id: 0,
      value: data.searchRides
        .filter((ride) => ride.transportation.label.toLowerCase() === "voiture")
        .reduce(
          (accumulator, ride) =>
            accumulator +
            (ride.distance * ride.transportation.carboneEmission) / 1000,
          0
        ),
      label: "voiture",
      color: CAR_COLOR_CODE,
    },
    {
      id: 1,
      value: data.searchRides
        .filter((ride) => ride.transportation.label.toLowerCase() === "bus")
        .reduce(
          (accumulator, ride) =>
            accumulator +
            (ride.distance * ride.transportation.carboneEmission) / 1000,
          0
        ),
      label: "bus",
      color: BUS_COLOR_CODE,
    },
    {
      id: 2,
      value: data.searchRides
        .filter((ride) => ride.transportation.label.toLowerCase() === "train")
        .reduce(
          (accumulator, ride) =>
            accumulator +
            (ride.distance * ride.transportation.carboneEmission) / 1000,
          0
        ),
      label: "train",
      color: TRAIN_COLOR_CODE,
    },
    {
      id: 3,
      value: data.searchRides
        .filter((ride) => ride.transportation.label.toLowerCase() === "avion")
        .reduce(
          (accumulator, ride) =>
            accumulator +
            (ride.distance * ride.transportation.carboneEmission) / 1000,
          0
        ),
      label: "avion",
      color: PLANE_COLOR_CODE,
    },
  ];
}

export function getBarChartMonthEmissionsDataSeries() {
  const valueFormatter = (value: number | null) => `${value} kg`;

  return [
    {
      dataKey: "voiture",
      label: "voiture",
      valueFormatter,
      color: CAR_COLOR_CODE,
    },
    {
      dataKey: "bus",
      label: "bus",
      valueFormatter,
      color: BUS_COLOR_CODE,
    },
    {
      dataKey: "train",
      label: "train",
      valueFormatter,
      color: TRAIN_COLOR_CODE,
    },
    {
      dataKey: "avion",
      label: "avion",
      valueFormatter,
      color: PLANE_COLOR_CODE,
    },
  ];
}

export function getBarChartYearsEmissionsByCountryDataSeries(
  data: CarboneEmissionData[],
  selectedYear: number
) {
  const valueFormatter = (value: number | null) => `${value}/t per capita`;

  return [
    {
      dataKey: "carbonEmissionsPerCapita",
      label: "Emissions de Co2",
      valueFormatter,
      color: BLACK_COLOR,
      showMark: ({ index }: { index: number }) =>
        data[index].year === selectedYear,
    },
  ];
}
