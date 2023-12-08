"use client";

import * as React from "react";
import useSWR from "swr";
import urlApi from "../libs/utils/urlApi";
import { fetcher } from "../libs/utils/fetcher";
import { redirect } from "next/navigation";

export interface IAppProps {}

export default function TestPage(props: IAppProps) {
  const {
    data: events,
    error,
    isLoading,
  } = useSWR(urlApi("/events"), fetcher, { revalidateOnFocus: false });

  if (events && events.length === 0) {
    redirect("/");
  }

  return <div>Event</div>;
}
