import { ChartData } from "@/type/ChartData.type";
import { PieChart } from "@mui/x-charts";

const PieChartRidesByTypeCounter = ({ data }: ChartData) => {
  return (
    data && (
      <PieChart
        margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
        sx={{ flex: 1, height: "100%" }}
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
                value: data.searchRides.filter(
                  (ride) =>
                    ride.transportation.label.toLowerCase() === "voiture"
                ).length,
                label: "voiture",
              },
              {
                id: 1,
                value: data.searchRides.filter(
                  (ride) => ride.transportation.label.toLowerCase() === "bus"
                ).length,
                label: "bus",
              },
              {
                id: 2,
                value: data.searchRides.filter(
                  (ride) => ride.transportation.label.toLowerCase() === "train"
                ).length,
                label: "train",
              },
              {
                id: 3,
                value: data.searchRides.filter(
                  (ride) => ride.transportation.label.toLowerCase() === "avion"
                ).length,
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

export default PieChartRidesByTypeCounter;
