import {
  CARBON_COLOR_CODE_1,
  CARBON_COLOR_CODE_2,
  CARBON_COLOR_CODE_3,
  CARBON_COLOR_CODE_4,
  CARBON_COLOR_CODE_5,
  CARBON_COLOR_CODE_6,
  CARBON_COLOR_CODE_7,
  CARBON_COLOR_CODE_8,
  CARBON_COLOR_CODE_9,
} from "@/styles/constants";

import {
  WORLD_EMISSIONS_BREAKPOINT_1,
  WORLD_EMISSIONS_BREAKPOINT_2,
  WORLD_EMISSIONS_BREAKPOINT_3,
  WORLD_EMISSIONS_BREAKPOINT_4,
  WORLD_EMISSIONS_BREAKPOINT_5,
  WORLD_EMISSIONS_BREAKPOINT_6,
  WORLD_EMISSIONS_BREAKPOINT_7,
  WORLD_EMISSIONS_BREAKPOINT_8,
} from "@/charts.constants";

export const getCarboneEmissionColorCode = (carbonEmission: number) => {
  if (carbonEmission > 0 && carbonEmission <= WORLD_EMISSIONS_BREAKPOINT_1) {
    return CARBON_COLOR_CODE_1;
  } else if (
    carbonEmission > WORLD_EMISSIONS_BREAKPOINT_1 &&
    carbonEmission <= WORLD_EMISSIONS_BREAKPOINT_2
  ) {
    return CARBON_COLOR_CODE_2;
  } else if (
    carbonEmission > WORLD_EMISSIONS_BREAKPOINT_2 &&
    carbonEmission <= WORLD_EMISSIONS_BREAKPOINT_3
  ) {
    return CARBON_COLOR_CODE_3;
  } else if (
    carbonEmission > WORLD_EMISSIONS_BREAKPOINT_3 &&
    carbonEmission <= WORLD_EMISSIONS_BREAKPOINT_4
  ) {
    return CARBON_COLOR_CODE_4;
  } else if (
    carbonEmission > WORLD_EMISSIONS_BREAKPOINT_4 &&
    carbonEmission <= WORLD_EMISSIONS_BREAKPOINT_5
  ) {
    return CARBON_COLOR_CODE_5;
  } else if (
    carbonEmission > WORLD_EMISSIONS_BREAKPOINT_5 &&
    carbonEmission <= WORLD_EMISSIONS_BREAKPOINT_6
  ) {
    return CARBON_COLOR_CODE_6;
  } else if (
    carbonEmission > WORLD_EMISSIONS_BREAKPOINT_6 &&
    carbonEmission <= WORLD_EMISSIONS_BREAKPOINT_7
  ) {
    return CARBON_COLOR_CODE_7;
  } else if (
    carbonEmission > WORLD_EMISSIONS_BREAKPOINT_8 &&
    carbonEmission <= WORLD_EMISSIONS_BREAKPOINT_8
  ) {
    return CARBON_COLOR_CODE_8;
  } else {
    return CARBON_COLOR_CODE_9;
  }
};
