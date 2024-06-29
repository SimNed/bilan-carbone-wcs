import { borderRight, fontSize, styled, width } from "@mui/system";
import { BLACK_COLOR, TITLE_FONT_FAMILY, WHITE_COLOR } from "./constants";
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

export const CountryCO2EmissionsDetailsContainer = styled(Stack)(
  ({ theme }) => ({
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    "& > .MuiStack-root > .MuiStack-root:first-child": {
      borderRight: "1px solid #fff",
    },
    "& > .MuiStack-root:last-child > .MuiStack-root:first-child": {
      borderRight: "none",
    },
  })
);

export const CountryCO2EmissionsDetailsColumn = styled(Stack)(({ theme }) => ({
  flex: 1,
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  "& > .MuiStack-root:first-child": {
    flex: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c5c5c5",
    "& > .MuiTypography-root": {
      color: "#fff",
    },
  },
  "& > .MuiStack-root:last-child": {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40px",
    "& > .MuiSvgIcon-root": {
      fontSize: "inherit",
    },
  },
}));
