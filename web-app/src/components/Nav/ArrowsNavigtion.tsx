import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMemo } from "react";

const ArrowsNavigation = ({
  selectItems,
  selectValue,
  handleSelectChange,
  isReversed = false,
}: {
  selectItems: { label: string | number; value: string | number }[];
  selectValue: { label: string | number; value: string | number };
  handleSelectChange: (value: string | number) => void;
  isReversed?: boolean;
}) => {
  const sortedSelectItems = useMemo(() => {
    if (selectItems.length <= 0) return;

    if (typeof selectItems[0].value === "number") {
      return selectItems.sort((a, b) =>
        isReversed
          ? (b.label as number) - (a.label as number)
          : (a.label as number) - (b.label as number)
      );
    } else if (typeof selectItems[0].value === "string") {
      return selectItems.sort((a, b) =>
        isReversed
          ? (b.label as string).localeCompare(a.label as string)
          : (a.label as string).localeCompare(b.label as string)
      );
    }
    return [];
  }, [selectItems]);

  const onSelectChange = (e: SelectChangeEvent<string | number>) => {
    handleSelectChange(e.target.value);
  };

  const onNavChange = (offset: number) => {
    const selectedItemIndex =
      selectItems.findIndex((item) => item.value === selectValue.value) +
      offset;

    if (selectedItemIndex < 0 || selectedItemIndex >= selectItems.length)
      return;

    handleSelectChange(selectItems[selectedItemIndex].value);
  };

  return (
    <Stack
      direction="row"
      color="primary"
      justifyContent="center"
      alignItems="center"
      flex={1}
      flexBasis="25%"
    >
      <Button sx={{ flex: 1 }} onClick={() => onNavChange(isReversed ? 1 : -1)}>
        <ArrowBackIosIcon color="primary" />
      </Button>
      <Select
        variant="standard"
        size="medium"
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={selectValue.value}
        onChange={onSelectChange}
        MenuProps={{
          style: {
            minWidth: 250,
            padding: 8,
            maxHeight: 260,
          },
        }}
      >
        {sortedSelectItems &&
          sortedSelectItems.map((item) => (
            <MenuItem key={item.label} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
      </Select>
      <Button sx={{ flex: 1 }} onClick={() => onNavChange(isReversed ? -1 : 1)}>
        <ArrowForwardIosIcon color="primary" />
      </Button>
    </Stack>
  );
};

export default ArrowsNavigation;
