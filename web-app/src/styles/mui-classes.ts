import { styled } from "@mui/system";
import { BLACK_COLOR, TITLE_FONT_FAMILY, WHITE_COLOR } from "./constants";
import Link from "next/link";

export const AppBarLink = styled(Link)(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  fontFamily: TITLE_FONT_FAMILY,
  fontSize: ".8rem",
  fontWeight: 800,
  color: "inherit",
  textDecoration: "none",
  backgroundColor: "inherit",
  transition: "ease .3s",
  "&:hover": {
    backgroundColor: BLACK_COLOR,
    color: WHITE_COLOR,
  },
}));
