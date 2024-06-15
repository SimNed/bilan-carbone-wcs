import { SearchRidesQuery } from "@/gql/graphql";
import { ChartData } from "@/type/ChartData.type";
import { LineChartDayEmissionData } from "@/type/LineChartDayEmissionData.type";
import { getDateInJson } from "@/utils";
import { LineChart } from "@mui/x-charts";

const LineChartMonthEmissions = ({ data }: ChartData) => {
  const keyToLabel: { [key: string]: string } = {
    voiture: "voiture",
    bus: "bus",
    train: "train",
    avion: "avion",
  };

  const colors: { [key: string]: string } = {
    voiture: "tomato",
    bus: "lightgreen",
    train: "yellow",
    avion: "lightblue",
  };

  const stackStrategy = {
    stack: "total",
    stackOffset: "none", // To stack 0 on top of others
  } as const;

  const customize = {
    margin: { top: 5 },
    stackingOrder: "descending",
  };

  function getEmissionsInMonth(
    rides: SearchRidesQuery,
    date: { day: number; month: number; year: number }
  ) {
    const filteredRides = rides.searchRides.filter((ride) => {
      const rideDate = new Date(ride.date);
      return (
        rideDate.getMonth() === date.month &&
        rideDate.getFullYear() === date.year
      );
    });

    return filteredRides.map((ride) => {
      let dayEmission: LineChartDayEmissionData = {
        day: new Date(ride.date).getDate(),
        voiture: 0,
        bus: 0,
        train: 0,
        avion: 0,
      };
      dayEmission[ride.transportation.label.toLocaleLowerCase()] =
        (ride.distance * ride.transportation.carboneEmission) / 1000;
      return dayEmission;
    });
  }

  return (
    <LineChart
      xAxis={[
        {
          dataKey: "day",
          valueFormatter: (value) => value.toString(),
          min: 1,
          max: new Date(2024, 6, 0).getDate(),
        },
      ]}
      series={Object.keys(keyToLabel).map((key) => ({
        dataKey: key,
        label: keyToLabel[key],
        color: colors[key],
        showMark: true,
        ...stackStrategy,
      }))}
      dataset={
        data && data.searchRides
          ? getEmissionsInMonth(data, getDateInJson())
          : []
      }
      {...customize}
    />
  );
};

export default LineChartMonthEmissions;
