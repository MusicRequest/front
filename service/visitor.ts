import { BaseUrl } from "@/service/common.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import useAxios from "@/components/hook/useAxios";
import { Visitor } from "@/lib/types";

export const useGetVisitors = ({
  eventId,
  options,
}: {
  eventId: string;
  options: UseQueryOptions<Visitor[], Error, Visitor[], any[]>;
}) => {
  const axiosAuth = useAxios();

  return useQuery<Visitor[], Error, Visitor[], any[]>({
    queryFn: async () => {
      const r = await axiosAuth.get<Visitor[]>(`${BaseUrl.Visitor}/${eventId}`);
      return r.data;
    },
    ...options,
  });
};
