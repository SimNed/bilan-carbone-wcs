import { ChartData } from "@/type/ChartData.type";
import { PieChart } from "@mui/x-charts";

const PieChartRidesByTypeCounter = ({ data }: ChartData) => {
  return (
    data && (
      <PieChart
        sx={{ width: "50%", height: "50%" }} // Ajuster la taille du PieChart ici
        customize={{ radius: "50%" }} // Réduire le rayon du graphique circulaire
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
          },
        ]}
      />
    )
  );
};

export default PieChartRidesByTypeCounter;
