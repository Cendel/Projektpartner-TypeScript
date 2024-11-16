import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../entities/User";

export interface AuthState {
  isUserLogin: boolean;
  user: User;
}

const initialState: AuthState = {
  isUserLogin: false,
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<Record<string, any>>) => {
      state.isUserLogin = true;
      state.user = action.payload;
    },
    loginFailed: (state) => {
      state.isUserLogin = false;
      state.user = {};
    },
    logOut: (state) => {
      state.isUserLogin = false;
      state.user = {};
    },
  },
});
export const { loginSuccess, loginFailed, logOut } = authSlice.actions;
export default authSlice.reducer;
