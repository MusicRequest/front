export type Filters = {
  [key: string]: any;
};
export const joinFilterArguments = (filters: Filters): string => {
  let result: string[] = [];
  if (Object.keys(filters).length === 0) return "";

  for (const key in filters) {
    result.push(`${key}=${filters[key]}`);
  }
  return `?${result.join("&")}`;
};

export enum BaseUrl {
  Login = "/auth/login",
  Event = "/events",
  Visitor = "/visitors",
}
