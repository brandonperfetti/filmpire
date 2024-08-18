import { RootState } from "@/app/store";
import { AuthState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  sessionId: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem("session_id");

      localStorage.setItem("accountId", action.payload.id);
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setSessionId(state, action) {
      state.sessionId = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

export const userSelector = (state: RootState) => state.user;
