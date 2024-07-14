import { createTheme } from "@mui/material/styles";
import {
  BASE_BORDER,
  BASE_FONT_FAMILY,
  BLACK_COLOR,
  DEFAULT_HEADER_HEIGHT,
  ERROR_COLOR,
  INFO_COLOR,
  SECONDARY_COLOR,
  SUCCESS_COLOR,
  TITLE_FONT_FAMILY,
  WARNING_COLOR,
  WHITE_COLOR,
} from "./constants";
import { fontWeight } from "@mui/system";

declare module "@mui/material/styles" {
  interface PaletteColor {
    white?: string;
  }

  interface SimplePaletteColorOptions {
    white?: string;
  }
}

let theme = createTheme();
theme = createTheme(theme, {
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
    MuiIconButton: {
      styleOverrides: {
        root: {
          margin: "0 12px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          [theme.breakpoints.up("xs")]: {
            height: DEFAULT_HEADER_HEIGHT,
          },
          minHeight: DEFAULT_HEADER_HEIGHT,
          maxHeight: DEFAULT_HEADER_HEIGHT,
          display: "flex",
          justifyContent: "center",
          aligntItems: "center",
          backgroundColor: WHITE_COLOR,
          color: BLACK_COLOR,
          boxShadow: "none",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: DEFAULT_HEADER_HEIGHT,
          maxHeight: DEFAULT_HEADER_HEIGHT,
          height: DEFAULT_HEADER_HEIGHT,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: TITLE_FONT_FAMILY,
          fontWeight: 600,
          color: BLACK_COLOR,
        },
        h1: {
          [theme.breakpoints.up("xs")]: {
            fontSize: "3rem",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "4.5rem",
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: "6rem",
          },
        },
        h2: {
          [theme.breakpoints.up("xs")]: {
            fontSize: "2rem",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "2.5rem",
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: "3rem",
          },
        },
        h3: {
          [theme.breakpoints.up("xs")]: {
            fontSize: "1.25rem",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "2rem",
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: "2.5rem",
          },
        },
        h4: {
          fontFamily: BASE_FONT_FAMILY,
          fontWeight: 600,
          [theme.breakpoints.up("xs")]: {
            fontSize: "1rem",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "1rem",
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: "1.25rem",
          },
        },
        h5: {
          fontFamily: BASE_FONT_FAMILY,
          fontWeight: 500,
          [theme.breakpoints.up("xs")]: {
            fontSize: "1rem",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "1rem",
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: "1.25rem",
          },
        },
        h6: {
          fontFamily: BASE_FONT_FAMILY,
          fontWeight: 400,
          [theme.breakpoints.up("xs")]: {
            fontSize: "1rem",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "1rem",
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: "1.25rem",
          },
        },
        paragraph: {
          fontFamily: BASE_FONT_FAMILY,
          fontSize: "1rem",
          fontWeight: 400,
          margin: 0,
          padding: 0,
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
          height: DEFAULT_HEADER_HEIGHT,
          color: BLACK_COLOR,
          fontFamily: "Poppins",
          textTransform: "none",
          borderBottom: BASE_BORDER,
        },
      },
    },
  },
});

export default theme;
