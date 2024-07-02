import { styled } from "@mui/system";
import { BASE_BORDER, GRAY_COLOR, TITLE_FONT_FAMILY } from "./constants";
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
