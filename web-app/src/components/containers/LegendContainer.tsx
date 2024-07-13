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
      flex={1}
      flexDirection="row"
      p={2}
      justifyContent={{ md: "space-around", xs: "space-between" }}
      alignItems="flex-start"
    >
      {elements.map((element) => (
        <Stack flexDirection="row" justifyContent="center">
          <SquareIcon sx={{ color: element.color }} />

          <Typography paragraph>{element.label}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default LegendContainer;
