import { Stack } from "@mui/material";
import ArrowsNavigation from "@/components/Nav/ArrowsNavigtion";
import { getMonthWithId } from "@/utils";

const BartCharMonthEmissionNavigation = ({
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
      direction="row"
      p={2}
      spacing={4}
      sx={{ backgroundColor: "aliceblue" }}
    >
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
  );
};

export default BartCharMonthEmissionNavigation;
