export const fetcher = async (url: string, needToken?: boolean) => {
  const requestInit: RequestInit = {};
  if (needToken) {
    const tokenInStorage = localStorage.getItem("x-auth");
    const requestHeader: HeadersInit = new Headers();
    requestHeader.set("Content-Type", "application/json");
    if (tokenInStorage) {
      requestHeader.set("Authorization", `Bearer ${tokenInStorage}`);
    }
    requestInit["headers"] = requestHeader;
  }

  const res = await fetch(url, requestInit);
  return await res.json();
};
