import { Button, MenuItem, Select, Stack } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { height } from "@mui/system";

const ArrowsNavigation = ({
  navLabel,
  selectItems,
  selectValue,
  onClickLeft,
  onClickRight,
  onSelectChange,
}: {
  navLabel: string | number;
  selectItems: { label: string | number; value: string | number }[];
  selectValue: { label: string | number; value: string | number };
  onClickLeft: () => void;
  onClickRight: () => void;
  onSelectChange: (value: string | number) => void;
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
      <Select
        variant="standard"
        size="medium"
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={selectValue.value}
        onChange={(e) => onSelectChange(e.target.value)}
        MenuProps={{
          style: {
            minWidth: 250,
            padding: 8,
            maxHeight: 260,
          },
        }}
      >
        {selectItems.map((item) => (
          <MenuItem key={item.label} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <Button sx={{ flex: 1 }} onClick={onClickRight}>
        <ArrowForwardIosIcon color="primary" />
      </Button>
    </Stack>
  );
};

export default ArrowsNavigation;
