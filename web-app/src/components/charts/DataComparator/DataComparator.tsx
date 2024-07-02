import { ERROR_COLOR, SUCCESS_COLOR } from "@/styles/constants";
import { getPercentage } from "@/utils/maths.utils";
import { Stack, Typography } from "@mui/material";

import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import {
  StatsDetailsTable,
  StatsDetailsTableColumn,
} from "./DataComparator.styled";

const DataComparator = ({
  data,
  startIndex,
  comparatedProperty,
  labelProperty,
  breakpoints,
}: {
  data: Record<string, any>[];
  startIndex: number;
  comparatedProperty: string;
  labelProperty: string;
  breakpoints: number[];
}) => {
  const baseValue = data ? data[startIndex][comparatedProperty] : 0;

  const datasToCompare = data
    ? breakpoints
        .filter(
          (breakpoint) =>
            startIndex + breakpoint > 0 &&
            startIndex + breakpoint < data.length &&
            data[startIndex + breakpoint].hasOwnProperty(comparatedProperty) &&
            typeof data[startIndex + breakpoint][comparatedProperty] ===
              "number"
        )
        .map((breakpoint) => data[startIndex + breakpoint])
    : [];

  return (
    <StatsDetailsTable>
      {datasToCompare.map((data: any) => {
        const percentage = getPercentage(baseValue, data[comparatedProperty]);
        return (
          <StatsDetailsTableColumn>
            <Stack>
              <Typography variant="h6">{data[labelProperty]}</Typography>
              {percentage > 0 ? (
                <NorthEastIcon sx={{ color: ERROR_COLOR }} />
              ) : (
                <SouthEastIcon sx={{ color: SUCCESS_COLOR }} />
              )}
            </Stack>

            <Stack>
              <Typography variant="h5">{`${
                percentage > 0 ? "+" : ""
              }${percentage}%`}</Typography>
            </Stack>
          </StatsDetailsTableColumn>
        );
      })}
    </StatsDetailsTable>
  );
};

export default DataComparator;
