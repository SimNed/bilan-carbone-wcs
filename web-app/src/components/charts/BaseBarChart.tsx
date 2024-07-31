import { BASE_BAR_CHART_HEIGHT } from "@/styles/constants";
import {
  AxisConfig,
  BarChart,
  BarSeriesType,
  ChartsXAxisProps,
  ChartsYAxisProps,
  ScaleName,
  axisClasses,
} from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/internals";

const BaseBarChart = ({
  dataset,
  series,
  xAxis,
  yAxis,
  height = BASE_BAR_CHART_HEIGHT,
}: {
  dataset: any | [];
  series: MakeOptional<BarSeriesType, "type">[];
  xAxis: MakeOptional<AxisConfig<ScaleName, any, ChartsXAxisProps>, "id">[];
  yAxis: MakeOptional<AxisConfig<ScaleName, any, ChartsYAxisProps>, "id">[];
  height?: number;
}) => {
  return (
    <BarChart
      borderRadius={2}
      height={height}
      margin={{ left: 70 }}
      grid={{ vertical: true, horizontal: true }}
      dataset={dataset}
      xAxis={xAxis}
      yAxis={yAxis}
      slotProps={{
        legend: {
          hidden: true,
        },
      }}
      sx={{
        [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: "translate(-12px, 0)",
        },
      }}
      series={series}
    />
  );
};

export default BaseBarChart;
