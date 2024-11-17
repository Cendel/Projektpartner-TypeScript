import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../entities/User";

interface AuthState {
  isUserLogin: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isUserLogin: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isUserLogin = true;
      state.user = action.payload;
    },
    loginFailed: (state) => {
      state.isUserLogin = false;
      state.user = null;
    },
    logOut: (state) => {
      state.isUserLogin = false;
      state.user = null;
    },
  },
});
export const { loginSuccess, loginFailed, logOut } = authSlice.actions;
export default authSlice.reducer;
