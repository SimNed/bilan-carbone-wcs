import { Button, Stack } from "@mui/material";

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
      alignItems="center"
      flex={1}
      flexBasis="25%"
    >
      <Button sx={{ flex: 1 }} onClick={onClickLeft}>
        <ArrowBackIosIcon color="primary" />
      </Button>
      <p style={{ flex: 6, textAlign: "center" }}>{navLabel}</p>
      <Button sx={{ flex: 1 }} onClick={onClickRight}>
        <ArrowForwardIosIcon color="primary" />
      </Button>
    </Stack>
  );
};

export default ArrowsNavigation;
