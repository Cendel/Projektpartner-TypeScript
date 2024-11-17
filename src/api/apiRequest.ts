import axios, { AxiosResponse } from "axios";
import authHeader from "../helpers/functions/auth-header";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const apiRequest = <ReqType, ResType>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data?: ReqType,
  params?: Record<string, any>,
  useAuthHeader: boolean = true
): Promise<AxiosResponse<ResType>> => {
  const config = {
    method,
    url: `${API_URL}${url}`,
    ...(useAuthHeader ? { headers: authHeader() } : {}),
    data: data || null,
    params: params || null,
  };

  return axios(config);
};

export default apiRequest;
