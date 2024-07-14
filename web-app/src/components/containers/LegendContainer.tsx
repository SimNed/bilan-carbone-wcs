import { DEFAULT_HEADER_HEIGHT, WHITE_COLOR } from "@/styles/constants";
import SquareIcon from "@mui/icons-material/Square";
import { Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";

const LegendContainer = ({
  elements,
  gap = 3,
}: {
  elements: { label: string; color: string }[];
  gap?: number;
}) => {
  return (
    <Stack
      height={DEFAULT_HEADER_HEIGHT}
      flex={1}
      flexDirection="row"
      gap={3}
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
