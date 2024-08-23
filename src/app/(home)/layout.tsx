"use client";

import { ThemeProvider } from "styled-components";
import theme from "@Lib/theme";
import GlobalStyle from "@Lib/globalStyles";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
