import axios, { AxiosResponse } from "axios";
import authHeader from "../helpers/functions/auth-header";

const API_URL = process.env.REACT_APP_BACKEND_URL;

interface Message {
  created_date: string;
  sender: number;
  title: string;
  text: string;
}

// USER ENDPOINTS
export const sendMessage = (message: Message): Promise<AxiosResponse> => {
  return axios.post(`${API_URL}/messages/create/`, message, {
    headers: authHeader(),
  });
};

// ADMIN ENDPOINTS

export const listMessages = (): Promise<AxiosResponse<Message[]>> => {
  return axios.get(`${API_URL}/messages/`, {
    headers: authHeader(),
  });
};

export const getMessage = (id: number): Promise<AxiosResponse<Message>> => {
  return axios.get(`${API_URL}/messages/${id}/`, {
    headers: authHeader(),
  });
};

export const deleteMessage = (id: number): Promise<AxiosResponse> => {
  return axios.delete(`${API_URL}/messages/${id}/`, {
    headers: authHeader(),
  });
};
