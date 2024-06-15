import { SearchRidesQuery } from "@/gql/graphql";

export type LineChartDayEmissionData = {
  day: number;
  voiture: number;
  bus: number;
  train: number;
  avion: number;
  [key: string]: number;
};
