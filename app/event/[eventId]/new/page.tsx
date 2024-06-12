"use client";
import useUser from "@/app/libs/hooks/useUser";
import fetchData from "@/app/libs/utils/fetch";
import baseUrl from "@/app/libs/utils/urlApi";
import { useRouter } from "next/navigation";

import React from "react";
import { User } from "@/lib/types";

export default function Page({ params }: { params: { eventId: string } }) {
  const eventId = params.eventId;
  const router = useRouter();
  const [pseudo, setPseudo] = React.useState("");
  const { user, verifyUser, saveVisitor } = useUser();

  React.useEffect(() => {
    if (user) {
      verifyUser(eventId);
    }
    /* eslint-disable-next-line */
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const visitor: User = await fetchData(baseUrl("/visitors"), "POST", {
        name: pseudo,
        eventId,
      });

      saveVisitor(visitor);

      router.push(`/event/${eventId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Music Request
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Renseigner un pseudonyme
              </span>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  pseudonyme
                </label>
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPseudo(e.target.value);
                  }}
                  id="pseudo"
                  name="pseudo"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Pseudo"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Entrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
