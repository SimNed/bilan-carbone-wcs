import {
  DEFAULT_HEADER_HEIGHT,
  DEFAULT_LEGEND_CONTAINER_GAP,
  WHITE_COLOR,
} from "@/styles/constants";
import SquareIcon from "@mui/icons-material/Square";
import { Stack, Typography } from "@mui/material";

const LegendContainer = ({
  elements,
  gap = DEFAULT_LEGEND_CONTAINER_GAP,
}: {
  elements: { label: string; color: string }[];
  gap?: number;
}) => {
  return (
    <Stack
      height={DEFAULT_HEADER_HEIGHT}
      flex={1}
      flexDirection="row"
      gap={gap}
      justifyContent={{ md: "flex-end", xs: "center" }}
      alignItems="center"
      sx={{ backgroundColor: WHITE_COLOR }}
    >
      {elements.map((element) => (
        <Stack flexDirection="row" justifyContent="center" gap={1}>
          <SquareIcon sx={{ color: element.color }} />
          <Typography paragraph>{element.label}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default LegendContainer;
