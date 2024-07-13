import { styled } from "@mui/system";
import { BASE_BORDER, GRAY_COLOR, TITLE_FONT_FAMILY } from "./constants";
import Link from "next/link";
import { Stack } from "@mui/material";

// NAVIGATIONS

export const AppBarLink = styled(Link)(({ theme }) => ({
  margin: 0,
  padding: 0,
  height: "100%",
  flex: 1,
  display: "flex",
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

//
