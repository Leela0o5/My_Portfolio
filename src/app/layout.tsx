import type { Metadata } from "next";
import "./globals.css";
import VantaLoader from "./components/VantaLoader";

export const metadata: Metadata = {
  title: "Leela's Portfolio",
  description: "Created by Leela M",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white">
        <VantaLoader />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
