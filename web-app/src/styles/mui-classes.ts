import { styled } from "@mui/system";
import { BLACK_COLOR, TITLE_FONT_FAMILY, WHITE_COLOR } from "./constants";
import Link from "next/link";

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
