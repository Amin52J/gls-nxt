import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import theme from "@Lib/theme";

export default function Providers({ children }: PropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
