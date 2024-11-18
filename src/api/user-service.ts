import LoginRequest from "../entities/LoginRequest";
import LoginResponse from "../entities/LoginResponse";
import RegisterRequest from "../entities/RegisterRequest";
import RegisterResponse from "../entities/RegisterResponse";
import User from "../entities/User";
import UserOverview from "../entities/UserOverview";
import UserUpdateRequest from "../entities/UserUpdateRequest";
import apiRequest from "./apiRequest";

// USER ENDPOINTS

export const register = (user: RegisterRequest) => {
  return apiRequest<RegisterRequest, RegisterResponse>(
    "post",
    "/register/",
    user,
    undefined,
    false
  );
};

export const login = (user: LoginRequest) => {
  return apiRequest<LoginRequest, LoginResponse>(
    "post",
    "/login/",
    user,
    undefined,
    false
  );
};

export const getUser = () => {
  return apiRequest<void, User>("get", "/user/");
};

export const getUserById = (userId: number) => {
  return apiRequest<void, User>("get", `/user/${userId}/`);
};

export const updateUser = (userUpdate: UserUpdateRequest) => {
  return apiRequest<UserUpdateRequest, User>("put", "/user/", userUpdate);
};

// ADMIN ENDPOINTS

export const getUsersAdmin = () => {
  return apiRequest<void, UserOverview[]>("get", "/auth/users/");
};

export const getUserAdmin = (userId: number) => {
  return apiRequest<void, User>("get", `/user/${userId}/`);
};

export const updateUserAdmin = (id: string, userUpdate: UserUpdateRequest) => {
  return apiRequest<UserUpdateRequest, User>(
    "put",
    `/user/${id}/update/`,
    userUpdate
  );
};

export const deleteUserAdmin = (id: number) => {
  return apiRequest<void, void>("delete", `/user/${id}/delete/`);
};
