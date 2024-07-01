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
import { BLACK_COLOR } from "@/styles/constants";

const BaseLineChart = ({
  dataset,
  series,
  xAxis,
  yAxis,
  color = BLACK_COLOR,
  onAxisClick,
}: {
  dataset: any | [];
  series: MakeOptional<LineSeriesType, "type">[];
  onAxisClick: (event: MouseEvent, data: any | null) => void;
  xAxis: MakeOptional<AxisConfig<ScaleName, any, ChartsXAxisProps>, "id">[];
  yAxis: MakeOptional<AxisConfig<ScaleName, any, ChartsYAxisProps>, "id">[];
  color?: string;
}) => {
  return (
    <LineChart
      height={400}
      onAxisClick={onAxisClick}
      margin={{ top: 0, left: 60, right: 0, bottom: 0 }}
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
