import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'Noto Sans'
    ].join(','),
  },
});

export default theme;


