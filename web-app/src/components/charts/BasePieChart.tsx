import { Box } from "@mui/material";
import { PieChart, PieValueType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/internals";
import { BASE_PIE_CHART_RADIUS, GRAY_COLOR } from "@/styles/constants";

interface BasePieChartProps {
  seriesData: MakeOptional<PieValueType, "id">[];
  width?: number;
  height?: number;
}

const BasePieChart = ({
  seriesData,
  width = BASE_PIE_CHART_RADIUS,
  height = BASE_PIE_CHART_RADIUS,
}: BasePieChartProps) => {
  const filteredSeriesData = seriesData.filter((serie) => serie.value > 0);

  return (
    <Box
      sx={{
        width: {
          xs: width / 2,
          lg: width,
        },
        margin: "auto",
      }}
    >
      <PieChart
        height={height}
        tooltip={{ trigger: filteredSeriesData.length > 0 ? "item" : "none" }}
        margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
        series={[
          {
            data:
              filteredSeriesData.length > 0
                ? filteredSeriesData
                : [
                    {
                      id: 0,
                      value: 100,
                      color: GRAY_COLOR,
                    },
                  ],
            innerRadius: 6,
            outerRadius: "60%",
            paddingAngle: 1,
            cornerRadius: 1,
          },
        ]}
      />
    </Box>
  );
};

export default BasePieChart;
