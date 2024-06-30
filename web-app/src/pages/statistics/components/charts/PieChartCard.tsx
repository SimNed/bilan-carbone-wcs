import {
  Box,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { SearchRidesQuery } from "@/gql/graphql";
import { PieChart, PieValueType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/internals";
import { BLACK_COLOR, WHITE_COLOR } from "@/styles/constants";

const PieChartCard = ({
  data,
  pieSeriesData,
  total,
  cardLabel,
  unit,
}: {
  data: SearchRidesQuery | undefined;
  pieSeriesData: MakeOptional<PieValueType, "id">[];
  total: number;
  cardLabel: string;
  unit: string;
}) => {
  return (
    data && (
      <Box>
        <PieChart
          width={160}
          height={160}
          margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
          series={[
            {
              data: pieSeriesData,
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

export default PieChartCard;
{
  /* <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            flex: 3,
            height: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              width: "100%",
              color: WHITE_COLOR,
              padding: ".5rem",
              textAlign: "center",
            }}
          >
            {cardLabel}
          </Typography>
          <Typography
            sx={{ width: "100%", color: WHITE_COLOR }}
            textAlign="center"
            variant="h5"
          >
            {total}
          </Typography>
          <Typography
            sx={{ width: "100%", color: WHITE_COLOR }}
            textAlign="center"
            variant="h5"
          >
            {unit}
          </Typography>
        </Stack> */
}
