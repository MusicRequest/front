import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function useAuth() {
  const router = useRouter();

  const logout = () => {
    Cookies.remove("x-auth");
    router.push("/login");
  };

  return {
    logout,
  };
}
