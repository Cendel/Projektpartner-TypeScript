import apiRequest from "./apiRequest";

interface Message {
  sender: number;
  title: string;
  text: string;
}

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
