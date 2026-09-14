import axios from "axios";

import { getAccessToken } from "@/constants/src/auth/storage";

export const api = axios.create({
  // baseURL: "http://192.168.0.127:8000",
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    console.log("================================");
    console.log("API REQUEST");
    console.log("METHOD:", config.method);
    console.log("URL:", config.url);
    console.log("HAS ACCESS TOKEN:", !!accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;

      console.log("AUTH HEADER ATTACHED: YES");
    } else {
      console.log("AUTH HEADER ATTACHED: NO");
    }

    console.log("================================");

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
