import {
  BaseUrl,
  Filters,
  joinFilterArguments,
} from "@/service/common.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import useAxios from "@/components/hook/useAxios";
import { AxiosResponse } from "axios";

export const useGetEvents = ({
  filters,
  options,
}: {
  filters: Filters;
  options: UseQueryOptions<Event[], Error, Event[], any[]>;
}) => {
  const { axiosNoAuth } = useAxios();
  const requestArguments = joinFilterArguments(filters);

  return useQuery<Event[], Error, Event[], any[]>({
    queryFn: () => {
      return axiosNoAuth
        .get<any[]>(BaseUrl.Event + requestArguments)
        .then((r: AxiosResponse) => r.data);
    },
    ...options,
  });
};
