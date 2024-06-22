import { BarChartDayEmissionData, ChartData } from "@/type/ChartData.type";

import { Stack } from "@mui/system";
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import BartCharMonthEmissionNavigation from "./BartCharMonthEmissionNavigation";
import { WHITE_COLOR } from "@/styles/constants";

const BarChartMonthEmissions = ({ data }: ChartData) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [numberOfDaysInMonth, setNumberOfDaysInMonth] = useState(0);

  useEffect(() => {
    const numberOfDays = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    setNumberOfDaysInMonth(numberOfDays);
  }, [selectedYear, selectedMonth]);

  function getEmissionsInMonth() {
    if (!data) return;

    let chartData: BarChartDayEmissionData[] = [];

    for (let i = 1; i < numberOfDaysInMonth + 1; i++) {
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
    <Stack
      width="100%"
      height="100%"
      direction="column"
      justifyContent="space-between"
      gap={2}
      sx={{ backgroundColor: WHITE_COLOR }}
    >
      <BartCharMonthEmissionNavigation
        year={selectedYear}
        month={selectedMonth}
        handleUpdateYear={(year: number) => setSelectedYear(year)}
        handleUpdateMonth={(month: number) => setSelectedMonth(month)}
      />
      <BarChart
        sx={{ backgroundColor: "aliceblue" }}
        dataset={data && data.searchRides ? getEmissionsInMonth() : []}
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
        p={2}
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
