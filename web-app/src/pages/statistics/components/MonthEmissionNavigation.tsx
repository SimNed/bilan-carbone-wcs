import { Stack } from "@mui/material";
import ArrowsNavigation from "@/components/Nav/ArrowsNavigtion";
import { getMonthWithId } from "@/utils/date.utils";
import CircleIcon from "@mui/icons-material/Circle";
import {
  BUS_COLOR_CODE,
  CAR_COLOR_CODE,
  PLANE_COLOR_CODE,
  TRAIN_COLOR_CODE,
} from "@/styles/constants";
const MonthEmissionNavigation = ({
  year,
  month,
  handleUpdateYear,
  handleUpdateMonth,
}: {
  year: number;
  month: number;
  handleUpdateYear: (year: number) => void;
  handleUpdateMonth: (month: number) => void;
}) => {
  return (
    <Stack
      sx={{ width: "100%" }}
      spacing={4}
      p={1}
      direction="row"
      justifyContent="space-around"
    >
      <Stack direction="row" sx={{ width: "30%" }}>
        <ArrowsNavigation
          navLabel={getMonthWithId(month)}
          onClickLeft={() => {
            if (month === 0) {
              handleUpdateMonth(11);
              handleUpdateYear(year - 1);
            } else {
              handleUpdateMonth(month - 1);
            }
          }}
          onClickRight={() => {
            if (new Date(year, month + 1) <= new Date()) {
              handleUpdateMonth(month + 1);
            }
            if (month === 11) {
              handleUpdateMonth(0);
              handleUpdateYear(year + 1);
            }
          }}
        />

        <ArrowsNavigation
          navLabel={year}
          onClickLeft={() => handleUpdateYear(year - 1)}
          onClickRight={() =>
            new Date(year + 1, month) <= new Date()
              ? handleUpdateYear(year + 1)
              : null
          }
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-around"
        sx={{ xidth: "60%" }}
        spacing={2}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <CircleIcon sx={{ color: CAR_COLOR_CODE }} /> voiture
        </Stack>
        <Stack direction="row" alignItems="center" gap={2}>
          <CircleIcon sx={{ color: BUS_COLOR_CODE }} /> bus
        </Stack>
        <Stack direction="row" alignItems="center" gap={2}>
          <CircleIcon sx={{ color: TRAIN_COLOR_CODE }} /> train
        </Stack>
        <Stack direction="row" alignItems="center" gap={2}>
          <CircleIcon sx={{ color: PLANE_COLOR_CODE }} /> avion
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MonthEmissionNavigation;
