import axios, { AxiosError, AxiosInstance } from "axios";

import { DEFAULT_BACKEND_URL } from "../config/CONSTANTS";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL ?? DEFAULT_BACKEND_URL}`,
});
axiosInstance.interceptors.request.use(
  (config) => {
    // TODO replace auth
    config.headers[
      "Authorization"
    ] = `Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6ImNxTWpVV2o2Mjc2MW1raUIiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjkxOTI5MzUwLCJpYXQiOjE2OTE5MjU3NTAsImlzcyI6Imh0dHBzOi8vaXNtd3V3ZmNxbW51b3d6eW5lb2Iuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjEwMDA4ZmVlLTdlZjQtNGQyNS04YWQ2LWQxMGUyZTM5YTBkNCIsImVtYWlsIjoiMTE3NjEwMTAyMXFpdUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvdHAiLCJ0aW1lc3RhbXAiOjE2OTE5MjU3NTB9XSwic2Vzc2lvbl9pZCI6IjU3NTU5MGFiLWNmOTYtNDU4Ny05MWQ2LTI3MmZkOTQzM2U4YSJ9.4FFk7dyXuSemFk3ug0V_UMtZFlXzyvqvcTuoaex9mbg`;
    // config.headers["Openai-Api-Key"] = ${process.env.OPENAI_API_KEY};
    return config;
  },
  (error: AxiosError) => {
    console.error({ error });
    void Promise.reject(error);
  }
);
export { axiosInstance };
// export const useAxios = (): { axiosInstance: AxiosInstance } => {
//   // const { session } = useSupabase();
//   // const {
//   //   config: { backendUrl, openAiKey },
//   // } = useBrainConfig();
//   axiosInstance.interceptors.request.clear();
//   axiosInstance.interceptors.request.use(
//     (config) => {
//       // config.headers["Authorization"] = `Bearer ${session?.access_token ?? ""}`;
//       // config.headers["Openai-Api-Key"] = ${process.env.OPENAI_API_KEY};
//       return config;
//     },
//     (error: AxiosError) => {
//       console.error({ error });
//       void Promise.reject(error);
//     }
//   );
//
//   return {
//     axiosInstance,
//   };
// };
