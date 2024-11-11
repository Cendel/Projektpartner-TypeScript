import axios, { AxiosResponse } from "axios";
import authHeader from "../helpers/functions/auth-header";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const apiRequest = <T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data?: T
): Promise<AxiosResponse<T>> => {
  const config = {
    method,
    url: `${API_URL}${url}`,
    headers: authHeader(),
    data: data || null,
  };

  return axios(config);
};

export default apiRequest;
