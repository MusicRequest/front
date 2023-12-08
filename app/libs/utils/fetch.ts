export default async function fetchData<T>(
  url: string,
  method: "POST" | "PUT" | "DELETE" | "GET",
  body?: any,
  options?: RequestInit,
  needToken = false
): Promise<T> {
  try {
    const requestHeader: HeadersInit = new Headers();
    requestHeader.set("Content-Type", "application/json");

    if (needToken) {
      requestHeader.set("authorization", `Bearer ddzd`);
    }

    const param: RequestInit = {
      method,
      ...options,
      headers: requestHeader,
    };

    if (body) {
      param["body"] = JSON.stringify(body);
    }

    const response = await fetch(url, param);

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur Fetch:", error);
    throw new Error();
  }
}
