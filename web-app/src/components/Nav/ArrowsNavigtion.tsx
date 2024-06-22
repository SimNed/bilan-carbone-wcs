import { IconButton, Stack, Typography } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ArrowsNavigation = ({
  navLabel,
  onClickLeft,
  onClickRight,
}: {
  navLabel: string | number;
  onClickLeft: () => void;
  onClickRight: () => void;
}) => {
  return (
    <Stack
      direction="row"
      color="primary"
      justifyContent="center"
      alignItems="cnter"
    >
      <IconButton sx={{ borderRadius: "none" }} onClick={onClickLeft}>
        <ArrowBackIosIcon color="primary" />
      </IconButton>
      <p>{navLabel}</p>
      <IconButton onClick={onClickRight}>
        <ArrowForwardIosIcon color="primary" />
      </IconButton>
    </Stack>
  );
};

export default ArrowsNavigation;
