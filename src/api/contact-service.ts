import Message from "../entities/Message";
import MessageOverview from "../entities/MessageOverview";
import MessageRequest from "../entities/MessageRequest";
import apiRequest from "./apiRequest";

// USER ENDPOINTS
export const sendMessage = (message: MessageRequest) => {
  return apiRequest<MessageRequest, Message>(
    "post",
    "/messages/create/",
    message
  );
};

// ADMIN ENDPOINTS

export const listMessages = () => {
  return apiRequest<void, MessageOverview[]>("get", "/messages/");
};

export const getMessage = (id: number) => {
  return apiRequest<void, Message>("get", `/messages/${id}/`);
};

export const deleteMessage = (id: number) => {
  return apiRequest<void, void>("delete", `/messages/${id}/`);
};
