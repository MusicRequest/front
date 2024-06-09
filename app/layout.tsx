import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/app/providers/theme-provider";
import Providers from "@/components/Providers";
import React from "react";

export const metadata: Metadata = {
  title: "Music Request",
  description: "Make your request and vote for you're favourite music!!!!",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={inter.className + " h-full text-sm dark:bg-background"}>
        <Providers>
          <ThemeProvider attribute="class">
            <ToastContainer />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
