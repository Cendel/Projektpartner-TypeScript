import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isUserLogin: false,
    user: {},
  },
  reducers: {
    loginSuccess: (state, action) => {
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
