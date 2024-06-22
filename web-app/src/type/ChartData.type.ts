import { SearchRidesQuery } from "@/gql/graphql";

export type ChartData = {
  data: SearchRidesQuery | undefined;
};

export type BarChartDayEmissionData = {
  day: number;
  voiture: number;
  bus: number;
  train: number;
  avion: number;
  [key: string]: number;
};
