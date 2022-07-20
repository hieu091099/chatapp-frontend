import axios from "axios";

export const BASE_URL: string = "http://192.168.18.172:8000/api";

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});
