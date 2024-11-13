import { Message } from "../entities/Message";
import apiRequest from "./apiRequest";

// USER ENDPOINTS
export const sendMessage = (message: Message) => {
  return apiRequest<Message>("post", "/messages/create/", message);
};

// ADMIN ENDPOINTS

export const listMessages = () => {
  return apiRequest<Message[]>("get", "/messages/");
};

export const getMessage = (id: number) => {
  return apiRequest<Message>("get", `/messages/${id}/`);
};

export const deleteMessage = (id: number) => {
  return apiRequest<void>("delete", `/messages/${id}/`);
};
