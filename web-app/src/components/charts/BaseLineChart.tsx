import React from "react";
import {
  AxisConfig,
  ChartsXAxisProps,
  ChartsYAxisProps,
  LineChart,
  LineSeriesType,
  ScaleName,
  axisClasses,
} from "@mui/x-charts";

import { MakeOptional } from "@mui/x-charts/internals";
import { BASE_LINE_CHART_HEIGHT, BLACK_COLOR } from "@/styles/constants";

interface BaseLineChartProps {
  dataset?: any | [];
  series: MakeOptional<LineSeriesType, "type">[];
  onAxisClick?: (event: MouseEvent, data: any | null) => void;
  xAxis?: MakeOptional<AxisConfig<ScaleName, any, ChartsXAxisProps>, "id">[];
  yAxis?: MakeOptional<AxisConfig<ScaleName, any, ChartsYAxisProps>, "id">[];
  color?: string;
  height?: number;
}

const BaseLineChart = ({
  dataset = [],
  series,
  xAxis = undefined,
  yAxis = undefined,
  color = BLACK_COLOR,
  onAxisClick,
  height = BASE_LINE_CHART_HEIGHT,
}: BaseLineChartProps) => {
  return (
    <LineChart
      height={height}
      onAxisClick={onAxisClick}
      margin={{ left: 70 }}
      skipAnimation
      xAxis={xAxis}
      yAxis={yAxis}
      grid={{ vertical: true, horizontal: true }}
      series={series}
      dataset={dataset}
      sx={{
        padding: 0,
        ["& .MuiMarkElement-root"]: {
          strokeWidth: 3,
          stroke: color,
          fill: color,
        },
        [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: "translate(-12px, 0)",
        },
      }}
      slotProps={{
        legend: {
          hidden: true,
        },
        popper: {
          sx: {
            ["& .MuiChartsTooltip-mark"]: {
              display: "none",
            },
          },
        },
      }}
    />
  );
};

export default BaseLineChart;
