"use client";
import LoaderPage from "@/app/ui/common/LoaderPage";
import useUser from "@/app/libs/hooks/useUser";
import { fetcher } from "@/app/libs/utils/fetcher";
import urlApi from "@/app/libs/utils/urlApi";
import { useRouter } from "next/navigation";
import * as React from "react";
import useSWR from "swr";

export default function Page({ params }: { params: { eventId: string } }) {
  const id = params.eventId;
  const router = useRouter();
  const { verifyUser } = useUser();
  const [isLoading, setIsloading] = React.useState(true);

  const {
    data,
    error,
    isLoading: isLoadingEvents,
  } = useSWR([urlApi(`/events/${id}`)], ([url]) => fetcher(url));

  React.useEffect(() => {
    verifyUser(id)
      .then(() => {
        setIsloading(false);
      })
      .catch((error) => {
        router.push(`/event/${id}/new`);
      });
  }, []);

  if (isLoading || isLoadingEvents) {
    return <LoaderPage />;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 min-h-screen flex flex-col justify-between">
      test
    </div>
  );
  // <>{data.name}</>;
}
