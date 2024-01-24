import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("token") !== null,
  email: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.email = null;
      localStorage.removeItem("token");
      state.isAuthenticated = false;
    },
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
