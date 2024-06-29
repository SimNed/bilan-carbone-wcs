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
import { Stack, Typography } from "@mui/material";
import { WorldMapLegendContainer } from "@/styles/mui-classes";

const WorldMapLegend = () => {
  return (
    <WorldMapLegendContainer>
      <Stack>
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_1 }} />
        <Typography paragraph>{`< ${WORLD_EMISSIONS_BREAKPOINT_1}`}</Typography>
      </Stack>
      <Stack>
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_2 }} />
        <Typography
          paragraph
        >{`${WORLD_EMISSIONS_BREAKPOINT_1} - ${WORLD_EMISSIONS_BREAKPOINT_2}`}</Typography>
      </Stack>
      <Stack>
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_3 }} />
        <Typography
          paragraph
        >{`${WORLD_EMISSIONS_BREAKPOINT_2} - ${WORLD_EMISSIONS_BREAKPOINT_3}`}</Typography>
      </Stack>
      <Stack>
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_4 }} />
        <Typography
          paragraph
        >{`${WORLD_EMISSIONS_BREAKPOINT_3} - ${WORLD_EMISSIONS_BREAKPOINT_4}`}</Typography>
      </Stack>
      <Stack>
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_5 }} />
        <Typography
          paragraph
        >{`${WORLD_EMISSIONS_BREAKPOINT_4} - ${WORLD_EMISSIONS_BREAKPOINT_5}`}</Typography>
      </Stack>
      <Stack>
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_6 }} />
        <Typography
          paragraph
        >{`${WORLD_EMISSIONS_BREAKPOINT_5} - ${WORLD_EMISSIONS_BREAKPOINT_6}`}</Typography>
      </Stack>
      <Stack>
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_7 }} />
        <Typography
          paragraph
        >{`${WORLD_EMISSIONS_BREAKPOINT_6} - ${WORLD_EMISSIONS_BREAKPOINT_7}`}</Typography>
      </Stack>
      <Stack>
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_8 }} />
        <Typography
          paragraph
        >{`${WORLD_EMISSIONS_BREAKPOINT_7} - ${WORLD_EMISSIONS_BREAKPOINT_8}`}</Typography>
      </Stack>
      <Stack>
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_9 }} />
        <Typography paragraph>{`> ${WORLD_EMISSIONS_BREAKPOINT_8}`}</Typography>
      </Stack>
      <Stack>
        <SquareIcon sx={{ color: CARBONE_COLOR_CODE_NO_DATA }} />
        <Typography paragraph>no data</Typography>
      </Stack>
    </WorldMapLegendContainer>
  );
};

export default WorldMapLegend;
