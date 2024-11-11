import axios from "axios";
import authHeader from "../helpers/functions/auth-header";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// USER ENDPOINTS

export const register = (user) => {
  return axios.post(`${API_URL}/register/`, user); // OK
};

export const login = (credential) => {
  return axios.post(`${API_URL}/login/`, credential); // OK
};

export const getUser = () => {
  return axios.get(`${API_URL}/user/`, { headers: authHeader() }); // OK
};

export const getUserById = (id) => {
  return axios.get(`${API_URL}/user/${id}/`, { headers: authHeader() });
};

export const updateUser = (user) => {
  return axios.put(`${API_URL}/user/`, user, { headers: authHeader() }); // OK
};

export const updatePassword = (credential) => {
  return axios.patch(`${API_URL}/user/auth/`, credential, {
    headers: authHeader(),
  });
};

// ADMIN ENDPOINT

export const getUsersAdmin = () => {
  return axios.get(`${API_URL}/auth/users/`, { headers: authHeader() }); // OK
};

export const getUserAdmin = (id) => {
  return axios.get(`${API_URL}/user/${id}/`, { headers: authHeader() }); // OK
};

export const updateUserAdmin = (id, user) => {
  return axios.put(`${API_URL}/user/${id}/update/`, user, {
    headers: authHeader(),
  }); // OK
};

export const deleteUserAdmin = (id) => {
  return axios.delete(`${API_URL}/user/${id}/delete/`, {
    headers: authHeader(),
  });
}; // OK
