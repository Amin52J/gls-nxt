"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
   body {
       background: ${({ theme }) => theme.colors.background};
       color: ${({ theme }) => theme.colors.text};
   }
`;

export default GlobalStyle;
