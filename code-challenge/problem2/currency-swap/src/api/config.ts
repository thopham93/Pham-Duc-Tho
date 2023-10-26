import Axios, { AxiosRequestConfig } from "axios";

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
};

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
