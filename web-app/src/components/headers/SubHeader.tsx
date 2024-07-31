import { DEFAULT_HEADER_HEIGHT, WHITE_COLOR } from "@/styles/constants";
import { Grid } from "@mui/material";
import { ReactNode } from "react";

const SubHeader = ({
  leftChildren,
  rightChildren,
}: {
  leftChildren?: ReactNode;
  rightChildren?: ReactNode;
}) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent={{ xs: "space-between", md: "flex-start" }}
      alignItems="center"
      position="sticky"
      top={DEFAULT_HEADER_HEIGHT}
      width="100%"
      height={DEFAULT_HEADER_HEIGHT}
      zIndex={100}
      px={{ xs: 2, md: 4 }}
      sx={{ backgroundColor: WHITE_COLOR }}
    >
      {leftChildren && (
        <Grid item xs direction="row" alignItems="center">
          {leftChildren}
        </Grid>
      )}

      {rightChildren && (
        <Grid item xs direction="row" alignItems="center">
          {rightChildren}
        </Grid>
      )}
    </Grid>
  );
};

export default SubHeader;
