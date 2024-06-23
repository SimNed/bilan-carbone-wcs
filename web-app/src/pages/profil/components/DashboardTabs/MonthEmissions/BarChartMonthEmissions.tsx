import { BarChartDayEmissionData, ChartData } from "@/type/ChartData.type";

import { BarChart, axisClasses } from "@mui/x-charts";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@mui/material";
import { SearchRidesQuery } from "@/gql/graphql";
import { getBarChartMonthEmissionsDataSeries } from "@/utils/chart.utils";

const BarChartMonthEmissions = ({
  data,
  selectedMonth,
  selectedYear,
}: {
  data: SearchRidesQuery;
  selectedMonth: number;
  selectedYear: number;
}) => {
  const [numberOfDaysInMonth, setNumberOfDaysInMonth] = useState(0);

  const [barChartDataset, setBarCharDataset] = useState<
    BarChartDayEmissionData[]
  >([]);

  useEffect(() => {
    const numberOfDays = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    setNumberOfDaysInMonth(numberOfDays);
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    setBarCharDataset(getEmissionsInMonth());
  }, [numberOfDaysInMonth, selectedYear]);

  function getEmissionsInMonth() {
    if (!data) return [];

    let chartSeriesData: BarChartDayEmissionData[] = [];

    function getTotalEmissionsByDayAndTransportation(
      day: number,
      transportationLabel: string
    ) {
      if (!data) return 0;
      return data.searchRides
        .filter(
          (ride) =>
            ride.transportation.label === transportationLabel &&
            new Date(ride.date).getDate() === day &&
            new Date(ride.date).getMonth() === selectedMonth &&
            new Date(ride.date).getFullYear() === selectedYear
        )
        .reduce(
          (acc, ride) =>
            acc + (ride.distance * ride.transportation.carboneEmission) / 1000,
          0
        );
    }

    for (let i = 1; i < numberOfDaysInMonth + 1; i++) {
      chartSeriesData.push({
        day: i,
        voiture: getTotalEmissionsByDayAndTransportation(i, "voiture"),
        bus: getTotalEmissionsByDayAndTransportation(i, "bus"),
        train: getTotalEmissionsByDayAndTransportation(i, "train"),
        avion: getTotalEmissionsByDayAndTransportation(i, "avion"),
      });
    }
    return chartSeriesData;
  }

  return (
    <Card sx={{ flex: 2 }}>
      <CardContent sx={{ height: "100%", padding: "2rem" }}>
        <BarChart
          borderRadius={2}
          margin={{ left: 75 }}
          dataset={barChartDataset}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "day",
            },
          ]}
          yAxis={[
            {
              label: "kg / co2",
              min: 0,
              max: 1000,
              position: "left",
            },
          ]}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
          sx={{
            [`.${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translate(-30px, 0)",
            },
          }}
          series={getBarChartMonthEmissionsDataSeries()}
        />
      </CardContent>
    </Card>
  );
};

export default BarChartMonthEmissions;
