import { Stack, Typography } from "@mui/material";
import PieChartRidesCounter from "./charts/PieChartRidesCounter";
import { RideData } from "@/type/RideData.type";
import { BLACK_COLOR, GRAY_COLOR } from "@/styles/constants";

const StatCard = ({
  value,
  label,
  pieChart,
}: {
  value: number;
  label: string;
  pieChart: React.ReactNode;
}) => {
  return (
    <Stack flex={1} direction="row" justifyContent="center" alignItems="center">
      {pieChart}
      <Stack
        direction="column"
        alignItems="flex-start"
        color={value > 0 ? BLACK_COLOR : GRAY_COLOR}
      >
        <Typography
          variant="h3"
          fontSize={{ md: "3rem", xs: "2rem" }}
          color="inherit"
          sx={{ transition: "color ease .2s" }}
        >
          {value}
        </Typography>
        <Typography
          paragraph
          textAlign="center"
          color="inherit"
          sx={{ transition: "color ease .2s" }}
        >
          {label.toUpperCase()}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default StatCard;
