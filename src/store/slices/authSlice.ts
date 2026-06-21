import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, AuthTokens } from "@/types";
import { storage } from "@/lib/utils";

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    loginSuccess(
      state,
      action: PayloadAction<{ user: User; tokens: AuthTokens }>
    ) {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = true;
      state.isLoading = false;
      storage.set("auth_tokens", action.payload.tokens);
      storage.set("auth_user", action.payload.user);
    },
    logout(state) {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      storage.remove("auth_tokens");
      storage.remove("auth_user");
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        storage.set("auth_user", state.user);
      }
    },
    restoreSession(
      state,
      action: PayloadAction<{ user: User; tokens: AuthTokens }>
    ) {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = true;
    },
  },
});

export const { setLoading, loginSuccess, logout, updateUser, restoreSession } =
  authSlice.actions;
export default authSlice.reducer;
