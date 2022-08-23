import axios from "axios";

export const BASE_URL: string = "http://192.168.18.172:3030/api";

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
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      // "x-access-token": !isExp ? accessToken : accessTokenFromDevice,
      "x-access-token": accessToken,
    },
  });

  if (method == "GET") {
    try {
      return await instance.get(url);
    } catch (error) {
      // console.log(error);
    }
  }
  if (method == "POST") {
    try {
      return await instance.post(url, data);
    } catch (error) {
      // console.log(error);
    }
  }
  if (method == "PUT") {
    try {
      return await instance.put(url, data);
    } catch (error) {
      // console.log(error);
    }
  }

  if (method == "DELETE") {
    try {
      return await instance.delete(url);
    } catch (error) {
      // console.log(error);
    }
  }
};
