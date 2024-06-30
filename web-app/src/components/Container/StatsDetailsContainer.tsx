import {
  StatsDetailsTable,
  StatsDetailsTableColumn,
} from "@/styles/mui-classes";
import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

const StatsDetailsContainer = ({
  elements,
}: {
  elements: { label: ReactNode | string | number; value: string | number }[];
}) => {
  return (
    <StatsDetailsTable>
      {elements.map((element) => (
        <StatsDetailsTableColumn>
          <Stack>
            <Typography variant="h6">{element.label}</Typography>
          </Stack>
          <Stack>
            <Typography variant="h5">{element.value}</Typography>
          </Stack>
        </StatsDetailsTableColumn>
      ))}
    </StatsDetailsTable>
  );
};

export default StatsDetailsContainer;
