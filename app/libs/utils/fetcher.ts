import Cookies from "js-cookie";

export const fetcher = async (url: string, needToken?: boolean) => {
  const requestInit: RequestInit = {};
  if (needToken) {
    const tokenInCookie = Cookies.get("x-auth");
    const requestHeader: HeadersInit = new Headers();
    requestHeader.set("Content-Type", "application/json");
    if (tokenInCookie) {
      requestHeader.set("Authorization", `Bearer ${tokenInCookie}`);
    }
    requestInit["headers"] = requestHeader;
  }

  const res = await fetch(url, requestInit);
  return await res.json();
};
