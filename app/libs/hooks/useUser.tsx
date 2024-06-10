import { useUserStore } from "@/store/userStore";
import fetchData from "../utils/fetch";
import baseUrl from "../utils/urlApi";
import { User } from "@/lib/types";

export default function useUser() {
  const { user, setUser } = useUserStore();

  const verifyUser = async (eventID: string) => {
    if (user && eventID) {
      const USER_ID = user.id;
      try {
        await fetchData(
          baseUrl(`/visitor/${USER_ID}/verify/${eventID}`),
          "GET",
        );
      } catch (err) {
        console.log(err);
        throw new Error();
      }
    }
  };

  const saveVisitor = (param: User) => {
    setUser(param);
  };

  const removeOlderUser = async () => {
    // TODO: A intégrer
  };

  return { user, verifyUser, saveVisitor };
}
