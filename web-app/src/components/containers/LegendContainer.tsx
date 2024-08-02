import {
  DEFAULT_HEADER_HEIGHT,
  DEFAULT_LEGEND_CONTAINER_GAP,
  WHITE_COLOR,
} from "@/styles/constants";
import SquareIcon from "@mui/icons-material/Square";
import { Stack, Typography } from "@mui/material";

interface LegendContainerProps {
  elements: { label: string; color: string }[];
  gap?: number;
}

const LegendContainer = ({
  elements,
  gap = DEFAULT_LEGEND_CONTAINER_GAP,
}: LegendContainerProps) => {
  return (
    <Stack
      height={DEFAULT_HEADER_HEIGHT}
      flex={1}
      flexDirection="row"
      flexWrap="wrap"
      gap={gap}
      justifyContent={{ md: "flex-end", xs: "center" }}
      alignItems="center"
      sx={{ backgroundColor: WHITE_COLOR }}
    >
      {elements.map((element) => (
        <Stack
          key={element.label}
          flexDirection="row"
          justifyContent="center"
          gap={1}
        >
          <SquareIcon sx={{ color: element.color }} />
          <Typography paragraph>{element.label}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default LegendContainer;
