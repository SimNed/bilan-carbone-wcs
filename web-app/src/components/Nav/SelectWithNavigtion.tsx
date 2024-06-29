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
import { SelectWithNavigationContainer } from "@/styles/mui-classes";

const SelectWithNavigation = ({
  selectItems,
  selectValue,
  handleSelectChange,
  isReversed = false,
}: {
  selectItems: { label: string | number; value: string | number }[];
  selectValue: { label: string | number; value: string | number };
  handleSelectChange: (value: string | number) => void;
  isReversed?: boolean;
  flex?: number;
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
    <SelectWithNavigationContainer>
      <Stack>
        <Button onClick={() => onNavChange(isReversed ? 1 : -1)}>
          <ArrowBackIosIcon color="primary" />
        </Button>
        <Select
          variant="standard"
          size="medium"
          id="demo-simple-select-filled"
          labelId="demo-simple-select-filled-label"
          value={selectValue.value}
          onChange={onSelectChange}
          MenuProps={{
            style: {
              minWidth: 250,
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
        <Button onClick={() => onNavChange(isReversed ? -1 : 1)}>
          <ArrowForwardIosIcon color="primary" />
        </Button>
      </Stack>
    </SelectWithNavigationContainer>
  );
};

export default SelectWithNavigation;
