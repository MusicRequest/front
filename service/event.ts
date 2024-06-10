import { BaseUrl } from "@/service/common.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import useAxios from "@/components/hook/useAxios";
import { Event } from "@/lib/types";

export const useGetEvents = ({
  options,
}: {
  options: UseQueryOptions<Event[], Error, Event[], any[]>;
}) => {
  const axiosAuth = useAxios();

  return useQuery<Event[], Error, Event[], any[]>({
    queryFn: async () => {
      const r = await axiosAuth.get<any[]>(BaseUrl.Event);
      return r.data;
    },
    ...options,
  });
};
