import { BASE_BORDER } from "@/styles/constants";
import { Stack } from "@mui/material";
import { styled } from "@mui/system";

export const StatsDetailsTable = styled(Stack)(({ theme }) => ({
  flex: 1,
  width: "90%",
  height: "100%",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  "& > .MuiStack-root > .MuiStack-root": {
    borderRight: BASE_BORDER,
    borderBottom: BASE_BORDER,
  },
  "& > .MuiStack-root:last-child > .MuiStack-root": {
    borderRight: "none",
  },
  "& > .MuiStack-root > .MuiStack-root:last-child": {
    borderBottom: "none",
  },
}));

export const StatsDetailsTableColumn = styled(Stack)(({ theme }) => ({
  flex: 1,
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  "& > .MuiStack-root:first-child": {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    width: "100%",
    "& > .MuiTypography-root": {
      textAlign: "center",
      fontSize: 12,
    },
    "& > .MuiSvgIcon-root, & > .MuiTypography-root ": {
      fontSize: "inherit",
    },
  },
  "& > .MuiStack-root:last-child": {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    fontSize: "250%",
  },
}));
