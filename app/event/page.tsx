"use client";

import * as React from "react";
import useSWR from "swr";
import urlApi from "../libs/utils/urlApi";
import { fetcher } from "../libs/utils/fetcher";
import { useRouter } from "next/navigation";
import LoaderPage from "../ui/common/LoaderPage";
import useUser from "../libs/hooks/useUser";

export interface IAppProps {}

export default function TestPage() {
  const router = useRouter();
  const {
    data: events,
    error,
    isLoading: isLoadingEvent,
  } = useSWR(urlApi("/events"), fetcher, { revalidateOnFocus: false });

  const { user, verifyUser } = useUser();

  if (events && events.length === 0) {
    router.push("/");
  }

  React.useEffect(() => {
    if (events && events.length > 0) {
      if (!user) {
        router.push(`/event/${events[0].id}/new`);
      } else {
        verifyUser(events[0].id)
          .then(() => {
            router.push(`/event/${events[0].id}`);
          })
          .catch((error) => {
            router.push(`/event/${events[0].id}/new`);
          });
      }
    }
  }, [events]);

  return <LoaderPage />;
}
