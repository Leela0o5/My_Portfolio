import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { RicingProvider } from "@/contexts/RicingContext";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leela's Portfolio",
  description: "Linux Rice Desktop Environment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <RicingProvider>
            <WorkspaceProvider>{children}</WorkspaceProvider>
          </RicingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
