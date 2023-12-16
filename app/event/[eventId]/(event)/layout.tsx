"use client";
import Image from "next/image";
import bandeau from "@/app/ui/assets/musicbandeau.jpg";
import useSWR from "swr";
import urlApi from "@/app/libs/utils/urlApi";
import { fetcher } from "@/app/libs/utils/fetcher";
import NavBar from "../ui/Navbar";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { eventId: string };
}) {
  const id = params.eventId;

  const {
    data: event,
    error,
    isLoading: isLoadingEvents,
  } = useSWR([urlApi(`/events/${id}`)], ([url]) => fetcher(url));

  return (
    <div className="bg-gray-50 dark:bg-gray-800 min-h-screen flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="relative h-32">
          <div className="absolute inset-0">
            <Image
              src={bandeau}
              alt="bandeau de l'entête"
              className="w-full h-full object-cover"
            />
            {/* <img
            className="w-full h-full object-cover"
            src={
              eventData.isLoad && eventData.bg_music !== null
                ? `/uploads/${eventData.bg_music}`
                : MusicBandeau
            }
            alt="banniere"
          /> */}
          </div>
          {/* {appData.titleEventappStyle.display ? ( */}
          <div className="relative max-w-7xl mx-auto h-32 sm:px-8 px-2">
            <div
            //   className={classNames(
            //     appData.titleEventappStyle.position === "center"
            //       ? "justify-center"
            //       : appData.titleEventappStyle.position === "left"
            //       ? "justify-start"
            //       : "justify-end",
            //     "flex items-center h-full"
            //   )}
            >
              <h1
                className="text-4xl font-extrabold tracking-tight sm:text-5xl "
                // style={{ color: appData.titleEventappStyle.color }}
              >
                {event?.name}
              </h1>
            </div>
          </div>
          {/* ) : null} */}
        </div>
        <NavBar
          // textBanner={appData.app.textbanner}
          active_wall_picture={true}
          active_music_request={true}
          // changeComponent={changeComponent}
        />
        {/* {appData.app.textbanner ? (
        <div className="hidden  md:inline-block -mt-4 pb-4">
          <TextScrollingBanner text={appData.app.textbanner} />
        </div>
      ) : null} */}

        <div className="max-w-7xl w-full mx-auto sm:px-6 lg:px-8 ">
          {children}
        </div>
      </div>
    </div>
  );
}
