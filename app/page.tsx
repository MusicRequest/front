"use client";

import * as React from "react";
import LoaderPage from "./ui/common/LoaderPage";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useGetEvents } from "@/service/event";
import { KeyCache } from "@/lib/enum";

export default function HomePage() {
  const { data, isLoading, error } = useGetEvents({
    options: { queryKey: [KeyCache.Events] },
  });

  if (isLoading) {
    return <LoaderPage />;
  }

  if (error) return <div>error</div>;

  if (data?.length && data?.length > 0) {
    redirect("event");
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Request Songs
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Veuillez vous connecter afin de creer un évenement!
          </p>
          <Link href="/login">
            <div className="inline-flex rounded-md">
              <div className="mt-4 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Login
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
