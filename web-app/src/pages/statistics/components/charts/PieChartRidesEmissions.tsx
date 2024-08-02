import BasePieChart from "@/components/charts/BasePieChart";
import {
  BUS_COLOR_CODE,
  CAR_COLOR_CODE,
  PLANE_COLOR_CODE,
  TRAIN_COLOR_CODE,
} from "@/styles/constants";
import { RideData } from "@/type/RideData.type";

interface PieChartRidesEmissionsProps {
  rides: RideData[];
  width?: number;
  height?: number;
}

const PieChartRidesEmissions = ({
  rides,
  width,
  height,
}: PieChartRidesEmissionsProps) => {
  const series = [
    {
      id: 0,
      value: rides
        .filter((ride) => ride.transportation.label.toLowerCase() === "voiture")
        .reduce(
          (acc, ride) =>
            acc +
            (ride.distance * ride.transportation.carbonEmissionsByGrPerKm) /
              1000,
          0
        ),
      label: "voiture",
      color: CAR_COLOR_CODE,
    },
    {
      id: 1,
      value: rides
        .filter((ride) => ride.transportation.label.toLowerCase() === "bus")
        .reduce(
          (acc, ride) =>
            acc +
            (ride.distance * ride.transportation.carbonEmissionsByGrPerKm) /
              1000,
          0
        ),
      label: "bus",
      color: BUS_COLOR_CODE,
    },
    {
      id: 2,
      value: rides
        .filter((ride) => ride.transportation.label.toLowerCase() === "train")
        .reduce(
          (acc, ride) =>
            acc +
            (ride.distance * ride.transportation.carbonEmissionsByGrPerKm) /
              1000,
          0
        ),
      label: "train",
      color: TRAIN_COLOR_CODE,
    },
    {
      id: 3,
      value: rides
        .filter((ride) => ride.transportation.label.toLowerCase() === "avion")
        .reduce(
          (acc, ride) =>
            acc +
            (ride.distance * ride.transportation.carbonEmissionsByGrPerKm) /
              1000,
          0
        ),
      label: "avion",
      color: PLANE_COLOR_CODE,
    },
  ];

  return <BasePieChart seriesData={series} width={width} height={height} />;
};

export default PieChartRidesEmissions;
