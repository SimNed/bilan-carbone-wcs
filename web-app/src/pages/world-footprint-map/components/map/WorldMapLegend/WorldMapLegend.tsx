import {
  WORLD_EMISSIONS_BREAKPOINT_1,
  WORLD_EMISSIONS_BREAKPOINT_2,
  WORLD_EMISSIONS_BREAKPOINT_3,
  WORLD_EMISSIONS_BREAKPOINT_4,
  WORLD_EMISSIONS_BREAKPOINT_5,
  WORLD_EMISSIONS_BREAKPOINT_6,
  WORLD_EMISSIONS_BREAKPOINT_7,
  WORLD_EMISSIONS_BREAKPOINT_8,
  WORLD_EMISSIONS_END_DATE,
  WORLD_EMISSIONS_START_DATE,
} from "@/utils/constants.utils";
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
  CARBONE_COLOR_CODE_NO_DATA,
} from "@/styles/constants";

import SquareIcon from "@mui/icons-material/Square";
import { Stack } from "@mui/material";

const WorldMapLegend = () => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      flex={1}
      flexWrap="wrap"
    >
      <Stack direction="row" alignItems="center">
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_1 }} />
        <p>{`< ${WORLD_EMISSIONS_BREAKPOINT_1}`}</p>
      </Stack>
      <Stack direction="row" alignItems="center">
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_2 }} />
        <p>{`${WORLD_EMISSIONS_BREAKPOINT_1} - ${WORLD_EMISSIONS_BREAKPOINT_2}`}</p>
      </Stack>
      <Stack direction="row" alignItems="center">
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_3 }} />
        <p>{`${WORLD_EMISSIONS_BREAKPOINT_2} - ${WORLD_EMISSIONS_BREAKPOINT_3}`}</p>
      </Stack>
      <Stack direction="row" alignItems="center">
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_4 }} />
        <p>{`${WORLD_EMISSIONS_BREAKPOINT_3} - ${WORLD_EMISSIONS_BREAKPOINT_4}`}</p>
      </Stack>
      <Stack direction="row" alignItems="center">
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_5 }} />
        <p>{`${WORLD_EMISSIONS_BREAKPOINT_4} - ${WORLD_EMISSIONS_BREAKPOINT_5}`}</p>
      </Stack>
      <Stack direction="row" alignItems="center">
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_6 }} />
        <p>{`${WORLD_EMISSIONS_BREAKPOINT_5} - ${WORLD_EMISSIONS_BREAKPOINT_6}`}</p>
      </Stack>
      <Stack direction="row" alignItems="center">
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_7 }} />
        <p>{`${WORLD_EMISSIONS_BREAKPOINT_6} - ${WORLD_EMISSIONS_BREAKPOINT_7}`}</p>
      </Stack>
      <Stack direction="row" alignItems="center">
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_8 }} />
        <p>{`${WORLD_EMISSIONS_BREAKPOINT_7} - ${WORLD_EMISSIONS_BREAKPOINT_8}`}</p>
      </Stack>
      <Stack direction="row" alignItems="center">
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_9 }} />
        <p>{`> ${WORLD_EMISSIONS_BREAKPOINT_8}`}</p>
      </Stack>
      <Stack direction="row" alignItems="center">
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_NO_DATA }} />
        <p>no data</p>
      </Stack>
    </Stack>
  );
};

export default WorldMapLegend;
