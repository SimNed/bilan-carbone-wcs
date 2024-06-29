import { createTheme } from "@mui/material/styles";
import {
  BASE_FONT_FAMILY,
  BLACK_COLOR,
  ERROR_COLOR,
  HEADER_HEIGHT,
  INFO_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SUCCESS_COLOR,
  TITLE_FONT_FAMILY,
  WARNING_COLOR,
  WHITE_COLOR,
} from "./constants";

declare module "@mui/material/styles" {
  interface PaletteColor {
    white?: string;
  }

  interface SimplePaletteColorOptions {
    white?: string;
  }
}
const theme = createTheme({
  palette: {
    primary: {
      main: BLACK_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
    success: {
      main: SUCCESS_COLOR,
    },
    warning: {
      main: WARNING_COLOR,
    },
    error: {
      main: ERROR_COLOR,
    },
    info: {
      main: INFO_COLOR,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          "& .MuiButton-label": {
            textTransform: "lowercase",
          },
          fontFamily: "Poppins",
          fontWeight: 300,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          width: "100%",
          display: "flex",
          justifyContent: "center",
          aligntItems: "center",
          backgroundColor: WHITE_COLOR,
          color: BLACK_COLOR,
          boxShadow: "none",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: TITLE_FONT_FAMILY,
          fontWeight: 800,
          color: BLACK_COLOR,
        },
        h5: {
          fontFamily: BASE_FONT_FAMILY,
          fontWeight: 600,
        },
        h6: {
          fontFamily: BASE_FONT_FAMILY,
          fontWeight: 400,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "16px",
          width: "100%",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: BLACK_COLOR,
          fontFamily: "Poppins",
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
