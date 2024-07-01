import SquareIcon from "@mui/icons-material/Square";
import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledLegendContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",

  "& > .MuiStack-root": {
    flexDirection: "row",
    alignItems: "center",
  },
}));

const LegendContainer = ({
  elements,
  gap = 3,
}: {
  elements: { label: string; color: string }[];
  gap?: number;
}) => {
  return (
    <StyledLegendContainer sx={{ gap: gap }}>
      {elements.map((element) => (
        <Stack>
          <SquareIcon sx={{ color: element.color }} />
          <Typography paragraph>{element.label}</Typography>
        </Stack>
      ))}
    </StyledLegendContainer>
  );
};

export default LegendContainer;
