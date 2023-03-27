import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const background = {
  default: "#fef6e4",
  paper: "#f3d2c1",
};

const text = {};

const colorPalette = {
  primary: {
    main: "#fef6e4",
  },
  secondary: {
    main: "#fef6e4",
  },
  warning: {
    main: "#f582ae",
  },
  danger: {
    main: "#CC6B49",
  },
  error: {
    main: red.A400,
  },
};

// Create a theme instance.
const theme = createTheme({});

export default theme;
