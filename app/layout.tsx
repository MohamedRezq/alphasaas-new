"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import appInfo from "@/public/constants/meta.json";
import React from "react";
//-----> Components <-----------------------------------------//
import { Sidebar } from "@/components/layouts";
// import AuthProvider from "@/utils/AuthProvider";
//-----> Redux <----------------------------------------------//
import { Provider } from "react-redux";
import store from "@/store";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
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
  const displayMiniSidebar = sessionStorage.getItem("extended_view")
    ? true
    : false;
  //----------------------------------------------------------------------------------//
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Quicksand&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={inter.className}>
        <main className="w-full bg-alabaster dark:bg-codgray dark:text-white flex m-auto px-10 lg:px-4 py-3 font-medium">
          <Sidebar />
          <div
            className={`flex flex-col ${!displayMiniSidebar && "max-w-4xl"} ${
              displayMiniSidebar && "mr-5"
            } gap-y-5 w-full ${
              !displayMiniSidebar && "mx-auto"
            } h-fit lg:h-[96vh]`}
          >
            <div className="w-full flex flex-col md:pr-10 mx-auto gap-y-4 py-3 lg:overflow-y-auto">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
