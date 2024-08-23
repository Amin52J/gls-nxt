import { DefaultTheme } from "styled-components";

const theme = {
  colors: {
    background: "#eee",
    backgroundComplementary: "#999",
    primary: {
      100: "#1ed760",
      80: "#3be477",
      60: "#1abc54",
      contrastText: "#000",
    },
    secondary: {
      100: "#222",
      80: "#444",
      60: "#666",
      contrastText: "#fff",
    },
    overlay: "rgba(0, 0, 0, 0.4)",
    text: "#000",
  },
  spacing: 8,
  borderRadius: {
    m: "4px",
    l: "8px",
  },
  shadows: {
    s: "rgba(0, 0, 0, 0.3) 0 4px 4px 0",
    m: "rgba(0, 0, 0, 0.3) 0 4px 8px 0",
  },
  breakpoints: {
    tablet: 768,
  },
};

export type ThemeType = typeof theme;

const defaultTheme: DefaultTheme = theme;

export default defaultTheme;
