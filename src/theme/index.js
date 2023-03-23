import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const colorPalette = {
  primary: {
    main: "#73BDA8",
  },
  secondary: {
    main: "#ECE6C2",
  },
  warning: {
    main: "#D2A24C",
  },
  danger: {
    main: "#CC6B49",
  },
  error: {
    main: red.A400,
  },
};

// Create a theme instance.
const theme = createTheme({
  palette: colorPalette,
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color: "#fff",
          fontSize: "1rem",
        },
      },
    },
  },
});

export default theme;
