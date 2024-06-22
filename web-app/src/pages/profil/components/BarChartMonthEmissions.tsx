import { SearchRidesQuery } from "@/gql/graphql";
import { BarChartDayEmissionData, ChartData } from "@/type/ChartData.type";

import { getDateInJson } from "@/utils";
import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import { BarChart } from "@mui/x-charts";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const BarChartMonthEmissions = ({ data }: ChartData) => {
  function getEmissionsInMonth(
    rides: SearchRidesQuery,
    date: { day: number; month: number; year: number }
  ) {
    if (!data) return;

    let chartData: BarChartDayEmissionData[] = [];

    const numberOfDaysInMonth = new Date(date.year, date.month, 0).getDate();

    for (let i = 1; i < numberOfDaysInMonth; i++) {
      const rides = data.searchRides.filter(
        (ride) => i === new Date(ride.date).getDate()
      );
      if (rides.length > 0) {
        chartData.push(
          rides.reduce(
            (accumulator: BarChartDayEmissionData, ride) => {
              const transportationLabel =
                ride.transportation.label.toLowerCase();
              const emission =
                (ride.distance * ride.transportation.carboneEmission) / 1000;

              if (!accumulator.hasOwnProperty(transportationLabel)) {
                accumulator[transportationLabel] = 0;
              }

              accumulator[transportationLabel] += emission;
              return accumulator;
            },
            { day: i, voiture: 0, bus: 0, train: 0, avion: 0 }
          )
        );
      } else {
        chartData.push({ day: i, voiture: 0, bus: 0, train: 0, avion: 0 });
      }
    }
    return chartData;
  }

  const valueFormatter = (value: number | null) => `${value} kg`;

  return (
    <Stack width="100%" height="100%" direction="column" spacing={2}>
      <Stack direction="row" p={2} sx={{ backgroundColor: "aliceblue" }}>
        <IconButton>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
      <BarChart
        sx={{ backgroundColor: "aliceblue" }}
        dataset={
          data && data.searchRides
            ? getEmissionsInMonth(data, getDateInJson())
            : []
        }
        xAxis={[
          {
            scaleType: "band",
            dataKey: "day",
          },
        ]}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
        series={[
          { dataKey: "voiture", label: "voiture", valueFormatter },
          { dataKey: "bus", label: "bus", valueFormatter },
          { dataKey: "train", label: "train", valueFormatter },
          { dataKey: "avion", label: "avion", valueFormatter },
        ]}
      />
      <Stack
        direction="row"
        justifyContent="space-around"
        sx={{ backgroundColor: "aliceblue" }}
      >
        <p>voiture</p>
        <p>bus</p>
        <p>train</p>
        <p>avion</p>
      </Stack>
    </Stack>
  );
};

export default BarChartMonthEmissions;
