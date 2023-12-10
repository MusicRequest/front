"use client";

import React, { FormEvent, useEffect, useState } from "react";
import baseUrl from "../libs/utils/urlApi";
import fetchData from "../libs/utils/fetch";
import { notifyError } from "../libs/utils/notify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useSWR from "swr";
import urlApi from "../libs/utils/urlApi";
import { fetcher } from "../libs/utils/fetcher";
import LoaderPage from "../ui/common/LoaderPage";

const Page = () => {
  const { data, error, isLoading } = useSWR(
    [urlApi("/auth/me"), true],
    ([url, needToken]) => fetcher(url, needToken)
  );

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const router = useRouter();

  const login = async (e: FormEvent) => {
    e.preventDefault();

    const body = {
      username: userName,
      password: userPassword,
    };

    try {
      const login: { token: string } = await fetchData(
        baseUrl("/auth/login"),
        "POST",
        body
      );
      Cookies.set("x-auth", login.token);

      router.push("/admin");
    } catch (e) {
      notifyError("Une erreur est survenue");
    }
  };

  if (isLoading) {
    return <LoaderPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connection
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              login(e);
            }}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nom
              </label>
              <input
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                autoComplete="username"
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
