import { Box, Paper, Stack, Typography } from "@mui/material";
import { SearchRidesQuery } from "@/gql/graphql";
import { PieChart, PieValueType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/internals";

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
      <Stack
        width="100%"
        direction="column"
        justifyContent="center"
        alignItems="center"
        flex={1}
        spacing={1}
      >
        <Stack
          width="100%"
          height="100%"
          direction="row"
          alignItems="center"
          sx={{ backgroundColor: "aliceblue" }}
        >
          <Box sx={{ flex: 3, width: "100%", height: "100%" }}>
            <PieChart
              margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
              sx={{
                height: "100%",
                padding: 0,
              }}
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
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ flex: 3, backgroundColor: "#e2eafc", height: "100%" }}
          >
            <Typography sx={{ width: "100%" }} textAlign="center" variant="h5">
              {total}
            </Typography>
            <Typography sx={{ width: "100%" }} textAlign="center" variant="h5">
              {unit}
            </Typography>
          </Stack>
        </Stack>
        <p
          style={{
            width: "100%",
            backgroundColor: "aliceblue",
            padding: ".5rem",
            textAlign: "center",
          }}
        >
          {cardLabel}
        </p>
      </Stack>
    )
  );
};

export default PieChartCard;
