import { Box } from "@mui/material";
import { SearchRidesQuery } from "@/gql/graphql";
import { PieChart, PieValueType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/internals";

const BasePieChart = ({
  data,
  seriesData,
  width = 160,
  height = 160,
}: {
  data: SearchRidesQuery | undefined;
  seriesData: MakeOptional<PieValueType, "id">[];
  width: number;
  height: number;
}) => {
  return (
    data && (
      <Box>
        <PieChart
          width={width}
          height={height}
          margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
          series={[
            {
              data: seriesData,
              innerRadius: 12,
              outerRadius: "60%",
              paddingAngle: 1,
              cornerRadius: 1,
            },
          ]}
        />
      </Box>
    )
  );
};

export default BasePieChart;
