import apiRequest from "./apiRequest";

interface User {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  job?: string;
  location?: string;
  about?: string;
  phone?: string;
  website?: string;
}

// USER ENDPOINTS

export const register = (user: User) => {
  return apiRequest<User>("post", "/register/", user, undefined, false);
};

export const login = (user: User) => {
  return apiRequest<User>("post", "/login/", user, undefined, false);
};

export const getUser = () => {
  return apiRequest<User>("get", "/user/");
};

export const getUserById = (id: number) => {
  return apiRequest<User>("get", `/user/${id}/`);
};

export const updateUser = (user: User) => {
  return apiRequest<User>("put", "/user/", user);
};

// ADMIN ENDPOINTS

export const getUsersAdmin = () => {
  return apiRequest<User>("get", "/auth/users/");
};

export const getUserAdmin = (id: number) => {
  return apiRequest<User>("get", `/user/${id}/`);
};

export const updateUserAdmin = (id: number, user: User) => {
  return apiRequest<User>("put", `/user/${id}/update/`, user);
};

export const deleteUserAdmin = (id: number) => {
  return apiRequest<User>("delete", `/user/${id}/delete/`);
};