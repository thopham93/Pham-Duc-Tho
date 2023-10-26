import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { PropsWithChildren } from "react";
import { axiosRequestConfiguration } from "./config";
import useStore from "../store";

const axiosInstance = axios.create(axiosRequestConfiguration);

export const AxiosInterceptor = ({ children }: PropsWithChildren) => {
  const dispatchSetError = useStore((state) => state.setIsError);

  const onRequest = (config: AxiosRequestConfig) => {
    const { method } = config;

    if (method === "get") {
      config.timeout = 15000;
    }

    return config;
  };

  const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
    if (axios.isAxiosError(error)) {
      const {
        data: { description },
      } = (error.response as AxiosResponse) ?? {};
      dispatchSetError(true, description);
    }

    return Promise.reject(error);
  };

  axiosInstance.interceptors.request.use(onRequest as any, onErrorResponse);
  axiosInstance.interceptors.response.use(onResponse, onErrorResponse);

  return <>{children}</>;
};

export default axiosInstance;
