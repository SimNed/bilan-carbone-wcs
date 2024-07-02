import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/material";

export default function CircularIndeterminate() {
  return (
    <Stack flex={1} height="100%">
      <CircularProgress />
    </Stack>
  );
}
