import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Stack } from "@mui/material";
import { DEFAULT_HEADER_HEIGHT } from "@/styles/constants";

export default function CircularIndeterminate() {
  return (
    <Stack
      height={`calc(100vh - ${DEFAULT_HEADER_HEIGHT})`}
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress sx={{ verticalAlign: "middle" }} />
    </Stack>
  );
}
