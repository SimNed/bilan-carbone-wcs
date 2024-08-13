import { Box, Stack, Typography } from "@mui/material";
import { BLACK_COLOR, GRAY_COLOR } from "@/styles/constants";

interface StatCardProps {
  value: number;
  label: string;
  pieChart: React.ReactNode;
}

const StatCard = ({ value, label, pieChart }: StatCardProps) => {
  return (
    <Stack flex={1} direction="row" justifyContent="center" alignItems="center">
      <Box flexGrow={0}>{pieChart}</Box>
      <Stack
        direction="column"
        alignItems="flex-start"
        color={value > 0 ? BLACK_COLOR : GRAY_COLOR}
      >
        <Typography
          variant="h4"
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
