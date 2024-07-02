import BasePieChart from "@/components/charts/BasePieChart";
import { Ride } from "@/gql/graphql";
import {
  BUS_COLOR_CODE,
  CAR_COLOR_CODE,
  PLANE_COLOR_CODE,
  TRAIN_COLOR_CODE,
} from "@/styles/constants";
import { getTotalEmissionsByTransportation } from "@/utils/ride.utils";

const PieChartMonthRidesEmissions = ({ data }: { data: Ride[] }) => {
  const series = [
    {
      id: 0,
      value: data
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
      value: data
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
      value: getTotalEmissionsByTransportation(data, "train"),
      label: "train",
      color: TRAIN_COLOR_CODE,
    },
    {
      id: 3,
      value: data
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

  return <BasePieChart seriesData={series} />;
};

export default PieChartMonthRidesEmissions;
