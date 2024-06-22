import { ChartData } from "@/type/ChartData.type";
import { Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";

const PieChartRidesByTypeEmissions = ({ data }: ChartData) => {
  return (
    data && (
      <PieChart
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
        series={[
          {
            data: [
              {
                id: 0,
                value: data.searchRides
                  .filter(
                    (ride) =>
                      ride.transportation.label.toLowerCase() === "voiture"
                  )
                  .reduce(
                    (accumulator, ride) =>
                      accumulator +
                      (ride.distance * ride.transportation.carboneEmission) /
                        1000,
                    0
                  ),
                label: "voiture",
              },
              {
                id: 1,
                value: data.searchRides
                  .filter(
                    (ride) => ride.transportation.label.toLowerCase() === "bus"
                  )
                  .reduce(
                    (accumulator, ride) =>
                      accumulator +
                      (ride.distance * ride.transportation.carboneEmission) /
                        1000,
                    0
                  ),
                label: "bus",
              },
              {
                id: 2,
                value: data.searchRides
                  .filter(
                    (ride) =>
                      ride.transportation.label.toLowerCase() === "train"
                  )
                  .reduce(
                    (accumulator, ride) =>
                      accumulator +
                      (ride.distance * ride.transportation.carboneEmission) /
                        1000,
                    0
                  ),
                label: "train",
              },
              {
                id: 3,
                value: data.searchRides
                  .filter(
                    (ride) =>
                      ride.transportation.label.toLowerCase() === "avion"
                  )
                  .reduce(
                    (accumulator, ride) =>
                      accumulator +
                      (ride.distance * ride.transportation.carboneEmission) /
                        1000,
                    0
                  ),
                label: "avion",
              },
            ],
            innerRadius: 20,
            outerRadius: 60,
            paddingAngle: 2,
            cornerRadius: 4,
            startAngle: 0,
            endAngle: 360,
          },
        ]}
      />
    )
  );
};

export default PieChartRidesByTypeEmissions;
