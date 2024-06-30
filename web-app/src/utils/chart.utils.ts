import {
  WORLD_EMISSIONS_BREAKPOINT_1,
  WORLD_EMISSIONS_BREAKPOINT_2,
  WORLD_EMISSIONS_BREAKPOINT_3,
  WORLD_EMISSIONS_BREAKPOINT_4,
  WORLD_EMISSIONS_BREAKPOINT_5,
  WORLD_EMISSIONS_BREAKPOINT_6,
  WORLD_EMISSIONS_BREAKPOINT_7,
  WORLD_EMISSIONS_BREAKPOINT_8,
} from "@/constants/constants";
import { SearchRidesQuery } from "@/gql/graphql";
import {
  BLACK_COLOR,
  BUS_COLOR_CODE,
  CARBONE_COLOR_CODE_1,
  CARBONE_COLOR_CODE_2,
  CARBONE_COLOR_CODE_3,
  CARBONE_COLOR_CODE_4,
  CARBONE_COLOR_CODE_5,
  CARBONE_COLOR_CODE_6,
  CARBONE_COLOR_CODE_7,
  CARBONE_COLOR_CODE_8,
  CARBONE_COLOR_CODE_9,
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
      dataKey: "train",
      label: "train",
      valueFormatter,
      color: TRAIN_COLOR_CODE,
    },
    {
      dataKey: "bus",
      label: "bus",
      valueFormatter,
      color: BUS_COLOR_CODE,
    },
    {
      dataKey: "voiture",
      label: "voiture",
      valueFormatter,
      color: CAR_COLOR_CODE,
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
      dataKey: "carboneEmissionsPerCapita",
      label: "Emissions de Co2",
      valueFormatter,
      color: BLACK_COLOR,
      showMark: ({ index }: { index: number }) =>
        data[index].year === selectedYear,
    },
  ];
}

export const getCarboneEmissionColorCode = (carboneEmission: number) => {
  if (carboneEmission > 0 && carboneEmission <= WORLD_EMISSIONS_BREAKPOINT_1) {
    return CARBONE_COLOR_CODE_1;
  } else if (
    carboneEmission > WORLD_EMISSIONS_BREAKPOINT_1 &&
    carboneEmission <= WORLD_EMISSIONS_BREAKPOINT_2
  ) {
    return CARBONE_COLOR_CODE_2;
  } else if (
    carboneEmission > WORLD_EMISSIONS_BREAKPOINT_2 &&
    carboneEmission <= WORLD_EMISSIONS_BREAKPOINT_3
  ) {
    return CARBONE_COLOR_CODE_3;
  } else if (
    carboneEmission > WORLD_EMISSIONS_BREAKPOINT_3 &&
    carboneEmission <= WORLD_EMISSIONS_BREAKPOINT_4
  ) {
    return CARBONE_COLOR_CODE_4;
  } else if (
    carboneEmission > WORLD_EMISSIONS_BREAKPOINT_4 &&
    carboneEmission <= WORLD_EMISSIONS_BREAKPOINT_5
  ) {
    return CARBONE_COLOR_CODE_5;
  } else if (
    carboneEmission > WORLD_EMISSIONS_BREAKPOINT_5 &&
    carboneEmission <= WORLD_EMISSIONS_BREAKPOINT_6
  ) {
    return CARBONE_COLOR_CODE_6;
  } else if (
    carboneEmission > WORLD_EMISSIONS_BREAKPOINT_6 &&
    carboneEmission <= WORLD_EMISSIONS_BREAKPOINT_7
  ) {
    return CARBONE_COLOR_CODE_7;
  } else if (
    carboneEmission > WORLD_EMISSIONS_BREAKPOINT_8 &&
    carboneEmission <= WORLD_EMISSIONS_BREAKPOINT_8
  ) {
    return CARBONE_COLOR_CODE_8;
  } else {
    return CARBONE_COLOR_CODE_9;
  }
};
