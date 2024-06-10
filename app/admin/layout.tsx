"use client";

import NavBar from "./ui/NavBar";
import React from "react";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
  params: { eventId: string };
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen h-full">
      <NavBar />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
