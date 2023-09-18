import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import appInfo from "@/public/constants/meta.json";
import React from "react";
//------------------------------------------------------------//
//-----> END OF IMPORTS <-------------------------------------//
//------------------------------------------------------------//

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: appInfo.title,
  description: appInfo.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //----------------------------------------------------------------------------------//
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
