import {
  BLACK_COLOR,
  ERROR_COLOR,
  GRAY_COLOR,
  SUCCESS_COLOR,
} from "@/styles/constants";
import {
  getNumberFormatedToTwoDecimals,
  getPercentage,
} from "@/utils/maths.utils";
import { Stack, Typography } from "@mui/material";

import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import { ComparatorTable, ComparatorTableColumn } from "./Comparator.styled";

import { ReactNode } from "react";

type ComparatorElement = {
  label: string | number;
  value: number;
  optionalNode?: ReactNode;
};

const Comparator = ({
  baseElement,
  comparatedElements,
}: {
  baseElement: ComparatorElement;
  comparatedElements: ComparatorElement[];
}) => {
  return (
    <ComparatorTable>
      <ComparatorTableColumn>
        <Stack>
          <Typography variant="h6" fontWeight={600}>
            {baseElement.label}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="center" alignItems="center">
          <Typography variant={baseElement.value !== 0 ? "h5" : "h6"}>
            {baseElement.value != 0 ? baseElement.value : "no data"}
          </Typography>
        </Stack>
      </ComparatorTableColumn>
      {comparatedElements.map((element) => {
        let elementValueLabel = "";
        let percentage = 0;

        if (element.value !== 0) {
          if (baseElement.value !== 0) {
            percentage = getPercentage(baseElement.value, element.value);
            elementValueLabel = `${percentage > 0 ? "+" : ""}${percentage}%`;
          }
        } else {
          elementValueLabel = "no data";
        }
        return (
          <ComparatorTableColumn>
            <Stack>
              <Typography variant="h6">{element.label}</Typography>
              {percentage !== 0 && percentage > 0 && (
                <NorthEastIcon sx={{ color: ERROR_COLOR }} />
              )}
              {percentage !== 0 && percentage < 0 && (
                <SouthEastIcon sx={{ color: SUCCESS_COLOR }} />
              )}
            </Stack>

            <Stack direction="row" justifyContent="center" alignItems="center">
              {element.optionalNode &&
                element.value !== 0 &&
                element.optionalNode}
              <Typography variant={element.value !== 0 ? "h5" : "h6"}>
                {elementValueLabel}
              </Typography>
            </Stack>
          </ComparatorTableColumn>
        );
      })}
    </ComparatorTable>
  );
};

export default Comparator;
