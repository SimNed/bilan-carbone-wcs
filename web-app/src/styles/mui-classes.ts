import { styled } from "@mui/system";
import { TITLE_FONT_FAMILY } from "./constants";
import Link from "next/link";
import { Stack } from "@mui/material";

// NAVIGATIONS

export const AppBarLink = styled(Link)(({ theme }) => ({
  height: "100%",
  margin: 0,
  padding: 0,
  justifyContent: "center",
  alignItems: "center",
  fontFamily: TITLE_FONT_FAMILY,
  fontSize: ".8rem",
  fontWeight: 800,
  color: "inherit",
  textDecoration: "none",
  transition: "ease .3s",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,.05)",
  },
}));

// CONTAINERS

export const StatsDetailsTable = styled(Stack)(({ theme }) => ({
  flex: 1,
  width: "90%",
  height: "100%",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  // marginLeft: "10%",
  "& > .MuiStack-root > .MuiStack-root": {
    borderRight: "1px solid #c5c5c5",
    borderBottom: "1px solid #c5c5c5",
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

export const SelectWithNavigationContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  color: "primary",
  "& > .MuiStack-root": {
    flex: "0 1 360px",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

//
