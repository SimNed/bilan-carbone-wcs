import { LegendContainerStyled } from "@/styles/mui-classes";
import SquareIcon from "@mui/icons-material/Square";
import { Stack, Typography } from "@mui/material";

const LegendContainer = ({
  elements,
}: {
  elements: { label: string; color: string }[];
}) => {
  return (
    <LegendContainerStyled>
      {elements.map((element) => (
        <Stack>
          <SquareIcon sx={{ color: element.color }} />
          <Typography paragraph>{element.label}</Typography>
        </Stack>
      ))}
    </LegendContainerStyled>
  );
};

export default LegendContainer;
