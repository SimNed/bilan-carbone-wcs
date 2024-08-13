import BasePieChart from "@/components/charts/BasePieChart";
import {
  BUS_COLOR_CODE,
  CAR_COLOR_CODE,
  PLANE_COLOR_CODE,
  TRAIN_COLOR_CODE,
} from "@/styles/constants";
import { RideData } from "@/type/RideData.type";

interface PieChartRidesCounterProps {
  rides: RideData[] | [];
  width?: number;
  height?: number;
}

const PieChartRidesCounter = ({
  rides,
  width,
  height,
}: PieChartRidesCounterProps) => {
  const series = [
    {
      id: 0,
      value: rides.filter(
        (ride) => ride.transportation.label.toLowerCase() === "voiture"
      ).length,
      label: "voiture",
      color: CAR_COLOR_CODE,
    },
    {
      id: 1,
      value: rides.filter(
        (ride) => ride.transportation.label.toLowerCase() === "bus"
      ).length,
      label: "bus",
      color: BUS_COLOR_CODE,
    },
    {
      id: 2,
      value: rides.filter(
        (ride) => ride.transportation.label.toLowerCase() === "train"
      ).length,
      label: "train",
      color: TRAIN_COLOR_CODE,
    },
    {
      id: 3,
      value: rides.filter(
        (ride) => ride.transportation.label.toLowerCase() === "avion"
      ).length,
      label: "avion",
      color: PLANE_COLOR_CODE,
    },
  ];

  return <BasePieChart seriesData={series} width={width} height={height} />;
};

export default PieChartRidesCounter;
