import axios from "axios";
const BASE_URL = process.env.ENDPOINT;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});
