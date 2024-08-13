import { DEFAULT_HEADER_HEIGHT, WHITE_COLOR } from "@/styles/constants";
import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface SubHeaderProps {
  leftChildren?: ReactNode;
  rightChildren?: ReactNode;
  height?: string;
  top?:
    | string
    | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
}

const SubHeader = ({
  leftChildren,
  rightChildren,
  height = DEFAULT_HEADER_HEIGHT,
  top = DEFAULT_HEADER_HEIGHT,
}: SubHeaderProps) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent={{ xs: "space-between", md: "flex-start" }}
      alignItems="center"
      position="sticky"
      top={top}
      width="100%"
      height={height}
      zIndex={100}
      px={{ xs: 2, md: 4 }}
      sx={{ backgroundColor: WHITE_COLOR }}
    >
      {leftChildren && (
        <Grid item xs={12} md>
          {leftChildren}
        </Grid>
      )}

      {rightChildren && (
        <Grid item xs={12} md>
          {rightChildren}
        </Grid>
      )}
    </Grid>
  );
};

export default SubHeader;
