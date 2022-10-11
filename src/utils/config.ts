import axios from "axios";
import jwt_decode from "jwt-decode";

export const BASE_URL: string = "http://localhost:3030/api";

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const instanceToken = async (
  method: string,
  url: string,
  accessToken: string,
  data: object | any
) => {
  let isExp = false;

  if (accessToken) {
    const decoded: any = jwt_decode(accessToken);
    const current_time = new Date().getTime() / 1000;
    if (current_time >= decoded.exp) {
      try {
        const body = {
          accessToken,
          refreshToken: localStorage.refreshToken,
        };

        const res = await instance.post(BASE_URL + "auth/refresh", body);

        localStorage.accessToken = res.data.accessToken;
        isExp = true;
      } catch (err) {
        console.log("Error decoded", err);
      }
    }
  }
  const instanceAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      // "x-access-token": !isExp ? accessToken : accessTokenFromDevice,
      "x-access-token": accessToken,
    },
  });

  if (method == "GET") {
    try {
      return await instanceAxios.get(url);
    } catch (error) {
      // console.log(error);
    }
  }
  if (method == "POST") {
    try {
      return await instanceAxios.post(url, data);
    } catch (error) {
      // console.log(error);
    }
  }
  if (method == "PUT") {
    try {
      return await instanceAxios.put(url, data);
    } catch (error) {
      // console.log(error);
    }
  }

  if (method == "DELETE") {
    try {
      return await instanceAxios.delete(url);
    } catch (error) {
      // console.log(error);
    }
  }
};
