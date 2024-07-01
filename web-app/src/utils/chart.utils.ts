import {
  WORLD_EMISSIONS_BREAKPOINT_1,
  WORLD_EMISSIONS_BREAKPOINT_2,
  WORLD_EMISSIONS_BREAKPOINT_3,
  WORLD_EMISSIONS_BREAKPOINT_4,
  WORLD_EMISSIONS_BREAKPOINT_5,
  WORLD_EMISSIONS_BREAKPOINT_6,
  WORLD_EMISSIONS_BREAKPOINT_7,
  WORLD_EMISSIONS_BREAKPOINT_8,
} from "@/constants/constants";

import {
  CARBONE_COLOR_CODE_1,
  CARBONE_COLOR_CODE_2,
  CARBONE_COLOR_CODE_3,
  CARBONE_COLOR_CODE_4,
  CARBONE_COLOR_CODE_5,
  CARBONE_COLOR_CODE_6,
  CARBONE_COLOR_CODE_7,
  CARBONE_COLOR_CODE_8,
  CARBONE_COLOR_CODE_9,
} from "@/styles/constants";

export const getCarboneEmissionColorCode = (carboneEmission: number) => {
  if (carboneEmission > 0 && carboneEmission <= WORLD_EMISSIONS_BREAKPOINT_1) {
    return CARBONE_COLOR_CODE_1;
  } else if (
    carboneEmission > WORLD_EMISSIONS_BREAKPOINT_1 &&
    carboneEmission <= WORLD_EMISSIONS_BREAKPOINT_2
  ) {
    return CARBONE_COLOR_CODE_2;
  } else if (
    carboneEmission > WORLD_EMISSIONS_BREAKPOINT_2 &&
    carboneEmission <= WORLD_EMISSIONS_BREAKPOINT_3
  ) {
    return CARBONE_COLOR_CODE_3;
  } else if (
    carboneEmission > WORLD_EMISSIONS_BREAKPOINT_3 &&
    carboneEmission <= WORLD_EMISSIONS_BREAKPOINT_4
  ) {
    return CARBONE_COLOR_CODE_4;
  } else if (
    carboneEmission > WORLD_EMISSIONS_BREAKPOINT_4 &&
    carboneEmission <= WORLD_EMISSIONS_BREAKPOINT_5
  ) {
    return CARBONE_COLOR_CODE_5;
  } else if (
    carboneEmission > WORLD_EMISSIONS_BREAKPOINT_5 &&
    carboneEmission <= WORLD_EMISSIONS_BREAKPOINT_6
  ) {
    return CARBONE_COLOR_CODE_6;
  } else if (
    carboneEmission > WORLD_EMISSIONS_BREAKPOINT_6 &&
    carboneEmission <= WORLD_EMISSIONS_BREAKPOINT_7
  ) {
    return CARBONE_COLOR_CODE_7;
  } else if (
    carboneEmission > WORLD_EMISSIONS_BREAKPOINT_8 &&
    carboneEmission <= WORLD_EMISSIONS_BREAKPOINT_8
  ) {
    return CARBONE_COLOR_CODE_8;
  } else {
    return CARBONE_COLOR_CODE_9;
  }
};
