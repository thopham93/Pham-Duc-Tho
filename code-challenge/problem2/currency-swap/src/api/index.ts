import axiosInstance from "./axiosSetup";
import { defer, Observable, map } from "rxjs";

const get = <T>(
  url: string,
  queryParams?: object,
  config?: object
): Observable<T> => {
  return defer(() =>
    axiosInstance.get<T>(url, { params: queryParams, ...config })
  ).pipe(map((result) => result.data));
};

const post = <T>(
  url: string,
  body: object,
  queryParams?: object,
  config?: object
): Observable<T | void> => {
  return defer(() =>
    axiosInstance.post<T>(url, body, {
      params: queryParams,
      ...config,
    })
  ).pipe(map((result) => result.data));
};

const put = <T>(
  url: string,
  body: object,
  queryParams?: object
): Observable<T | void> => {
  return defer(() =>
    axiosInstance.put<T>(url, body, { params: queryParams })
  ).pipe(map((result) => result.data));
};

const patch = <T>(
  url: string,
  body: object,
  queryParams?: object
): Observable<T | void> => {
  return defer(() =>
    axiosInstance.patch<T>(url, body, { params: queryParams })
  ).pipe(map((result) => result.data));
};

const deleteR = <T>(url: string, id: number): Observable<T | void> => {
  return defer(() => axiosInstance.delete(`${url}/${id}`)).pipe(
    map((result) => result.data)
  );
};

export default { get, post, put, patch, delete: deleteR };
