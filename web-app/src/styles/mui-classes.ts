import { makeStyles } from "@mui/styles";
import {
  BLACK_COLOR,
  TITLE_FONT_FAMILY,
  WARNING_COLOR,
  WHITE_COLOR,
} from "./constants";
import { Theme } from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => ({
  appBarLink: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontFamily: TITLE_FONT_FAMILY,
    fontSize: "12px",
    textDecoration: "none",
    backgroundColor: "inherit",
    transition: "ease .3s",
    "&:hover": {
      backgroundColor: BLACK_COLOR,
      color: WHITE_COLOR,
    },
  },
}));
