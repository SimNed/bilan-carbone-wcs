import { Box, Container, Grid, Stack } from "@mui/material";
import { ReactNode } from "react";

const DividedStack = ({
  leftNode,
  rightNode,
}: {
  leftNode: ReactNode;
  rightNode: ReactNode;
}) => {
  return (
    <Stack direction="row" spacing={4}>
      <Box sx={{ flex: 1 }}>
        <Box position="fixed" width={`${(1 / 4) * 100}%`} height="100%">
          {leftNode}
        </Box>
      </Box>
      <Box width={`${(1 / 4) * 100}%`} height="100%" sx={{ flex: 3 }}>
        {rightNode}
      </Box>
    </Stack>
  );
};

export default DividedStack;
