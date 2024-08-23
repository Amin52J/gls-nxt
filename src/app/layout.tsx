import type { Metadata } from "next";
import StyledComponentsRegistry from "@Lib/registry";
import CssReset from "@Lib/cssReset";

export const metadata: Metadata = {
  title: "GLS/NXT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CssReset />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
