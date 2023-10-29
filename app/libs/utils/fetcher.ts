export default async function fetcher(...args: RequestInfo[]) {
  const response = await fetch(...(args as [RequestInfo, RequestInit]));
  const data = await response.json();
  return data;
}
