import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/material";

export default function CircularIndeterminate() {
  return (
    <Stack height="inherit" justifyContent="center" alignItems="center">
      <CircularProgress sx={{ verticalAlign: "middle" }} />
    </Stack>
  );
}
