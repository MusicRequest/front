"use client";
import { axiosAuth } from "@/lib/axios";
import { useEffect } from "react";
import Cookies from "js-cookie";

const useAxiosAuth = () => {
  useEffect(() => {
    const token = Cookies.get("x-auth");
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
    };
    /* eslint-disable-next-line */
  }, []);

  return axiosAuth;
};

export default useAxiosAuth;
